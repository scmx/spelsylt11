const sounds = {
  blockBroken:
    "8p5J63pAUWMVdRAnagRWMbKQ933Xx6NzndFwpoqEwwpTj7fjJwEmEYYNQuhQ8KesUvkMTzkiqVNJGDiwuhf9ehCXKkRYZdBAfBsVM5413hfQZ8JfWgSXAwbLe",
};

let context;
let gainNode;

const audios = {};

const playing = new Set();

export function playSound(name) {
  if (!sounds[name]) throw new Error(`Sound ${name} not found`);
  const audio = getAudio(sounds[name]);
  if (!audio) return;
  playing.add(audio);
  audio.onended = () => playing.delete(audio);
  audio.play();
}

export function getAudio(name) {
  if (audios[name]) {
    for (let i = 0; i < audios[name].length; i++) {
      if (audios[name][i].paused) return audios[name][i];
      if (i > 10) return;
    }
    const audio = audios[name][0].cloneNode();
    audios[name].push(audio);
    return audio;
  }
  const wave = jsfxr.sfxr.toWave(name);
  const audio = new Audio(wave.dataURI);
  audios[name] ||= [audio];
  const source = getContext().createMediaElementSource(audio);
  source.connect(gainNode);
  return audio;
}

function getContext() {
  if (context) return context;
  context = new AudioContext();
  gainNode = context.createGain();
  gainNode.connect(context.destination);
  return context;
}
