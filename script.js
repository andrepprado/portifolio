document.addEventListener('DOMContentLoaded', () => {





    const langBtns = document.querySelectorAll('.lang-btn');
    const defaultLang = 'pt-BR';
    let currentLang = localStorage.getItem('lang') || defaultLang;

    const titleElement = document.getElementById('fixed-title');
    const fixedTitleText = '<André Ghiringhelli/>'; // Texto fixo

    function translatePage(lang) {
        if (typeof translations === 'undefined') {
            console.error('Erro: O objeto de traduções (translations) não foi carregado. Certifique-se de que i18n_data.js está incluído antes de script.js no seu HTML.');
            return;
        }

        const t = translations[lang] || translations[defaultLang];

        document.querySelectorAll('[data-i18n-key]').forEach(el => {
            const key = el.getAttribute('data-i18n-key');

            if (t[key]) {
                el.innerHTML = t[key];
            }
        });

        langBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });

        currentLang = lang;
    }

    function setupLangListeners() {
        langBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const langCode = btn.getAttribute('data-lang');
                localStorage.setItem('lang', langCode);
                translatePage(langCode);
            });
        });
    }









    function initializeSlider(sliderId) {
        const slider = document.getElementById(sliderId);

        if (!slider) {
            return;
        }

        const images = slider.querySelectorAll('.slide-image');
        const totalImages = images.length;
        let currentImageIndex = 0;
        const slideInterval = 3000;

        if (totalImages <= 1) {
            return;
        }

        slider.style.width = `${totalImages * 100}%`;

        const slideWidthPercentage = 100 / totalImages;
        images.forEach(img => {
            img.style.width = `${slideWidthPercentage}%`;
        });

        function nextSlide() {
            currentImageIndex = (currentImageIndex + 1) % totalImages;
            const translateXValue = (currentImageIndex * slideWidthPercentage) * -1;
            slider.style.transform = `translateX(${translateXValue}%)`;
        }

        setInterval(nextSlide, slideInterval);
    }





    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const lightIcon = document.getElementById('theme-icon-light');
    const darkIcon = document.getElementById('theme-icon-dark');

    function applyTheme(isLight) {
        if (isLight) {
            body.classList.add('light-theme');
            lightIcon.style.display = 'none';
            darkIcon.style.display = 'block'; // Se o tema é CLARO, o botão exibe a LUA (para mudar para escuro)
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-theme');
            lightIcon.style.display = 'block'; // Se o tema é ESCURO, o botão exibe o SOL (para mudar para claro)
            darkIcon.style.display = 'none';
            localStorage.setItem('theme', 'dark');
        }
    }

    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme === 'light' || (!savedTheme && window.matchMedia && !window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            applyTheme(true);
        } else {

            applyTheme(false);
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isLight = body.classList.contains('light-theme');
            applyTheme(!isLight);
        });
    }





    initializeTheme(); // Inicializa o tema antes de tudo
    setupLangListeners();

    const langToLoad = currentLang === 'pt' ? 'pt-BR' : currentLang;
    translatePage(langToLoad);

    if (titleElement) {
        titleElement.textContent = fixedTitleText;
    }

    initializeSlider('slider-buono');
    initializeSlider('slider-espetinho');
    initializeSlider('slider-chale-gabi');
    initializeSlider('slider-duolab-calc');
});

/* === MOTION-DESIGN-2026 === */

