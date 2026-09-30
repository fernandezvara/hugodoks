// hugodoks — "On this page" hide/show toggle, persisted across pages.
// State lives on <html class="hd-toc-hidden"> so the initial state can be
// applied by the head inline script before first paint (no layout shift).
(function () {
  var KEY = "hugodoks-toc";
  var root = document.documentElement;

  function apply(hidden) {
    root.classList.toggle("hd-toc-hidden", hidden);
    document.querySelectorAll(".hd-toc-toggle").forEach(function (btn) {
      btn.setAttribute("aria-expanded", String(!hidden));
    });
  }

  apply(localStorage.getItem(KEY) === "hidden");

  document.addEventListener("click", function (event) {
    if (!event.target.closest(".hd-toc-toggle")) return;
    var hidden = !root.classList.contains("hd-toc-hidden");
    localStorage.setItem(KEY, hidden ? "hidden" : "shown");
    apply(hidden);
  });
})();
