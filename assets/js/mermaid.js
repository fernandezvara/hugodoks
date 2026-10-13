// hugodoks — Mermaid init. Concatenated after mermaid.min.js by body-end.html
// only on pages that contain mermaid code blocks (see
// layouts/_markup/render-codeblock-mermaid.html). Re-renders when the
// light/dark data-theme flips.
(function () {
  if (typeof mermaid === "undefined") return;

  var diagrams = Array.prototype.slice.call(document.querySelectorAll("pre.mermaid"));
  if (!diagrams.length) return;

  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "default";
  }

  // Stash the original source so diagrams can be re-rendered on theme
  // changes and the copy button keeps copying the source, not the SVG.
  diagrams.forEach(function (el) {
    if (!el.dataset.mermaidSource) el.dataset.mermaidSource = el.textContent.trim();
  });

  var theme = currentTheme();
  mermaid.initialize({ startOnLoad: false, theme: theme, securityLevel: "strict" });

  function render() {
    return mermaid.run({ nodes: diagrams });
  }

  // Re-render when the theme toggles: restore source, clear the processed
  // flag, then run again with the new theme.
  new MutationObserver(function () {
    var next = currentTheme();
    if (next === theme) return;
    theme = next;
    diagrams.forEach(function (el) {
      el.removeAttribute("data-processed");
      el.textContent = el.dataset.mermaidSource;
    });
    mermaid.initialize({ startOnLoad: false, theme: theme, securityLevel: "strict" });
    render();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  render();
})();
