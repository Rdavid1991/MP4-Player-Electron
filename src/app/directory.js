const path = require("path")
const { create, stringElement, getElement } = require("./htmlElements");

module.exports = {

    loadHistoryFolder: (dir, array) => {
        for (let i = 0; i < array.length; i++) {
            let div = create.elements("div");
            div.innerHTML = `<div class="img-folder"></div><p>${array[i]}</>`;
            div.setAttribute("class", "folders_items");
            div.setAttribute("route", path.join(dir, array[i]));
            getElement.listFolder.appendChild(div);
        }
    },

    saveHistoryFolder: (historyFolders) => {
        localStorage.setItem("folders", JSON.stringify(historyFolders));
    },

    principalFolder: (folder) => {
        let div = create.elements("div");
        div.innerHTML = stringElement.nameFolder(folder);
        div.setAttribute("class", "folders_items");
        div.setAttribute("route", folder);
        getElement.listFolder.appendChild(div);
    },
}