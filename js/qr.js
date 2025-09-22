// QR Generator JavaScript
class QRGenerator {
  constructor() {
    console.log('QRGenerator constructor called');
    this.initializeElements();
    this.setupEventListeners();
    this.currentQRCanvas = null;
    console.log('QRGenerator constructor completed');
  }

  initializeElements() {
    console.log('Initializing elements...');
    this.qrInput = document.getElementById('qr-input');
    this.sizeSelect = document.getElementById('size-select');
    this.errorCorrection = document.getElementById('error-correction');
    this.generateBtn = document.getElementById('generate-btn');
    this.qrResult = document.getElementById('qr-result');
    this.downloadSection = document.getElementById('download-section');
    this.downloadBtn = document.getElementById('download-btn');
    this.copyBtn = document.getElementById('copy-btn');
    
    console.log('Elements found:', {
      qrInput: !!this.qrInput,
      sizeSelect: !!this.sizeSelect,
      errorCorrection: !!this.errorCorrection,
      generateBtn: !!this.generateBtn,
      qrResult: !!this.qrResult,
      downloadSection: !!this.downloadSection,
      downloadBtn: !!this.downloadBtn,
      copyBtn: !!this.copyBtn
    });
  }

  setupEventListeners() {
    console.log('Setting up event listeners...');
    // Generate button click
    this.generateBtn.addEventListener('click', () => {
      console.log('Generate button clicked');
      this.generateQR();
    });
    
    // Enter key in input
    this.qrInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.ctrlKey) {
        console.log('Ctrl+Enter pressed');
        this.generateQR();
      }
    });

    // Input change to enable/disable button
    this.qrInput.addEventListener('input', () => this.validateInput());

    // Download button
    this.downloadBtn.addEventListener('click', () => this.downloadQR());

    // Copy button
    this.copyBtn.addEventListener('click', () => this.copyQR());

    // Initial validation
    this.validateInput();
    console.log('Event listeners set up');
  }

  validateInput() {
    const hasText = this.qrInput.value.trim().length > 0;
    this.generateBtn.disabled = !hasText;
    
    if (hasText) {
      this.generateBtn.style.opacity = '1';
      this.generateBtn.style.cursor = 'pointer';
    } else {
      this.generateBtn.style.opacity = '0.6';
      this.generateBtn.style.cursor = 'not-allowed';
    }
  }

  showLoading() {
    this.qrResult.innerHTML = `
      <div class="loading">
        <div class="spinner"></div>
        <p>Generando código QR...</p>
      </div>
    `;
  }

  showPlaceholder() {
    this.qrResult.innerHTML = `
      <div class="placeholder">
        <div class="placeholder-icon">📷</div>
        <p>El código QR aparecerá aquí</p>
      </div>
    `;
  }

  async generateQR() {
    console.log('generateQR called');
    const text = this.qrInput.value.trim();
    console.log('Input text:', text);
    
    if (!text) {
      this.showToast('Por favor ingresa algún texto o URL', 'error');
      return;
    }

    // Check if QRCode library is loaded
    if (typeof QRCode === 'undefined') {
      this.showToast('Error: Librería QR no disponible. Recarga la página.', 'error');
      console.error('QRCode library is not available');
      return;
    }

    console.log('QRCode available, proceeding...');
    console.log('QRCode.toCanvas type:', typeof QRCode.toCanvas);

    try {
      this.showLoading();
      this.generateBtn.disabled = true;

      const size = parseInt(this.sizeSelect.value);
      const errorCorrectionLevel = this.errorCorrection.value;

      // Auto-format URLs if needed
      const formattedText = this.formatURL(text);

      console.log('Generating QR for:', formattedText);
      console.log('Options:', { size, errorCorrectionLevel });

      // QR Code options
      const options = {
        errorCorrectionLevel: errorCorrectionLevel,
        type: 'image/png',
        quality: 0.92,
        margin: 1,
        width: size,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      };

      console.log('Full options:', options);

      // Generate QR code
      const canvas = document.createElement('canvas');
      console.log('Canvas created, calling QRCode.toCanvas...');
      
      await QRCode.toCanvas(canvas, formattedText, options);
      
      console.log('QR generation completed, canvas:', canvas);

      // Display the QR code
      this.currentQRCanvas = canvas;
      this.qrResult.innerHTML = '';
      this.qrResult.appendChild(canvas);

      // Show download options
      this.downloadSection.style.display = 'flex';

      this.showToast('¡Código QR generado exitosamente!', 'success');

    } catch (error) {
      console.error('Error generating QR code:', error);
      console.error('Error stack:', error.stack);
      this.showToast('Error al generar el código QR: ' + error.message, 'error');
      this.showPlaceholder();
    } finally {
      console.log('Finally block reached');
      this.generateBtn.disabled = false;
      this.validateInput();
    }
  }

  downloadQR() {
    if (!this.currentQRCanvas) {
      this.showToast('No hay código QR para descargar', 'error');
      return;
    }

    try {
      // Create download link
      const link = document.createElement('a');
      link.download = `qr-code-${Date.now()}.png`;
      link.href = this.currentQRCanvas.toDataURL('image/png');
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      this.showToast('¡Código QR descargado!', 'success');
    } catch (error) {
      console.error('Error downloading QR code:', error);
      this.showToast('Error al descargar el código QR', 'error');
    }
  }

  async copyQR() {
    if (!this.currentQRCanvas) {
      this.showToast('No hay código QR para copiar', 'error');
      return;
    }

    try {
      // Convert canvas to blob
      this.currentQRCanvas.toBlob(async (blob) => {
        try {
          // Check if Clipboard API is supported
          if (navigator.clipboard && window.ClipboardItem) {
            const item = new ClipboardItem({ 'image/png': blob });
            await navigator.clipboard.write([item]);
            this.showToast('¡Código QR copiado al portapapeles!', 'success');
          } else {
            // Fallback: copy as data URL to clipboard (text)
            const dataUrl = this.currentQRCanvas.toDataURL('image/png');
            await navigator.clipboard.writeText(dataUrl);
            this.showToast('URL de imagen copiada al portapapeles', 'success');
          }
        } catch (clipboardError) {
          console.error('Error copying to clipboard:', clipboardError);
          this.showToast('No se pudo copiar al portapapeles', 'error');
        }
      }, 'image/png');

    } catch (error) {
      console.error('Error copying QR code:', error);
      this.showToast('Error al copiar el código QR', 'error');
    }
  }

  showToast(message, type = 'success') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
      existingToast.remove();
    }

    // Create new toast
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;

    // Add to document
    document.body.appendChild(toast);

    // Show toast
    setTimeout(() => {
      toast.classList.add('show');
    }, 100);

    // Hide toast after 3 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }

  // Utility method to detect URLs
  isValidURL(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      // Try with http prefix
      try {
        new URL('http://' + string);
        return string.includes('.') && !string.includes(' ');
      } catch (_) {
        return false;
      }
    }
  }

  // Auto-format URLs
  formatURL(text) {
    if (this.isValidURL(text)) {
      if (!text.startsWith('http://') && !text.startsWith('https://')) {
        return 'https://' + text;
      }
    }
    return text;
  }
}

