// const { func } = require("joi");

const menuBtn= document.querySelector(".menu-btn"),
container = document.querySelector(".container");

menuBtn.addEventListener("click",()=>{
    container.classList.toggle("active");
});

const progressBar=document.querySelector(".bar"),
progressDot=document.querySelector(".dot"),
currentTimeEl=document.querySelector(".current-time"),

DurationEl=document.querySelector(".duration");

  

let playing =false,
currentSong=0,
shuffle=false,
repeat=false,
favourits=[],
audio=new Audio();

const songs=[
    {
        title: "Haule Haule",
        artist: "artist song 1",
        img_src: "Haule Song.jpg",
        src: "haule.mp3",
    },
    {
        title: "yeIshq",
        artist: "artist song 2",
        img_src: "jab we met.jpeg",
        src: "yeIshq.mp3",
    },
    {
        title: "maan mare jaan",
        artist: "artist song 3",
        img_src: "maan mare jaan.jpeg",
        src: "maanMareJaan.mp3",
    },
    {
        title: "jhommbe",
        artist: "artist song 4",
        img_src: "phatan.jpeg",
        src: "jhommbe.mp3",
    }
];


const playlistContainer =document.querySelector("#playlist"),
infoWrapper =document.querySelector(".info"),
coverImage =document.querySelector(".cover-image"),
currentSongTitle= document.querySelector(".current-song-title"),
currentFavourite= document.querySelector("#current-favourite");


function init(){
    updatePlaylist(songs);
    loadSong(currentSong);
}

init();


function updatePlaylist(songs){

    playlistContainer.innerHTML="";

    songs.forEach((song , index)=>{

    const { title, src } = song;

    const isFavourite = favourits.includes(index);


        const tr=document.createElement("tr");
    tr.classList.add("song");
    tr.innerHTML=
    `<tr class="song">
                <td class="no">
                    <h5>${index+1}</h5>
                </td>
                <td class="title">
                    <h6>${title}</h6>
                </td>
                <td class="length">
                    <h5>2:03</h5>
                </td>
                <td>
                    <i class="fas fa-heart${ isFavourite ?"active" : ""}"></i>
                </td>
            </tr>`;

    playlistContainer.appendChild(tr);
//when clicked on playlist
    tr.addEventListener("click",(e)=>{
        //my favourite

        if(e.target.classList.container("fa-heart")){
            addToFavourits(index);
            e.target.classList.toggle("active");
            return;
        }
        currentSong=index;
        loadSong(currentSong);
        audio.play();
        container.classList.remove("active");
        playPauseBtn.classList.replace("fa-play","fa-pause");
        playing=true;
    });
    const audioForDuration =new Audio(`data/${src}`);
    audioForDuration.addEventListener("loadedmetadata", ()=> {
        const duration =audioForDuration.duration;

        let songDuration =formateTime(duration);
        tr.querySelector(".length h5").innerText =songDuration;
    });
  });  

}

function formateTime(time){
    let minutes=Math.floor(time /60);
    let seconds =Math.floor(time %60);
    seconds=seconds < 10? `0${seconds}`: seconds;
    return `${minutes}:${seconds}`;
}

function loadSong(num){
    infoWrapper.innerHTML=`
    <h2>${songs[num].title}</h2>
    <h3>${songs[num].artist}</h3>
    `;

    currentSongTitle.innerHTML= songs[num].title;
//background image change
    coverImage.style.backgroundImage=`url(data/${songs[num].img_src})`;
//current song
    audio.src=`data/${songs[num].src}`;
//favourite songs
    if(favourits.includes(num)){
        currentFavourite.classList.add("active");
    }
    else{
        currentFavourite.classList.remove("active");

    }
}
//play and pause functionality
const playPauseBtn=document.querySelector("#playpause"),
nextBtn =document.querySelector("#next"),
prevBtn=document.querySelector("#prev");

