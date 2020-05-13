const { getElement, create, stringElement } = require("./htmlElements");
const { getSubtitle } = require("./subtitle");

module.exports = {
    selectTrack: (dirArray, selectTrack) => {
        let track = dirArray.find(obj => obj.name === selectTrack.innerText);
        getElement.video_window.setAttribute("nameFile", track.name);
        getElement.video_window.src = track.route;
        getElement.subTrack.src = getSubtitle(track.route.substring(0, track.route.lastIndexOf(".")));
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

    trackViewStyle: (trackArray) => {
        let trackSection = Array.from(getElement.trackSection);

        if (trackSection.length > 0) {

            for (let i = 0; i < trackSection.length; i++) {
                trackSection[i].lastElementChild.checked = trackArray[i].view;
            }
            trackSection.forEach((element) => {
                element.style.backgroundColor = "rgba(0, 0, 0, 0.541)";
                if (element.innerText === getElement.video_window.getAttribute("nameFile")) {
                    element.style.backgroundColor = "#607D8B";
                }
            });

        }
    },

    createTrackView: (track) => {
        let trackElement = create.elements("div");
        trackElement.innerHTML = track;
        trackElement.setAttribute("class", "btn_chapter");
        getElement.listFolder.innerHTML += stringElement.trackSectionString(trackElement);

        return trackElement;
    }
};