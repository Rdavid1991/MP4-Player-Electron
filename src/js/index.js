const { ipcRenderer} = require('electron');

let saveViews = [];

ipcRenderer.on('hola', async (e, arg) => {

    let folder = arg;

    let track = 0;

    

    const fs = require('fs');

    getElement.reproducer_list.innerHTML = "";

    fs.readdir(folder[0], function (err, archivos) {
        let listFiles = [];

        if (err) {
            onError(err);
            return;
        }

        for (let i = 0; i < archivos.length; i++) {
            if (archivos[i].match(/.mp4/g)) {
                listFiles.push(archivos[i]);
            }
        }

        for (let i = 0; i < listFiles.length; i++) {
            item = create.elements("div")
            item.innerHTML = listFiles[i]
            item.setAttribute("class", "btn_chapter")
            item.setAttribute("track", i)
            getElement.reproducer_list.innerHTML += "<div class=\"track_section\">" + item.outerHTML + "<input class=\"view_check\" type=\"checkbox\" id=" + listFiles[i] + "></div"
        }


    
        for (let i = 0; i < getElement.btn_chapter.length; i++) {
            getElement.btn_chapter[i].addEventListener('click', e => {

                track = e.toElement.getAttribute("track");
                

                getElement.video_window.innerHTML = folder[0] + "/" + e.toElement.innerText
                getElement.video_window.src = folder[0] + "/" + e.toElement.innerText

                for (let i = 0; i < getElement.btn_chapter.length; i++) {
                    getElement.btn_chapter[i].style.backgroundColor = "#b7b7b7"
                }

                e.toElement.style.backgroundColor = "aqua"
            });
        }

        getElement.video_window.onended = ()=>{

            if(track < getElement.btn_chapter.length ){

                track++

                getElement.video_window.innerHTML = folder[0] + "/" + getElement.btn_chapter[track].innerHTML
                getElement.video_window.src = folder[0] + "/" + getElement.btn_chapter[track].innerHTML

                for (let i = 0; i < getElement.btn_chapter.length; i++) {
                    getElement.btn_chapter[i].style.backgroundColor = "#b7b7b7"
                }

                getElement.btn_chapter[track].style.backgroundColor = "aqua"

            }
        }

        for (let i = 0; i < getElement.view_check.length; i++) {

            if (JSON.parse(localStorage.getItem("local"))) {
                saveViews = JSON.parse(localStorage.getItem("local"))

                let obj = saveViews.find(obj => obj.title === getElement.view_check[i].previousSibling.innerHTML)

                getElement.view_check[i].checked = obj ? obj.view : false;
            }

            getElement.view_check[i].addEventListener("click", e => {

                if (saveViews.length > 0) {

                    let obj = saveViews.find(obj => obj.title === e.toElement.previousSibling.innerHTML)
                    if (obj) {
                        obj.view = !obj.view
                    } else {
                        //No guarda vistos
                        saveViews.push({
                            "title": e.toElement.previousSibling.innerHTML,
                            "view": e.toElement.checked
                        })
                    }
                } else {
                    saveViews.push({
                        "title": e.toElement.previousSibling.innerHTML,
                        "view": e.toElement.checked
                    })
                }


                localStorage.setItem("local", JSON.stringify(saveViews))
            })
        }
    });
})