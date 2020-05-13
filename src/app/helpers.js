module.exports = {
    getFolderName: (folder) => {
        let nameFolder;

        if (folder.substring(folder.lastIndexOf("\\" || "/") + 1).length > 0) {
            nameFolder = folder.substring(folder.lastIndexOf("\\" || "/") + 1);
        } else {
            nameFolder = folder.substring(0, folder.lastIndexOf("\\" || "/"));
        }

        return nameFolder;
    }
};