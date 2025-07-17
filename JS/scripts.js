const sharedAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
const sharedAnalyser = sharedAudioCtx.createAnalyser();
sharedAnalyser.fftSize = 2048;
const bufferLength = sharedAnalyser.fftSize;
const dataArray = new Uint8Array(bufferLength);

const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');

function drawVisualizer() {
  requestAnimationFrame(drawVisualizer);
  sharedAnalyser.getByteTimeDomainData(dataArray);

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.lineWidth = 2;
  ctx.strokeStyle = 'lime';
  ctx.beginPath();

  const sliceWidth = canvas.width / bufferLength;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    const v = dataArray[i] / 128.0;
    const y = (v * canvas.height) / 2;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    x += sliceWidth;
  }

  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.stroke();
}

drawVisualizer();

class OscillatorUnit {
  constructor(container, label) {
    this.oscillator = null;
    this.gainNode = sharedAudioCtx.createGain();
    this.gainNode.gain.setValueAtTime(0.5, sharedAudioCtx.currentTime);

    this.elements = this.createDOM(label);
    container.appendChild(this.elements.wrapper);

    this.attachEvents();
  }

  createDOM(label) {
    const wrapper = document.createElement('div');
    wrapper.className = 'oscillator-box';

    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'flex-start';

    const title = document.createElement('h2');
    title.textContent = label;
    title.style.margin = '0';
    title.style.fontSize = '1rem';

    const waveformSelect = document.createElement('select');
    ['sine', 'triangle', 'square', 'sawtooth'].forEach(type => {
      const option = document.createElement('option');
      option.value = type;
      option.textContent = type.charAt(0).toUpperCase() + type.slice(1);
      waveformSelect.appendChild(option);
    });
    waveformSelect.value = 'sine';

    header.appendChild(title);
    header.appendChild(waveformSelect);

    const freqLabel = document.createElement('label');
    freqLabel.textContent = 'Frequency (Hz):';

    const pitchContainer = document.createElement('div');
    pitchContainer.style.display = 'flex';
    pitchContainer.style.gap = '8px';

    const pitchDropdown = document.createElement('select');
    pitchDropdown.appendChild(new Option('Select pitch', ''));
    pitchPresets.slice().sort((a, b) => a.hz - b.hz).forEach(pitch => {
      const option = document.createElement('option');
      option.value = pitch.hz;
      option.textContent = pitch.name;
      option.dataset.category = pitch.category;
      option.style.color = pitch.textColor;
      option.style.backgroundColor = pitch.backgroundColor;
      pitchDropdown.appendChild(option);
    });

    const categoryFilter = document.createElement('select');
    categoryFilter.appendChild(new Option('All Categories', ''));
    [...new Set(pitchPresets.map(p => p.category))].forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
      categoryFilter.appendChild(opt);
    });

    pitchContainer.appendChild(pitchDropdown);
    pitchContainer.appendChild(categoryFilter);

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

    const intervalLabel = document.createElement('label');
    intervalLabel.textContent = 'Interval:';

    const intervalContainer = document.createElement('div');
    intervalContainer.style.display = 'flex';
    intervalContainer.style.gap = '8px';

    const intervalDropdown = document.createElement('select');
    intervalDropdown.appendChild(new Option('Select interval', ''));
