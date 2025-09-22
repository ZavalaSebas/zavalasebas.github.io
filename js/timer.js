// Focus Timer - Pomodoro & Stopwatch
class FocusTimer {
  constructor() {
    this.mode = 'pomodoro';
    this.isRunning = false;
    this.isPaused = false;
    this.currentTime = 0;
    this.totalTime = 0;
    this.timerInterval = null;
    this.currentSession = 'work';
    this.sessionCount = 0;
    this.lapCount = 0;
    
    // Settings
    this.settings = {
      workTime: 25,
      shortBreak: 5,
      longBreak: 15,
      autoStartBreaks: true,
      soundNotifications: true
    };

    this.initializeElements();
    this.setupEventListeners();
    this.loadSettings();
    this.updateDisplay();
    
    console.log('Focus Timer initialized');
  }

  initializeElements() {
    // Mode elements
    this.modeButtons = document.querySelectorAll('.mode-btn');
    this.timerSections = document.querySelectorAll('.timer-section');
    
    // Pomodoro elements
    this.sessionButtons = document.querySelectorAll('.session-btn');
    this.pomodoroTime = document.getElementById('pomodoro-time');
    this.pomodoroLabel = document.getElementById('pomodoro-label');
    this.pomodoroStart = document.getElementById('pomodoro-start');
    this.pomodoroPause = document.getElementById('pomodoro-pause');
    this.pomodoroReset = document.getElementById('pomodoro-reset');
    this.sessionCountEl = document.getElementById('session-count');
    this.nextBreakText = document.getElementById('next-break-text');
    this.progressRing = document.querySelector('.progress-ring-fill');
    this.timeCircle = document.querySelector('.time-circle');
    
    // Stopwatch elements
    this.stopwatchTime = document.getElementById('stopwatch-time');
    this.stopwatchStart = document.getElementById('stopwatch-start');
    this.stopwatchPause = document.getElementById('stopwatch-pause');
    this.stopwatchReset = document.getElementById('stopwatch-reset');
    this.stopwatchLap = document.getElementById('stopwatch-lap');
    this.lapsContainer = document.getElementById('laps-container');
    this.lapsList = document.getElementById('laps-list');
    
    // Settings elements
    this.settingsPanel = document.getElementById('settings-panel');
    this.settingsToggle = document.getElementById('settings-toggle');
    this.settingsOverlay = document.getElementById('settings-overlay');
    this.workTimeSlider = document.getElementById('work-time');
    this.shortBreakSlider = document.getElementById('short-break');
    this.longBreakSlider = document.getElementById('long-break');
    this.workValue = document.getElementById('work-value');
    this.shortValue = document.getElementById('short-value');
    this.longValue = document.getElementById('long-value');
    this.autoStartBreaks = document.getElementById('auto-start-breaks');
    this.soundNotifications = document.getElementById('sound-notifications');
  }

  setupEventListeners() {
    // Mode switching
    this.modeButtons.forEach(btn => {
      btn.addEventListener('click', (e) => this.switchMode(e.target.closest('.mode-btn').dataset.mode));
    });

    // Session switching
    this.sessionButtons.forEach(btn => {
      btn.addEventListener('click', (e) => this.switchSession(e.target.closest('.session-btn').dataset.session));
    });

    // Pomodoro controls
    this.pomodoroStart.addEventListener('click', () => this.startPomodoro());
    this.pomodoroPause.addEventListener('click', () => this.pausePomodoro());
    this.pomodoroReset.addEventListener('click', () => this.resetPomodoro());

    // Stopwatch controls
    this.stopwatchStart.addEventListener('click', () => this.startStopwatch());
    this.stopwatchPause.addEventListener('click', () => this.pauseStopwatch());
    this.stopwatchReset.addEventListener('click', () => this.resetStopwatch());
    this.stopwatchLap.addEventListener('click', () => this.addLap());

    // Settings
    this.settingsToggle.addEventListener('click', () => this.toggleSettings());
    this.settingsOverlay.addEventListener('click', () => this.closeSettings());
    this.workTimeSlider.addEventListener('input', () => this.updateSetting('workTime', this.workTimeSlider.value));
    this.shortBreakSlider.addEventListener('input', () => this.updateSetting('shortBreak', this.shortBreakSlider.value));
    this.longBreakSlider.addEventListener('input', () => this.updateSetting('longBreak', this.longBreakSlider.value));
    this.autoStartBreaks.addEventListener('change', () => this.updateSetting('autoStartBreaks', this.autoStartBreaks.checked));
    this.soundNotifications.addEventListener('change', () => this.updateSetting('soundNotifications', this.soundNotifications.checked));

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => this.handleKeyboard(e));

