const { ipcRenderer } = require("electron");
const { remote } = require('electron')
const { create, getElement, stringElement } = require("./htmlElements");
const { principalFolder, saveHistoryFolder, loadHistoryFolder } = require("./directory");
const { cleanSelectChapter, selectTrack, changeViewStatus, trackViewStyle } = require("./track");
const convert = require("./subtitle")
const fs = require("fs");
const path = require("path");

let saveViews = [];
let historyFolders = [];
let backHistory = [];
let tracks = []

getElement.video_window.disablePictureInPicture = true;
getElement.video_window.textTracks[0].mode = "showing"

function cleanLocalStorage(){
    for (let i = 0; i < saveViews.length; i++) {
        if(saveViews[i].view === false){
            saveViews.splice(i, 1);
        }
    }
}

function readFileFolder(dir) {
    let trackElement;

    getElement.listFolder.innerHTML = "";

    let files = fs.readdirSync(dir)

    const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base", });
    files.sort(collator.compare);

    if (files.find((item) => item.match(/.mp4/g))) {
        cleanLocalStorage()
        tracks = []
        for (let i = 0; i < files.length; i++) {
            if (files[i].match(/.mp4/g)) {
                trackElement = create.elements("div");
                trackElement.innerHTML = files[i];
                trackElement.setAttribute("class", "btn_chapter");
                getElement.listFolder.innerHTML += stringElement.trackSectionString(trackElement)

                let obj = saveViews.find((obj) => obj.title === trackElement.innerHTML);
                if (!obj) {
                    saveViews.push({
                        title: trackElement.innerHTML,
                        view: false,
                    });
                }

                tracks.push({
                    name: files[i],
                    route: path.join(dir, files[i]),
                    view: false
                })
            }
        }
        getElement.listFolder.classList.replace("folder-list", "list");

        //Asigna los valores de visto a los checkbox
        if (localStorage.length > 0) {
            for (let i = 0; i < getElement.view_check.length; i++) {
                let obj = saveViews.find((obj) => obj.title === getElement.view_check[i].previousSibling.innerHTML);
                getElement.view_check[i].checked = obj ? obj.view : false;
                tracks[i].view = obj ? obj.view : false
            }
        }
    } else {
        getElement.listFolder.classList.replace("list", "folder-list");
        loadHistoryFolder(dir, files);
    }

    localStorage.setItem("local", JSON.stringify(saveViews));

}

ipcRenderer.on("dir", (err, dir) => {
    if (historyFolders > 0) {
        if (!historyFolders.find((obj) => obj.name === dir)) {
            historyFolders.push({ name: dir });
            saveHistoryFolder(historyFolders);
            principalFolder(dir);
        }
    } else {
        historyFolders.push({ name: dir });
        saveHistoryFolder(historyFolders);
        principalFolder(dir);
    }
});

//when video is finish
getElement.video_window.onended = () => {

    let currentVideo = getElement.video_window.getAttribute("nameFile")
    let index = tracks.find(obj => obj.name === currentVideo);
    index.view = true

    nextTrack = tracks.indexOf(index)


    let obj = saveViews.find(
        (obj) => obj.title === currentVideo
    );
    if (obj) {
        obj.view = true;
        localStorage.setItem("local", JSON.stringify(saveViews));
    }

    if (nextTrack < tracks.length) {
        setTimeout(() => {
            nextTrack++;
            getElement.video_window.setAttribute("nameFile", tracks[nextTrack].name)
            getElement.video_window.src = tracks[nextTrack].route
            getElement.subTrack.src = convert(tracks[nextTrack].route.substring(0, tracks[nextTrack].route.lastIndexOf(".")))

            trackViewStyle(tracks)

            //cleanSelectChapter(checkView, trackSecArray);
        }, 1500);
    }
};

//Select track or folder
getElement.listFolder.addEventListener("click", (e) => {
    if (e.target.parentNode.className === "folders_items") {
        let folder = e.target.parentNode.getAttribute("route");
        backHistory.push(folder);
        readFileFolder(folder);
        trackViewStyle(tracks)
    } else if (e.target.className === "btn_chapter") {
        selectTrack(tracks, e.target);
        trackViewStyle(tracks)
    } else if (e.target.className === "view_check") {
        saveViews = changeViewStatus(e.target, saveViews);
        localStorage.setItem("local", JSON.stringify(saveViews));
    }
});

getElement.backButton.addEventListener("click", (e) => {
    if (backHistory.length > 1) {
        let route = backHistory.pop();
        route = route.substring(0, route.lastIndexOf("\\"));
        readFileFolder(route);
    } else {
        getElement.listFolder.classList.replace("list", "folder-list");
        getElement.listFolder.innerHTML = "";
        historyFolders = JSON.parse(localStorage.getItem("folders"));

        historyFolders.forEach((e) => {
            principalFolder(e.name);
        });
        backHistory = [];
    }
});

getElement.menuButton.addEventListener('click', (e) => {
    let menu = getElement.menuButton.classList.toggle('change');
    if (menu) {
        getElement.side_nav.style.display = "block";
    } else {
        getElement.side_nav.style.display = "none";
    }
});

if (localStorage.getItem("local")) {
    saveViews = JSON.parse(localStorage.getItem("local"));
}

if (localStorage.getItem("folders")) {
    historyFolders = JSON.parse(localStorage.getItem("folders"));
    historyFolders.forEach((e) => {
        principalFolder(e.name);
    });
}