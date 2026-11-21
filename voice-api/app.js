const form = document.querySelector('form');
const text = document.querySelector('#text');
const voice = document.querySelector('#voice');
const voiceHint = document.querySelector('#voice-hint');
const button = form.querySelector('button');
const status = document.querySelector('#status');
const error = document.querySelector('#error');
const preview = document.querySelector('#preview');
const audio = document.querySelector('audio');
const download = document.querySelector('#download');
let audioURL;

function showError(message) {
  error.textContent = message;
  error.hidden = false;
}

function count() {
  document.querySelector('#count').textContent = `${text.value.length} / 280 characters`;
}
text.addEventListener('input', count);
count();

function describeVoice() {
  voiceHint.textContent = voice.selectedOptions[0]?.dataset.description || '';
}
voice.addEventListener('change', () => {
  describeVoice();
  audio.pause();
  error.hidden = true;
  status.textContent = `${voice.selectedOptions[0].textContent} selected. Generate a preview to hear this style.`;
});

async function ready() {
  try {
    const response = await fetch('/api/health');
    if (!response.ok) throw new Error(`Local API returned HTTP ${response.status}.`);
    const health = await response.json();
    if (!health.ready) throw new Error('The local model is not ready.');
    if (!Array.isArray(health.profiles) || !health.profiles.length ||
        health.profiles.some(profile => !profile || typeof profile.id !== 'string' ||
          typeof profile.label !== 'string' || typeof profile.description !== 'string') ||
        !health.profiles.some(profile => profile.id === health.default_profile)) {
      throw new Error('The API did not supply valid voice options.');
    }
    voice.replaceChildren(...health.profiles.map(profile => {
      const option = document.createElement('option');
      option.value = profile.id;
      option.textContent = profile.label;
      option.dataset.description = profile.description;
      return option;
    }));
    voice.value = health.default_profile;
    describeVoice();
    voice.disabled = false;
    button.disabled = false;
    status.textContent = 'Local model ready. Audio starts only when you press Play.';
  } catch (failure) {
    console.error('Local voice API unavailable:', failure);
    status.textContent = 'The local voice API is unavailable.';
    showError(failure.message);
  }
}
ready();

form.addEventListener('submit', async event => {
  event.preventDefault();
  if (button.disabled || !form.reportValidity()) return;
  const profile = voice.value;
  const label = voice.selectedOptions[0].textContent;
  button.disabled = true;
  voice.disabled = true;
  text.readOnly = true;
  button.textContent = 'Generating...';
  form.setAttribute('aria-busy', 'true');
  error.hidden = true;
  preview.hidden = true;
  audio.pause();
  status.textContent = 'Generating on your Mac. This can take a minute; no text is uploaded.';
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 120000);
  try {
    const response = await fetch('/api/voice/preview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: text.value.trim(), profile }),
      signal: controller.signal
    });
    if (!response.ok) {
      const failure = await response.json();
      throw new Error(failure.error || `Voice preview returned HTTP ${response.status}.`);
    }
    if (response.headers.get('content-type') !== 'audio/wav') throw new Error('The API did not return WAV audio.');
    if (response.headers.get('x-voice-profile') !== profile) throw new Error('The API returned a different voice profile. Try again.');
    const blob = await response.blob();
    if (!blob.size) throw new Error('The API returned an empty audio file.');
    if (audioURL) URL.revokeObjectURL(audioURL);
    audioURL = URL.createObjectURL(blob);
    audio.src = audioURL;
    download.href = audioURL;
    download.download = `local-${profile}-audition.wav`;
    document.querySelector('#preview-name').textContent = `${label} audition`;
    preview.hidden = false;
    status.textContent = 'Preview generated. Press Play and judge the voice before using it.';
  } catch (failure) {
    console.error('Local voice audition failed:', failure);
    status.textContent = 'No new voice preview is ready.';
    showError(failure.name === 'AbortError'
      ? 'The request timed out. The local worker may still be finishing; wait before retrying.'
      : failure.message);
  } finally {
    clearTimeout(timer);
    button.disabled = false;
    voice.disabled = false;
    text.readOnly = false;
    button.textContent = 'Generate local preview';
    form.removeAttribute('aria-busy');
  }
});

audio.addEventListener('error', () => {
  if (!audioURL) return;
  console.error('The generated voice preview could not play:', audio.error);
  showError('Audio playback failed. Try downloading the WAV and listening locally.');
});
