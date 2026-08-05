const lenses = {
  energy: {
    kicker: "ENERGY · OPERATING COST",
    title: "Efficiency is one part of the operating point.",
    copy: "The operating choices that reduce energy also affect compute quality and the behavior exposed to an attacker."
  },
  accuracy: {
    kicker: "ACCURACY · INFERENCE QUALITY",
    title: "Compute quality links the three objectives.",
    copy: "The same hardware conditions that shape efficient inference also influence model accuracy and extraction exposure."
  },
  security: {
    kicker: "SECURITY · MODEL EXPOSURE",
    title: "Accessible outputs create an attack surface.",
    copy: "Repeated queries can reveal useful information about the stored model, so security must be considered with energy and accuracy."
  }
};

document.querySelectorAll("[data-lens]").forEach((button) => {
  button.addEventListener("click", () => {
    const lens = lenses[button.dataset.lens];
    document.querySelectorAll("[data-lens]").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    document.querySelector("#lens-kicker").textContent = lens.kicker;
    document.querySelector("#lens-title").textContent = lens.title;
    document.querySelector("#lens-copy").textContent = lens.copy;
  });
});

const attacks = {
  bv: {
    tab: "attack-bv",
    number: "ATTACK 01",
    title: "Probe one coordinate at a time.",
    description: "Basis-vector inputs isolate individual stored weights. Repeated observations estimate the output statistic and a threshold maps the estimate back to a weight value.",
    signal: "Per-weight output statistic",
    operation: "Threshold detection",
    role: "Simple statistical baseline"
  },
  ls: {
    tab: "attack-ls",
    number: "ATTACK 02",
    title: "Fit all weights with a linear model.",
    description: "Least-squares attack queries the IMC with a collection of input vectors, then estimates the stored weight vector by minimizing output reconstruction error.",
    signal: "Input-output query matrix",
    operation: "Closed-form least squares",
    role: "Efficient linear recovery"
  },
  sgd: {
    tab: "attack-sgd",
    number: "ATTACK 03",
    title: "Optimize through nonlinear chip behavior.",
    description: "The SGD attack learns weights by minimizing expected output error through a nonlinear behavioral model, allowing it to account for more of the IMC response.",
    signal: "Batched input-output pairs",
    operation: "Iterative nonlinear optimization",
    role: "Strongest evaluated attack"
  }
};

const attackButtons = [...document.querySelectorAll("[data-attack]")];
attackButtons.forEach((button, index) => {
  button.addEventListener("click", () => selectAttack(button.dataset.attack));
  button.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let next = index;
    if (event.key === "ArrowLeft") next = (index - 1 + attackButtons.length) % attackButtons.length;
    if (event.key === "ArrowRight") next = (index + 1) % attackButtons.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = attackButtons.length - 1;
    attackButtons[next].focus();
    selectAttack(attackButtons[next].dataset.attack);
  });
});

function selectAttack(name) {
  const attack = attacks[name];
  attackButtons.forEach((button) => button.setAttribute("aria-selected", String(button.dataset.attack === name)));
  const panel = document.querySelector("#attack-detail");
  panel.setAttribute("aria-labelledby", attack.tab);
  document.querySelector("#attack-number").textContent = attack.number;
  document.querySelector("#attack-title").textContent = attack.title;
  document.querySelector("#attack-description").textContent = attack.description;
  document.querySelector("#attack-signal").textContent = attack.signal;
  document.querySelector("#attack-operation").textContent = attack.operation;
  document.querySelector("#attack-role").textContent = attack.role;
}

