/* jshint esversion: 8 */

class Video extends Slide {
    constructor(url, mediaElement, loadCallback, endedCallback) {
        super();
        this.url = url;
        this.player = mediaElement;
        this.player.addEventListener("ended", this.videoDone.bind(this));
        this.loadCallback = loadCallback;
        this.endedCallback = endedCallback;
        this.videos = [];
        this.index = 0;

        this.loadVideos();
    }

    async loadVideos() {
        // await this.getVideoData();
        await this.createDummyData();
        this.loadCallback();
    }

    /**
     * Load video data from a URL
     */
    async getVideoData() {
        let response = await fetch(this.url);

        if (response.ok) {
            // if HTTP-status is 200-299
            // get the response body (the method explained below)
            let json = await response.json();
            console.log(json);
            this.videos = [];

            json.forEach((info) => {
                console.log(info.title.rendered);
                this.videos.push({
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
     * When a video is done playing
     */
    videoDone() {
        this.endedCallback();

        // this.index = ++this.index % this.videos.length;
        // this.playVideo();
    }

    nextVideo(){
        this.index = ++this.index % this.videos.length;
    }

    /**
     * Load the data of the next video and plays it
     */
    playVideo() {
        const videoInfo = this.videos[this.index];

        this.setVideoSource(videoInfo.file);

        this.showTitle(videoInfo.title);

        this.showAuthors(videoInfo.creators);

        this.showQRCode(videoInfo.url);
    }

    /**
     * Set the source of the video element
     * @param {string} videoFile the filename of the video
     */
    setVideoSource(videoFile) {
        console.log(`playing ${videoFile}`);
        document.getElementById("myVideo").src = videoFile;
    }

    /**
     * Show the title of the video
     * @param {string} videoTitle The title of the video
     */
    showTitle(videoTitle) {
        document.getElementById("video-title").innerText = videoTitle;
    }

    /**
     * Generate and display a string of authors with middot as seperator
     * @param {array} authors THe authors of the game
     */
    showAuthors(authors) {
        let out = authors.join(" &middot; ");
        document.getElementById("authors").innerHTML = out;
    }

    /**
     * Generate a QR code for the URL
     * Uses: https://code-boxx.com/generate-qr-code-javascript/
     * @param {string} url The URL for the QR code
     */
    showQRCode(url) {
        document.getElementById("qr").innerHTML = "";
        var qrc = new QRCode(document.getElementById("qr"), {
            text: url,
            width: 250,
            height: 250,
        });
    }

    /**
     * Generate test data of the video
     */
    async createDummyData() {
        this.videos = [];
        this.videos.push(
            {
                file: "media/SpaceGolf.mp4",
                title: "Space Golf",
                creators: ["Pelle", "Stupid++"],
                url: "https://stupidplusplus.itch.io/generally-relative-space-golf",
            },
            {
                file: "media/tiled.mp4",
                title: "Working with tiles, Tiled and Phaser",
                creators: ["manno bult"],
                url: "http://www.manno.nl",
            },
            {
                file: "media/spritesheets.mp4",
                title: "Working with spritesheets and Phaser",
                creators: ["manno bult"],
                url: "http://www.manno.nl",
            }
        );
    }
}
