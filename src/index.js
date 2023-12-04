import { getScreenId, setVideoStyle, removeOld, populateWebcamFeed } from './helpers.js';

const timers = [];
const screenId = `screen-${getScreenId()}`;

function removeScreen() {
  console.log(`removing screen ${screenId}`);
  localStorage.removeItem(screenId);
}

window.addEventListener('beforeunload', removeScreen);

function run() {
  timers.push(setInterval(removeOld, 100));
  timers.push(setInterval(setVideoStyle, 10));
}

run();

populateWebcamFeed();
