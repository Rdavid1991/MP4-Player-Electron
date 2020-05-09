const path = require("path")
const { getElement } = require("./htmlElements");
const convert = require("./subtitle")

module.exports = track = {
    selectTrack: (dir, currentTrack) => {
        getElement.video_window.src = path.join(dir, currentTrack.innerText);
        getElement.subTrack.src = convert(dir,currentTrack.innerText.substring(0,currentTrack.innerText.lastIndexOf(".")))
        
        console.log(currentTrack.getAttribute("track"));
        
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
        for (let i = 0; i < getElement.btn_chapter.length; i++) {
            getElement.btn_chapter[i].parentNode.style.backgroundColor ="rgba(0, 0, 0, 0.541)";
            getElement.btn_chapter[i].parentNode.onmouseover = function () {this.style.backgroundColor = "background-color: gray";
            };
        }
        currentTrack.parentNode.style.backgroundColor = "#607D8B";
    }
}