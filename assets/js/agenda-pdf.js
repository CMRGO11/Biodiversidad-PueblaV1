/* Reporte descargable de las actividades elegidas. */
const AgendaPDF = (() => {
    async function create(items, duration, locale) {
        const { PDFDocument, StandardFonts, rgb } = PDFLib;
        const document = await PDFDocument.create();
        const regular = await document.embedFont(StandardFonts.Helvetica);
        const bold = await document.embedFont(StandardFonts.HelveticaBold);
        const english = locale.startsWith('en');
        const title = english ? 'My calendar' : 'Mi calendario';
        document.setTitle(title);
        document.setAuthor('Puebla, Capital de la Biodiversidad');
        const navy = rgb(.082, .09, .278);
        const muted = rgb(.32, .36, .47);
        const pale = rgb(.94, .95, .97);
        const gold = rgb(.91, .73, .29);
        const margin = 42;
        const width = 595.28;
        const height = 841.89;
        const available = width - margin * 2;
        let page;
        let y;
        // Las fuentes PDF estándar admiten los caracteres latinos del sitio.
        const clean = value => [...String(value).replace(/[–—]/g, '-')].map(character => {
            try { regular.encodeText(character); return character; } catch { return '?'; }
        }).join('');
        const text = (value, x, top, size = 10, font = regular, color = navy) =>
            page.drawText(clean(value), { x, y: top - size, size, font, color });
        const format = (date, options) => new Intl.DateTimeFormat(locale, { ...options, timeZone: 'UTC' })
            .format(new Date(date + 'T00:00:00Z'));
        function lines(value, size, font, maxWidth) {
            const result = [];
            let line = '';
            for (const word of clean(value).split(/\s+/)) {
                const next = line ? line + ' ' + word : word;
                if (font.widthOfTextAtSize(next, size) <= maxWidth) {
                    line = next;
                    continue;
                }
                if (line) result.push(line);
                line = '';
                for (const character of word) {
                    if (font.widthOfTextAtSize(line + character, size) > maxWidth) {
                        result.push(line);
                        line = '';
                    }
                    line += character;
                }
            }
            if (line) result.push(line);
            return result;
        }
        function newPage(heading) {
            page = document.addPage([width, height]);
            y = height - margin;
            text(title, margin, y, 23, bold);
            text('Puebla, Capital de la Biodiversidad · ICCB 2027', margin, y - 32, 10, regular, muted);
            text(items.length + (english ? ' activities · ' : ' actividades · ') + duration, margin, y - 50, 10, bold);
            page.drawRectangle({ x: margin, y: y - 71, width: available, height: 2, color: gold });
            y -= 88;
            text(heading, margin, y, 16, bold);
            y -= 32;
        }
        function monthGrid(month, entries) {
            const cellWidth = available / 7;
            const first = new Date(month + '-01T00:00:00Z');
            const count = new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth() + 1, 0)).getUTCDate();
            const leading = (first.getUTCDay() + 6) % 7;
            const rows = Math.ceil((leading + count) / 7);
            for (let index = 0; index < 7; index++) {
                const label = new Intl.DateTimeFormat(locale, { weekday: 'short', timeZone: 'UTC' })
                    .format(new Date(Date.UTC(2027, 5, 7 + index)));
                text(label, margin + index * cellWidth + 7, y, 9, bold);
            }
            y -= 22;
            for (let index = 0; index < rows * 7; index++) {
                const column = index % 7;
                const row = Math.floor(index / 7);
                const number = index - leading + 1;
                const x = margin + column * cellWidth;
                const top = y - row * 38;
                const date = month + '-' + String(number).padStart(2, '0');
                const selected = entries.filter(entry => entry.activity.fecha === date).length;
                page.drawRectangle({
                    x, y: top - 36, width: cellWidth - 2, height: 36,
                    color: selected ? rgb(.88, .92, .97) : pale
                });
                if (number < 1 || number > count) continue;
                text(String(number), x + 7, top - 5, 10, selected ? bold : regular);
                if (selected) text(selected + (english ? ' saved' : ' en agenda'), x + 7, top - 21, 7, regular, muted);
            }
            y -= rows * 38 + 22;
        }
        const months = [...new Set(items.map(({ activity }) => activity.fecha.slice(0, 7)))].sort();
        for (const month of months) {
            const entries = items.filter(({ activity }) => activity.fecha.startsWith(month));
            const monthLabel = format(month + '-01', { month: 'long', year: 'numeric' });
            newPage(monthLabel);
            monthGrid(month, entries);
            for (const { activity, time } of entries) {
                const conflict = time && items.some(other => other.activity.id !== activity.id && other.time &&
                    time.start < other.time.end && other.time.start < time.end);
                const paragraphs = [
                    { value: format(activity.fecha, { dateStyle: 'full' }), size: 10, font: bold },
                    { value: SiteLanguage.translate(activity.titulo), size: 12, font: bold },
                    { value: activity.horario + ' · ' + activity.ubicacion, size: 10, font: regular },
                    { value: SiteLanguage.translate(activity.estado === 'confirmada' ? 'Confirmado' : 'Dato aún no confirmado de forma definitiva'), size: 9, font: regular }
                ];
                if (conflict) paragraphs.push({
                    value: SiteLanguage.translate('Coincide con otra actividad de tu agenda.'), size: 9, font: bold
                });
                let block = paragraphs.map(paragraph => ({ ...paragraph, rows: lines(paragraph.value, paragraph.size, paragraph.font, available) }));
                const needed = block.reduce((sum, paragraph) => sum + paragraph.rows.length * (paragraph.size + 4) + 5, 14);
                if (y - needed < 58) newPage(monthLabel + (english ? ' - continued' : ' - continuación'));
                for (const paragraph of block) {
                    for (const row of paragraph.rows) {
                        if (y < 70) newPage(monthLabel + (english ? ' - continued' : ' - continuación'));
                        text(row, margin, y, paragraph.size, paragraph.font);
                        y -= paragraph.size + 4;
                    }
                    y -= 5;
                }
                y -= 12;
            }
        }
        const pages = document.getPages();
        pages.forEach((current, index) => {
            page = current;
            text((english ? 'Times in Puebla · ' : 'Horarios de Puebla · ') + (index + 1) + ' / ' + pages.length,
                margin, 35, 8, regular, muted);
        });
        return new Blob([await document.save()], { type: 'application/pdf' });
    }
    return { create };
})();
