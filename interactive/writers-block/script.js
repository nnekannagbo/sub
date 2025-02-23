const noteInput = document.getElementById("noteInput");
const notesContainer = document.getElementById("notesContainer");
const clearButton = document.getElementById("clearButton"); // Select the button

let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Web Audio API: Creating an audio context for the drone sound
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

const letterToFrequency = {
  a: 261.63,
  b: 293.66,
  c: 329.63,
  d: 349.23,
  e: 392.0,
  f: 440.0,
  g: 493.88,
  h: 523.25,
  i: 587.33,
  j: 659.25,
  k: 698.46,
  l: 783.99,
  m: 880.0,
  n: 987.77,
  o: 1046.5,
  p: 1174.66,
  q: 1318.51,
  r: 1396.91,
  s: 1567.98,
  t: 1760.0,
  u: 1975.53,
  v: 2093.0,
  w: 2349.32,
  x: 2637.02,
  y: 2793.83,
  z: 3135.96,
  " ": 0, // Space has no sound
};

function playNoteSequence(noteText) {
  let index = 0;

  function playNextLetter() {
    if (index >= noteText.length) return; // Stop when all letters are played

    let char = noteText[index].toLowerCase(); // Get current letter
    let frequency = letterToFrequency[char]; // Get mapped frequency

    if (frequency) {
      // Only play if the character has a frequency
      const oscillator = audioContext.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

      const gainNode = audioContext.createGain();
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.start();
      setTimeout(() => {
        oscillator.stop();
        index++;
        playNextLetter(); // Play the next letter after this one stops
      }, 400); // Each note lasts 400ms
    } else {
      index++;
      playNextLetter(); // Skip unknown characters
    }
  }

  playNextLetter();
}

// BACKGROUND DRONE START
let isBackgroundDronePlaying = false;
let droneOscillator, noiseSource, noiseFilter, windGainNode;

function startBackgroundDrone() {
  if (!isBackgroundDronePlaying) {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();

    // 1. Create a deep, evolving tonal drone (low sine wave)
    droneOscillator = audioContext.createOscillator();
    droneOscillator.type = "sine";
    droneOscillator.frequency.setValueAtTime(80, audioContext.currentTime); // Deep frequency

    const droneGain = audioContext.createGain();
    droneGain.gain.setValueAtTime(0.1, audioContext.currentTime); // Very soft

    droneOscillator.connect(droneGain);
    droneGain.connect(audioContext.destination);
    droneOscillator.start();

    // 2. Create a filtered white noise for a wind effect
    noiseSource = audioContext.createBufferSource();
    const bufferSize = audioContext.sampleRate * 2;
    const noiseBuffer = audioContext.createBuffer(
      1,
      bufferSize,
      audioContext.sampleRate
    );
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1; // White noise
    }

    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    // Apply a low-pass filter to make the noise sound like wind
    noiseFilter = audioContext.createBiquadFilter();
    noiseFilter.type = "lowpass";
    noiseFilter.frequency.setValueAtTime(600, audioContext.currentTime); // Adjust for softer/harsher wind

    windGainNode = audioContext.createGain();
    windGainNode.gain.setValueAtTime(0.05, audioContext.currentTime); // Soft wind effect

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(windGainNode);
    windGainNode.connect(audioContext.destination);
    noiseSource.start();

    // 3. Add slow volume fluctuations (natural gusts of wind)
    function modulateWind() {
      windGainNode.gain.exponentialRampToValueAtTime(
        Math.random() * 0.1 + 0.02, // Random between 0.02 and 0.1
        audioContext.currentTime + 3 // Change every 3 seconds
      );
      setTimeout(modulateWind, 3000); // Repeat modulation
    }
    modulateWind();

    isBackgroundDronePlaying = true;
  }
}