intervalPresets
  .slice()
  .sort((a, b) => parseFloat(a.decimal) - parseFloat(b.decimal))
  .forEach(interval => {
    const option = document.createElement('option');
    option.value = interval.ratio;
    option.textContent = interval.name;
    option.dataset.category = interval.category;
    option.dataset.decimal = interval.decimal;
    option.style.color = interval.textColor;
    option.style.backgroundColor = interval.backgroundColor;
    intervalDropdown.appendChild(option);
  });

    const intervalCategoryFilter = document.createElement('select');
    intervalCategoryFilter.appendChild(new Option('All Categories', ''));
    [...new Set(intervalPresets.map(i => i.category))].forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
      intervalCategoryFilter.appendChild(opt);
    });

    const plusBtn = document.createElement('button');
    plusBtn.textContent = '+';
    plusBtn.style.backgroundColor = 'green';
    plusBtn.style.color = 'white';

    const minusBtn = document.createElement('button');
    minusBtn.textContent = '−';
    minusBtn.style.backgroundColor = 'red';
    minusBtn.style.color = 'white';

    intervalContainer.append(intervalDropdown, intervalCategoryFilter, plusBtn, minusBtn);

    const volLabel = document.createElement('label');
    volLabel.textContent = 'Volume (0.0 - 1.0):';

    const volInput = document.createElement('input');
    volInput.type = 'number';
    volInput.min = '0';
    volInput.max = '1';
    volInput.step = '0.01';
    volInput.value = '0.25';

    const volSlider = document.createElement('input');
    volSlider.type = 'range';
    volSlider.min = '0';
    volSlider.max = '1';
    volSlider.step = '0.01';
    volSlider.value = '0.5';

    const startBtn = document.createElement('button');
    startBtn.textContent = 'Start';

    const stopBtn = document.createElement('button');
    stopBtn.textContent = 'Stop';
    stopBtn.disabled = true;

    wrapper.append(
      header,
      freqLabel, pitchContainer, freqInput, freqSlider,
      intervalLabel, intervalContainer,
      volLabel, volInput, volSlider,
      startBtn, stopBtn
    );

    return {
      wrapper,
      waveformSelect,
      pitchDropdown,
      categoryFilter,
      intervalDropdown,
      intervalCategoryFilter,
      freqInput,
      freqSlider,
      volInput,
      volSlider,
      startBtn,
      stopBtn,
      plusBtn,
      minusBtn
    };
  }

  attachEvents() {
    const {
      freqInput, freqSlider,
      volInput, volSlider,
      startBtn, stopBtn,
      waveformSelect, pitchDropdown, categoryFilter,
      intervalDropdown, intervalCategoryFilter,
      plusBtn, minusBtn
    } = this.elements;

    const clampFrequency = val => Math.min(20000, Math.max(20, parseFloat(val) || 440));
    const clampVolume = val => Math.min(1, Math.max(0, parseFloat(val) || 0.5));

    const updateFrequency = val => {
      const clamped = clampFrequency(val);
      freqInput.value = clamped;
      freqSlider.value = clamped;
      if (this.oscillator) {
        this.oscillator.frequency.setValueAtTime(clamped, sharedAudioCtx.currentTime);
      }
    };

    const updateVolume = val => {
      const clamped = clampVolume(val);
      volInput.value = clamped;
      volSlider.value = clamped;
      this.gainNode.gain.setValueAtTime(clamped, sharedAudioCtx.currentTime);
    };

    pitchDropdown.addEventListener('change', () => {
      const hz = pitchDropdown.value;
      if (hz) updateFrequency(hz);
    });

    categoryFilter.addEventListener('change', () => {
      const selected = categoryFilter.value;
      Array.from(pitchDropdown.options).forEach(opt => {
        if (!opt.value) return;
        const cat = opt.dataset.category;
        opt.hidden = selected && cat !== selected;
      });
    });

    intervalCategoryFilter.addEventListener('change', () => {
      const selected = intervalCategoryFilter.value;
      Array.from(intervalDropdown.options).forEach(opt => {
        if (!opt.value) return;
        const cat = opt.dataset.category;
        opt.hidden = selected && cat !== selected;
      });
    });

    freqSlider.addEventListener('input', () => updateFrequency(freqSlider.value));
    freqInput.addEventListener('input', () => {
      const val = freqInput.value;
      const num = parseFloat(val);
      if (!isNaN(num)) {
        freqSlider.value = num;
        if (this.oscillator) this.oscillator.frequency.setValueAtTime(num, sharedAudioCtx.currentTime);
      }
    });
    freqInput.addEventListener('blur', () => updateFrequency(freqInput.value));
    freqInput.addEventListener('keydown', e => { if (e.key === 'Enter') freqInput.blur(); });

    volSlider.addEventListener('input', () => updateVolume(volSlider.value));
    volInput.addEventListener('input', () => { if (volInput.value !== '') updateVolume(volInput.value); });
    volInput.addEventListener('blur', () => updateVolume(volInput.value));
    volInput.addEventListener('keydown', e => { if (e.key === 'Enter') volInput.blur(); });

    waveformSelect.addEventListener('change', () => {
      if (!this.oscillator) return;
      const freq = clampFrequency(freqInput.value);
      this.oscillator.stop();
      this.oscillator.disconnect();
      this.oscillator = null;
      setTimeout(() => {
        this.oscillator = sharedAudioCtx.createOscillator();
        this.oscillator.type = waveformSelect.value;
        this.oscillator.frequency.setValueAtTime(freq, sharedAudioCtx.currentTime);
        this.oscillator.connect(this.gainNode).connect(sharedAnalyser).connect(sharedAudioCtx.destination);
        this.oscillator.start();
      }, 10);
    });

    startBtn.addEventListener('click', () => {
      if (this.oscillator) return;
      const freq = clampFrequency(freqInput.value);
      const vol = clampVolume(volInput.value);
      this.oscillator = sharedAudioCtx.createOscillator();
      this.oscillator.type = waveformSelect.value;
      this.oscillator.frequency.setValueAtTime(freq, sharedAudioCtx.currentTime);
      this.gainNode.gain.setValueAtTime(vol, sharedAudioCtx.currentTime);
      this.oscillator.connect(this.gainNode).connect(sharedAnalyser).connect(sharedAudioCtx.destination);
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

    plusBtn.addEventListener('click', () => {
      const r = intervalDropdown.value;
      if (!r) return;
      const f = clampFrequency(freqInput.value);
      try {
        const result = f * Function(`"use strict"; return (${r})`)();
        updateFrequency(result);
      } catch (e) { console.warn("Invalid interval ratio:", r); }
    });

    minusBtn.addEventListener('click', () => {
      const r = intervalDropdown.value;
      if (!r) return;
      const f = clampFrequency(freqInput.value);
      try {
        const result = f / Function(`"use strict"; return (${r})`)();
        updateFrequency(result);
      } catch (e) { console.warn("Invalid interval ratio:", r); }
    });
  }
}

const container = document.getElementById('oscillator-container');
window.oscillatorUnits = []; 
for (let i = 1; i <= 4; i++) {
  window.oscillatorUnits.push(new OscillatorUnit(container, `Oscillator ${i}`));
}

function populateChordDropdown() {
  const select = document.getElementById('chord-select');
  window.chordPresets.forEach((chord, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `${chord.name} (${chord.symbol})`;
    option.style.color = chord.textColor;
    option.style.backgroundColor = chord.backgroundColor;
    select.appendChild(option);
  });
}

function parseRatio(ratioStr) {
  if (!ratioStr) return null;
  const [numerator, denominator] = ratioStr.split('/').map(Number);
  return denominator ? numerator / denominator : NaN;
}

function applyChord() {
  const selectedIndex = document.getElementById('chord-select').value;
  const chord = window.chordPresets[selectedIndex];
  if (!chord) return;

  const rootHz = parseFloat(oscillatorUnits[0]?.elements.freqInput.value);
  if (!rootHz || isNaN(rootHz)) return;

  const ratios = [
    '1',
    chord.secondVoice,
    chord.thirdVoice,
    chord.fourthVoice
  ];

  ratios.forEach((ratioStr, i) => {
    const ratio = parseRatio(ratioStr);
    if (oscillatorUnits[i] && ratio) {
  const newFreq = rootHz * ratio;
  oscillatorUnits[i].elements.freqInput.value = newFreq;
  oscillatorUnits[i].elements.freqSlider.value = newFreq;
  if (oscillatorUnits[i].oscillator) {
    oscillatorUnits[i].oscillator.frequency.setValueAtTime(newFreq, sharedAudioCtx.currentTime);
  }
}
  });
}

document.getElementById('apply-chord').addEventListener('click', applyChord);
populateChordDropdown();