playPauseBtn.addEventListener("click",()=>
{
    if(playing){
        playPauseBtn.classList.replace("fa-pause", "fa-play");
        playing=false;
        audio.pause();
    }
    else{
        playPauseBtn.classList.replace("fa-play", "fa-pause");
        playing=true;
        audio.play();
    }
    if(songs.play()){
        setInterval(()=>{
          progress.value=songs.currentTime;
        },500);
      }

});
//next song
function nextSong(){

    if(shuffle){
        shuffleFunc();
        loadSong(currentSong);

    }
    else if(currentSong <songs.length-1){
        currentSong++;
        // loadSong(currentSong);
    }
    else{
        currentSong=0;
    }
    loadSong(currentSong);
    if(playing){
        audio.play();
    }
    // else{
    //     audio.pause();
    // }
}
nextBtn.addEventListener("click",nextSong);

function prevSong(){

    if(shuffle){
        shuffleFunc();
        loadSong(currentSong);
        
    }


     else if(currentSong >0){
        currentSong--;
    }
    else{
        currentSong=songs.length -1;
    }
    loadSong(currentSong);
    if(playing){
        audio.play();
    }

}
//previous song
prevBtn.addEventListener("click",prevSong);

//favourite or unfavourite

function addToFavourits(index){
    if(favourits.includes(index)){
        favourits=favourits.filter((item)=>item !== index );
        currentFavourite.classList.remove("active");
    }
    else{
        favourits.push(index);
        if(index ===currentSong){
            currentFavourite.classList.add("active");

        }
    }
    updatePlaylist(songs);
}
//adding to favoutare while playing
currentFavourite.addEventListener("click",()=>
{
    addToFavourits(currentSong);
    currentFavourite.classList.toggle("avtive");
});

const shuffleBtn =document.querySelector("#shuffle");
function shuffleSongs(){
    shuffle=!shuffle;
    shuffleBtn.classList.toggle("active");

}
shuffleBtn.addEventListener("click", shuffleSongs);

function shuffleFunc(){
    if(shuffle){
        currentSong=Math.floor(Math.random()*songs.length);

    }

}
const repeatBtn=document.querySelector("#repeat");
function repeatSong(){
    if(repeat ===0){
        repeat =1;
        repeatBtn.classList.add("active");
    }
    else if(repeat ===1){
        repeat =2;
        repeatBtn.classList.add("active");
    }
    else if(repeat ===2){
        repeat =3;
        repeatBtn.classList.add("active");
    }
    else if(repeat ===3){
        repeat =4;
        repeatBtn.classList.add("active");
    }
    else{
        repeat =0;
        repeatBtn.classList.remove("active");
    
    }
}
repeatBtn.addEventListener("click",repeatSong);
//audio end repeat
audio.addEventListener("ended",()=>{
    if(repeat===1){
        loadSong(currentSong);
        audio.play();
    }
    else if(repeat===2){
        nextSong();
        audio.play();
    }
    else if(repeat===3){
        nextSong();
        audio.play();
    }
    else if(repeat===4){
        nextSong();
        audio.play();
    }
    else{
        if(currentSong===songs.length -1){
            audio.pause();
            playPauseBtn.classList.replace("fa-pause", "fa-play");
            playing=flase;
        }
        else{
            nextSong();
            audio.play();
        }
    }

});

function progress(){
    let{duration,currentTime}=audio;
    isNaN(duration)?(duration=0):duration;
    isNaN(currentTime)?(currentTime=0):currentTime;

    currentTimeEl.innerHTML=formateTime(currentTime);
    DurationEl.innerHTML=formateTime(duration);

    let progressPrecentage=(currentTime/duration)*100;
    progressDot.style.left=`${progressPercentage}%`;
}

audio.addEventListener("timeupdate",progress);

function setProgress(e){
    let width=this.clientWidth;
    let clickX=e.offsetX;
    let duration=audio.duration;
    audio.currentTime=(clickX/width)*duration;

}
progressBar.addEventListener("click",setProgress);

