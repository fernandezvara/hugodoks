// hugodoks — light/dark theme toggle persisted in localStorage.
// Respects prefers-color-scheme when no explicit choice was stored.
(function () {
  var KEY = "hugodoks-theme";
  var root = document.documentElement;

  function preferred() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function apply(theme) {
    root.setAttribute("data-theme", theme || preferred());
  }

  apply(localStorage.getItem(KEY));

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
    if (!localStorage.getItem(KEY)) apply(null);
  });

  document.addEventListener("click", function (event) {
    var btn = event.target.closest("#hd-theme-toggle");
    if (!btn) return;
    var current = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    localStorage.setItem(KEY, current);
    apply(current);
  });
})();
