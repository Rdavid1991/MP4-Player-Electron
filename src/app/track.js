const path = require("path")
const { getElement } = require("./htmlElements");
const convert = require("./subtitle")

module.exports = track = {
    selectTrack: (dirArray, currentTrack) => {

        let track = dirArray.find(obj => obj.name === currentTrack.innerText)

        getElement.video_window.setAttribute("nameFile", track.name)
        getElement.video_window.src = track.route
        getElement.subTrack.src = convert(track.route.substring(0, track.route.lastIndexOf(".")))

        return currentTrack.getAttribute("track");
    },

    changeViewStatus: (checkView, saveArray) => {
        if (saveArray.length > 0) {
            let obj = saveArray.find(
                (obj) => obj.title === checkView.previousSibling.innerHTML
            );
            if (obj) {
                obj.view = !obj.view;
            }
        }
        return saveArray;
    },

    cleanSelectChapter: (currentTrack) => {

        currentTrack.style.backgroundColor = "rgba(0, 0, 0, 0.541)";
        currentTrack.onmouseover = function () {
            this.style.backgroundColor = "background-color: gray";
        };

        currentTrack.style.backgroundColor = "#607D8B";
    },
    trackViewStyle: (trackArray) => {
        let trackSection = Array.from(getElement.trackSection)

        if (trackSection.length > 0) {

            for (let i = 0; i < trackSection.length; i++) {
                trackSection[i].lastElementChild.checked = trackArray[i].view
            }
            trackSection.forEach((element) => {

                console.log(element.innerText);
                element.style.backgroundColor = "rgba(0, 0, 0, 0.541)"
                if (element.innerText === getElement.video_window.getAttribute("nameFile")) {
                    element.style.backgroundColor = "#607D8B";
                }
            })

        }
    }
}