const technologies = {
  mram: {
    tab: "tech-mram",
    kicker: "MRAM · MEASURED + MODELED",
    title: "Lower conductance contrast limits compute SNDR.",
    description: "The measured prototype shows that lower-SNDR settings reduce attack efficacy, but also move the system away from fixed-point inference accuracy.",
    fidelity: "Lower",
    exposure: "Lower than ReRAM and FeFET",
    evidence: "Measured chip + behavioral model",
    image: "assets/figures/mram-tradeoff.png",
    alt: "Modeled three-dimensional MRAM energy, accuracy, and security trade-off.",
    caption: "Modeled MRAM EAS surface for the SGD attack."
  },
  reram: {
    tab: "tech-reram",
    kicker: "RERAM · SILICON-VALIDATED MODEL",
    title: "Higher compute fidelity expands the attack surface.",
    description: "The modeled ReRAM design space reaches higher SNDR and network accuracy, while the TCAD study finds greater susceptibility to model extraction than MRAM.",
    fidelity: "Higher",
    exposure: "Higher than MRAM",
    evidence: "Behavioral model validated to silicon",
    image: "assets/figures/reram-tradeoff.png",
    alt: "Modeled three-dimensional ReRAM energy, accuracy, and security trade-off.",
    caption: "Modeled ReRAM EAS surface for the SGD attack."
  },
  fefet: {
    tab: "tech-fefet",
    kicker: "FEFET · SILICON-VALIDATED MODEL",
    title: "Strong conductance contrast also increases exposure.",
    description: "FeFET can support higher-fidelity operating regions, but the same fidelity makes model-extraction defenses more important in the TCAD analysis.",
    fidelity: "Higher",
    exposure: "Higher than MRAM",
    evidence: "Behavioral model validated to silicon",
    image: "assets/figures/fefet-tradeoff.png",
    alt: "Modeled three-dimensional FeFET energy, accuracy, and security trade-off.",
    caption: "Modeled FeFET EAS surface for the SGD attack."
  }
};

const technologyButtons = [...document.querySelectorAll("[data-technology]")];
technologyButtons.forEach((button, index) => {
  button.addEventListener("click", () => selectTechnology(button.dataset.technology));
  button.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let next = index;
    if (event.key === "ArrowLeft") next = (index - 1 + technologyButtons.length) % technologyButtons.length;
    if (event.key === "ArrowRight") next = (index + 1) % technologyButtons.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = technologyButtons.length - 1;
    technologyButtons[next].focus();
    selectTechnology(technologyButtons[next].dataset.technology);
  });
});

function selectTechnology(name) {
  const technology = technologies[name];
  technologyButtons.forEach((button) => button.setAttribute("aria-selected", String(button.dataset.technology === name)));
  const panel = document.querySelector("#technology-panel");
  panel.setAttribute("aria-labelledby", technology.tab);
  document.querySelector("#technology-kicker").textContent = technology.kicker;
  document.querySelector("#technology-title").textContent = technology.title;
  document.querySelector("#technology-description").textContent = technology.description;
  document.querySelector("#technology-fidelity").textContent = technology.fidelity;
  document.querySelector("#technology-exposure").textContent = technology.exposure;
  document.querySelector("#technology-evidence").textContent = technology.evidence;
  const image = document.querySelector("#technology-image");
  image.src = technology.image;
  image.alt = technology.alt;
  document.querySelector("#technology-caption").textContent = technology.caption;
}

const citations = {
  iedm: "S. K. Roy and N. R. Shanbhag, ‘The Energy-Accuracy-Security Trade-off in Resistive In-memory Architectures,’ 2024 IEEE International Electron Devices Meeting (IEDM), 2024, doi: 10.1109/IEDM50854.2024.10873582.",
  iccad: "S. K. Roy and N. R. Shanbhag, ‘On the Security Vulnerabilities of MRAM-based In-Memory Computing Architectures against Model Extraction Attacks,’ 2024 IEEE/ACM International Conference on Computer-Aided Design (ICCAD), 2024, doi: 10.1145/3676536.3676685.",
  tcad: "S. K. Roy and N. R. Shanbhag, ‘Comprehending the Energy-Accuracy-Security Trade-offs in Embedded Non-Volatile In-Memory Computing Architectures,’ IEEE Transactions on Computer-Aided Design of Integrated Circuits and Systems, 2026, doi: 10.1109/TCAD.2026.3711060."
};

document.querySelectorAll("[data-copy-citation]").forEach((button) => {
  button.addEventListener("click", async () => {
    const original = "Copy citation";
    try {
      await navigator.clipboard.writeText(citations[button.dataset.copyCitation]);
      button.textContent = "Citation copied";
    } catch {
      button.textContent = "Copy unavailable";
    }
    window.setTimeout(() => { button.textContent = original; }, 1800);
  });
});

const menuButton = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");
menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.textContent = open ? "Close" : "Menu";
  siteNav.classList.toggle("open", open);
  document.body.classList.toggle("menu-open", open);
});

function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.textContent = "Menu";
  siteNav.classList.remove("open");
  document.body.classList.remove("menu-open");
}

siteNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
