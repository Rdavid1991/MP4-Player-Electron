const { ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path')

let track, folder;
let saveViews = [];

function readFileFolder(dir) {

    let trackElement, trackNumber = 0;

    fs.readdir(dir, function (err, files) {

        for (let i = 0; i < files.length; i++) {
            if (files[i].match(/.mp4/g)) {
                trackElement = create.elements("div")
                trackElement.innerHTML = files[i]
                trackElement.setAttribute("class", "btn_chapter")
                trackElement.setAttribute("track", trackNumber++)
                getElement.reproducer_list.innerHTML += `<div class="track_section">${trackElement.outerHTML}<input class="view_check" type="checkbox"></div`
            }
        }

        if (localStorage.length > 0) {
            saveViews = JSON.parse(localStorage.getItem("local"))
            for (let i = 0; i < getElement.view_check.length; i++) {
                let obj = saveViews.find(obj => obj.title === getElement.view_check[i].previousSibling.innerHTML)
                getElement.view_check[i].checked = obj ? obj.view : false;
            }
        }
    });
}

function selectTrack(videoTrack) { 
    getElement.video_window.src = folder + "/" + videoTrack.innerText
    cleanSelectChapter()
    videoTrack.parentNode.style.backgroundColor = "aqua"

    return videoTrack.getAttribute("track");
}

function changeViewStatus(checkView,saveArray){
    if (saveArray.length > 0) {
        let obj = saveArray.find(obj => obj.title === checkView.previousSibling.innerHTML)
        if (obj) {
            obj.view = !obj.view
        } else {
            saveArray.push({
                "title": checkView.previousSibling.innerHTML,
                "view": checkView.checked
            })
        }
    } else {
        saveArray.push({
            "title": checkView.previousSibling.innerHTML,
            "view": checkView.checked
        })
    }
    return saveArray
}

function cleanSelectChapter() {
    for (let i = 0; i < getElement.btn_chapter.length; i++) {
        getElement.btn_chapter[i].parentNode.style.backgroundColor = "rgba(0, 0, 0, 0.541)"
        getElement.btn_chapter[i].parentNode.onmouseover = function () {
            this.style.backgroundColor = "background-color: gray";
        }
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

ipcRenderer.on('dir', (err, dir) => {
    track = 0;
    folder = dir
    getElement.reproducer_list.innerHTML = "";

    readFileFolder(dir)
})

getElement.reproducer_list.addEventListener('click', (e) => {

    if (e.target.className === "btn_chapter") {
        track = selectTrack(e.target);
    } else if (e.target.className === "view_check") {
        saveViews = changeViewStatus(e.target, saveViews )
        localStorage.setItem("local", JSON.stringify(saveViews))
    }
});

getElement.video_window.onended = () => {

    getElement.btn_chapter[track].nextSibling.checked = true
    let obj = saveViews.find(obj => obj.title === getElement.btn_chapter[track].innerHTML)
    if (obj) {
        obj.view = true
        localStorage.setItem("local", JSON.stringify(saveViews))
    }

    if ((track + 1) < getElement.btn_chapter.length) {

        track++
        getElement.video_window.src = folder + "/" + getElement.btn_chapter[track].innerHTML
        cleanSelectChapter()
        getElement.btn_chapter[track].parentNode.style.backgroundColor = "aqua"
    }
}