// hugodoks — tab shortcode interaction (ARIA tabs pattern).
(function () {
  document.querySelectorAll(".hd-tabs").forEach(function (tabs) {
    var buttons = tabs.querySelectorAll(".hd-tab");
    var panels = tabs.querySelectorAll(".hd-tabpanel");

    function select(index) {
      buttons.forEach(function (btn, i) {
        btn.setAttribute("aria-selected", String(i === index));
        btn.tabIndex = i === index ? 0 : -1;
      });
      panels.forEach(function (panel, i) {
        panel.hidden = i !== index;
      });
    }

    buttons.forEach(function (btn, i) {
      btn.addEventListener("click", function () { select(i); });
      btn.addEventListener("keydown", function (event) {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
        var delta = event.key === "ArrowRight" ? 1 : -1;
        var next = (i + delta + buttons.length) % buttons.length;
        buttons[next].focus();
        select(next);
      });
    });
  });
})();
