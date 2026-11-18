/* Agenda personal y exportación iCalendar. */
const AgendaPersonal = (() => {
    const storageKey = 'puebla-biodiversidad:agenda:2027';
    const zone = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Mexico_City', timeZoneName: 'longOffset'
    });
    const day = 86400000;
    const dateOnly = date => date.replace(/-/g, '');
    const utcStamp = timestamp => new Date(timestamp).toISOString().replace(/[-:]|\.\d{3}/g, '');

    function schedule(activity, visitDate = activity.fecha) {
        const times = /^(\d{2}):(\d{2})\s*[–—-]\s*(\d{2}):(\d{2})\s*h?$/.exec(activity.horario);
        if (!times) return null;
        const [, startHour, startMinute, endHour, endMinute] = times.map(Number);
        if (startHour > 23 || endHour > 23 || startMinute > 59 || endMinute > 59) return null;
        const midnight = Date.parse(visitDate + 'T00:00:00Z');
        const start = midnight + (startHour * 60 + startMinute) * 60000;
        const end = midnight + (endHour * 60 + endMinute) * 60000;
        return end > start ? { start, end } : null;
    }

    function pueblaToUtc(timestamp) {
        const offset = zone.formatToParts(timestamp).find(part => part.type === 'timeZoneName').value;
        const match = /^GMT([+-])(\d{2}):(\d{2})$/.exec(offset);
        const minutes = match ? (Number(match[2]) * 60 + Number(match[3])) * (match[1] === '-' ? -1 : 1) : 0;
        return utcStamp(timestamp - minutes * 60000);
    }

    function escapeCalendar(value) {
        return value.replace(/\\/g, '\\\\').replace(/\r\n|\r|\n/g, '\\n').replace(/[;,]/g, '\\$&');
    }

    function fold(line) {
        const encoder = new TextEncoder();
        let bytes = 0;
        let result = '';
        for (const character of line) {
            const size = encoder.encode(character).length;
            if (bytes + size > 75) {
                result += '\r\n ';
                bytes = 1;
            }
            result += character;
            bytes += size;
        }
        return result;
    }

    function calendar(entries, now = Date.now()) {
        const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Puebla Biodiversidad//Mi Agenda 2027//ES', 'CALSCALE:GREGORIAN'];
        for (const { activity, time } of entries) {
            const lastDate = activity.fechaFin || activity.fecha;
            const nextDate = new Date(Date.parse(lastDate + 'T00:00:00Z') + day).toISOString().slice(0, 10);
            lines.push(
                'BEGIN:VEVENT',
                'UID:' + activity.id + '@agenda.iccb2027puebla.mx',
                'DTSTAMP:' + utcStamp(now),
                time ? 'DTSTART:' + pueblaToUtc(time.start) : 'DTSTART;VALUE=DATE:' + dateOnly(activity.fecha),
                time ? 'DTEND:' + pueblaToUtc(time.end) : 'DTEND;VALUE=DATE:' + dateOnly(nextDate),
                'SUMMARY:' + escapeCalendar(SiteLanguage.translate(activity.titulo)),
                'LOCATION:' + escapeCalendar(activity.ubicacion),
                'DESCRIPTION:' + escapeCalendar(SiteLanguage.translate(activity.descripcion) + '\n' + activity.horario),
                'STATUS:' + (activity.estado === 'confirmada' ? 'CONFIRMED' : 'TENTATIVE'),
                'TRANSP:' + (time ? 'OPAQUE' : 'TRANSPARENT'),
                'END:VEVENT'
            );
        }
        return lines.concat('END:VCALENDAR', '').map(fold).join('\r\n');
    }

    function mount(activities, program) {
        const bar = document.getElementById('mi-agenda');
        const dialog = document.getElementById('mi-agenda-dialog');
        const list = dialog.querySelector('ul');
        const download = dialog.querySelector('[data-agenda-download]');
        const pdfDownload = dialog.querySelector('[data-agenda-pdf]');
        const entries = new Map(activities.filter(activity => activity.visible)
            .map(activity => [activity.id, { activity, time: schedule(activity) }]));
        let selected = new Map();
        const firstMonth = '2027-06';
        const lastMonth = '2027-07';
        let month = firstMonth;
        let activeDate = firstMonth + '-07';
        const previousMonth = dialog.querySelector('[data-agenda-prev]');
        const nextMonth = dialog.querySelector('[data-agenda-next]');
        const days = dialog.querySelector('[data-agenda-days]');
        const weekdays = dialog.querySelector('[data-agenda-weekdays]');
        const dateTime = date => Date.parse(date + 'T00:00:00Z');
        const dateAt = timestamp => new Date(timestamp).toISOString().slice(0, 10);
        const shiftMonth = (value, step) => {
            const date = new Date(dateTime(value + '-01'));
            date.setUTCMonth(date.getUTCMonth() + step);
            return dateAt(date).slice(0, 7);
        };
        const onDate = (items, date) => items.filter(({ activity }) =>
            activity.fecha <= date && date <= (activity.fechaFin || activity.fecha));

        function showMonth(value) {
            month = value;
            const first = chosen().find(({ activity }) =>
                activity.fecha <= month + '-31' && (activity.fechaFin || activity.fecha) >= month + '-01');
            activeDate = first && first.activity.fecha.startsWith(month) ? first.activity.fecha : month + '-01';
            render();
        }

        function renderCalendar(items) {
            const locale = document.documentElement.lang === 'en' ? 'en-US' : 'es-MX';
            const format = (timestamp, options) => new Intl.DateTimeFormat(locale, { ...options, timeZone: 'UTC' }).format(timestamp);
            const monthStart = dateTime(month + '-01');
            const nextStart = dateTime(shiftMonth(month, 1) + '-01');
            const leading = (new Date(monthStart).getUTCDay() + 6) % 7;
            dialog.querySelector('[data-agenda-month]').textContent = format(monthStart, { month: 'long', year: 'numeric' });
            dialog.querySelector('#mi-agenda-day-title').textContent = format(dateTime(activeDate), { dateStyle: 'full' });
            previousMonth.disabled = month <= firstMonth;
            nextMonth.disabled = month >= lastMonth;
            weekdays.replaceChildren();
            for (let index = 0; index < 7; index++) {
                const heading = document.createElement('th');
                heading.scope = 'col';
                heading.textContent = format(Date.UTC(2027, 5, 7 + index), { weekday: 'short' });
                weekdays.append(heading);
            }
            days.replaceChildren();
            const total = Math.ceil((leading + (nextStart - monthStart) / day) / 7) * 7;
            for (let index = 0; index < total; index++) {
                if (index % 7 === 0) days.append(document.createElement('tr'));
                const cell = document.createElement('td');
                days.lastElementChild.append(cell);
                const timestamp = monthStart + (index - leading) * day;
                if (timestamp < monthStart || timestamp >= nextStart) continue;
                const date = dateAt(timestamp);
                const count = onDate(items, date).length;
                const button = document.createElement('button');
                button.type = 'button';
                button.dataset.date = date;
                button.setAttribute('aria-pressed', String(date === activeDate));
                button.setAttribute('aria-label', format(timestamp, { dateStyle: 'full' }) +
                    (count ? ', ' + SiteLanguage.translate(count + (count === 1 ? ' actividad' : ' actividades')) : ''));
                button.textContent = String(new Date(timestamp).getUTCDate());
                if (count) {
                    const marker = document.createElement('span');
                    marker.textContent = count;
                    marker.setAttribute('aria-hidden', 'true');
                    button.append(marker);
                }
                cell.append(button);
            }
        }

        days.addEventListener('click', event => {
            const button = event.target.closest('[data-date]');
            if (!button) return;
            activeDate = button.dataset.date;
            render();
            days.querySelector('[aria-pressed="true"]').focus();
        });
        previousMonth.addEventListener('click', () => {
            showMonth(shiftMonth(month, -1));
            days.querySelector('[aria-pressed="true"]').focus();
        });
        nextMonth.addEventListener('click', () => {
            showMonth(shiftMonth(month, 1));
            days.querySelector('[aria-pressed="true"]').focus();
        });

        function validVisitDate(activity, value) {
            return /^\d{4}-\d{2}-\d{2}$/.test(value) &&
                Number.isFinite(dateTime(value)) && dateAt(dateTime(value)) === value &&
                value >= activity.fecha && value <= (activity.fechaFin || activity.fecha);
        }

        function restore() {
            try {
                const saved = JSON.parse(localStorage.getItem(storageKey));
                selected = new Map();
                for (const item of Array.isArray(saved) ? saved : []) {
                    const id = typeof item === 'string' ? item : item?.id;
                    if (!entries.has(id)) continue;
                    const activity = entries.get(id).activity;
                    const date = typeof item === 'object' && validVisitDate(activity, item.date) ? item.date : activity.fecha;
                    selected.set(id, date);
                }
            } catch {
                // La selección actual sigue disponible si se restringe el almacenamiento.
            }
        }

        const formatVisitDate = date => new Intl.DateTimeFormat(
            document.documentElement.lang === 'en' ? 'en-US' : 'es-MX',
            { dateStyle: 'full', timeZone: 'UTC' }).format(dateTime(date));
        const chosen = () => [...selected].map(([id, date]) => {
            const { activity } = entries.get(id);
            return {
                activity: { ...activity, fecha: date, fechaFin: undefined, fechaTexto: formatVisitDate(date) },
                time: schedule(activity, date)
            };
        }).sort((a, b) => a.activity.fecha.localeCompare(b.activity.fecha) ||
            (a.time?.start ?? Infinity) - (b.time?.start ?? Infinity) ||
            a.activity.titulo.localeCompare(b.activity.titulo));
        const formatDuration = minutes => {
            const hours = Math.floor(minutes / 60);
            const remainder = minutes % 60;
            return [hours && hours + ' h', (remainder || !hours) && remainder + ' min'].filter(Boolean).join(' ');
        };

        function updateButton(button) {
            const added = selected.has(button.dataset.agendaSelect);
            button.setAttribute('aria-pressed', String(added));
            button.textContent = added ? '✓ En mi agenda' : '+ Agregar a mi agenda';
            const input = button.closest('.personal-agenda-action').querySelector('[data-agenda-visit]');
            if (input && added) input.value = selected.get(button.dataset.agendaSelect);
        }

        function render() {
            const items = chosen();
            const minutes = items.reduce((sum, { time }) => sum + (time ? (time.end - time.start) / 60000 : 0), 0);
            bar.querySelector('[data-agenda-count]').textContent = items.length + (items.length === 1 ? ' actividad' : ' actividades');
            bar.querySelector('[data-agenda-duration]').textContent = formatDuration(minutes);
            dialog.querySelector('[data-agenda-empty]').hidden = items.length > 0;
            download.disabled = items.length === 0;
            pdfDownload.disabled = items.length === 0;
            renderCalendar(items);
            const dayItems = onDate(items, activeDate);
            dialog.querySelector('[data-agenda-day-empty]').hidden = dayItems.length > 0 || items.length === 0;
            list.replaceChildren();
            for (const entry of dayItems) {
                const { activity, time } = entry;
                const conflict = time && items.some(other => other !== entry && other.time &&
                    time.start < other.time.end && other.time.start < time.end);
                const row = document.createElement('li');
                const title = document.createElement('strong');
                title.textContent = activity.titulo;
                const details = document.createElement('p');
                const hours = document.createElement('strong');
                hours.textContent = activity.horario;
                details.append(activity.fechaTexto + ' · ', hours, ' · ' + activity.ubicacion);
                row.append(title, details);
                const original = entries.get(activity.id).activity;
                if (original.fechaFin) {
                    const label = document.createElement('label');
                    label.className = 'personal-agenda-visit';
                    label.append(SiteLanguage.translate('Día de visita'));
                    const input = document.createElement('input');
                    input.type = 'date';
                    input.min = original.fecha;
                    input.max = original.fechaFin;
                    input.value = activity.fecha;
                    input.addEventListener('change', () => {
                        if (!input.reportValidity() || !validVisitDate(original, input.value)) return;
                        selected.set(activity.id, input.value);
                        activeDate = input.value;
                        month = activeDate.slice(0, 7);
                        save();
                        render();
                        days.querySelector('[aria-pressed="true"]').focus();
                    });
                    label.append(input);
                    row.append(label);
                }
                if (conflict || !time) {
                    const note = document.createElement('p');
                    note.className = 'personal-agenda-note';
                    note.textContent = conflict ? 'Coincide con otra actividad de tu agenda.' : 'Horario por confirmar';
                    row.append(note);
                }
                const remove = document.createElement('button');
                remove.type = 'button';
                remove.className = 'btn btn-outline btn-sm';
                remove.textContent = 'Quitar de mi agenda';
                remove.addEventListener('click', () => {
                    const index = [...list.children].indexOf(row);
                    toggle(activity.id);
                    (list.children[Math.min(index, list.children.length - 1)]?.querySelector('button')
                        || days.querySelector('[aria-pressed="true"]')).focus();
                });
                row.append(remove);
                list.append(row);
            }
            program.querySelectorAll('[data-agenda-select]').forEach(updateButton);
        }

        function save() {
            try {
                localStorage.setItem(storageKey, JSON.stringify([...selected].map(([id, date]) => ({ id, date }))));
            } catch {
                bar.querySelector('[data-agenda-storage]').hidden = false;
            }
        }

        function toggle(id) {
            if (selected.has(id)) selected.delete(id);
            else {
                const activity = entries.get(id).activity;
                const input = document.getElementById(id)?.querySelector('[data-agenda-visit]');
                const date = input?.value || activity.fecha;
                if (input && !input.reportValidity()) return;
                if (!validVisitDate(activity, date)) return;
                selected.set(id, date);
            }
            save();
            render();
        }

        program.addEventListener('click', event => {
            const button = event.target.closest('[data-agenda-select]');
            if (button && entries.has(button.dataset.agendaSelect)) toggle(button.dataset.agendaSelect);
        });
        program.addEventListener('change', event => {
            const input = event.target.closest('[data-agenda-visit]');
            if (!input) return;
            const id = input.dataset.agendaVisit;
            if (!selected.has(id) || !input.reportValidity() || !validVisitDate(entries.get(id).activity, input.value)) return;
            selected.set(id, input.value);
            save();
            render();
        });
        bar.querySelector('button').addEventListener('click', () => {
            const first = chosen()[0];
            activeDate = first?.activity.fecha || firstMonth + '-07';
            month = activeDate.slice(0, 7);
            render();
            dialog.showModal();
        });
        window.addEventListener('idiomaCambiado', render);
        function downloadFile(blob, filename) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.append(link);
            link.click();
            link.remove();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
        }
        download.addEventListener('click', () => {
            downloadFile(new Blob([calendar(chosen())], { type: 'text/calendar;charset=utf-8' }), 'mi-calendario-puebla-2027.ics');
        });
        pdfDownload.addEventListener('click', async () => {
            const items = chosen();
            if (!items.length) return;
            pdfDownload.disabled = true;
            pdfDownload.setAttribute('aria-busy', 'true');
            dialog.querySelector('[data-agenda-export-status]').textContent = '';
            try {
                const minutes = items.reduce((sum, { time }) => sum + (time ? (time.end - time.start) / 60000 : 0), 0);
                const locale = document.documentElement.lang === 'en' ? 'en-US' : 'es-MX';
                downloadFile(await AgendaPDF.create(items, formatDuration(minutes), locale), 'mi-calendario-puebla-2027.pdf');
            } catch {
                dialog.querySelector('[data-agenda-export-status]').textContent = SiteLanguage.translate('No se pudo generar el PDF. Intenta de nuevo.');
            } finally {
                pdfDownload.disabled = selected.size === 0;
                pdfDownload.removeAttribute('aria-busy');
            }
        });
        window.addEventListener('storage', event => {
            if (event.key === storageKey || event.key === null) {
                restore();
                render();
            }
        });
        restore();
        render();
        bar.hidden = false;
        return {
            button(activity) {
                const { time } = entries.get(activity.id);
                const added = selected.has(activity.id);
                const duration = time ? formatDuration((time.end - time.start) / 60000) : 'Horario por confirmar';
                const visitDate = selected.get(activity.id) || activity.fecha;
                const visit = activity.fechaFin ? `<label class="personal-agenda-visit">Día de visita
                    <input type="date" data-agenda-visit="${activity.id}" min="${activity.fecha}"
                        max="${activity.fechaFin}" value="${visitDate}" required></label>` : '';
                return `<div class="personal-agenda-action">${visit}<span>${duration}</span>
                    <button type="button" class="btn btn-outline btn-sm" data-agenda-select="${activity.id}"
                        aria-pressed="${added}">${added ? '✓ En mi agenda' : '+ Agregar a mi agenda'}</button></div>`;
            }
        };
    }

    return { mount };
})();
