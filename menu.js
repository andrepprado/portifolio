document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobile-menu");

    if (hamburger && mobileMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            mobileMenu.classList.toggle("active");
        });

        mobileMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {

                setTimeout(() => {
                    hamburger.classList.remove("active");
                    mobileMenu.classList.remove("active");
                }, 10);
            });
        });

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
