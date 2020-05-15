
const {getFolderName, getFolderimgView} = require("./helpers");

module.exports = {
    getElement: {
        trackSection: document.getElementsByClassName("track_section"),
        video_window: document.getElementById("video"),
        video_details: document.getElementById("videoDetails"),
        view_check: document.getElementsByClassName("view_check"),
        side_nav: document.getElementById("mySidenav"),
        menuButton: document.getElementById("menu-button"),
        listFolder :document.getElementById("list-folder"),
        backButton:document.getElementById("back-button"),
        subTrack : document.getElementsByTagName("track")[0],
        folderTitle: document.getElementById("folderTitle"),
        viewToggle: document.getElementById("view-toggle"),
        folderItem:document.getElementsByName("folder-item"),
        imgFolder:document.getElementsByName("img-folder")
    },

    create: {
        elements: (element)=> {
            return document.createElement(element);
        },
    },

    stringElement: {
        //Return name folder to principal folders
        nameFolder: (folder) => {
            return `<div name="img-folder" class="${getFolderimgView()}"></div><p>${getFolderName(folder)}</>`;
        },

        trackSectionString: (trackElement) =>{
            return `<div class="track_section" id="track-section">${trackElement.outerHTML}<input class="view_check" type="checkbox"></div`;
        },

        getHTMLFolder:(folderName)=>{
            return `<div name="img-folder" class="${getFolderimgView()}"></div><p>${folderName}</p>`;
        }
    },
};
