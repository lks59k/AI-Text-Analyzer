(function () {
  "use strict";

  const translations = {
    fr: {
      headerSubtitle: "Collez du texte et détectez les motifs IA",
      patternsTitle: "Modèles détectés",
      aiLabel: "IA",
      analyzingText: "Analyse des motifs d'écriture...",
      analyzeBtn: "Analyser",
      placeholder: "Collez votre texte ici...",
      footer: "By - 3vox.fr",
      noText: "Veuillez coller du texte.",
      minChars: "Minimum 20 caractères requis.",
      spam: "Analyse en cours, veuillez attendre...",
    },
    en: {
      headerSubtitle: "Paste text and detect AI patterns",
      patternsTitle: "Detected Patterns",
      aiLabel: "AI",
      analyzingText: "Analyzing writing patterns...",
      analyzeBtn: "Analyze",
      placeholder: "Paste your text here...",
      footer: "By - 3vox.fr",
      noText: "Please paste some text.",
      minChars: "Minimum 20 characters required.",
      spam: "Analysis in progress, please wait...",
    },
    es: {
      headerSubtitle: "Pegue texto y detecte patrones de IA",
      patternsTitle: "Patrones detectados",
      aiLabel: "IA",
      analyzingText: "Analizando patrones de escritura...",
      analyzeBtn: "Analizar",
      placeholder: "Pegue su texto aquí...",
      footer: "By - 3vox.fr",
      noText: "Por favor pegue algo de texto.",
      minChars: "Se requieren mínimo 20 caracteres.",
      spam: "Análisis en progreso, espere...",
    },
    de: {
      headerSubtitle: "Text einfügen und KI-Muster erkennen",
      patternsTitle: "Erkannte Muster",
      aiLabel: "KI",
      analyzingText: "Schreibmuster werden analysiert...",
      analyzeBtn: "Analysieren",
      placeholder: "Text hier einfügen...",
      footer: "By - 3vox.fr",
      noText: "Bitte geben Sie etwas Text ein.",
      minChars: "Mindestens 20 Zeichen erforderlich.",
      spam: "Analyse läuft, bitte warten...",
    },
    it: {
      headerSubtitle: "Incolla il testo e rileva i modelli di IA",
      patternsTitle: "Modelli rilevati",
      aiLabel: "IA",
      analyzingText: "Analisi dei modelli di scrittura...",
      analyzeBtn: "Analizza",
      placeholder: "Incolla il tuo testo qui...",
      footer: "By - 3vox.fr",
      noText: "Incolla un po' di testo.",
      minChars: "Minimo 20 caratteri richiesti.",
      spam: "Analisi in corso, attendere...",
    },
    pt: {
      headerSubtitle: "Cole o texto e detecte padrões de IA",
      patternsTitle: "Padrões detectados",
      aiLabel: "IA",
      analyzingText: "Analisando padrões de escrita...",
      analyzeBtn: "Analisar",
      placeholder: "Cole seu texto aqui...",
      footer: "By - 3vox.fr",
      noText: "Cole algum texto.",
      minChars: "Mínimo 20 caracteres necessários.",
      spam: "Análise em progresso, aguarde...",
    },
  };

  function getLang() {
    const code = (navigator.language || "en").substring(0, 2).toLowerCase();
    return translations[code] ? code : "en";
  }

  function t(key) {
    return translations[getLang()][key] || translations["en"][key] || "";
  }

  function show(el, displayType) {
    el.style.display = displayType || "block";
  }

  function hide(el) {
    el.style.display = "none";
  }

  const CIRCUMFERENCE = 2 * Math.PI * 70;
  let isAnalyzing = false;

  const btn          = document.getElementById("analyzeBtn");
  const inp          = document.getElementById("textInput");
  const loadSection  = document.getElementById("loadingSection");
  const loader       = document.querySelector(".loader");
  const resultSection = document.getElementById("resultSection");
  const scoreText    = document.getElementById("scoreText");
  const analysisList = document.getElementById("analysisList");
  const ring         = document.getElementById("aiRing");
  const errDiv       = document.getElementById("validationError");

  ring.style.strokeDasharray = CIRCUMFERENCE;
  ring.style.strokeDashoffset = CIRCUMFERENCE;

  hide(loadSection);
  hide(resultSection);
  hide(errDiv);

  function showError(msg) {
    errDiv.textContent = msg;
    show(errDiv);
    setTimeout(() => hide(errDiv), 3500);
  }

  function setRingProgress(percent) {
    ring.style.strokeDashoffset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;
  }

  function animateScore(target) {
    let current = 0;
    scoreText.textContent = "0%";
    setRingProgress(0);
    const interval = setInterval(() => {
      if (current >= target) {
        clearInterval(interval);
        scoreText.textContent = target + "%";
        setRingProgress(target);
        return;
      }
      scoreText.textContent = current + "%";
      setRingProgress(current);
      current++;
    }, 18);
  }

  function initI18n() {
    document.getElementById("headerSubtitle").textContent = t("headerSubtitle");
    document.getElementById("patternsTitle").textContent  = t("patternsTitle");
    document.getElementById("aiLabel").textContent        = t("aiLabel");
    document.getElementById("analyzingText").textContent  = t("analyzingText");
    document.getElementById("analyzeBtn").textContent     = t("analyzeBtn");
    document.getElementById("footer").textContent         = t("footer");
    inp.setAttribute("placeholder", t("placeholder"));
  }

  btn.addEventListener("click", () => {
    if (isAnalyzing) { showError(t("spam")); return; }

    const text = inp.value.trim();
    if (!text) { showError(t("noText")); return; }
    if (text.length < 20) { showError(t("minChars")); return; }

    isAnalyzing = true;
    btn.disabled = true;
    hide(resultSection);
    loader.classList.add("spinning");
    show(loadSection, "flex");

    const delay = 1800 + Math.random() * 2000;

    setTimeout(() => {
      const result = window.AnalyzerEngine.analyzeText(text);

      loader.classList.remove("spinning");
      hide(loadSection);
      show(resultSection);

      analysisList.textContent = "";
      result.patterns.forEach((pattern) => {
        const li = document.createElement("li");
        li.textContent = pattern;
        analysisList.appendChild(li);
      });

      animateScore(result.aiScore);

      isAnalyzing = false;
      btn.disabled = false;
    }, delay);
  });

  initI18n();
})();