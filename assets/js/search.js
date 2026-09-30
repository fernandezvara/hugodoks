// hugodoks — client-side search backed by a FlexSearch index generated
// at build time (index.json). Open with Ctrl/Cmd+K or the navbar button.
(function () {
  var dialog = document.getElementById("hd-search-dialog");
  var input = document.getElementById("hd-search-input");
  var list = document.getElementById("hd-search-results");
  var empty = document.getElementById("hd-search-empty");
  var trigger = document.getElementById("hd-search-open");
  if (!dialog || !input || !list || !trigger || typeof FlexSearch === "undefined") return;

  var index = null;
  var docs = [];

  function load() {
    if (index) return Promise.resolve();
    return fetch("/index.json")
      .then(function (r) { return r.json(); })
      .then(function (data) {
        docs = data;
        index = new FlexSearch.Index({ tokenize: "forward" });
        data.forEach(function (doc, i) {
          index.add(i, doc.title + " " + doc.section + " " + doc.content);
        });
      })
      .catch(function () { index = null; });
  }

  function render(results) {
    list.innerHTML = "";
    empty.hidden = results.length > 0;
    results.forEach(function (doc, i) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = doc.url;
      a.setAttribute("role", "option");
      a.setAttribute("aria-selected", i === 0 ? "true" : "false");
      var section = document.createElement("span");
      section.className = "hd-search-section";
      section.textContent = doc.section || "";
      a.appendChild(section);
      a.appendChild(document.createTextNode(doc.title));
      li.appendChild(a);
      list.appendChild(li);
    });
  }

  function run() {
    if (!index) return;
    var ids = index.search(input.value.trim(), { limit: 15 });
    render(ids.map(function (id) { return docs[id]; }));
  }

  function open() {
    load().then(function () {
      dialog.showModal();
      input.focus();
      input.select();
      run();
    });
  }

  trigger.addEventListener("click", open);
  document.addEventListener("keydown", function (event) {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      open();
    }
  });

  input.addEventListener("input", run);
  input.addEventListener("keydown", function (event) {
    var links = list.querySelectorAll("a");
    var current = -1;
    links.forEach(function (a, i) {
      if (a.getAttribute("aria-selected") === "true") current = i;
    });
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      var next = event.key === "ArrowDown" ? current + 1 : current - 1;
      if (next < 0) next = links.length - 1;
      if (next >= links.length) next = 0;
      links.forEach(function (a, i) {
        a.setAttribute("aria-selected", String(i === next));
      });
      if (links[next]) links[next].scrollIntoView({ block: "nearest" });
    } else if (event.key === "Enter" && current >= 0) {
      event.preventDefault();
      links[current].click();
    }
  });

  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) dialog.close();
  });
})();
