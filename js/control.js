/* jshint esversion: 8 */

// const url = "http://verbouw.manno.nl/wp-json/wp/v2/media?media_type=video";
const url =
    "http://cmdgroningen.nl/makerspace/wp-json/wp/v2/media?media_type=video";

let videos;
let index = 0;

window.addEventListener("load", init);

/**
 * At page load, initialize everything
 */
async function init() {
    let video = document.querySelector("#myVideo");
    video.addEventListener("ended", videoDone);

    await getVideoData();
    // createVideoData();
    nextVideo(index);
}

/**
 * Load video data from a URL
 */
async function getVideoData() {
    let response = await fetch(url);

    if (response.ok) {
        // if HTTP-status is 200-299
        // get the response body (the method explained below)
        let json = await response.json();
        console.log(json);
        videos = [];

        json.forEach((info) => {
            console.log(info.title.rendered);
            videos.push({
                file: info.source_url,
                title: info.title.rendered,
                creators: ["Pelle", "Stupid++"],
                url: "https://stupidplusplus.itch.io/generally-relative-space-golf",
            });
        });
    } else {
        alert("HTTP-Error: " + response.status);
    }
}

/**
 * Generate test data of the video
 */
function createVideoData() {
    videos = [];
    videos.push(
        {
            file: "SpaceGolf.mp4",
            title: "Space Golf",
            creators: ["Pelle", "Stupid++"],
            url: "https://stupidplusplus.itch.io/generally-relative-space-golf",
        },
        {
            file: "tiled.mp4",
            title: "Working with tiles, Tiled and Phaser",
            creators: ["manno bult"],
            url: "http://www.manno.nl",
        },
        {
            file: "spritesheets.mp4",
            title: "Working with spritesheets and Phaser",
            creators: ["manno bult"],
            url: "http://www.manno.nl",
        }
    );
}

/**
 * When a video is done playing
 */
function videoDone() {
    console.log("video done");
    index = ++index % videos.length;
    nextVideo(index);
}

/**
 * Load the data of the next video and plays it
 * @param {number} index The index in the array of the data of the video
 */
function nextVideo(index) {
    const videoInfo = videos[index];

    playVideo(videoInfo.file);

    showTitle(videoInfo.title);

    showAuthors(videoInfo.creators);

    showQRCode(videoInfo.url);
}

/**
 * Set the source of the video element
 * @param {string} videoFile the filename of the video
 */
function playVideo(videoFile) {
    console.log(`playing ${videoFile}`);
    document.getElementById("myVideo").src = videoFile;
}

/**
 * Show the title of the video
 * @param {string} videoTitle The title of the video
 */
function showTitle(videoTitle) {
    document.getElementById("title").innerText = videoTitle;
}

/**
 * Generate and display a string of authors with middot as seperator
 * @param {array} authors THe authors of the game
 */
function showAuthors(authors) {
    let out = authors.join(" &middot; ");
    document.getElementById("creators").innerHTML = out;
}

/**
 * Generate a QR code for the URL
 * Uses: https://code-boxx.com/generate-qr-code-javascript/
 * @param {string} url The URL for the QR code
 */
function showQRCode(url) {
    document.getElementById("qr").innerHTML = "";
    var qrc = new QRCode(document.getElementById("qr"), {
        text: url,
        width: 75,
        height: 75,
    });
}
