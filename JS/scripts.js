let audioCtx = null;
let oscillator = null;

const freqSlider = document.getElementById('frequency');
const freqInput = document.getElementById('freqInput');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');

function clampFrequency(value) {
  const num = parseFloat(value);
  if (isNaN(num)) return 440; // default fallback
  return Math.min(20000, Math.max(20, num));
}

function updateFrequencyUI(value) {
  const clamped = clampFrequency(value);
  freqSlider.value = clamped;
  freqInput.value = clamped;
  if (oscillator) {
    oscillator.frequency.setValueAtTime(clamped, audioCtx.currentTime);
  }
}

// Slider moves: clamp immediately
freqSlider.addEventListener('input', () => {
  updateFrequencyUI(freqSlider.value);
});

// Number input: don't clamp until blur or Enter
freqInput.addEventListener('input', () => {
  const raw = freqInput.value;
  if (raw === "") return; // let user clear temporarily
  const num = parseFloat(raw);
  if (!isNaN(num)) {
    freqSlider.value = num;
    if (oscillator) {
      oscillator.frequency.setValueAtTime(num, audioCtx.currentTime);
    }
  }
});

// Clamp on blur (finalize)
freqInput.addEventListener('blur', () => {
  updateFrequencyUI(freqInput.value);
});

// Clamp on Enter key
freqInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    updateFrequencyUI(freqInput.value);
    freqInput.blur(); // optional: finalize visually
  }
});

startBtn.addEventListener('click', () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  oscillator = audioCtx.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(clampFrequency(freqInput.value), audioCtx.currentTime);

  const gainNode = audioCtx.createGain();
  gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime); // avoid full volume

  oscillator.connect(gainNode).connect(audioCtx.destination);
  oscillator.start();

  startBtn.disabled = true;
  stopBtn.disabled = false;
});

stopBtn.addEventListener('click', () => {
  if (oscillator) {
    oscillator.stop();
    oscillator.disconnect();
    oscillator = null;
  }
  startBtn.disabled = false;
  stopBtn.disabled = true;
});
