const { ipcRenderer, dialog } = require('electron');
const { get } = require('http');

ipcRenderer.on('hola', async (e, arg) => {

    let folder = arg;

    const fs = require('fs');

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
            getElement.reproducer_list.appendChild(item)
        }

        for (let i = 0; i < getElement.btn_chapter.length; i++) {
            getElement.btn_chapter[i].addEventListener('click', e => {

                getElement.video_window.innerHTML = folder[0] + "/" + e.toElement.innerText
                getElement.video_window.src = folder[0] + "/" + e.toElement.innerText
            
                if(getElement.video_window.innerHTML.match(RegExp(e.toElement.innerText,'g'))){
                    for (let i = 0; i < getElement.reproducer_list.childElementCount; i++) {
                        getElement.reproducer_list.children[i].style.backgroundColor = "#b7b7b7"
                    }
                    e.toElement.style.backgroundColor = "aqua"
                }
            });
        }


    });
})