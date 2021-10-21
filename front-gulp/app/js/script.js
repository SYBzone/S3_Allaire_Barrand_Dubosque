
    function myFunction(x) {
    if (x.matches) { // If media query matches
    document.getElementById('menu-desktop-conteneur').classList.remove("stop-menu")
    document.getElementById('titre').classList.remove("stop-menu")
} else {
    document.getElementById('menu-desktop-conteneur').classList.add("stop-menu")
    document.getElementById('titre').classList.add("stop-menu")
}
}

    var x = window.matchMedia("(min-width: 800px)")
    myFunction(x) // Call listener function at run time
    x.addListener(myFunction) // Attach listener function on state changes
