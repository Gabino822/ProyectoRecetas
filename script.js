const xhr = new XMLHttpRequest();
xhr.open("GET", "menu.xml", true);
xhr.onload = function () {
    if (xhr.status === 200) {
        const xmlDoc = xhr.responseXML;
        const items = xmlDoc.getElementsByTagName("item");
        let menuHTML = "";
        for (let i = 0; i < items.length; i++) {
            const nombre = items[i].getElementsByTagName("nombre")[0].textContent;
            const link = items[i].getElementsByTagName("link")[0].textContent;

            // Verificar si tiene submenús
            const submenu = items[i].getElementsByTagName("submenu");
            let submenuHTML = "";
            let aux=submenu.length;
            if (submenu.length > 0) {
                const subItems = submenu[0].getElementsByTagName("items");
                for (let j = 0; j < subItems.length; j++) {
                    const subNombre = subItems[j].getElementsByTagName("nombre")[0].textContent;
                    const subLink = subItems[j].getElementsByTagName("link")[0].textContent;
                    submenuHTML += `<li><a class="dropdown-item" href="${subLink}">${subNombre}</a></li>`;
                }
            }

            if (submenu.length > 0){
                menuHTML += `
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="${link}" id="menu${i}" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        ${nombre}
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="dropdown-${i}">
                        ${submenuHTML}
                    </ul>
                </li>`;
            }
            else{
                menuHTML += `
                    <li class="nav-item">
                        <a class="nav-link" href="${link}" id="menu${i}" >${nombre}
                        </a>
                    </li>`;
            }

            
        }
        document.getElementById("menu").innerHTML = menuHTML;
    } else {
        console.error("Error al cargar el menú.");
    }
};
xhr.send();

			