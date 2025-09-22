class WordCounter {
  constructor() {
    this.textInput = document.getElementById('text-input');
    this.initializeElements();
    this.initializeEventListeners();
    this.initializeTabs();
    this.commonWords = this.getCommonWords();
    
    // Initial analysis
    this.analyzeText();
  }

  initializeElements() {
    // Basic stats elements
    this.wordCountEl = document.getElementById('word-count');
    this.charCountEl = document.getElementById('char-count');
    this.charNoSpacesEl = document.getElementById('char-no-spaces');
    this.paragraphCountEl = document.getElementById('paragraph-count');
    this.readingTimeEl = document.getElementById('reading-time');
    this.speakingTimeEl = document.getElementById('speaking-time');

    // Social media elements
    this.twitterCharsEl = document.getElementById('twitter-chars');
    this.twitterProgressEl = document.getElementById('twitter-progress');
    this.facebookCharsEl = document.getElementById('facebook-chars');
    this.facebookProgressEl = document.getElementById('facebook-progress');
    this.instagramCharsEl = document.getElementById('instagram-chars');
    this.instagramProgressEl = document.getElementById('instagram-progress');
    this.linkedinCharsEl = document.getElementById('linkedin-chars');
    this.linkedinProgressEl = document.getElementById('linkedin-progress');

    // Detailed analysis elements
    this.avgWordsSentenceEl = document.getElementById('avg-words-sentence');
    this.avgCharsWordEl = document.getElementById('avg-chars-word');
    this.sentenceCountEl = document.getElementById('sentence-count');
    this.uniqueWordsEl = document.getElementById('unique-words');
    this.readabilityFillEl = document.getElementById('readability-fill');
    this.readabilityScoreEl = document.getElementById('readability-score');
    this.diversityFillEl = document.getElementById('diversity-fill');
    this.diversityScoreEl = document.getElementById('diversity-score');

    // Keywords elements
    this.keywordsListEl = document.getElementById('keywords-list');
    this.ignoreCommonEl = document.getElementById('ignore-common');
    this.minLengthEl = document.getElementById('min-length');

    // Action buttons
    this.clearBtn = document.getElementById('clear-text');
    this.copyBtn = document.getElementById('copy-text');
    this.pasteBtn = document.getElementById('paste-text');
  }

  initializeEventListeners() {
    // Text analysis
    this.textInput.addEventListener('input', () => this.analyzeText());
    this.textInput.addEventListener('paste', () => {
      setTimeout(() => this.analyzeText(), 10);
    });

    // Action buttons
    this.clearBtn.addEventListener('click', () => this.clearText());
    this.copyBtn.addEventListener('click', () => this.copyText());
    this.pasteBtn.addEventListener('click', () => this.pasteText());

    // Keywords controls
    this.ignoreCommonEl.addEventListener('change', () => this.updateKeywords());
    this.minLengthEl.addEventListener('change', () => this.updateKeywords());
  }

  initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetTab = button.dataset.tab;

        // Remove active class from all tabs and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked tab and corresponding content
        button.classList.add('active');
        document.getElementById(`${targetTab}-tab`).classList.add('active');
      });
    });
  }

  analyzeText() {
    const text = this.textInput.value;
    
    // Basic stats
    const basicStats = this.getBasicStats(text);
    this.updateBasicStats(basicStats);

    // Social media limits
    this.updateSocialMediaStats(basicStats.charCount);

    // Detailed analysis
    const detailedStats = this.getDetailedStats(text);
    this.updateDetailedStats(detailedStats);

    // Keywords analysis
    this.updateKeywords();
  }

  getBasicStats(text) {
    const charCount = text.length;
    const charNoSpaces = text.replace(/\s/g, '').length;
    
    // Word count (more accurate)
    const words = text.trim() === '' ? [] : 
      text.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;

    // Paragraph count
    const paragraphs = text.trim() === '' ? 0 : 
      text.trim().split(/\n\s*\n/).filter(p => p.trim().length > 0).length;

    // Reading time (average 200 words per minute)
    const readingTime = Math.ceil(wordCount / 200);

    // Speaking time (average 150 words per minute)
    const speakingTime = Math.ceil(wordCount / 150);

    return {
      wordCount,
      charCount,
      charNoSpaces,
      paragraphs,
      readingTime,
      speakingTime,
      words
    };
  }

  updateBasicStats(stats) {
    this.wordCountEl.textContent = stats.wordCount.toLocaleString();
    this.charCountEl.textContent = stats.charCount.toLocaleString();
    this.charNoSpacesEl.textContent = stats.charNoSpaces.toLocaleString();
    this.paragraphCountEl.textContent = stats.paragraphs.toLocaleString();
    
    const readingText = stats.readingTime <= 1 ? '< 1 min' : `${stats.readingTime} min`;
    const speakingText = stats.speakingTime <= 1 ? '< 1 min' : `${stats.speakingTime} min`;
    
    this.readingTimeEl.textContent = readingText;
    this.speakingTimeEl.textContent = speakingText;
  }

  updateSocialMediaStats(charCount) {
    // Twitter (280 characters)
    this.updateSocialPlatform('twitter', charCount, 280);
    
    // Facebook (63,206 characters)
    this.updateSocialPlatform('facebook', charCount, 63206);
    
    // Instagram (2,200 characters)
    this.updateSocialPlatform('instagram', charCount, 2200);
    
    // LinkedIn (3,000 characters)
    this.updateSocialPlatform('linkedin', charCount, 3000);
  }

  updateSocialPlatform(platform, charCount, limit) {
    const countEl = document.getElementById(`${platform}-chars`);
    const progressEl = document.getElementById(`${platform}-progress`);
    
    const percentage = Math.min((charCount / limit) * 100, 100);
    const remaining = Math.max(limit - charCount, 0);
    
    countEl.textContent = `${charCount.toLocaleString()}/${limit.toLocaleString()}`;
    progressEl.style.width = `${percentage}%`;
    
    // Color coding based on usage
    if (percentage <= 70) {
      progressEl.style.background = '#51cf66'; // Green
    } else if (percentage <= 90) {
      progressEl.style.background = '#ffd43b'; // Yellow
    } else {
      progressEl.style.background = '#ff6b6b'; // Red
    }
    
    // Add warning class if over limit
    const card = countEl.closest('.social-card');
    if (charCount > limit) {
      card.style.borderLeftColor = '#ff6b6b';
      countEl.style.color = '#ff6b6b';
    } else {
      card.style.borderLeftColor = '';
      countEl.style.color = '#ffffff';
    }
  }

  getDetailedStats(text) {
    const words = text.trim() === '' ? [] : 
      text.trim().split(/\s+/).filter(word => word.length > 0);
    
    // Sentences (split by .!? followed by space or end of text)
    const sentences = text.trim() === '' ? [] : 
      text.trim().split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    const sentenceCount = sentences.length;
    const wordCount = words.length;
    
    // Average words per sentence
    const avgWordsPerSentence = sentenceCount > 0 ? 
      (wordCount / sentenceCount).toFixed(1) : 0;
    
    // Average characters per word
    const totalChars = words.join('').length;
    const avgCharsPerWord = wordCount > 0 ? 
      (totalChars / wordCount).toFixed(1) : 0;
    
    // Unique words
    const uniqueWords = new Set(words.map(word => 
      word.toLowerCase().replace(/[^\w]/g, '')
    )).size;
    
    // Readability score (simplified - based on sentence and word length)
    const readabilityScore = this.calculateReadabilityScore(
      avgWordsPerSentence, avgCharsPerWord
    );
    
    // Diversity score (unique words / total words)
    const diversityScore = wordCount > 0 ? 
      Math.round((uniqueWords / wordCount) * 100) : 0;

    return {
      sentenceCount,
      avgWordsPerSentence,
      avgCharsPerWord,
      uniqueWords,
      readabilityScore,
      diversityScore
    };
  }

  calculateReadabilityScore(avgWordsPerSentence, avgCharsPerWord) {
    // Simplified readability calculation
    // Ideal: 15-20 words per sentence, 4-5 chars per word
    const sentenceScore = Math.max(0, 100 - Math.abs(17.5 - avgWordsPerSentence) * 4);
    const wordScore = Math.max(0, 100 - Math.abs(4.5 - avgCharsPerWord) * 15);
    
    return Math.round((sentenceScore + wordScore) / 2);
  }

  updateDetailedStats(stats) {
    this.avgWordsSentenceEl.textContent = stats.avgWordsPerSentence;
    this.avgCharsWordEl.textContent = stats.avgCharsPerWord;
    this.sentenceCountEl.textContent = stats.sentenceCount.toLocaleString();
    this.uniqueWordsEl.textContent = stats.uniqueWords.toLocaleString();
    
    // Update readability
    this.readabilityFillEl.style.width = `${stats.readabilityScore}%`;
    this.readabilityScoreEl.textContent = `${stats.readabilityScore}%`;
    
    // Update diversity
    this.diversityFillEl.style.width = `${stats.diversityScore}%`;
    this.diversityScoreEl.textContent = `${stats.diversityScore}%`;
  }

  updateKeywords() {
    const text = this.textInput.value;
    const ignoreCommon = this.ignoreCommonEl.checked;
    const minLength = parseInt(this.minLengthEl.value);
    
    const keywords = this.getKeywords(text, ignoreCommon, minLength);
    this.displayKeywords(keywords);
  }

  getKeywords(text, ignoreCommon = true, minLength = 3) {
    if (!text.trim()) return [];
    
    // Extract words and clean them
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length >= minLength);
    
    // Count word frequency
    const wordCount = {};
    words.forEach(word => {
      if (!ignoreCommon || !this.commonWords.has(word)) {
        wordCount[word] = (wordCount[word] || 0) + 1;
      }
    });
    
    // Convert to array and sort by frequency
    return Object.entries(wordCount)
      .map(([word, count]) => ({ word, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20); // Top 20 keywords
  }

  displayKeywords(keywords) {
    if (keywords.length === 0) {
      this.keywordsListEl.innerHTML = `
        <div class="no-keywords">
          No se encontraron palabras clave con los filtros actuales
        </div>
      `;
      return;
    }
    
    this.keywordsListEl.innerHTML = keywords.map(({ word, count }) => `
      <div class="keyword-item">
        <span class="keyword-text">${word}</span>
        <span class="keyword-count">${count}</span>
      </div>
    `).join('');
  }

  getCommonWords() {
    // Spanish common words to ignore
    return new Set([
      'el', 'la', 'de', 'que', 'y', 'a', 'en', 'un', 'es', 'se', 'no', 'te', 'lo',
      'le', 'da', 'su', 'por', 'son', 'con', 'para', 'al', 'del', 'los', 'las',
      'una', 'como', 'todo', 'pero', 'más', 'hay', 'muy', 'fue', 'ser', 'han',
      'era', 'está', 'sus', 'me', 'si', 'sin', 'sobre', 'este', 'ya', 'entre',
      'cuando', 'hasta', 'desde', 'nos', 'durante', 'todos', 'uno', 'les', 'ni',
      'contra', 'otros', 'ese', 'eso', 'ante', 'ellos', 'e', 'esto', 'mí', 'antes',
      'algunos', 'qué', 'unos', 'yo', 'otro', 'otras', 'otra', 'él', 'tanto',
      'esa', 'estos', 'mucho', 'quienes', 'nada', 'muchos', 'cual', 'poco', 'ella',
      'estar', 'estas', 'algunas', 'algo', 'nosotros', 'mi', 'mis', 'tú', 'te',
      'ti', 'tu', 'tus', 'ellas', 'nosotras', 'vosotros', 'vosotras', 'os', 'mío',
      'mía', 'míos', 'mías', 'tuyo', 'tuya', 'tuyos', 'tuyas', 'suyo', 'suya',
      'suyos', 'suyas', 'nuestro', 'nuestra', 'nuestros', 'nuestras', 'vuestro',
      'vuestra', 'vuestros', 'vuestras', 'esos', 'esas', 'estoy', 'está', 'estás',
      'estamos', 'estáis', 'están', 'esté', 'estés', 'estemos', 'estéis', 'estén',
      'estaré', 'estarás', 'estará', 'estaremos', 'estaréis', 'estarán', 'estaría',
      'estarías', 'estaríamos', 'estaríais', 'estarían', 'estaba', 'estabas',
      'estábamos', 'estabais', 'estaban', 'estuve', 'estuviste', 'estuvo',
      'estuvimos', 'estuvisteis', 'estuvieron'
    ]);
  }

  async clearText() {
    if (this.textInput.value && !confirm('¿Estás seguro de que quieres borrar todo el texto?')) {
      return;
    }
    
    this.textInput.value = '';
    this.textInput.focus();
    this.analyzeText();
    this.showToast('Texto eliminado', 'clear');
  }

  async copyText() {
    const text = this.textInput.value;
    if (!text) {
      this.showToast('No hay texto para copiar', 'error');
      return;
    }
    
    try {
      await navigator.clipboard.writeText(text);
      this.showToast('Texto copiado al portapapeles', 'success');
    } catch (err) {
      // Fallback for older browsers
      this.textInput.select();
      document.execCommand('copy');
      this.showToast('Texto copiado al portapapeles', 'success');
    }
  }

  async pasteText() {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        this.textInput.value = text;
        this.textInput.focus();
        this.analyzeText();
        this.showToast('Texto pegado desde el portapapeles', 'success');
      } else {
        this.showToast('No hay texto en el portapapeles', 'error');
      }
    } catch (err) {
      this.showToast('No se pudo acceder al portapapeles', 'error');
    }
  }

  showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    // Toast styles
    Object.assign(toast.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '12px 20px',
      borderRadius: '8px',
      color: '#ffffff',
      fontFamily: 'Quicksand, sans-serif',
      fontWeight: '500',
      fontSize: '14px',
      zIndex: '10000',
      opacity: '0',
      transform: 'translateX(100%)',
      transition: 'all 0.3s ease',
      maxWidth: '300px',
      wordWrap: 'break-word'
    });

    // Type-specific styling
    const colors = {
      success: '#51cf66',
      error: '#ff6b6b',
      clear: '#ffd43b',
      info: '#74c0fc'
    };
    
    toast.style.background = colors[type] || colors.info;
    toast.style.boxShadow = `0 4px 20px ${colors[type] || colors.info}40`;

    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(0)';
    });

    // Auto remove
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

// Initialize word counter when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new WordCounter();
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = WordCounter;
}