const modelParams = {
    flipHorizontal: true, // flip e.g for video 
    imageScaleFactor: 0.7, // reduce input image size for gains in speed.
    maxNumBoxes: 20, // maximum number of boxes to detect
    iouThreshold: 0.5, // ioU threshold for non-max suppression
    scoreThreshold: 0.79, // confidence threshold for predictions.
}


navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;

///select everything in my html
const video = document.querySelector('#video')
const audio = document.querySelector('#audio')
const canvas = document.querySelector('#canvas')
const erorMsg = document.querySelector('#eror_msg')
const context = canvas.getContext('2d')

let model;

handTrack.startVideo(video)
    .then(status => {
        if (status) {
            navigator.getUserMedia({ video: {} }, stream => {
                    video.srcObject = stream;
                    // runDetection() // when it out of comment then uncomment line of 30;
                    setInterval(runDetection, 1000)
                },
                err => (console.log(err))

            );
        }
    });



function runDetection() {
    model.detect(video)
        .then(predictions => {
            console.log(predictions);
            if (predictions.length > 0) {
                audio.play()
            }
            // requestAnimationFrame(runDetection)

            // model.renderPredictions(predictions, canvas, context, video)
        })
}

handTrack.load(model).then(lmodel => {
    model = lmodel

})

const displayErorMsg = () => {
    erorMsg.innerHTML = "<h3>Sorry!!!! Something went wrong. Please try again letter.</h3>"
}