// Utility functions for dynamic footer messages
const qrMessages = [
  "Comparte información de manera rápida y segura",
  "Los códigos QR pueden almacenar hasta 4,296 caracteres",
  "Ideal para URLs, texto, números de teléfono y más",
  "Escanea con cualquier aplicación de cámara moderna",
  "Perfecto para compartir WiFi, contactos y ubicaciones"
];

function updateFooterMessage() {
  const footerElement = document.getElementById('frase-footer');
  if (footerElement) {
    const randomMessage = qrMessages[Math.floor(Math.random() * qrMessages.length)];
    footerElement.textContent = randomMessage;
  }
}

// NOTE: Initialization is now handled in qr.html after library loads
// This removes the DOMContentLoaded listener that was causing issues

// Handle page visibility change
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    updateFooterMessage();
  }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Ctrl+Enter or Cmd+Enter to generate
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    const generateBtn = document.getElementById('generate-btn');
    if (generateBtn && !generateBtn.disabled) {
      generateBtn.click();
    }
  }
  
  // Escape to clear
  if (e.key === 'Escape') {
    const qrInput = document.getElementById('qr-input');
    if (qrInput && qrInput === document.activeElement) {
      qrInput.value = '';
      qrInput.dispatchEvent(new Event('input'));
    }
  }
});

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
  module.exports = QRGenerator;
}