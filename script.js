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
});
