"use strict";

const { dialog } = require("electron").remote;
const { getElement } = require("./htmlElements");
const { principalFolder, createFolderView, getMainfolder } = require("./directory");
const { selectTrack, changeViewStatus, trackViewStyle, createTrackView } = require("./track");
const { getFolderName, getFolderView, setLocalStorage, getLocalStorage } = require("./helpers");
const { getSubtitle } = require("./subtitle");
const { gridToList, listToGrid } = require("./views");
const fs = require("fs");
const path = require("path");

let backHistory = [];
let tracks = [];

let saveViews = getLocalStorage("local");
let historyFolders = getLocalStorage("folder") || [];
historyFolders.forEach((e) => {
    principalFolder(e.name);
});


getElement.video_window.disablePictureInPicture = true;
getElement.video_window.textTracks[0].mode = "showing";
getElement.listFolder.classList = getFolderView();

function cleanLocalStorage() {
    for (let i = 0; i < saveViews.length; i++) {
        if (saveViews[i].view === false) {
            saveViews.splice(i, 1);
        }
    }
}

function readFileFolder(dir) {

    getElement.listFolder.innerHTML = "";

    let files = fs.readdirSync(dir);

    const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base", });
    files.sort(collator.compare);

    if (files.find((item) => item.match(/.mp4/g))) {
        cleanLocalStorage();
        tracks = [];
        for (let i = 0; i < files.length; i++) {
            if (files[i].match(/.mp4/g)) {

                createTrackView(files[i]);

                let obj = saveViews.find((obj) => obj.title === files[i]);
                if (!obj) {
                    saveViews.push({
                        "title": files[i],
                        "view": false,
                    });
                }

                tracks.push({
                    "name": files[i],
                    "route": path.join(dir, files[i]),
                    "view": false
                });
            }
        }

        getElement.listFolder.classList.replace(getFolderView(), "list");

        if (saveViews.length > 0) {
            for (let i = 0; i < getElement.view_check.length; i++) {
                let obj = saveViews.find((obj) => obj.title === getElement.view_check[i].previousSibling.innerHTML);
                getElement.view_check[i].checked = obj ? obj.view : false;
                tracks[i].view = obj ? obj.view : false;
            }
        }
    } else {
        getElement.listFolder.classList.replace("list", getFolderView());
        createFolderView(dir, files);
    }

    localStorage.setItem("local", JSON.stringify(saveViews));
}

//when video is finish
getElement.video_window.onended = () => {

    let currentVideo = getElement.video_window.getAttribute("nameFile");
    let index = tracks.find(obj => obj.name === currentVideo);
    index.view = true;

    let nextTrack = tracks.indexOf(index);


    let obj = saveViews.find((obj) => obj.title === currentVideo);
    if (obj) {
        obj.view = true;
        localStorage.setItem("local", JSON.stringify(saveViews));
    }
    setTimeout(() => {
        if (nextTrack < tracks.length - 1) {
            nextTrack++;
            getElement.video_window.setAttribute("nameFile", tracks[nextTrack].name);
            getElement.video_window.src = tracks[nextTrack].route;
            getElement.subTrack.src = getSubtitle(tracks[nextTrack].route.substring(0, tracks[nextTrack].route.lastIndexOf(".")));
        }
        trackViewStyle(tracks);
    }, 1500);
};

//Select track or folder
getElement.listFolder.addEventListener("dblclick", (e) => {

    if (e.target.parentNode.getAttribute("name") === "folder-item") {

        let routeFolder = e.target.parentNode.getAttribute("route");
        backHistory.push(routeFolder);
        readFileFolder(routeFolder);
        trackViewStyle(tracks);

        getElement.folderTitle.innerHTML = getFolderName(routeFolder);

    } else if (e.target.className === "btn_chapter") {
        selectTrack(tracks, e.target);
        trackViewStyle(tracks);
    } else if (e.target.className === "view_check") {
        saveViews = changeViewStatus(e.target, saveViews);
        setLocalStorage("local",saveViews);
    }
});

getElement.menuButton.addEventListener("click", () => {
    let menu = getElement.menuButton.classList.toggle("change");
    if (menu) {
        getElement.side_nav.style.display = "block";
    } else {
        getElement.side_nav.style.display = "none";
    }
});

getElement.viewToggle.addEventListener("click", (e) => {
    switch (e.target.id) {
        case "grid":
            listToGrid();
            break;

        case "list":
            gridToList();
            break;

        case "add":
            dialog.showOpenDialog({ properties: ["openDirectory"] })
                .then(dirArray => {

                    if (dirArray.filePaths.length > 0) {
                        let dir = dirArray.filePaths[0];

                        if (historyFolders.length > 0) {
                            if (!historyFolders.find((obj) => obj.name === dir)) {
                                historyFolders.push({ "name": dir });
                                setLocalStorage("folder", historyFolders);
                                getMainfolder();
                            }
                        } else {
                            historyFolders.push({ "name": dir });
                            setLocalStorage("folder", historyFolders);
                            getMainfolder();
                        }
                    }
                });
            break;

        case "back":
            if (backHistory.length > 1) {
                let route = backHistory.pop();
                route = route.substring(0, route.lastIndexOf("\\"));
                readFileFolder(route);
                getElement.folderTitle.innerHTML = getFolderName(route);
            } else {
                getMainfolder();
                backHistory = [];
            }
            break;

        default:
            break;
    }
});

//shell.openItem("C:\\Users\\david\\Downloads\\Teoria_Charla.pptx")

//shell.showItemInFolder("C:\\Users\\david\\Downloads")

//shell.beep()