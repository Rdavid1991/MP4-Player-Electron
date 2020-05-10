const { ipcRenderer } = require("electron");
const { create, getElement, stringElement } = require("./htmlElements");
const { principalFolder, saveHistoryFolder, loadHistoryFolder } = require("./directory");
const {cleanSelectChapter, selectTrack, changeViewStatus} = require("./track");
const fs = require("fs");
const path = require("path");

let track = 0, folder;
let saveViews = [];
let historyFolders = [];
let backHistory = [];
getElement.video_window.disablePictureInPicture = true;
getElement.video_window.textTracks[0].mode = "showing"

function readFileFolder(dir) {
    let trackElement,
        trackNumber = 0;

    getElement.listFolder.innerHTML = "";

    fs.readdir(dir, function (err, files) {
        const collator = new Intl.Collator(undefined, {
            numeric: true,
            sensitivity: "base",
        });
        files.sort(collator.compare);

        if (files.find((item) => item.match(/.mp4/g))) {
            for (let i = 0; i < files.length; i++) {
                if (files[i].match(/.mp4/g)) {
                    trackElement = create.elements("div");
                    trackElement.innerHTML = files[i];
                    trackElement.setAttribute("class", "btn_chapter");
                    trackElement.setAttribute("track", trackNumber++);
                    getElement.listFolder.innerHTML += `<div class="track_section">${trackElement.outerHTML}<input class="view_check" type="checkbox"></div`;

                    let obj = saveViews.find((obj) => obj.title === trackElement.innerHTML);

                    if (!obj) {
                        saveViews.push({
                            title: trackElement.innerHTML,
                            view: false,
                        });
                    }
                }
            }

            getElement.listFolder.classList.replace("folder-list", "list");

            //Asigna los valores de visto a los checkbox
            if (localStorage.length > 0) {
                for (let i = 0; i < getElement.view_check.length; i++) {
                    let obj = saveViews.find((obj) => obj.title === getElement.view_check[i].previousSibling.innerHTML);
                    getElement.view_check[i].checked = obj ? obj.view : false;
                }
            }
        } else {
            getElement.listFolder.classList.replace("list", "folder-list");
            loadHistoryFolder(dir, files);
        }

        localStorage.setItem("local", JSON.stringify(saveViews));
    });
}

ipcRenderer.on("dir", (err, dir) => {
    track = 0;
    folder = dir;
    if (!historyFolders.find((obj) => obj.name === dir)) {
        historyFolders.push({ name: dir });
        saveHistoryFolder(historyFolders);
        principalFolder(dir);
    }
});

getElement.video_window.onended = () => {
     
    getElement.btn_chapter[track].nextSibling.checked = true;

    let obj = saveViews.find(
        (obj) => obj.title === getElement.btn_chapter[track].innerHTML
    );
    if (obj) {
        obj.view = true;
        localStorage.setItem("local", JSON.stringify(saveViews));
    }

    if (track < parseInt(getElement.btn_chapter.length) - 1) {
        setTimeout(() => {
            track++;
            getElement.video_window.src = path.join(folder, getElement.btn_chapter[track].innerHTML);
            cleanSelectChapter(getElement.btn_chapter[track]);
        }, 1500);
    }
};

let route;
getElement.listFolder.addEventListener("click", (e) => {
    if (e.target.parentNode.className === "folders_items") {
        folder = e.target.parentNode.getAttribute("route");
        backHistory.push(folder);
        readFileFolder(folder);
    } else if (e.target.className === "btn_chapter") {
        track = selectTrack(folder, e.target);
        cleanSelectChapter(e.target);
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