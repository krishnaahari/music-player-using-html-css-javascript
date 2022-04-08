const wrapper=document.querySelector(".wrapper"),
musicimg=wrapper.querySelector(".img-area img"),
musicname=wrapper.querySelector(".song-detail .name"),
musicartist=wrapper.querySelector(".song-detail .artist"),
mainaudio=wrapper.querySelector("#main-audio"),
playpause=wrapper.querySelector(".play-pause"),
prevbtn=wrapper.querySelector("#prev"),
nextbtn=wrapper.querySelector("#next"),
progressbar=wrapper.querySelector(".progress-bar");


let musicindex=2;

window.addEventListener("load", ()=>{
	loadmusic(musicindex);
})

function loadmusic(indexnumb){
         musicname.innerText = allmusic[indexnumb-1].name;
         musicartist.innerHTML = allmusic[indexnumb-1].artist;
         musicimg.src =  `C:/Users/krishna/Pictures/Saved Pictures/${allmusic[indexnumb-1].img}.jpg`;
          mainaudio.src =  `C:/Users/krishna/Music/English songs/${allmusic[indexnumb-1].src}.mp3`;
}

function playmusic(){
    wrapper.classList.add("paused");
    playpause.querySelector("i").innerHTML = "pause";
    mainaudio.play();

}
function pausemusic(){
     wrapper.classList.remove("paused");
      playpause.querySelector("i").innerHTML = "play_arrow";
    mainaudio.pause();

}

function nextmusic(){
    musicindex++;
    musicindex >allmusic.length? musicindex=1 : musicindex=musicindex;
    loadmusic(musicindex);
    playmusic();

}
function prevmusic(){
    musicindex--;
    musicindex < 1 ? musicindex=allmusic.length : musicindex=musicindex;
    loadmusic(musicindex);
    playmusic();

}
playpause.addEventListener("click", ()=>{
       const ismusicpaused = wrapper.classList.contains("paused");

       ismusicpaused? pausemusic():playmusic();
})

nextbtn.addEventListener("click", ()=>{
    nextmusic();
});

prevbtn.addEventListener("click", ()=>{
    prevmusic();
});

mainaudio.addEventListener("timeupdate",(e)=>{
         const currentTime=e.target.currentTime;
         const duration=e.target.duration;
         let progresswidth=(currentTime/duration)*100;
         progressbar.style.width=`${progresswidth}%`;
let musicurrenttime=wrapper.querySelector(".current");
let musicduration=wrapper.querySelector(".duration");
         mainaudio.addEventListener("loadeddata",()=>{
            let audioduratiion=mainaudio.duration;
            const totalmin=Math.floor(audioduratiion/60);
            const totalsec=Math.floor(audioduratiion%60);
            if(totalsec<10){
                totalsec=`0${totalsec}`;
            }
            musicduration.innerText=`${totalmin}:${totalsec}`;
         });
          let currentmin=Math.floor(currentTime / 60);
            let currentsec=Math.floor(currentTime % 60);
            if(currentsec<10){
                currentsec=`0${currentsec}`;
            }
            musicurrenttime.innerText=`${currentmin}:${currentsec}`;
})