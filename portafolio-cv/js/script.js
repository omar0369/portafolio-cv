// Comportamiento del menú (Mostrar / Ocultar)
((d) => {
    const $btnMenu = d.querySelector(".menu-btn");
    const $menu = d.querySelector(".menu");

    $btnMenu.addEventListener("click", e => {
        $btnMenu.firstElementChild.classList.toggle("none");
        $btnMenu.lastElementChild.classList.toggle("none");
        $menu.classList.toggle("is-active");
    });

    // Mostrar la sección seleccionada y cerrar el menú
    d.addEventListener("click", (e) => {
        if (!e.target.matches(".menu a"))
            return false;

        $btnMenu.firstElementChild.classList.remove("none");
        $btnMenu.lastElementChild.classList.add("none");
        $menu.classList.remove("is-active");
    });
})(document);

// Contact form
((d) => {
    const $form = d.querySelector(".contact-form");
    const $loader = d.querySelector(".contact-form-loader");
    const $response = d.querySelector(".contact-form-response");

    $form.addEventListener("submit", (e) => {
        e.preventDefault();
        $loader.classList.remove("none");
        fetch("https://formsubmit.co/ajax/sub_mk@hotmail.com", { 
            method: "POST", 
            body: new FormData(e.target) 
        })
            .then((res) => (res.ok ? res.json() : Promise.reject(res)))
            .then((json) => {
                console.log(json);
                location.hash = "#gracias";
                $form.reset();
            })
            .catch(err => {
                console.log(err);
                let message = err.statusText || "Ocurrió un error al enviar, intenta nuevamente.";
                $response.querySelector("h3").innerHTML = `Error ${err.status}: ${message}`;
                $loader.classList.add("none");
            })
            .finally(() => {
                $loader.classList.add("none");
                setTimeout(() => {
                    location.hash = "#close";
                }, 3000);
            });
    });
})(document);