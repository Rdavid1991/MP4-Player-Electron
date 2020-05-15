"use strict";
const fs = require("fs");
const path = require("path");
const { create, stringElement, getElement } = require("./htmlElements");
const helpers = require("./helpers");

function createFolderView(dir, array) {
    for (let i = 0; i < array.length; i++) {
        try {
            if (fs.lstatSync(path.join(dir, array[i])).isDirectory()) {
                let div = create.elements("div");
                div.innerHTML = stringElement.getHTMLFolder(array[i]);
                div.setAttribute("class", helpers.getFolderItemsView());
                div.setAttribute("name", "folder-item");
                div.setAttribute("route", path.join(dir, array[i]));
                getElement.listFolder.appendChild(div);
            }
        } catch (exception) {
            console.error(`Acceso no permitido para ${array[i]} ${exception}`);
        }
    }
}

function principalFolder(folder) {
    let div = create.elements("div");
    div.innerHTML = stringElement.nameFolder(folder);
    div.setAttribute("class", helpers.getFolderItemsView());
    div.setAttribute("name", "folder-item");
    div.setAttribute("route", folder);
    getElement.listFolder.appendChild(div);
}

function getMainfolder() {
    getElement.listFolder.classList.replace("list", helpers.getFolderView());
    getElement.listFolder.innerHTML = "";
    let mainFolder = helpers.getLocalStorage("folder");
    mainFolder.forEach((mainDir) => {
        principalFolder(mainDir.name);
    });
    getElement.folderTitle.innerHTML = "Todas las carpetas";
}

module.exports = {
    principalFolder,
    createFolderView,
    getMainfolder
};