document.addEventListener("DOMContentLoaded", () => {
    const urlActual = window.location.pathname;
    const enlacesNavegacion = document.querySelectorAll(".navegacion-principal a");

    enlacesNavegacion.forEach(enlace => {
        if (urlActual.includes(enlace.getAttribute("href"))) {
            enlace.classList.add("activo");
        }
    });
});
