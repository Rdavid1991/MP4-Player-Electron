
let folderView = JSON.parse(localStorage.getItem("optionView")) || [];
let view;

module.exports = {
    getFolderName: (folder) => {
        let nameFolder;

        if (folder.substring(folder.lastIndexOf("\\" || "/") + 1).length > 0) {
            nameFolder = folder.substring(folder.lastIndexOf("\\" || "/") + 1);
        } else {
            nameFolder = folder.substring(0, folder.lastIndexOf("\\" || "/"));
        }

        return nameFolder;
    },

    getFolderView: () => {
        
        if (folderView.length > 0) {
            switch (folderView[0].viewSelect) {
                case "grid":

                    view = "folder-grid";

                    break;

                case "list":

                    view = "folder-list";

                    break;

                default:
                    break;
            }
        } else {
            view = "folder-grid";
        }
        return view;
    },

    getFolderItemsView: () => {
        if (folderView.length > 0) {
            switch (folderView[0].viewSelect) {
                case "grid":

                    view = "folder-items-grid";

                    break;

                case "list":

                    view = "folder-items-list";

                    break;

                default:
                    break;
            }
        } else {
            view = "folder-items-grid";
        }
        return view;
    },

    getFolderimgView: () => {
        if (folderView.length > 0) {
            switch (folderView[0].viewSelect) {
                case "grid":

                    view = "img-folder-grid";

                    break;

                case "list":

                    view = "img-folder-list";

                    break;

                default:
                    break;
            }
        } else {
            view = "img-folder-grid";
        }

        return view;
    }, 

    getMainDir:() =>{

    },

    getLocalStorage: (obj)=>{
        return JSON.parse(localStorage.getItem(obj));
    },

    setLocalStorage: (nameObj, obj)=>{
        localStorage.setItem(nameObj, JSON.stringify(obj));
    }
};