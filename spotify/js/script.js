let currentSong = new Audio();
let songs;
let curFolder;

// function to convert seconds to minutes
function formatTime(seconds) {
    if (typeof seconds !== 'number' || isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    const paddedMins = String(mins).padStart(2, '0');
    const paddedSecs = String(secs).padStart(2, '0');

    return `${paddedMins}:${paddedSecs}`;
}

async function getSongs(folder) {
    curFolder = folder;
    let a = await fetch(`http://127.0.0.1:3000/songs/${folder}/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    songs = [];

    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`${folder}/`)[1]);
        }
    }

    let songUl = document.querySelector(".songList ul");
    songUl.innerHTML = "";

    const coverImgPath = `/songs/${folder}/cover.jpg`;

    for (const song of songs) {
        let name = song.replaceAll("%20", " ");
        songUl.innerHTML += `
        <li>
            <img class="img" src="${coverImgPath}" alt="">
            <div class="info">
                <div>${name}</div>
                <div>Me</div>
            </div>
            <div class="playNow">
                <span>Play Now</span>
                <img class="img" src="/img/player_icon3.png" alt="">
            </div>
        </li>`;
    }

    Array.from(document.querySelector(".songList").getElementsByTagName("li"))
        .forEach((e) => {
            e.addEventListener("click", (element) => {
                playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
            });
        });

    return songs;
}

let playMusic = (track, pause = false) => {
    currentSong.src = `/songs/${curFolder}/` + track;
    if (!pause) {
        currentSong.play();
        play.src = "/img/pause.svg";
    }
    document.querySelector('.songinfo').innerHTML = decodeURI(track);
    document.querySelector('.songtime').innerHTML = "00.00 : 00.00";
};

async function displayAlbums() {
    let a = await fetch(`http://127.0.0.1:3000/songs/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a");
    let cardContainer = document.querySelector('.card-container');
    let array = Array.from(anchors);

    for (let index = 0; index < array.length; index++) {
        const e = array[index];
        if (e.href.includes("/songs")) {
            let folder = e.href.split("/").slice(-2)[0];

            let a = await fetch(`http://127.0.0.1:3000/songs/${folder}/info.json`);
            let response = await a.json();
            console.log(response);

            cardContainer.innerHTML += `
            <div data-folder="${folder}" class="card">
                <div class="icon"><img src="/img/play_musicbar.png" alt=""></div>
                <img src="/songs/${folder}/cover.jpg" alt="">
                <h2>${response.title}</h2>
                <p>${response.description}</p>
            </div>`;
        }
    }

    Array.from(document.getElementsByClassName('card')).forEach(e => {
        e.addEventListener('click', async item => {
            songs = await getSongs(`${item.currentTarget.dataset.folder}`);
            playMusic(songs[0]);
        });
    });
}

async function main() {
    await getSongs("chaar");
    playMusic(songs[0], true);

    displayAlbums();

    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "/img/pause.svg";
        } else {
            currentSong.pause();
            play.src = "/img/player_icon3.png";
        }
    });

    currentSong.addEventListener('timeupdate', () => {
        document.querySelector('.songtime').innerHTML = `${formatTime(currentSong.currentTime)} : ${formatTime(currentSong.duration)}`;
        document.querySelector('.circle').style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    });

    document.querySelector('.seekbar').addEventListener('click', e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector('.circle').style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100;
    });

    prev.addEventListener('click', () => {
        let index = songs.indexOf(currentSong.src.split('/').slice(-1)[0]);
        if (index - 1 >= 0) {
            currentSong.pause();
            playMusic(songs[index - 1]);
        }
    });

    next.addEventListener('click', () => {
        let index = songs.indexOf(currentSong.src.split('/').slice(-1)[0]);
        if (index + 1 < songs.length) {
            currentSong.pause();
            playMusic(songs[index + 1]);
        }
    });

    document.querySelector('.hamburger').addEventListener('click', () => {
        document.querySelector('.left').style.left = 0;
    });

    document.querySelector('.close').addEventListener('click', () => {
        document.querySelector('.left').style.left = "-120%";
    });

    document.querySelector('.input').getElementsByTagName("input")[0].addEventListener('click', (e) => {
        currentSong.volume = parseInt(e.target.value) / 100;
        if (currentSong.volume > 0) {
            document.querySelector('.volume img').src = "/img/volume.svg";
        }
    });

    document.querySelector('.volume img').addEventListener('click', e => {
        if (e.target.src.includes("volume.svg")) {
            e.target.src = "/img/mute.svg";
            currentSong.volume = 0;
            document.querySelector(".input").getElementsByTagName("input")[0].value = 0;
        } else {
            e.target.src = "/img/volume.svg";
            currentSong.volume = 0.10;
            document.querySelector(".input").getElementsByTagName("input")[0].value = 10;
        }
    });
}
main();
