
const {getFolderName} = require("./helpers");

module.exports = {
    getElement: {
        reproducer_list: document.getElementsByClassName("reproducer-list")[0],
        trackSection: document.getElementsByClassName("track_section"),
        video_window: document.getElementById("video"),
        video_details: document.getElementById("videoDetails"),
        view_check: document.getElementsByClassName("view_check"),
        side_nav: document.getElementById("mySidenav"),
        menuButton: document.getElementById("menu-button"),
        listFolder :document.getElementById("list-folder"),
        backButton:document.getElementById("back-button"),
        subTrack : document.getElementsByTagName("track")[0],
        folderTitle: document.getElementById("folderTitle")
    },

    create: {
        elements: (element)=> {
            return document.createElement(element);
        },
    },

    stringElement: {
        nameFolder: (folder) => {
            return `<div class="img-folder"></div><p>${getFolderName(folder)}</>`;
        },

        trackSectionString: (trackElement) =>{
            return `<div class="track_section" id="track-section">${trackElement.outerHTML}<input class="view_check" type="checkbox"></div`;
        }
    },
};
