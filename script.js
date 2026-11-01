// PLAN MY TRIP BUTTON - opens the trip planning form
function planTrip() {
    window.location.href = "contact-us.html#plan";
}
function validEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
function showMsg(id, text, ok) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = text;
    el.className = "msg " + (ok ? "ok" : "error");
}
// NEWSLETTER BUTTON
function joinNewsletter() {
    const email = document.getElementById("email").value.trim();
    if (!validEmail(email)) {
        showMsg("newsletter-msg", "Please enter a valid email address.", false);
        return;
    }
    showMsg("newsletter-msg", "Thank you for joining our newsletter!", true);
    document.getElementById("email").value = "";
}
// CONTACT / TRIP PLANNER FORM
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    if (!form) return;
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("contact-email").value.trim();
        const message = document.getElementById("message").value.trim();
        if (name === "" || message === "") {
            showMsg("form-msg", "Please fill in your name and message.", false);
        } else if (!validEmail(email)) {
            showMsg("form-msg", "Please enter a valid email address.", false);
        } else {
            showMsg("form-msg", "Thanks " + name + "! Your message has been received.", true);
            form.reset();
        }
    });
});
// FILTER ACTIVITIES (Things to Do page)
function showActivities(category, selectedButton) {
    document.querySelectorAll(".activity-card").forEach(function (card) {
        card.style.display = (category === "all" || card.dataset.category === category) ? "" : "none";
    });
    document.querySelectorAll(".activity-buttons button").forEach(function (b) {
        b.classList.remove("active");
    });
    selectedButton.classList.add("active");
}
// GOOGLE TRANSLATOR
function googleTranslateElementInit() {
    new google.translate.TranslateElement({ pageLanguage: "en" }, "google_translate_element");
}
// TEXT SIZE CONTROLS
let textScale = 1;
function changeTextSize(change) {
    textScale += change * 0.1;
    if (textScale < 0.8) textScale = 0.8;
    if (textScale > 1.4) textScale = 1.4;
    document.querySelectorAll("body *:not(script):not(style)").forEach(function (element) {
        if (!element.dataset.originalFontSize) {
            element.dataset.originalFontSize = parseFloat(getComputedStyle(element).fontSize);
        }
        element.style.fontSize = (parseFloat(element.dataset.originalFontSize) * textScale) + "px";
    });
}
// DARK / LIGHT MODE
function applyMode(dark) {
    document.body.classList.toggle("dark", dark);
    const btn = document.getElementById("modeBtn");
    if (btn) {
        btn.innerHTML = dark ? "&#9728; Light" : "&#9790; Dark";
        btn.setAttribute("aria-pressed", dark ? "true" : "false");
    }
}
function toggleMode() {
    const dark = !document.body.classList.contains("dark");
    applyMode(dark);
    try { localStorage.setItem("mode", dark ? "dark" : "light"); } catch (e) { }
}
(function () {
    let saved = null;
    try { saved = localStorage.getItem("mode"); } catch (e) { }
    applyMode(saved === "dark");
})();