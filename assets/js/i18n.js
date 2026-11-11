/* Aplica el catálogo inglés sin reconstruir controles ni fichas del sitio. */
const SiteLanguage = (() => {
    const translations = new Map(SITE_ENGLISH.entries);
    const previousText = new WeakMap();
    const previousAttributes = new WeakMap();
    const attributes = ['placeholder', 'alt', 'aria-label', 'title', 'content'];
    const attributeSelector = '[placeholder], [alt], [aria-label], [title], meta[name="description"][content]';
    const normalize = text => text.replace(/\s+/g, ' ').trim();
    const escapePattern = text => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const phrases = [...SITE_ENGLISH.partial].sort((a, b) => b.length - a.length).map(phrase => {
        const start = /^[\p{L}\p{N}]/u.test(phrase) ? '(?<![\\p{L}\\p{N}])' : '';
        const end = /[\p{L}\p{N}]$/u.test(phrase) ? '(?![\\p{L}\\p{N}])' : '';
        return start + escapePattern(phrase) + end;
    });
    const phrasePattern = new RegExp(phrases.join('|'), 'gu');
    let language = 'es';

    function toEnglish(text) {
        const source = normalize(text);
        const exact = translations.get(source);
        if (exact) return exact;

        const counter = /^Mostrando (\d+) de (\d+) actividades registradas en la fuente única$/.exec(source);
        if (counter) return `Showing ${counter[1]} of ${counter[2]} listed activities`;

        const activities = /^(\d+) (actividad|actividades)$/.exec(source);
        if (activities) return `${activities[1]} ${activities[1] === '1' ? 'activity' : 'activities'}`;

        return source.replace(phrasePattern, phrase => translations.get(phrase));
    }

    function updateText(node) {
        const element = node.parentElement;
        if (!element || element.closest('[data-en], script, style, noscript, textarea, [contenteditable]')) return;

        const saved = previousText.get(node);
        if (language === 'es') {
            if (saved && node.nodeValue === saved.english) node.nodeValue = saved.source;
            previousText.delete(node);
            return;
        }

        if (saved?.english === node.nodeValue || !node.nodeValue.trim()) return;
        const source = node.nodeValue;
        const translated = toEnglish(source);
        if (translated === normalize(source)) return;

        if (element.matches('option:not([value])')) element.value = element.value;
        const english = source.replace(/\S[\s\S]*\S|\S/, () => translated);
        previousText.set(node, { source, english });
        node.nodeValue = english;
    }

    function updateAttributes(element) {
        const saved = previousAttributes.get(element) || new Map();
        for (const name of attributes) {
            if (name === 'content' && !element.matches('meta[name="description"]')) continue;
            const source = element.getAttribute(name);
            if (!source) continue;

            const previous = saved.get(name);
            if (language === 'es') {
                if (previous && source === previous.english) element.setAttribute(name, previous.source);
                saved.delete(name);
            } else if (source !== previous?.english) {
                const english = toEnglish(source);
                if (english !== normalize(source)) {
                    saved.set(name, { source, english });
                    element.setAttribute(name, english);
                }
            }
        }
        if (saved.size) previousAttributes.set(element, saved);
    }

    function updateLink(link) {
        const href = link.getAttribute('href');
        const parts = /^(\w[\w-]*\.html)(?:\?([^#]*))?(#.*)?$/.exec(href || '');
        if (!parts) return;
        const params = new URLSearchParams(parts[2]);
        if (language === 'en') {
            if (params.get('lang') === 'en') return;
            params.set('lang', 'en');
        } else {
            if (!params.has('lang')) return;
            params.delete('lang');
        }
        link.setAttribute('href', parts[1] + (params.size ? '?' + params : '') + (parts[3] || ''));
    }

    function updateTree(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            updateText(node);
            return;
        }
        if (node.nodeType !== Node.ELEMENT_NODE) return;

        const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) updateText(walker.currentNode);
        if (node.matches(attributeSelector)) updateAttributes(node);
        node.querySelectorAll(attributeSelector).forEach(updateAttributes);
        if (node.matches('a[href]')) updateLink(node);
        node.querySelectorAll('a[href]').forEach(updateLink);
    }

    const observer = new MutationObserver(records => {
        observer.disconnect();
        for (const record of records) {
            if (record.type === 'attributes') {
                if (record.attributeName === 'href') updateLink(record.target);
                else updateAttributes(record.target);
            } else if (record.type === 'characterData') {
                updateText(record.target);
            } else {
                record.addedNodes.forEach(updateTree);
            }
        }
        observe();
    });

    function observe() {
        observer.observe(document.documentElement, {
            subtree: true,
            childList: true,
            characterData: true,
            attributes: true,
            attributeFilter: [...attributes, 'href']
        });
    }

    return {
        apply(lang) {
            observer.disconnect();
            language = lang;
            updateTree(document.documentElement);
            if (lang === 'en') observe();
        },
        translate(text) {
            return language === 'en' ? toEnglish(text) : text;
        },
        matches(text, query) {
            return text.toLowerCase().includes(query)
                || (language === 'en' && toEnglish(text).toLowerCase().includes(query));
        }
    };
})();
