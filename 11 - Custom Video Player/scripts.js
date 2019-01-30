// Get Elements

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Build functions

function togglePlay () {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  // console.log(icon);
}

function skip() {
  // console.log(this.dataset.skip);
  video.currentTime += parseFloat(this.dataset.skip);
}

function handeRangeUpdate () {
  video[this.name] = this.value;
}

// calculate length based on flex-basis

function handleProgress () {
 // get video percentage
 const percent = (video.currentTime / video.duration) * 100;
 progressBar.style.flexBasis = `${percent}%`;
}

// controls click to skip video and start at clicked screen location (time remaining)
function scrub (e) {
//  console.log(e);
 // calculates percentage of remaining time
 const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
 video.currentTime = scrubTime;
 }

// Hook up event listeners 

// activates when clicking on video
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);


// activates when clicking on button
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change',handeRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove',handeRangeUpdate));


let mousedown = false;
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (e) =>{ 
  mousedown && scrub(e);
})
progress.addEventListener('mousedown',() => mousedown = true);
progress.addEventListener('mouseup',() => mousedown = false);


