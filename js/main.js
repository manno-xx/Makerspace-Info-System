/* jshint esversion: 8 */

window.addEventListener("load", init);

let videoControl = null;

function init() {
    videoControl = new Video(
        "http://cmdgroningen.nl/makerspace/wp-json/wp/v2/media?media_type=video",
        document.querySelector("#myVideo"),
        isVideoPrepared,
        isVideoDone
    );
}



function isVideoPrepared() {
    console.log("video playback starts");
    videoControl.playVideo();
}

function isVideoDone(){
    console.log("video done");
    videoControl.nextVideo();
    videoControl.playVideo();
}