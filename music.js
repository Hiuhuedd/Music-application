const musicContainer = document.querySelector('.musiccontainer');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#previous');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progresscontainer');

const title = document.querySelector('#title');
const cover = document.querySelector('#cover');
const currentElement = document.querySelector('.currentTime');
// song titles
const songs = ['Mala Costumbre', 'Greet her', 'Tattoo', 'Te Quematse', 'De Verdad', 'Gucci ni Prada', 'No Encuentro Palabras', 'Loco Remix', 'Tevi']
console.log(songs.length)
    //keep track of the songs
let songIndex = 4;
//initially load song infor to the DOM
loadSong(songs[songIndex])
    //its conna take in the song and its array

//update song detail
function loadSong(song) {
    title.innerText = song
    audio.src = `music/${song}.mp3`
    cover.src = `./images/${song}.jpg`
}

function playSong() {
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')
    audio.play()
}



function pauseSong() {
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    audio.pause()
}

function prevSong() {
    songIndex--
    if (songIndex < 0) { songIndex = songs.length - 1 }
    loadSong(songs[songIndex])
    playSong()
}


function nextSong() {
    songIndex++
    if (songIndex > songs.length - 1) { songIndex = 0 }
    loadSong(songs[songIndex])
    playSong()
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`

    currentElement.innerHTML = format(convert(Math.floor(currentTime)))
}
//convert current time
function convert(time2) {
    hours = time2 / 3600
    minutes = Math.floor(time2 / 60 % 60)
    seconds = time2 % 60
    console.log(seconds)
    console.log(minutes)
    console.log(hours)
}

function format(final) {
    if (seconds < 10) seconds = ('0' + seconds)
    if (minutes < 10) minutes = ('0' + minutes)
    ms = `${minutes}:${seconds}`
    return ms
}




function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration
    audio.currentTime = (clickX / width) * duration


}

//event listeners
playBtn.addEventListener('click', function() {
    let Playing = musicContainer.classList.contains('play')

    if (Playing) { pauseSong() } else { playSong() }
});
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)
audio.addEventListener('ended', nextSong)