(() => {
    "use strict";

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
        document.documentElement.classList.add("reduce-motion");
        return;
    }

    const pointerFine = window.matchMedia("(pointer: fine)").matches;

    /* ========================================================
       HERO
    ======================================================== */

    const heroElements = [
        ".hero-status",
        ".hero-eyebrow",
        ".hero-main-title",
        ".hero-description-new",
        ".hero-actions",
        ".hero-mini-metrics",
        ".hero-visual"
    ];

    heroElements.forEach((selector, index) => {
        const element = document.querySelector(selector);

        if (!element) return;

        element.classList.add("motion-hero-item");

        element.style.setProperty(
            "--motion-index",
            index
        );
    });

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            document.body.classList.add("motion-loaded");
        });
    });

    /* ========================================================
       REVEAL DAS SECOES
    ======================================================== */

    const revealSelectors = [
        ".section-heading-modern",
        ".about-statement",
        ".bio-summary",
        ".about-tags",
        ".skill-category",
        ".stack-card",
        ".metric-card",
        ".timeline-item",
        ".contact-item",
        ".github-portfolio-cta"
    ];

    const revealElements = document.querySelectorAll(
        revealSelectors.join(",")
    );

    revealElements.forEach((element, index) => {
        element.classList.add("motion-reveal");

        element.style.setProperty(
            "--reveal-delay",
            `${(index % 4) * 80}ms`
        );
    });

    /* ========================================================
       PROJETOS - ENTRADA ALTERNADA
    ======================================================== */

    const projectCards = document.querySelectorAll(
        ".projetos-showcase .projeto-card"
    );

    projectCards.forEach((card, index) => {
        card.classList.add("motion-project");

        card.classList.add(
            index % 2 === 0
                ? "motion-project-left"
                : "motion-project-right"
        );
    });

    /* ========================================================
       INTERSECTION OBSERVER
    ======================================================== */

    const observedElements = document.querySelectorAll(
        ".motion-reveal, .motion-project"
    );

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("motion-visible");

                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.13,
            rootMargin: "0px 0px -70px 0px"
        }
    );

    observedElements.forEach(element => {
        observer.observe(element);
    });

    /* ========================================================
       HERO PARALLAX
    ======================================================== */

    const hero = document.querySelector(".hero-portfolio");
    const heroVisual = document.querySelector(".hero-visual");

    if (hero && heroVisual && pointerFine) {

        hero.addEventListener("pointermove", event => {

            const rect = hero.getBoundingClientRect();

            const x =
                ((event.clientX - rect.left) / rect.width) - 0.5;

            const y =
                ((event.clientY - rect.top) / rect.height) - 0.5;

            heroVisual.style.setProperty(
                "--hero-x",
                `${x * 30}px`
            );

            heroVisual.style.setProperty(
                "--hero-y",
                `${y * 22}px`
            );

            heroVisual.style.setProperty(
                "--hero-rx",
                `${-y * 5}deg`
            );

            heroVisual.style.setProperty(
                "--hero-ry",
                `${x * 5}deg`
            );
        });

        hero.addEventListener("pointerleave", () => {

            heroVisual.style.setProperty("--hero-x", "0px");
            heroVisual.style.setProperty("--hero-y", "0px");
            heroVisual.style.setProperty("--hero-rx", "0deg");
            heroVisual.style.setProperty("--hero-ry", "0deg");

        });
    }

    /* ========================================================
       TILT + GLOW NOS PROJETOS
    ======================================================== */

    if (pointerFine) {

        projectCards.forEach(card => {

            card.classList.add("motion-project-interactive");

            card.addEventListener("pointermove", event => {

                const rect = card.getBoundingClientRect();

                const mouseX = event.clientX - rect.left;
                const mouseY = event.clientY - rect.top;

                const x = mouseX / rect.width - 0.5;
                const y = mouseY / rect.height - 0.5;

                card.style.setProperty(
                    "--mouse-x",
                    `${mouseX}px`
                );

                card.style.setProperty(
                    "--mouse-y",
                    `${mouseY}px`
                );

                card.style.setProperty(
                    "--card-rx",
                    `${-y * 6}deg`
                );

                card.style.setProperty(
                    "--card-ry",
                    `${x * 6}deg`
                );
            });

            card.addEventListener("pointerleave", () => {

                card.style.setProperty("--card-rx", "0deg");
                card.style.setProperty("--card-ry", "0deg");

            });
        });
    }

    /* ========================================================
       PARALLAX DE TITULOS NO SCROLL
    ======================================================== */

    const sectionTitles = document.querySelectorAll(
        ".section-heading-modern"
    );

    let scrollTicking = false;

    function updateScrollMotion() {

        const viewportHeight = window.innerHeight;

        sectionTitles.forEach(title => {

            const rect = title.getBoundingClientRect();

            if (
                rect.bottom < 0 ||
                rect.top > viewportHeight
            ) {
                return;
            }

            const center =
                rect.top + rect.height / 2;

            const normalized =
                (center - viewportHeight / 2) /
                viewportHeight;

            title.style.setProperty(
                "--title-motion",
                `${normalized * -22}px`
            );
        });

        scrollTicking = false;
    }

    window.addEventListener(
        "scroll",
        () => {

            if (scrollTicking) return;

            scrollTicking = true;

            requestAnimationFrame(updateScrollMotion);

        },
        { passive: true }
    );

    updateScrollMotion();

    /* ========================================================
       SCROLL PROGRESS
    ======================================================== */

    let progress = document.querySelector(
        ".motion-scroll-progress"
    );

    if (!progress) {

        progress = document.createElement("div");

        progress.className =
            "motion-scroll-progress";

        progress.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.appendChild(progress);
    }

    function updateProgress() {

        const maxScroll =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const value =
            maxScroll > 0
                ? window.scrollY / maxScroll
                : 0;

        progress.style.transform =
            `scaleX(${Math.max(0, Math.min(1, value))})`;
    }

    window.addEventListener(
        "scroll",
        updateProgress,
        { passive: true }
    );

    updateProgress();

})();

/* === END-MOTION-DESIGN-2026 === */
