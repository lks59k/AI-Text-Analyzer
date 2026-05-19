# AI Text Analyzer (Chrome Extension)

Extension Chrome qui analyse un texte et donne une estimation IA vs humain.

---

## Fonctionnement

- Colle un texte
- Clique sur Analyze
- Obtiens un score IA / humain
- Visualisation en cercle

---

## Features

- Score IA (0–100%)
- Score humain
- Mode sombre / clair auto
- Animation de chargement
- Détection de patterns simples

---

## Installation

```bash
git clone https://github.com/tonpseudo/ai-text-analyzer.git
```

Puis :

```
chrome://extensions
```

Active “Developer mode” → “Load unpacked”

---

## Structure

```
ai-text-analyzer/
├── manifest.json
├── popup.html
├── popup.css
├── popup.js
├── analyzer.js
└── icons/
```

---

## Logique

Analyse basée sur :
- structure des phrases
- répétitions
- mots typiques IA
- ponctuation

---

## Licence

MIT License

---

## 💖 Donations

Clique sur un bouton pour soutenir le projet 👇

<p align="center">

<a href="https://www.blockchain.com/explorer?search=bc1q5d08s8fwe4k4sercz570rxzesg6gstc37dn58e">
  <img src="https://img.shields.io/badge/Donate-Bitcoin-orange?style=for-the-badge&logo=bitcoin" />
</a>

<a href="https://blockchair.com/litecoin/address/LPQ6tqrGTvPtKs5guQ3qSCG2rtW1ix7u5Z">
  <img src="https://img.shields.io/badge/Donate-Litecoin-blue?style=for-the-badge&logo=litecoin" />
</a>

</p>
