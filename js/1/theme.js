let switchMode = document.getElementById("switchMode");

switchMode.onclick = function () {
    let theme = document.getElementById("theme");

    if (theme.getAttribute("href") == "") {
        theme.href = "dark.css";
    } else {
        theme.href = "light.css";
    }
}