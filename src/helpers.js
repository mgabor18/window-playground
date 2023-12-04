const video = document.querySelector('video');

function getScreens() {
  return Object.entries(window.localStorage)
    .filter(([key]) => key.startsWith('screen-'))
    .map(([key, value]) => [key, JSON.parse(value)]);
}

export function getScreenId() {
  const existingScreens = Object.keys(window.localStorage)
    .filter((key) => key.startsWith('screen-'))
    .map((key) => parseInt(key.replace('screen-', '')))
    .sort((a, b) => a - b);
  return existingScreens.at(-1) + 1 || 1;
}

export function setVideoStyle() {
  video.setAttribute('style', `transform: translate(-${window.screenX}px, -${window.screenY}px)`);
}

export function populateWebcamFeed() {
  navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
    if (!video) return;
    video.srcObject = stream;
    video.width = window.screen.availWidth;
    video.height = window.screen.availHeight;
    video.play();
  });
}

export function removeOld() {
  const screens = getScreens();
  for (const [key, screen] of screens) {
    if (Date.now() - screen.updated > 1000) {
      localStorage.removeItem(key);
    }
  }
}
