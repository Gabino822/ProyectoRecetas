const xhr=new XMLHttpRequest();
			xhr.open("GET", "menu.xml", true);
			xhr.onload = function() {
                if (xhr.status === 200) {
                    const xmlDoc = xhr.responseXML;
                    const items = xmlDoc.getElementsByTagName("item");
                    let menuHTML="";
                    for (let i = 0; i < items.length; i++) {
                        const nombre = items[i].getElementsByTagName("nombre")[0].textContent;
                        const link = items[i].getElementsByTagName("link")[0].textContent;
                        // Verificar si tiene submenús
                        const submenu = items[i].getElementsByTagName("submenu");
                        let submenuHTML = "";
                        if (submenu.length > 0) {
                            const subItems = submenu[0].getElementsByTagName("item");
                            for (let j = 0; j < subItems.length; j++) {
                                const subNombre = subItems[j].getElementsByTagName("nombre")[0].textContent;
                                const subLink = subItems[j].getElementsByTagName("link")[0].textContent;
                                submenuHTML += `<li><a class="dropdown-item" href="${subLink}">${subNombre}</a></li>`;
                            }
                        }
                        menuHTML+=`
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="${link}" id="menuRecetas" role="button" >
                                ${nombre}
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="dropdown-${i}">
                                ${submenuHTML}
                            </ul>
                        </li>`;

                    }
                    document.getElementById("menu").innerHTML=menuHTML;
                }
                else {
                    console.error("Error");
                }
            };
            xhr.send();

			