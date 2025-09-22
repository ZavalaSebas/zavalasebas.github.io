// Color Picker - Advanced color tool
class ColorPicker {
  constructor() {
    this.currentColor = { h: 195, s: 100, l: 50 }; // Default blue
    this.colorHistory = [];
    this.savedPalettes = [];
    this.isDragging = false;
    
    this.initializeElements();
    this.setupEventListeners();
    this.setupCanvas();
    this.loadData();
    this.updateDisplay();
    this.generateQuickColors();
    
    console.log('Color Picker initialized');
  }

  initializeElements() {
    // Color display elements
    this.colorPreview = document.getElementById('color-preview');
    this.colorName = document.getElementById('color-name');
    this.hexInput = document.getElementById('hex-input');
    this.rgbInput = document.getElementById('rgb-input');
    this.hslInput = document.getElementById('hsl-input');
    
    // Canvas elements
    this.colorWheel = document.getElementById('color-wheel');
    this.brightnessBar = document.getElementById('brightness-bar');
    this.wheelPointer = document.getElementById('wheel-pointer');
    this.brightnessPointer = document.getElementById('brightness-pointer');
    
    // Quick colors
    this.quickColorsGrid = document.getElementById('quick-colors');
    
    // Palette elements
    this.paletteType = document.getElementById('palette-type');
    this.generatePaletteBtn = document.getElementById('generate-palette');
    this.randomPaletteBtn = document.getElementById('random-palette');
    this.paletteDisplay = document.getElementById('palette-display');
    this.exportPaletteBtn = document.getElementById('export-palette');
    this.savePaletteBtn = document.getElementById('save-palette');
    
    // Saved palettes
    this.savedSection = document.getElementById('saved-section');
    this.savedPalettes = document.getElementById('saved-palettes');
    
    // History
    this.colorHistory = document.getElementById('color-history');
    this.clearHistoryBtn = document.getElementById('clear-history');
    
    // Canvas contexts
    this.wheelCtx = this.colorWheel.getContext('2d');
    this.brightnessCtx = this.brightnessBar.getContext('2d');
  }

