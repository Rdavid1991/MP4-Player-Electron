const { ipcRenderer } = require("electron");
const fs = require("fs");
const path = require("path");

let track,
    folder,
    validFolder = 0;
let saveViews = [];
let historyFolders = [];

function readFileFolder(dir) {
    let trackElement,
        trackNumber = 0;

    document.getElementById("list_folder").innerHTML = "";

    fs.readdir(dir, function (err, files) {
        const collator = new Intl.Collator(undefined, {
            numeric: true,
            sensitivity: "base",
        });
        files.sort(collator.compare);

        if (files.find((item) => item.match(/.mp4/g))) {
            for (let i = 0; i < files.length; i++) {
                if (files[i].match(/.mp4/g)) {
                    validFolder++;
                    trackElement = create.elements("div");
                    trackElement.innerHTML = files[i];
                    trackElement.setAttribute("class", "btn_chapter");
                    trackElement.setAttribute("track", trackNumber++);
                    document
                        .getElementById("list_folder")
                        .classList.replace("folder-list", "list");
                    document.getElementById(
                        "list_folder"
                    ).innerHTML += `<div class="track_section">${trackElement.outerHTML}<input class="view_check" type="checkbox"></div`;

                    let obj = saveViews.find(
                        (obj) => obj.title === trackElement.innerHTML
                    );

                    if (!obj) {
                        saveViews.push({
                            title: trackElement.innerHTML,
                            view: false,
                        });
                    }
                }
            }

            if (localStorage.length > 0) {
                for (let i = 0; i < getElement.view_check.length; i++) {
                    let obj = saveViews.find(
                        (obj) =>
                            obj.title ===
                            getElement.view_check[i].previousSibling.innerHTML
                    );
                    getElement.view_check[i].checked = obj ? obj.view : false;
                }
            }
        } else {
            loadHistoryFolder(dir, files);
        }

        document.getElementById("title_list").innerHTML = dir.substring(
            dir.lastIndexOf("\\") + 1
        );
        if (!historyFolders.find((obj) => obj.name === folder)) {
            historyFolders.push({ name: folder });
        }
        localStorage.setItem("local", JSON.stringify(saveViews));
    });
}

function selectTrack(dir,videoTrack) {
    getElement.video_window.src = path.join(dir, videoTrack.innerText);
    cleanSelectChapter();
    videoTrack.parentNode.style.backgroundColor = "#607D8B";

    return videoTrack.getAttribute("track");
}

function changeViewStatus(checkView, saveArray) {
    if (saveArray.length > 0) {
        let obj = saveArray.find(
            (obj) => obj.title === checkView.previousSibling.innerHTML
        );
        if (obj) {
            obj.view = !obj.view;
        }
    }

    return saveArray;
}

function cleanSelectChapter() {
    for (let i = 0; i < getElement.btn_chapter.length; i++) {
        getElement.btn_chapter[i].parentNode.style.backgroundColor =
            "rgba(0, 0, 0, 0.541)";
        getElement.btn_chapter[i].parentNode.onmouseover = function () {
            this.style.backgroundColor = "background-color: gray";
        };
    }
}

function myFunction(x) {
    let menu = x.classList.toggle("change");
    if (menu) {
        getElement.side_nav.style.width = "100%";
    } else {
        getElement.side_nav.style.width = "0";
    }
}

function loadHistoryFolder(dir, array) {
    for (let i = 0; i < array.length; i++) {
        let div = create.elements("div");
        div.innerHTML = `<img src="${__dirname}/interface.png"></img><p>${array[i]}</>`;
        div.setAttribute("class", "folders_items");
        div.setAttribute("route", path.join(dir, array[i]));
        document.getElementById("list_folder").appendChild(div);
    }
}

function saveHistoryFolder() {
    if (validFolder > 0) {
        localStorage.setItem("folders", JSON.stringify(historyFolders));
        loadHistoryFolder();
    }
}

ipcRenderer.on("dir", (err, dir) => {
    track = 0;
    folder = dir;

    readFileFolder(dir);
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
            getElement.video_window.src = path.join(
                folder,
                getElement.btn_chapter[track].innerHTML
            );
            cleanSelectChapter();
            getElement.btn_chapter[track].parentNode.style.backgroundColor =
                "#607D8B";
        }, 1500);
    }
};


let route;
document.getElementById("list_folder").addEventListener("click", (e) => {

    if (e.target.parentNode.className === "folders_items") {
        route = e.target.parentNode.getAttribute("route")
        console.log(route);
        
        readFileFolder(route);
    } else if (e.target.className === "btn_chapter") {
        track = selectTrack(route , e.target);
    } else if (e.target.className === "view_check") {
        saveViews = changeViewStatus(e.target, saveViews);
        localStorage.setItem("local", JSON.stringify(saveViews));
    }
});

if (localStorage.getItem("local")) {
    saveViews = JSON.parse(localStorage.getItem("local"));
}

if (localStorage.getItem("folders")) {
    historyFolders = JSON.parse(localStorage.getItem("folders"));
}
