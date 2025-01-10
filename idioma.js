let xmlDoc = null;

function cargaXML(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "internacional.xml", true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const parser = new DOMParser();
            xmlDoc = parser.parseFromString(xhr.responseText, "application/xml");
            callback();
        } else {
            console.error(`Error al cargar el archivo XML: ${xhr.statusText}`);
        }
    };
    xhr.onerror = function () {
        console.error("Error de red al intentar cargar el archivo XML.");
    };
    xhr.send();
}

function cambioLenguaje(lenguaje) {
    if (!xmlDoc) {
        console.error("El archivo XML no está cargado o es inválido.");
        return;
    }

    const texts = xmlDoc.querySelectorAll("text");
    texts.forEach(text => {
        const id = text.getAttribute("id");
        const translation = text.querySelector(lenguaje)?.textContent;
        if (translation) {
            const element = document.getElementById(id);
            if (element && element.textContent !== translation) {
                element.textContent = translation;
            }
        }
    });

    // Traducción para submenús
    document.querySelectorAll(".dropdown-item").forEach((item, index) => {
        const subMenuText = xmlDoc.querySelector(`text[id="submenu${index + 1}"]>${lenguaje}`)?.textContent;
        if (subMenuText) {
            item.textContent = subMenuText;
        }
    });
}

// Carga el XML y sincroniza el idioma inicial con el selector
cargaXML(() => {
    const idiomaInicial = document.getElementById("idioma").value;
    cambioLenguaje(idiomaInicial);
});

// Detecta cambios en el selector de idioma
document.getElementById('idioma').addEventListener('change', (event) => {
    cambioLenguaje(event.target.value);
});