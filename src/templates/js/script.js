//- ODS Custom Theme
//- Sidebar Menu / Sidebar Help Hub
var helpHubSidebar  = "ods-helphub"
    menuSidebar     = "ods-sidebar"
    helpHubActive   = "ods-helphub--active"
    menuActive      = "ods-sidebar--active"
    btnHelpHub      = "helphub-button"
    btnMenu         = "sidebar-button"
    headerBtnActive = "ods-header__btn--active";

function toggle (a, b, c, d, e) {
    if (e == 0) {
        document.getElementsByClassName(a)[0].classList.add(b);
        document.getElementById(c).classList.add(d);
    } else if (e == 1) {
        document.getElementsByClassName(a)[0].classList.remove(b);
        document.getElementById(c).classList.remove(d);
    }
}

function toggleHelpHub() {
    var sidebar = document.getElementsByClassName(helpHubSidebar)[0].className
        menu    = document.getElementsByClassName(menuSidebar)[0].className;
    
    if (sidebar.includes(helpHubActive) && !menu.includes(menuActive)) {
        toggle(helpHubSidebar, helpHubActive, btnHelpHub, headerBtnActive, 1);
    } else if (!sidebar.includes(helpHubActive) && menu.includes(menuActive)) {
        toggle(helpHubSidebar, helpHubActive, btnHelpHub, headerBtnActive, 0);
        toggle(menuSidebar, menuActive, btnMenu, headerBtnActive, 1);
    } else if (!sidebar.includes(helpHubActive) && !menu.includes(menuActive)) {
        toggle(helpHubSidebar, helpHubActive, btnHelpHub, headerBtnActive, 0);
    }
}

//- Resize sidebar
function resizeSidebar() {
    var contentHeight = document.getElementById("content-principal").offsetHeight
        sidebarHeight = document.getElementById('sidebar-nav').offsetHeight;

    if (sidebarHeight < contentHeight) {
        document.getElementById("sidebar-nav").style.height = contentHeight + "px";
    }
}

function toggleMenu() {
    resizeSidebar();

    var sidebar = document.getElementsByClassName(helpHubSidebar)[0].className
        menu    = document.getElementsByClassName(menuSidebar)[0].className;

    if (!menu.includes(menuActive) && !sidebar.includes(helpHubActive)) {
        toggle(menuSidebar, menuActive, btnMenu, headerBtnActive, 0);
    } else if (!menu.includes(menuActive) && sidebar.includes(helpHubActive)) {
        toggle(menuSidebar, menuActive, btnMenu, headerBtnActive, 0);
        toggle(helpHubSidebar, helpHubActive, btnHelpHub, headerBtnActive, 1);
    } else if (menu.includes(menuActive) && !sidebar.includes(helpHubActive)) {
        toggle(menuSidebar, menuActive, btnMenu, headerBtnActive, 1);
    }
}

//- Activ link in sidebar help hub (widgets / tutorial widgets)
var itemActiv = "ods-header__nav-item--active"
    widgets   = document.getElementById("link_widgets")
    tutorial  = document.getElementById("link_tutorial");

function toggleLinkActiv(a, b, c) {
    if (!a.className.includes(c)) {
        a.classList.add(c);
        b.parentElement.classList.remove(c);
    }
}

function toggleLinkHelpHub(a) {
    if (event.target.id == "link_widgets") {
        toggleLinkActiv(event.target.parentElement, tutorial, itemActiv);
    } else if (event.target.id == "link_tutorial") {
        toggleLinkActiv(event.target.parentElement, widgets, itemActiv);
    }
}

function assignHelpHubActiv() {
    var url = window.location.href.split("#")[1];
    
    if (url == "/api") widgets.parentElement.classList.add(itemActiv);
    else if (url == "/tutorial") tutorial.parentElement.classList.add(itemActiv);
}

(function () { 

    document.body.addEventListener("click", function (event) {
        if (event.target.className.includes("ng-binding")) {
            toggle(menuSidebar, menuActive, btnMenu, headerBtnActive, 1);
        }
        if (event.target.id.includes('link_widgets') ||
            event.target.id.includes('link_tutorial')) {
            toggleLinkHelpHub(event.target);
        }
    });

    assignHelpHubActiv();

})();