document.addEventListener('DOMContentLoaded', () => {
    initTocToggle();
    initTabs();
    initSmoothScroll();
});

// Table of Contents toggle
function initTocToggle() {
    const toggle = document.getElementById('toc-toggle');
    const list = document.getElementById('toc-list');
    if (!toggle || !list) return;

    toggle.addEventListener('click', () => {
        if (list.style.display === 'none') {
            list.style.display = '';
            toggle.textContent = '[hide]';
        } else {
            list.style.display = 'none';
            toggle.textContent = '[show]';
        }
    });
}

// Tab navigation
function initTabs() {
    const tabs = document.querySelectorAll('.wiki-tab');
    const tabTargets = {
        'article': 'top',
        'projects': 'projects-experience',
        'skills': 'technical-skills',
        'contact': 'external-links'
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const targetId = tabTargets[tab.getAttribute('data-tab')];
            if (targetId) scrollToId(targetId);
        });
    });

    window.addEventListener('scroll', () => {
        let current = 'article';
        for (const [tabName, sectionId] of Object.entries(tabTargets)) {
            const el = document.getElementById(sectionId);
            if (el && el.getBoundingClientRect().top <= 120) {
                current = tabName;
            }
        }
        tabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-tab') === current));
    });
}

// Smooth scroll for TOC links
function initSmoothScroll() {
    document.querySelectorAll('.wiki-toc-list a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToId(link.getAttribute('href').substring(1));
        });
    });
}

function scrollToId(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
