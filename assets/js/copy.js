// hugodoks — "Copy" button on code blocks. Progressive enhancement: without
// JS, or without clipboard support, code blocks render as plain blocks.
(function () {
  var labels = document.getElementById("hd-copy-i18n");
  var copyLabel = (labels && labels.dataset.copy) || "Copy";
  var copiedLabel = (labels && labels.dataset.copied) || "Copied";
  var failedLabel = (labels && labels.dataset.failed) || "Copy failed";

  var ICON_COPY = '<svg class="hd-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>';
  var ICON_DONE = '<svg class="hd-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>';

  function codeText(pre) {
    // Line-number tables keep the code in the last cell; inline line
    // numbers (.ln) must not end up in the clipboard.
    var code = pre.querySelector(".lntd:last-child code") || pre.querySelector("code") || pre;
    var clone = code.cloneNode(true);
    clone.querySelectorAll(".ln, .lnt").forEach(function (n) { n.remove(); });
    return clone.textContent.replace(/\n$/, "");
  }

  function fallbackCopy(text) {
    var area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    area.remove();
    return ok ? Promise.resolve() : Promise.reject(new Error("copy failed"));
  }

  function copy(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(function () { return fallbackCopy(text); });
    }
    return fallbackCopy(text);
  }

  document.querySelectorAll(".hd-article pre").forEach(function (pre) {
    var host = pre.parentElement;
    if (!host.classList.contains("highlight") && !host.classList.contains("hd-code")) {
      host = document.createElement("div");
      host.className = "hd-code";
      pre.parentNode.insertBefore(host, pre);
      host.appendChild(pre);
    }
    var button = document.createElement("button");
    button.type = "button";
    button.className = "hd-copy";
    button.setAttribute("aria-label", copyLabel);
    button.title = copyLabel;
    button.innerHTML = ICON_COPY;
    var timer;
    button.addEventListener("click", function () {
      copy(codeText(pre)).then(function () {
        show(ICON_DONE, copiedLabel, "hd-copy--done");
      }, function () {
        show(ICON_COPY, failedLabel, "hd-copy--failed");
      });
    });
    function show(icon, label, cls) {
      clearTimeout(timer);
      button.innerHTML = icon;
      button.title = label;
      button.setAttribute("aria-label", label);
      button.classList.remove("hd-copy--done", "hd-copy--failed");
      button.classList.add(cls);
      status.textContent = label;
      timer = setTimeout(function () {
        button.innerHTML = ICON_COPY;
        button.title = copyLabel;
        button.setAttribute("aria-label", copyLabel);
        button.classList.remove("hd-copy--done", "hd-copy--failed");
        status.textContent = "";
      }, 2000);
    }
    var status = document.createElement("span");
    status.className = "hd-visually-hidden";
    status.setAttribute("role", "status");
    host.appendChild(button);
    host.appendChild(status);
  });
})();
