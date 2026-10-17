// hugodoks — docs sidebar open/closed state persisted in localStorage.
// Each <details> carries data-hd-nav="<relpermalink>" as its storage key.
// Ancestors of the current page are always forced open on restore so the
// active page stays visible even if the folder was collapsed earlier.
(function () {
  var KEY = "hugodoks-nav";

  var nav = document.querySelector(".hd-nav");
  if (!nav) return;

  var stored;
  try {
    stored = JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch (e) {
    stored = {};
  }

  var details = nav.querySelectorAll("details[data-hd-nav]");

  // restore the user's stored state (server-rendered `open` is the default
  // for sections without a stored value)
  details.forEach(function (d) {
    var key = d.getAttribute("data-hd-nav");
    if (Object.prototype.hasOwnProperty.call(stored, key)) {
      d.open = stored[key];
    }
  });

  // force-open ancestors of the current page. This does not write to
  // storage — the stored value keeps the user's last manual choice so the
  // folder collapses back when navigating elsewhere.
  var active = nav.querySelector('a[aria-current="page"]');
  if (active) {
    for (var d = active.closest("details"); d; d = d.parentElement.closest("details")) {
      d.open = true;
    }
  }

  // the caret lives inside the section link: clicking it toggles the group
  // instead of navigating. preventDefault stops the link; the manual `open`
  // flip fires the toggle listener below, which persists the state.
  details.forEach(function (d) {
    var caret = d.querySelector(".hd-nav-caret");
    if (!caret) return;
    caret.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      d.open = !d.open;
    });
  });

  // attach listeners AFTER restoring so programmatic `open` writes don't
  // persist — only user toggles are stored
  details.forEach(function (d) {
    d.addEventListener("toggle", function () {
      stored[d.getAttribute("data-hd-nav")] = d.open;
      localStorage.setItem(KEY, JSON.stringify(stored));
    });
  });
})();