    // Close settings when clicking outside (desktop only)
    document.addEventListener('click', (e) => {
      if (window.innerWidth > 768 && !this.settingsPanel.contains(e.target) && !this.settingsToggle.contains(e.target)) {
        this.closeSettings();
      }
    });
  }

  switchMode(mode) {
    if (this.isRunning) {
      this.showNotification('Detén el timer antes de cambiar de modo', 'warning');
      return;
    }

    this.mode = mode;
    
    // Update mode buttons
    this.modeButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });

    // Update sections
    this.timerSections.forEach(section => {
      section.classList.toggle('active', section.id === `${mode}-section`);
    });

    if (mode === 'pomodoro') {
      this.resetPomodoro();
    } else {
      this.resetStopwatch();
    }
  }

  switchSession(session) {
    if (this.isRunning) {
      this.showNotification('Detén el timer antes de cambiar de sesión', 'warning');
      return;
    }

    this.currentSession = session;
    
    // Update session buttons
    this.sessionButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.session === session);
    });

    this.resetPomodoro();
    this.updatePomodoroDisplay();
  }

  startPomodoro() {
    if (this.isPaused) {
      this.resumePomodoro();
      return;
    }

    this.isRunning = true;
    this.isPaused = false;
    this.setTotalTime();
    this.currentTime = this.totalTime;
    
    this.pomodoroStart.style.display = 'none';
    this.pomodoroPause.style.display = 'inline-flex';
    this.timeCircle.classList.add('active');
    
    this.timerInterval = setInterval(() => {
      this.currentTime--;
      this.updatePomodoroDisplay();
      this.updateProgressRing();
      
      if (this.currentTime <= 0) {
        this.completePomodoro();
      }
    }, 1000);
  }

  pausePomodoro() {
    this.isPaused = true;
    this.isRunning = false;
    clearInterval(this.timerInterval);
    
    this.pomodoroStart.style.display = 'inline-flex';
    this.pomodoroPause.style.display = 'none';
    this.pomodoroStart.querySelector('.btn-text').textContent = 'Reanudar';
    this.timeCircle.classList.remove('active');
  }

  resumePomodoro() {
    this.isRunning = true;
    this.isPaused = false;
    
    this.pomodoroStart.style.display = 'none';
    this.pomodoroPause.style.display = 'inline-flex';
    this.timeCircle.classList.add('active');
    
    this.timerInterval = setInterval(() => {
      this.currentTime--;
      this.updatePomodoroDisplay();
      this.updateProgressRing();
      
      if (this.currentTime <= 0) {
        this.completePomodoro();
      }
    }, 1000);
  }

  resetPomodoro() {
    this.isRunning = false;
    this.isPaused = false;
    clearInterval(this.timerInterval);
    
    this.setTotalTime();
    this.currentTime = this.totalTime;
    
    this.pomodoroStart.style.display = 'inline-flex';
    this.pomodoroPause.style.display = 'none';
    this.pomodoroStart.querySelector('.btn-text').textContent = 'Iniciar';
    this.timeCircle.classList.remove('active');
    
    this.updatePomodoroDisplay();
    this.updateProgressRing();
  }

  completePomodoro() {
    this.isRunning = false;
    clearInterval(this.timerInterval);
    this.timeCircle.classList.remove('active');
    
    if (this.currentSession === 'work') {
      this.sessionCount++;
      this.sessionCountEl.textContent = this.sessionCount;
      
      // Determine next break type
      const nextSession = (this.sessionCount % 4 === 0) ? 'long' : 'short';
      this.showNotification('¡Tiempo de trabajo completado! 🎉', 'complete');
      this.playNotificationSound();
      
      if (this.settings.autoStartBreaks) {
        setTimeout(() => {
          this.switchSession(nextSession);
          this.startPomodoro();
        }, 3000);
      } else {
        this.switchSession(nextSession);
      }
    } else {
      this.showNotification('¡Descanso completado! Hora de trabajar 💪', 'break');
      this.playNotificationSound();
      
      if (this.settings.autoStartBreaks) {
        setTimeout(() => {
          this.switchSession('work');
          this.startPomodoro();
        }, 3000);
      } else {
        this.switchSession('work');
      }
    }
    
    this.updateNextBreakText();
  }

  setTotalTime() {
    const times = {
      work: this.settings.workTime * 60,
      short: this.settings.shortBreak * 60,
      long: this.settings.longBreak * 60
    };
    this.totalTime = times[this.currentSession];
  }

  updatePomodoroDisplay() {
    const minutes = Math.floor(this.currentTime / 60);
    const seconds = this.currentTime % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    this.pomodoroTime.textContent = timeString;
    
    const labels = {
      work: 'Tiempo de Trabajo',
      short: 'Descanso Corto',
      long: 'Descanso Largo'
    };
    this.pomodoroLabel.textContent = labels[this.currentSession];
  }

  updateProgressRing() {
    const progress = 1 - (this.currentTime / this.totalTime);
    const circumference = 2 * Math.PI * 140; // radius = 140
    const strokeDashoffset = circumference - (progress * circumference);
    this.progressRing.style.strokeDashoffset = strokeDashoffset;
  }

  updateNextBreakText() {
    const nextBreakType = (this.sessionCount % 4 === 0) ? 'largo' : 'corto';
    this.nextBreakText.textContent = `Próximo: Descanso ${nextBreakType}`;
  }

  // Stopwatch functionality
  startStopwatch() {
    if (this.isPaused) {
      this.resumeStopwatch();
      return;
    }

    this.isRunning = true;
    this.isPaused = false;
    this.currentTime = 0;
    
    this.stopwatchStart.style.display = 'none';
    this.stopwatchPause.style.display = 'inline-flex';
    this.stopwatchLap.style.display = 'inline-flex';
    
    this.timerInterval = setInterval(() => {
      this.currentTime++;
      this.updateStopwatchDisplay();
    }, 10); // 10ms for centiseconds
  }

  pauseStopwatch() {
    this.isPaused = true;
    this.isRunning = false;
    clearInterval(this.timerInterval);
    
    this.stopwatchStart.style.display = 'inline-flex';
    this.stopwatchPause.style.display = 'none';
    this.stopwatchStart.querySelector('.btn-text').textContent = 'Reanudar';
  }

  resumeStopwatch() {
    this.isRunning = true;
    this.isPaused = false;
    
    this.stopwatchStart.style.display = 'none';
    this.stopwatchPause.style.display = 'inline-flex';
    
    this.timerInterval = setInterval(() => {
      this.currentTime++;
      this.updateStopwatchDisplay();
    }, 10);
  }

  resetStopwatch() {
    this.isRunning = false;
    this.isPaused = false;
    clearInterval(this.timerInterval);
    this.currentTime = 0;
    this.lapCount = 0;
    
    this.stopwatchStart.style.display = 'inline-flex';
    this.stopwatchPause.style.display = 'none';
    this.stopwatchLap.style.display = 'none';
    this.stopwatchStart.querySelector('.btn-text').textContent = 'Iniciar';
    
    this.updateStopwatchDisplay();
    this.clearLaps();
  }

  updateStopwatchDisplay() {
    const centiseconds = this.currentTime % 100;
    const totalSeconds = Math.floor(this.currentTime / 100);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${centiseconds.toString().padStart(2, '0')}`;
    this.stopwatchTime.textContent = timeString;
  }

  addLap() {
    if (!this.isRunning && !this.isPaused) return;
    
    this.lapCount++;
    const currentTimeString = this.stopwatchTime.textContent;
    
    const lapItem = document.createElement('div');
    lapItem.className = 'lap-item';
    lapItem.innerHTML = `
      <span class="lap-number">Vuelta ${this.lapCount}</span>
      <span class="lap-time">${currentTimeString}</span>
    `;
    
    this.lapsList.insertBefore(lapItem, this.lapsList.firstChild);
    this.lapsContainer.style.display = 'block';
  }

  clearLaps() {
    this.lapsList.innerHTML = '';
    this.lapsContainer.style.display = 'none';
  }

  // Settings
  toggleSettings() {
    const isOpen = this.settingsPanel.classList.contains('open');
    if (isOpen) {
      this.closeSettings();
    } else {
      this.openSettings();
    }
  }

  openSettings() {
    this.settingsPanel.classList.add('open');
    if (window.innerWidth <= 768) {
      this.settingsOverlay.classList.add('active');
    }
  }

  closeSettings() {
    this.settingsPanel.classList.remove('open');
    this.settingsOverlay.classList.remove('active');
  }

  updateSetting(key, value) {
    this.settings[key] = key === 'autoStartBreaks' || key === 'soundNotifications' ? value : parseInt(value);
    this.saveSettings();
    
    // Update display values
    if (key === 'workTime') {
      this.workValue.textContent = value;
      if (this.currentSession === 'work' && !this.isRunning) {
        this.resetPomodoro();
      }
    } else if (key === 'shortBreak') {
      this.shortValue.textContent = value;
      if (this.currentSession === 'short' && !this.isRunning) {
        this.resetPomodoro();
      }
    } else if (key === 'longBreak') {
      this.longValue.textContent = value;
      if (this.currentSession === 'long' && !this.isRunning) {
        this.resetPomodoro();
      }
    }
    
    this.updateSessionButtonLabels();
  }

  updateSessionButtonLabels() {
    const labels = {
      work: `${this.settings.workTime} min`,
      short: `${this.settings.shortBreak} min`,
      long: `${this.settings.longBreak} min`
    };
    
    this.sessionButtons.forEach(btn => {
      const session = btn.dataset.session;
      const small = btn.querySelector('small');
      if (small) {
        small.textContent = labels[session];
      }
    });
  }

  saveSettings() {
    localStorage.setItem('focusTimerSettings', JSON.stringify(this.settings));
  }

  loadSettings() {
    const saved = localStorage.getItem('focusTimerSettings');
    if (saved) {
      this.settings = { ...this.settings, ...JSON.parse(saved) };
    }
    
    // Update UI
    this.workTimeSlider.value = this.settings.workTime;
    this.shortBreakSlider.value = this.settings.shortBreak;
    this.longBreakSlider.value = this.settings.longBreak;
    this.workValue.textContent = this.settings.workTime;
    this.shortValue.textContent = this.settings.shortBreak;
    this.longValue.textContent = this.settings.longBreak;
    this.autoStartBreaks.checked = this.settings.autoStartBreaks;
    this.soundNotifications.checked = this.settings.soundNotifications;
    
    this.updateSessionButtonLabels();
  }

  updateDisplay() {
    if (this.mode === 'pomodoro') {
      this.setTotalTime();
      this.currentTime = this.totalTime;
      this.updatePomodoroDisplay();
      this.updateProgressRing();
      this.updateNextBreakText();
    } else {
      this.updateStopwatchDisplay();
    }
  }

  // Notifications
  showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 4000);
  }

  playNotificationSound() {
    if (!this.settings.soundNotifications) return;
    
    // Try to use the existing audio files
    const audio = new Audio('../assets/audio/tick.mp3');
    audio.volume = 0.3;
    audio.play().catch(() => {
      // Fallback to Web Audio API beep
      this.playBeep();
    });
  }

  playBeep() {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      console.log('Audio not available');
    }
  }

  // Keyboard shortcuts
  handleKeyboard(e) {
    if (e.target.tagName === 'INPUT') return;
    
    switch (e.code) {
      case 'Escape':
        if (this.settingsPanel.classList.contains('open')) {
          this.closeSettings();
          return;
        }
        break;
      case 'Space':
        e.preventDefault();
        if (this.mode === 'pomodoro') {
          if (this.isRunning) {
            this.pausePomodoro();
          } else {
            this.startPomodoro();
          }
        } else {
          if (this.isRunning) {
            this.pauseStopwatch();
          } else {
            this.startStopwatch();
          }
        }
        break;
      case 'KeyR':
        e.preventDefault();
        if (this.mode === 'pomodoro') {
          this.resetPomodoro();
        } else {
          this.resetStopwatch();
        }
        break;
      case 'KeyL':
        if (this.mode === 'stopwatch') {
          e.preventDefault();
          this.addLap();
        }
        break;
      case 'Tab':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          const newMode = this.mode === 'pomodoro' ? 'stopwatch' : 'pomodoro';
          this.switchMode(newMode);
        }
        break;
    }
  }
}

// Footer messages
const timerMessages = [
  "Mantén el foco y mejora tu productividad",
  "Un paso a la vez hacia tus objetivos",
  "La concentración es la clave del éxito",
  "Cada sesión completada es un logro",
  "Respira, enfócate y continúa",
  "El tiempo bien usado es inversión en ti mismo"
];

function updateFooterMessage() {
  const footerElement = document.getElementById('timer-footer');
  if (footerElement) {
    const randomMessage = timerMessages[Math.floor(Math.random() * timerMessages.length)];
    footerElement.textContent = randomMessage;
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Focus Timer
  new FocusTimer();
  
  // Update footer message
  updateFooterMessage();
  
  // Update footer message every 15 seconds
  setInterval(updateFooterMessage, 15000);
});

// Handle page visibility for accurate timing
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    updateFooterMessage();
  }
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FocusTimer;
}