function modulateWind() {
  windGainNode.gain.exponentialRampToValueAtTime(
    Math.random() * 0.1 + 0.02, // Random between 0.02 and 0.1
    audioContext.currentTime + 3
  );

  // Simulate occasional raindrop-like bursts
  if (Math.random() > 0.7) {
    // 30% chance of a sudden volume spike
    windGainNode.gain.exponentialRampToValueAtTime(
      0.15,
      audioContext.currentTime + 0.2 // Sudden burst
    );
    windGainNode.gain.exponentialRampToValueAtTime(
      Math.random() * 0.1 + 0.02,
      audioContext.currentTime + 0.5 // Return to normal
    );
  }

  setTimeout(modulateWind, 3000);
}
// BACKGROUND DRONE END

// PORTAL START
const portalTriggers = {
  note: "https://example.com/liminal-space",
  hello: "https://example.com/echo-chamber",
  test: "https://example.com/dreamscape",
  dream: "https://example.com/threshold",
  open: "https://example.com/ascension",
};

// Function to check if typed words trigger a portal
function checkForPortal(noteText) {
  let words = noteText.split(" ");
  let modifiedText = "";

  for (let word of words) {
    if (portalTriggers[word.toLowerCase()]) {
      let url = portalTriggers[word.toLowerCase()];
      modifiedText += `<a href="${url}" target="_blank" class="portal-link">${word}</a> `;
    } else {
      modifiedText += word + " ";
    }
  }

  return modifiedText.trim(); // Return modified text with embedded hyperlinks
}

// Function to create the portal link on the page
function createPortalLink(url) {
  const portalDiv = document.createElement("div");
  portalDiv.id = "portal";
  portalDiv.innerHTML = `<a href="${url}" target="_blank" class="portal-link">The portal has opened...</a>`;

  document.body.appendChild(portalDiv);

  // Fade in effect
  portalDiv.style.opacity = "0";
  setTimeout(() => {
    portalDiv.style.transition = "opacity 3s ease-in-out";
    portalDiv.style.opacity = "1";
  }, 100);
}
// PORTAL END

function playDrone() {
  const oscillator = audioContext.createOscillator();
  oscillator.type = "sine"; // You can try "square", "sawtooth", or "triangle" for different tones
  oscillator.frequency.setValueAtTime(220, audioContext.currentTime); // Adjust pitch

  const gainNode = audioContext.createGain();
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime); // Adjust volume

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start();
  setTimeout(() => {
    oscillator.stop(); // Stop the sound after 10 seconds
  }, 10000);
}

// Function to format date and time
function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

function formatTime(date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(date));
}

function renderNotes() {
  notesContainer.innerHTML = "";
  let lastDate = "";

  notes.forEach((note) => {
    const noteDate = formatDate(note.timestamp);

    if (noteDate !== lastDate) {
      const dateHeader = document.createElement("div");
      dateHeader.className = "date-header";
      dateHeader.textContent = noteDate;
      notesContainer.appendChild(dateHeader);
      lastDate = noteDate;
    }

    const noteElement = document.createElement("div");
    noteElement.className = "note-entry";
    noteElement.textContent = `${note.text} (${formatTime(note.timestamp)})`;
    noteElement.innerHTML = checkForPortal(note.text); // Inject modified text with hyperlinks
    notesContainer.appendChild(noteElement);

    // Apply breathing effect to new notes
    noteElement.style.opacity = "0";
    setTimeout(() => {
      noteElement.style.transition = "opacity 2s ease-in-out";
      noteElement.style.opacity = "1";
    }, 100);
  });
}

renderNotes();

noteInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter" && noteInput.value.trim()) {
    const newNote = {
      text: noteInput.value.trim(),
      timestamp: new Date().toISOString(),
    };
    notes.push(newNote);
    localStorage.setItem("notes", JSON.stringify(notes));

    noteInput.value = "";
    renderNotes();
    playNoteSequence(newNote.text); // Play the typed message as sound
    startBackgroundDrone();
    checkForPortal(newNote.text); // Check if a portal should open
  }
});

//Clear all notes when the button is clicked
clearButton.addEventListener("click", () => {
  localStorage.removeItem("notes"); // Remove from storage
  notes = []; // Empty the array
  renderNotes(); // Re-render (which now shows nothing)
});
