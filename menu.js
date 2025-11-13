// =======================
// MENU HAMBURGUER
// =======================
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobile-menu");

    if (hamburger && mobileMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            mobileMenu.classList.toggle("active");
        });

        // Fecha o menu quando um link é clicado
        mobileMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                // Atraso de 10ms para permitir que a rolagem suave inicie antes de fechar o menu
                setTimeout(() => {
                    hamburger.classList.remove("active");
                    mobileMenu.classList.remove("active");
                }, 10);
            });
        });

        // Garante que o menu fecha se redimensionar para desktop
        window.addEventListener("resize", () => {
            if (window.innerWidth > 1024) {
                hamburger.classList.remove("active");
                mobileMenu.classList.remove("active");
            }
        });
    } else {
        console.warn("⚠️ Elementos do menu não encontrados no DOM.");
    }
});