  setupEventListeners() {
    // Copy buttons
    document.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.copyColor(e.target.dataset.format));
    });

    // Canvas interactions
    this.colorWheel.addEventListener('mousedown', (e) => this.startDragging(e, 'wheel'));
    this.brightnessBar.addEventListener('mousedown', (e) => this.startDragging(e, 'brightness'));
    
    document.addEventListener('mousemove', (e) => this.handleDrag(e));
    document.addEventListener('mouseup', () => this.stopDragging());

    // Touch events for mobile
    this.colorWheel.addEventListener('touchstart', (e) => this.startDragging(e.touches[0], 'wheel'));
    this.brightnessBar.addEventListener('touchstart', (e) => this.startDragging(e.touches[0], 'brightness'));
    
    document.addEventListener('touchmove', (e) => this.handleDrag(e.touches[0]));
    document.addEventListener('touchend', () => this.stopDragging());

    // Palette controls
    this.generatePaletteBtn.addEventListener('click', () => this.generatePalette());
    this.randomPaletteBtn.addEventListener('click', () => this.generateRandomPalette());
    this.exportPaletteBtn.addEventListener('click', () => this.exportPalette());
    this.savePaletteBtn.addEventListener('click', () => this.savePalette());
    
    // History
    this.clearHistoryBtn.addEventListener('click', () => this.clearHistory());
  }

  setupCanvas() {
    this.drawColorWheel();
    this.drawBrightnessBar();
  }

  drawColorWheel() {
    const ctx = this.wheelCtx;
    const centerX = this.colorWheel.width / 2;
    const centerY = this.colorWheel.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    // Clear canvas
    ctx.clearRect(0, 0, this.colorWheel.width, this.colorWheel.height);

    // Draw color wheel
    for (let angle = 0; angle < 360; angle++) {
      const startAngle = (angle - 1) * Math.PI / 180;
      const endAngle = angle * Math.PI / 180;
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.lineWidth = radius;
      ctx.strokeStyle = `hsl(${angle}, 100%, 50%)`;
      ctx.stroke();
    }

    // Draw saturation gradient
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  drawBrightnessBar() {
    const ctx = this.brightnessCtx;
    const gradient = ctx.createLinearGradient(0, 0, 0, this.brightnessBar.height);
    
    gradient.addColorStop(0, `hsl(${this.currentColor.h}, ${this.currentColor.s}%, 100%)`);
    gradient.addColorStop(1, `hsl(${this.currentColor.h}, ${this.currentColor.s}%, 0%)`);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, this.brightnessBar.width, this.brightnessBar.height);
  }

  startDragging(e, type) {
    this.isDragging = type;
    this.handleDrag(e);
  }

  handleDrag(e) {
    if (!this.isDragging) return;

    if (this.isDragging === 'wheel') {
      this.updateFromWheel(e);
    } else if (this.isDragging === 'brightness') {
      this.updateFromBrightness(e);
    }
  }

  stopDragging() {
    if (this.isDragging) {
      this.addToHistory(this.getCurrentHex());
    }
    this.isDragging = false;
  }

  updateFromWheel(e) {
    const rect = this.colorWheel.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = e.clientX - rect.left - centerX;
    const y = e.clientY - rect.top - centerY;
    
    const angle = Math.atan2(y, x) * 180 / Math.PI;
    const distance = Math.sqrt(x * x + y * y);
    const radius = Math.min(centerX, centerY) - 10;
    
    this.currentColor.h = (angle + 360) % 360;
    this.currentColor.s = Math.min(100, (distance / radius) * 100);
    
    this.updateDisplay();
    this.updatePointers();
  }

  updateFromBrightness(e) {
    const rect = this.brightnessBar.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const percentage = Math.max(0, Math.min(100, (1 - y / rect.height) * 100));
    
    this.currentColor.l = percentage;
    this.updateDisplay();
    this.updatePointers();
  }

  updatePointers() {
    // Update wheel pointer
    const centerX = this.colorWheel.width / 2;
    const centerY = this.colorWheel.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    const angle = this.currentColor.h * Math.PI / 180;
    const distance = (this.currentColor.s / 100) * radius;
    
    const x = centerX + Math.cos(angle) * distance;
    const y = centerY + Math.sin(angle) * distance;
    
    this.wheelPointer.style.left = `${x}px`;
    this.wheelPointer.style.top = `${y}px`;
    
    // Update brightness pointer
    const brightnessY = this.brightnessBar.height * (1 - this.currentColor.l / 100);
    this.brightnessPointer.style.left = `${this.brightnessBar.width / 2}px`;
    this.brightnessPointer.style.top = `${brightnessY}px`;
  }

  updateDisplay() {
    const hsl = `hsl(${this.currentColor.h}, ${this.currentColor.s}%, ${this.currentColor.l}%)`;
    const rgb = this.hslToRgb(this.currentColor.h, this.currentColor.s, this.currentColor.l);
    const hex = this.rgbToHex(rgb.r, rgb.g, rgb.b);
    
    // Update preview
    this.colorPreview.style.backgroundColor = hsl;
    
    // Update inputs
    this.hexInput.value = hex;
    this.rgbInput.value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    this.hslInput.value = hsl;
    
    // Update color name
    this.colorName.textContent = this.getColorName(hex);
    
    // Update brightness bar
    this.drawBrightnessBar();
  }

  generateQuickColors() {
    const colors = [
      '#FF0000', '#FF8000', '#FFFF00', '#80FF00', '#00FF00', '#00FF80',
      '#00FFFF', '#0080FF', '#0000FF', '#8000FF', '#FF00FF', '#FF0080',
      '#FFFFFF', '#CCCCCC', '#999999', '#666666', '#333333', '#000000',
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD',
      '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF9F43', '#C44569'
    ];
    
    this.quickColorsGrid.innerHTML = '';
    colors.forEach(color => {
      const colorDiv = document.createElement('div');
      colorDiv.className = 'quick-color';
      colorDiv.style.backgroundColor = color;
      colorDiv.title = color;
      colorDiv.addEventListener('click', () => this.setColorFromHex(color));
      this.quickColorsGrid.appendChild(colorDiv);
    });
  }

  setColorFromHex(hex) {
    const rgb = this.hexToRgb(hex);
    const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);
    
    this.currentColor = { h: hsl.h, s: hsl.s, l: hsl.l };
    this.updateDisplay();
    this.updatePointers();
    this.addToHistory(hex);
  }

  generatePalette() {
    const type = this.paletteType.value;
    const baseHue = this.currentColor.h;
    let colors = [];
    
    switch (type) {
      case 'monochromatic':
        colors = this.generateMonochromatic(baseHue);
        break;
      case 'analogous':
        colors = this.generateAnalogous(baseHue);
        break;
      case 'complementary':
        colors = this.generateComplementary(baseHue);
        break;
      case 'triadic':
        colors = this.generateTriadic(baseHue);
        break;
      case 'split-complementary':
        colors = this.generateSplitComplementary(baseHue);
        break;
      case 'tetradic':
        colors = this.generateTetradic(baseHue);
        break;
    }
    
    this.displayPalette(colors);
  }

  generateMonochromatic(hue) {
    return [
      { h: hue, s: 20, l: 90 },
      { h: hue, s: 40, l: 70 },
      { h: hue, s: 60, l: 50 },
      { h: hue, s: 80, l: 30 },
      { h: hue, s: 100, l: 20 }
    ];
  }

  generateAnalogous(hue) {
    return [
      { h: (hue - 60 + 360) % 360, s: 70, l: 50 },
      { h: (hue - 30 + 360) % 360, s: 80, l: 60 },
      { h: hue, s: 90, l: 50 },
      { h: (hue + 30) % 360, s: 80, l: 60 },
      { h: (hue + 60) % 360, s: 70, l: 50 }
    ];
  }

  generateComplementary(hue) {
    const complement = (hue + 180) % 360;
    return [
      { h: hue, s: 30, l: 80 },
      { h: hue, s: 70, l: 60 },
      { h: hue, s: 90, l: 50 },
      { h: complement, s: 70, l: 60 },
      { h: complement, s: 90, l: 50 }
    ];
  }

  generateTriadic(hue) {
    return [
      { h: hue, s: 80, l: 50 },
      { h: (hue + 120) % 360, s: 80, l: 50 },
      { h: (hue + 240) % 360, s: 80, l: 50 },
      { h: hue, s: 50, l: 70 },
      { h: (hue + 120) % 360, s: 50, l: 30 }
    ];
  }

  generateSplitComplementary(hue) {
    return [
      { h: hue, s: 80, l: 50 },
      { h: (hue + 150) % 360, s: 70, l: 60 },
      { h: (hue + 210) % 360, s: 70, l: 60 },
      { h: hue, s: 50, l: 70 },
      { h: hue, s: 90, l: 30 }
    ];
  }

  generateTetradic(hue) {
    return [
      { h: hue, s: 80, l: 50 },
      { h: (hue + 90) % 360, s: 70, l: 60 },
      { h: (hue + 180) % 360, s: 80, l: 50 },
      { h: (hue + 270) % 360, s: 70, l: 60 },
      { h: hue, s: 50, l: 30 }
    ];
  }

  generateRandomPalette() {
    const randomHue = Math.floor(Math.random() * 360);
    this.currentColor.h = randomHue;
    this.updateDisplay();
    this.updatePointers();
    this.generatePalette();
  }

  displayPalette(colors) {
    this.paletteDisplay.innerHTML = '';
    this.currentPalette = colors;
    
    colors.forEach((color, index) => {
      const rgb = this.hslToRgb(color.h, color.s, color.l);
      const hex = this.rgbToHex(rgb.r, rgb.g, rgb.b);
      const hsl = `hsl(${color.h}, ${color.s}%, ${color.l}%)`;
      
      const colorDiv = document.createElement('div');
      colorDiv.className = 'palette-color';
      colorDiv.style.backgroundColor = hsl;
      colorDiv.addEventListener('click', () => this.setColorFromHex(hex));
      
      const info = document.createElement('div');
      info.className = 'palette-color-info';
      info.innerHTML = `
        <div>${hex}</div>
        <div>HSL(${color.h}, ${color.s}%, ${color.l}%)</div>
      `;
      
      colorDiv.appendChild(info);
      this.paletteDisplay.appendChild(colorDiv);
    });
  }

  exportPalette() {
    if (!this.currentPalette) {
      this.showToast('Genera una paleta primero', 'error');
      return;
    }
    
    let css = ':root {\n';
    this.currentPalette.forEach((color, index) => {
      const rgb = this.hslToRgb(color.h, color.s, color.l);
      const hex = this.rgbToHex(rgb.r, rgb.g, rgb.b);
      css += `  --color-${index + 1}: ${hex};\n`;
    });
    css += '}';
    
    navigator.clipboard.writeText(css).then(() => {
      this.showToast('CSS copiado al portapapeles!', 'success');
    }).catch(() => {
      this.showToast('Error al copiar CSS', 'error');
    });
  }

  savePalette() {
    if (!this.currentPalette) {
      this.showToast('Genera una paleta primero', 'error');
      return;
    }
    
    const paletteData = {
      id: Date.now(),
      colors: this.currentPalette,
      type: this.paletteType.value,
      created: new Date().toLocaleDateString()
    };
    
    this.savedPalettesData.push(paletteData);
    this.saveData();
    this.displaySavedPalettes();
    this.showToast('Paleta guardada!', 'success');
  }

  displaySavedPalettes() {
    if (this.savedPalettesData.length === 0) {
      this.savedSection.style.display = 'none';
      return;
    }
    
    this.savedSection.style.display = 'block';
    this.savedPalettes.innerHTML = '';
    
    this.savedPalettesData.forEach(palette => {
      const paletteDiv = document.createElement('div');
      paletteDiv.className = 'saved-palette';
      
      const colorsDiv = document.createElement('div');
      colorsDiv.className = 'saved-palette-colors';
      
      palette.colors.forEach(color => {
        const colorDiv = document.createElement('div');
        colorDiv.className = 'saved-palette-color';
        const hsl = `hsl(${color.h}, ${color.s}%, ${color.l}%)`;
        colorDiv.style.backgroundColor = hsl;
        colorDiv.addEventListener('click', () => this.displayPalette(palette.colors));
        colorsDiv.appendChild(colorDiv);
      });
      
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-palette';
      deleteBtn.textContent = '🗑️';
      deleteBtn.addEventListener('click', () => this.deletePalette(palette.id));
      
      paletteDiv.appendChild(colorsDiv);
      paletteDiv.appendChild(deleteBtn);
      this.savedPalettes.appendChild(paletteDiv);
    });
  }

  deletePalette(id) {
    this.savedPalettesData = this.savedPalettesData.filter(p => p.id !== id);
    this.saveData();
    this.displaySavedPalettes();
    this.showToast('Paleta eliminada', 'success');
  }

  addToHistory(hex) {
    if (this.colorHistoryData.includes(hex)) return;
    
    this.colorHistoryData.unshift(hex);
    if (this.colorHistoryData.length > 24) {
      this.colorHistoryData = this.colorHistoryData.slice(0, 24);
    }
    
    this.saveData();
    this.displayHistory();
  }

  displayHistory() {
    this.colorHistory.innerHTML = '';
    
    this.colorHistoryData.forEach(hex => {
      const colorDiv = document.createElement('div');
      colorDiv.className = 'history-color';
      colorDiv.style.backgroundColor = hex;
      colorDiv.title = hex;
      colorDiv.addEventListener('click', () => this.setColorFromHex(hex));
      this.colorHistory.appendChild(colorDiv);
    });
  }

  clearHistory() {
    this.colorHistoryData = [];
    this.saveData();
    this.displayHistory();
    this.showToast('Historial limpiado', 'success');
  }

  copyColor(format) {
    let value;
    
    switch (format) {
      case 'hex':
        value = this.hexInput.value;
        break;
      case 'rgb':
        value = this.rgbInput.value;
        break;
      case 'hsl':
        value = this.hslInput.value;
        break;
    }
    
    navigator.clipboard.writeText(value).then(() => {
      this.showToast(`${format.toUpperCase()} copiado!`, 'success');
    }).catch(() => {
      this.showToast('Error al copiar', 'error');
    });
  }

  // Utility functions
  hslToRgb(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    
    const a = s * Math.min(l, 1 - l);
    const f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    
    return {
      r: Math.round(255 * f(0)),
      g: Math.round(255 * f(8)),
      b: Math.round(255 * f(4))
    };
  }

  rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  }

  rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  }

  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  getCurrentHex() {
    const rgb = this.hslToRgb(this.currentColor.h, this.currentColor.s, this.currentColor.l);
    return this.rgbToHex(rgb.r, rgb.g, rgb.b);
  }

  getColorName(hex) {
    const names = {
      '#FF0000': 'Rojo', '#00FF00': 'Verde', '#0000FF': 'Azul',
      '#FFFF00': 'Amarillo', '#FF00FF': 'Magenta', '#00FFFF': 'Cian',
      '#000000': 'Negro', '#FFFFFF': 'Blanco', '#808080': 'Gris',
      '#FFA500': 'Naranja', '#800080': 'Púrpura', '#FFC0CB': 'Rosa'
    };
    
    return names[hex] || 'Color Personalizado';
  }

  saveData() {
    localStorage.setItem('colorPickerHistory', JSON.stringify(this.colorHistoryData));
    localStorage.setItem('colorPickerPalettes', JSON.stringify(this.savedPalettesData));
  }

  loadData() {
    this.colorHistoryData = JSON.parse(localStorage.getItem('colorPickerHistory')) || [];
    this.savedPalettesData = JSON.parse(localStorage.getItem('colorPickerPalettes')) || [];
    this.displayHistory();
    this.displaySavedPalettes();
  }

  showToast(message, type = 'info') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

// Footer messages
const colorMessages = [
  "Explora y crea paletas de colores increíbles",
  "Los colores pueden transmitir emociones",
  "La teoría del color mejora tus diseños",
  "Encuentra la combinación perfecta",
  "Cada color cuenta una historia"
];

function updateFooterMessage() {
  const footerElement = document.getElementById('color-footer');
  if (footerElement) {
    const randomMessage = colorMessages[Math.floor(Math.random() * colorMessages.length)];
    footerElement.textContent = randomMessage;
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ColorPicker();
  updateFooterMessage();
  setInterval(updateFooterMessage, 12000);
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ColorPicker;
}