const site = window.SITE;
const $ = (q) => document.querySelector(q);
const make = (tag, cls, text) => {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text !== undefined) node.textContent = text;
  return node;
};

$("#heroIntro").textContent = site.profile.intro;
$("#aboutCopy").textContent = site.profile.about;

for (const [label, value] of site.profile.aboutFacts) {
  const row = make("div", "about-fact");
  row.innerHTML = `<span class="mono">${label}</span><strong>${value}</strong>`;
  $("#aboutFacts").append(row);
}

function visualMarkup(type) {
  if (type === "graph") return `
    <svg viewBox="0 0 400 260" aria-hidden="true">
      <g class="graph-lines">
        <path d="M76 72 L178 48 L268 104 L322 58"/><path d="M76 72 L126 180 L244 206 L268 104"/><path d="M126 180 L268 104"/><path d="M178 48 L244 206"/>
      </g>
      <g class="graph-nodes"><circle cx="76" cy="72" r="8"/><circle cx="178" cy="48" r="6"/><circle cx="268" cy="104" r="10"/><circle cx="322" cy="58" r="5"/><circle cx="126" cy="180" r="7"/><circle cx="244" cy="206" r="6"/></g>
    </svg>`;
  if (type === "route") return `
    <svg viewBox="0 0 400 260" aria-hidden="true">
      <path class="route-path" d="M54 190 C112 190, 98 70, 176 84 S250 210, 346 68"/>
      <circle class="route-node" cx="54" cy="190" r="10"/><circle class="route-node end" cx="346" cy="68" r="10"/>
      <path class="route-arrow" d="M325 61 L347 68 L336 88"/>
    </svg>`;
  if (type === "target") return `
    <div class="reticle" aria-hidden="true"><span></span><span></span><span></span><span></span><i></i></div>
    <div class="target-box" aria-hidden="true"><b>0.94</b></div>`;
  if (type === "peers") return `
    <svg viewBox="0 0 400 260" aria-hidden="true">
      <g class="peer-lines"><path d="M84 130 L200 72 L320 132 L200 200 Z"/><path d="M84 130 L320 132"/><path d="M200 72 L200 200"/></g>
      <g class="peer-nodes"><circle cx="84" cy="130" r="12"/><circle cx="200" cy="72" r="12"/><circle cx="320" cy="132" r="12"/><circle cx="200" cy="200" r="12"/></g>
    </svg>`;
  return `
    <div class="prism-visual" aria-hidden="true">
      <span class="prism-pane one"></span><span class="prism-pane two"></span><span class="prism-pane three"></span>
      <span class="prism-cross x"></span><span class="prism-cross y"></span>
    </div>`;
}

site.projects.forEach((project, index) => {
  const card = make("a", `project-card project-${index + 1}`);
  card.href = project.url;
  card.target = "_blank";
  card.rel = "noreferrer";
  card.style.setProperty("--accent", project.accent);
  card.innerHTML = `
    <div class="project-visual ${project.visual}">${visualMarkup(project.visual)}</div>
    <div class="project-info">
      <div class="project-top mono"><span>${String(index + 1).padStart(2, "0")} / ${project.year}</span><span>${project.kind}</span></div>
      <h3>${project.name}</h3>
      <p>${project.description}</p>
      <div class="project-bottom"><span class="mono">${project.stack.join(" / ")}</span><span class="open-arrow">↗</span></div>
    </div>`;
  $("#projectGrid").append(card);

  card.addEventListener("pointermove", (event) => {
    const r = card.getBoundingClientRect();
    const x = (event.clientX - r.left) / r.width - 0.5;
    const y = (event.clientY - r.top) / r.height - 0.5;
    card.style.setProperty("--rx", `${(-y * 2.5).toFixed(2)}deg`);
    card.style.setProperty("--ry", `${(x * 3.2).toFixed(2)}deg`);
    card.style.setProperty("--mx", `${((x + .5) * 100).toFixed(1)}%`);
    card.style.setProperty("--my", `${((y + .5) * 100).toFixed(1)}%`);
  });
  card.addEventListener("pointerleave", () => {
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  });
});

for (const [name, items] of site.stackGroups) {
  const group = make("section", "stack-group");
  group.innerHTML = `<h3 class="mono">${name}</h3><div class="stack-items">${items.map(i => `<span>${i}</span>`).join("")}</div>`;
  $("#stackGroups").append(group);
}

for (const [name, label, href] of site.links) {
  const link = make("a", "contact-link");
  link.href = href;
  if (href.startsWith("http")) { link.target = "_blank"; link.rel = "noreferrer"; }
  link.innerHTML = `<span class="contact-name">${name}</span><span class="contact-value mono">${label}</span><span class="contact-arrow">↗</span>`;
  $("#linkList").append(link);
}

const reveal = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      reveal.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll(".project-card, .section-head, .about-copy-wrap, .stack-group, .contact-link").forEach(el => reveal.observe(el));

const dot = document.querySelector(".cursor-dot");
if (matchMedia("(pointer:fine)").matches) {
  window.addEventListener("pointermove", e => {
    dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
  document.querySelectorAll("a").forEach(a => {
    a.addEventListener("mouseenter", () => dot.classList.add("hot"));
    a.addEventListener("mouseleave", () => dot.classList.remove("hot"));
  });
}
