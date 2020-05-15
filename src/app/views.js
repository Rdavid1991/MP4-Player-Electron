const { setLocalStorage } = require("./helpers");
const { getElement } = require("./htmlElements");

let optionView;

function gridToList() {
    let optionView = [{ "viewSelect": "list" }];
    setLocalStorage("optionView", optionView);
    getElement.listFolder.classList.replace("folder-grid", "folder-list");
    getElement.folderItem.forEach(folderElement => {
        folderElement.classList.replace("folder-items-grid", "folder-items-list");
    });

    getElement.imgFolder.forEach((e) => {
        e.classList.replace("img-folder-grid", "img-folder-list");
    });
}

function listToGrid() {
    optionView = [{ "viewSelect": "grid" }];
    localStorage.setItem("optionView", JSON.stringify(optionView));
    getElement.listFolder.classList.replace("folder-list", "folder-grid");

    getElement.folderItem.forEach(folderElement => {
        folderElement.classList.replace("folder-items-list", "folder-items-grid");
    });

    getElement.imgFolder.forEach((e) => {
        e.classList.replace("img-folder-list", "img-folder-grid");
    });
}

module.exports = {
    listToGrid,
    gridToList,
};