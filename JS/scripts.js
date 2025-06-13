class OscillatorUnit {
  constructor(container, label) {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.oscillator = null;
    this.gainNode = this.audioCtx.createGain();
    this.gainNode.gain.setValueAtTime(0.05, this.audioCtx.currentTime);

    this.elements = this.createDOM(label);
    container.appendChild(this.elements.wrapper);

    this.attachEvents();
  }

  createDOM(label) {
    const wrapper = document.createElement('div');
    wrapper.className = 'oscillator-box';

    const title = document.createElement('h2');
    title.textContent = label;

    const freqLabel = document.createElement('label');
    freqLabel.textContent = 'Frequency (Hz):';

    const freqInput = document.createElement('input');
    freqInput.type = 'number';
    freqInput.min = '20';
    freqInput.max = '20000';
    freqInput.step = 'any';
    freqInput.value = '440';

    const freqSlider = document.createElement('input');
    freqSlider.type = 'range';
    freqSlider.min = '20';
    freqSlider.max = '20000';
    freqSlider.step = '1';
    freqSlider.value = '440';

    const startBtn = document.createElement('button');
    startBtn.textContent = 'Start';

    const stopBtn = document.createElement('button');
    stopBtn.textContent = 'Stop';
    stopBtn.disabled = true;

    wrapper.append(title, freqLabel, freqInput, freqSlider, startBtn, stopBtn);

    return {
      wrapper,
      freqInput,
      freqSlider,
      startBtn,
      stopBtn
    };
  }

  attachEvents() {
    const { freqInput, freqSlider, startBtn, stopBtn } = this.elements;

    const clampFrequency = (val) => {
      const num = parseFloat(val);
      if (isNaN(num)) return 440;
      return Math.min(20000, Math.max(20, num));
    };

    const updateFrequency = (val) => {
      const clamped = clampFrequency(val);
      freqInput.value = clamped;
      freqSlider.value = clamped;
      if (this.oscillator) {
        this.oscillator.frequency.setValueAtTime(clamped, this.audioCtx.currentTime);
      }
    };

    freqSlider.addEventListener('input', () => {
      updateFrequency(freqSlider.value);
    });

    freqInput.addEventListener('input', () => {
      const raw = freqInput.value;
      if (raw === '') return;
      const num = parseFloat(raw);
      if (!isNaN(num)) {
        freqSlider.value = num;
        if (this.oscillator) {
          this.oscillator.frequency.setValueAtTime(num, this.audioCtx.currentTime);
        }
      }
    });

    freqInput.addEventListener('blur', () => updateFrequency(freqInput.value));
    freqInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        updateFrequency(freqInput.value);
        freqInput.blur();
      }
    });

    startBtn.addEventListener('click', () => {
      if (this.oscillator) return;

      const freq = clampFrequency(freqInput.value);
      this.oscillator = this.audioCtx.createOscillator();
      this.oscillator.type = 'sine';
      this.oscillator.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      this.oscillator.connect(this.gainNode).connect(this.audioCtx.destination);
      this.oscillator.start();

      startBtn.disabled = true;
      stopBtn.disabled = false;
    });

    stopBtn.addEventListener('click', () => {
      if (this.oscillator) {
        this.oscillator.stop();
        this.oscillator.disconnect();
        this.oscillator = null;
      }
      startBtn.disabled = false;
      stopBtn.disabled = true;
    });
  }
}

// Mount 4 oscillator units
const container = document.getElementById('oscillator-container');
for (let i = 1; i <= 4; i++) {
  new OscillatorUnit(container, `Oscillator ${i}`);
}
