(function () {
  "use strict";

  class AnalyzerEngine {

    removeCodeBlocks(text) {
      return text
        .replace(/```[\s\S]*?```/g, "")
        .replace(/`.*?`/g, "");
    }

    analyzeText(text) {
      if (typeof text !== "string") return { aiScore: 0, humanScore: 100, patterns: [] };

      const cleaned = this.removeCodeBlocks(text);
      let score = 0;
      const patterns = [];

      const words = cleaned.split(/\s+/);
      const sentences = cleaned.split(/[.!?]+/).filter(s => s.trim().length > 0);
      const avgWordsPerSentence = words.length / Math.max(sentences.length, 1);

      if (avgWordsPerSentence > 20) {
        score += 15;
        patterns.push("Long and structured sentence patterns");
      }

      const formalTransitions = [
        "moreover", "furthermore", "additionally", "overall",
        "in conclusion", "therefore", "however", "specifically"
      ];
      let transitionCount = 0;
      formalTransitions.forEach((word) => {
        if (cleaned.toLowerCase().includes(word)) transitionCount++;
      });
      score += transitionCount * 7;
      if (transitionCount > 2) {
        patterns.push("Frequent formal transition words");
      }

      const wordFrequency = {};
      words.forEach((w) => {
        const lower = w.toLowerCase().replace(/[^a-z]/g, "");
        if (lower.length > 3) {
          wordFrequency[lower] = (wordFrequency[lower] || 0) + 1;
        }
      });
      let repetitionScore = 0;
      Object.values(wordFrequency).forEach((count) => {
        if (count > 8) repetitionScore += 2;
      });
      score += repetitionScore;
      if (repetitionScore > 8) {
        patterns.push("High vocabulary repetition");
      }

      const punctuationMatches = (cleaned.match(/[,;:]/g) || []).length;
      if (punctuationMatches > 15) {
        score += 10;
        patterns.push("Highly structured punctuation usage");
      }

      const aiOpeners = ["This", "These", "It is", "In today", "Artificial intelligence"];
      aiOpeners.forEach((phrase) => {
        if (cleaned.includes(phrase)) score += 5;
      });

      score = Math.min(Math.max(Math.floor(score), 0), 100);

      if (patterns.length === 0) {
        patterns.push("Natural writing variation detected");
      }

      return {
        aiScore: score,
        humanScore: 100 - score,
        patterns,
      };
    }
  }

  window.AnalyzerEngine = new AnalyzerEngine();
})();