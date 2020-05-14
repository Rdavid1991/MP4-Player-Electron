"use strict";
const fs = require("fs");
const path = require("path");
const { create, stringElement, getElement } = require("./htmlElements");

module.exports = {

    createFolderView: (dir, array) => {
        for (let i = 0; i < array.length; i++) {
            try {
                if (fs.lstatSync(path.join(dir, array[i])).isDirectory()) {
                    let div = create.elements("div");
                    div.innerHTML = stringElement.getHTMLFolder(array[i]);
                    div.setAttribute("class", "folder-items-grid");
                    div.setAttribute("name", "folder-item");
                    div.setAttribute("route", path.join(dir, array[i]));
                    getElement.listFolder.appendChild(div);
                }
            } catch (exception) {
                console.error(`Acceso no permitido para ${array[i]} ${exception}`);
            }
        }
    },

    saveHistoryFolder: (historyFolders) => {
        localStorage.setItem("folders", JSON.stringify(historyFolders));
    },

    principalFolder: (folder) => {
        let div = create.elements("div");
        div.innerHTML = stringElement.nameFolder(folder);
        div.setAttribute("class", "folder-items-grid");
        div.setAttribute("name", "folder-item");
        div.setAttribute("route", folder);
        getElement.listFolder.appendChild(div);
    },
};