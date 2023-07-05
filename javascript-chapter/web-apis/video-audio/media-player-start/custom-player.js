const media = document.querySelector("video");
const controls = document.querySelector(".controls");

const play = document.querySelector(".play");
const stop = document.querySelector(".stop");
const rwd = document.querySelector(".rwd");
const fwd = document.querySelector(".fwd");

const timerWrapper = document.querySelector(".timer");
const timer = document.querySelector(".timer span");
const timerBar = document.querySelector(".timer div");

// const rect = timerWrapper.getBoundingClientRect().left; //Not sure why this is different than e.target.getBounding...

media.removeAttribute("controls");
controls.style.visibility = "visible";

play.addEventListener("click", playPauseMedia);

function playPauseMedia() {
    rwd.classList.remove("active");
    fwd.classList.remove("active");
    clearInterval(intervalRwd);
    clearInterval(intervalFwd);

    if (media.paused) {
      play.setAttribute("data-icon", "u");
      media.play();
    } else {
      play.setAttribute("data-icon", "P");
      media.pause();
    }
}

stop.addEventListener("click", stopMedia);
media.addEventListener("ended", stopMedia);
media.addEventListener("timeupdate", setTime);
timerWrapper.addEventListener("click", jumpTo);
// document.addEventListener("click", (e) => console.log(`${e.x}, ${rect}`));


function stopMedia() {
    media.pause();
    media.currentTime = 0;
    play.setAttribute("data-icon", "P");

    rwd.classList.remove("active");
    fwd.classList.remove("active");
    clearInterval(intervalRwd);
    clearInterval(intervalFwd);
}

rwd.addEventListener("click", mediaBackward);
fwd.addEventListener("click", mediaForward);

let intervalFwd;
let intervalRwd;

function mediaBackward() {
  clearInterval(intervalFwd);
  fwd.classList.remove("active");

  if (rwd.classList.contains("active")) {
    rwd.classList.remove("active");
    clearInterval(intervalRwd);
    media.play();
  } else {
    rwd.classList.add("active");
    media.pause();
    intervalRwd = setInterval(windBackward, 200);
  }
}

function mediaForward() {
  clearInterval(intervalRwd);
  rwd.classList.remove("active");

  if (fwd.classList.contains("active")) {
    fwd.classList.remove("active");
    clearInterval(intervalFwd);
    media.play();
  } else {
    fwd.classList.add("active");
    media.pause();
    intervalFwd = setInterval(windForward, 200);
  }
}

function windBackward() {
    if (media.currentTime <= 3) {
      stopMedia();
    } else {
      media.currentTime -= 3;
    }
}
  
function windForward() {
    if (media.currentTime >= media.duration - 3) {
      stopMedia();
    } else {
      media.currentTime += 3;
    }
}
   
function setTime() {
    const hours = Math.floor(media.currentTime / 3600);
    const minutes = Math.floor((media.currentTime - hours * 3600) / 60);
    const seconds = Math.floor(media.currentTime - (hours * 3600) - (minutes * 60));
  
    const hourValue = hours.toString().padStart(2, "0");
    const minuteValue = minutes.toString().padStart(2, "0");
    const secondValue = seconds.toString().padStart(2, "0");
  
    const mediaTime = `${hourValue}:${minuteValue}:${secondValue}`;
    timer.textContent = mediaTime;
  
    const barLength =
      timerWrapper.clientWidth * (media.currentTime / media.duration);
    timerBar.style.width = `${barLength}px`;
}

function jumpTo(e) {

    const leftBound = e.currentTarget.getBoundingClientRect().left;
    const distance = e.x - leftBound; 
    const timerWidth = timerWrapper.clientWidth;
    const timeStamp = distance / timerWidth;

    media.currentTime = (media.duration * timeStamp);
}
