window.chordPresets = [
  { name: 'Power Chord', symbol: '', category: 'diadic', textColor: 'black', backgroundColor: 'white', secondVoice: '3/2', thirdVoice: '1/1', fourthVoice: '1/1'  },

  { name: 'Diminished Triad', symbol: '', category: 'triadic', textColor: 'black', backgroundColor: 'white', secondVoice: 'Math.pow(2, 3/12)', thirdVoice: 'Math.pow(2, 6/12)', fourthVoice: '1/1' },
  { name: 'Locrian Triad', symbol: '', category: 'triadic', textColor: 'black', backgroundColor: 'white', secondVoice: 'Math.pow(2, 1/12)', thirdVoice: 'Math.pow(2, 6/12)', fourthVoice: '1/1' },
  { name: 'Phrygian Triad', symbol: '', category: 'triadic', textColor: 'black', backgroundColor: 'white', secondVoice: 'Math.pow(2, 1/12)', thirdVoice: 'Math.pow(2, 7/12)', fourthVoice: '1/1' },
  { name: 'Minor Triad', symbol: 'i', category: 'triadic', textColor: 'black', backgroundColor: 'white', secondVoice: 'Math.pow(2, 3/12)', thirdVoice: 'Math.pow(2, 7/12)', fourthVoice: '1/1' },
  { name: 'Major Triad', symbol: 'I', category: 'triadic', textColor: 'black', backgroundColor: 'white', secondVoice: 'Math.pow(2, 4/12)', thirdVoice: 'Math.pow(2, 7/12)', fourthVoice: '1/1' },
  { name: 'Augmented Chord', symbol: 'I+', category: 'triadic', textColor: 'black', backgroundColor: 'white', secondVoice: 'Math.pow(2, 4/12)', thirdVoice: 'Math.pow(2, 8/12)', fourthVoice: '1/1' },
  { name: 'Suspended 2', symbol: 'Sus2', category: 'triadic', textColor: 'black', backgroundColor: 'white', secondVoice: 'Math.pow(2, 2/12)', thirdVoice: 'Math.pow(2, 7/12)', fourthVoice: '1/1' },
  { name: 'Suspended 4', symbol: 'Sus4', category: 'triadic', textColor: 'black', backgroundColor: 'white', secondVoice: 'Math.pow(2, 5/12)', thirdVoice: 'Math.pow(2, 7/12)', fourthVoice: '1/1' },
  { name: 'Lydian Triad', symbol: '', category: 'triadic', textColor: 'black', backgroundColor: 'white', secondVoice: 'Math.pow(2, 6/12)', thirdVoice: 'Math.pow(2, 7/12)', fourthVoice: '1/1' },

  { name: 'Diminished Chord', symbol: 'io7', category: 'tetradic', textColor: 'black', backgroundColor: 'white', secondVoice: 'Math.pow(2, 3/12)', thirdVoice: 'Math.pow(2, 6/12)', fourthVoice: 'Math.pow(2, 9/12)' },
  { name: 'Half-diminished Seventh', symbol: 'iø7', category: 'tetradic', textColor: 'black', backgroundColor: 'white', secondVoice: 'Math.pow(2, 3/12)', thirdVoice: 'Math.pow(2, 6/12)', fourthVoice: 'Math.pow(2, 10/12)' },
  { name: 'Minor Seventh', symbol: 'i7', category: 'tetradic', textColor: 'black', backgroundColor: 'white', secondVoice: 'Math.pow(2, 3/12)', thirdVoice: 'Math.pow(2, 7/12)', fourthVoice: 'Math.pow(2, 10/12)' },
  { name: 'Minor-Major Seventh', symbol: '', category: 'tetradic', textColor: 'black', backgroundColor: 'white', secondVoice: 'Math.pow(2, 3/12)', thirdVoice: 'Math.pow(2, 7/12)', fourthVoice: 'Math.pow(2, 11/12)' },
  { name: 'Dominant Seventh', symbol: 'V7', category: 'tetradic', textColor: 'black', backgroundColor: 'white', secondVoice: 'Math.pow(2, 4/12)', thirdVoice: 'Math.pow(2, 7/12)', fourthVoice: 'Math.pow(2, 10/12)' },
  { name: 'Dominant sharp-5', symbol: '', category: 'tetradic', textColor: 'black', backgroundColor: 'white', secondVoice: 'Math.pow(2, 4/12)', thirdVoice: 'Math.pow(2, 8/12)', fourthVoice: 'Math.pow(2, 10/12)' },
  { name: 'Major Seventh', symbol: 'I7', category: 'tetradic', textColor: 'black', backgroundColor: 'white', secondVoice: 'Math.pow(2, 4/12)', thirdVoice: 'Math.pow(2, 7/12)', fourthVoice: 'Math.pow(2, 11/12)' },

  { name: 'Suspended 4/2', symbol: 'Sus4/2', category: 'triadic', textColor: 'black', backgroundColor: 'white', secondVoice: 'Math.pow(2, 2/12)', thirdVoice: 'Math.pow(2, 5/12)', fourthVoice: 'Math.pow(2, 7/12)' },

  { name: '? Sixth', symbol: '', category: 'tetradic', textColor: 'black', backgroundColor: 'white', secondVoice: 'Math.pow(2, 3/12)', thirdVoice: 'Math.pow(2, 7/12)', fourthVoice: 'Math.pow(2, 11/12)' },
  { name: 'Minor Sixth', symbol: 'm6', category: 'tetradic', textColor: 'black', backgroundColor: 'white', secondVoice: 'Math.pow(2, 3/12)', thirdVoice: 'Math.pow(2, 7/12)', fourthVoice: 'Math.pow(2, 9/12)' },
  { name: '? Sixth', symbol: '', category: 'tetradic', textColor: 'black', backgroundColor: 'white', secondVoice: 'Math.pow(2, 4/12)', thirdVoice: 'Math.pow(2, 7/12)', fourthVoice: 'Math.pow(2, 8/12)' },
  { name: 'Major Sixth', symbol: 'M6', category: 'tetradic', textColor: 'black', backgroundColor: 'white', secondVoice: 'Math.pow(2, 4/12)', thirdVoice: 'Math.pow(2, 7/12)', fourthVoice: 'Math.pow(2, 9/12)' },

  { name: 'Quartal Chord', symbol: '', category: 'tetradic', textColor: 'black', backgroundColor: 'white', secondVoice: '4/3', thirdVoice: '16/9', fourthVoice: '64/27' },
  { name: 'Quintal Chord', symbol: '', category: 'tetradic', textColor: 'black', backgroundColor: 'white', secondVoice: '3/2', thirdVoice: '9/4', fourthVoice: '27/8' },
];
