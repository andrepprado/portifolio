document.addEventListener('DOMContentLoaded', () => {

    /* ================================================= */
    /* 1. LÓGICA DE INTERNACIONALIZAÇÃO (i18n)           */
    /* ================================================= */

    const langBtns = document.querySelectorAll('.lang-btn');
    const defaultLang = 'pt-BR';
    let currentLang = localStorage.getItem('lang') || defaultLang;

    // Novo elemento de título fixo
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

            // Traduz APENAS se a chave existir no i18n, preservando o texto original do HTML caso contrário
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

    /* ================================================= */
    /* 2. LÓGICA DE DIGITAÇÃO (TypeWriter) - REMOVIDA    */
    /* ================================================= */


    /* ================================================= */
    /* 3. LÓGICA DO SLIDE AUTOMÁTICO (SLIDESHOW)         */
    /* ================================================= */

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


    /* ================================================= */
    /* 4. LÓGICA DO MENU HAMBÚRGUER (NAVEGAÇÃO)          */
    /* ================================================= */
    // Essa lógica está isolada no menu.js.

    /* ================================================= */
    /* 5. ROLAGEM SUAVE E AJUSTE DE VISUALIZAÇÃO         */
    /* ================================================= */

    // A rolagem suave é gerenciada pelo CSS: `scroll-behavior: smooth` e `scroll-margin-top`

    /* ================================================= */
    /* 6. LÓGICA DE TEMA (CLARO/ESCURO)                  */
    /* ================================================= */

    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const lightIcon = document.getElementById('theme-icon-light');
    const darkIcon = document.getElementById('theme-icon-dark');

    // Função para aplicar o tema e atualizar o ícone
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

    // Inicializa o tema com base na preferência salva ou no padrão do navegador
    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme');

        // Se o tema for CLARO ou a preferência do sistema for CLARO, exibe o ícone da LUA
        if (savedTheme === 'light' || (!savedTheme && window.matchMedia && !window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            applyTheme(true);
        } else {
            // Caso contrário, tema ESCURO, exibe o ícone do SOL
            applyTheme(false);
        }
    }

    // Adiciona o listener para o clique do botão
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isLight = body.classList.contains('light-theme');
            applyTheme(!isLight);
        });
    }

    /* ================================================= */
    /* 7. INICIALIZAÇÃO GERAL                            */
    /* ================================================= */

    initializeTheme(); // Inicializa o tema antes de tudo
    setupLangListeners();

    // Inicia a tradução.
    const langToLoad = currentLang === 'pt' ? 'pt-BR' : currentLang;
    translatePage(langToLoad);

    // Garante que o título fixo esteja correto (já foi definido no HTML, mas garantimos aqui)
    if (titleElement) {
        titleElement.textContent = fixedTitleText;
    }

    // Inicia os sliders de projeto (em qualquer página que tenha os elementos)
    initializeSlider('slider-buono');
    initializeSlider('slider-espetinho');
});