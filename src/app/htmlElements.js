module.exports = {
    getElement: {
        reproducer_list: document.getElementsByClassName("reproducer-list")[0],
        btn_chapter: document.getElementsByClassName("btn_chapter"),
        video_window: document.getElementById("video"),
        video_details: document.getElementById("videoDetails"),
        view_check: document.getElementsByClassName("view_check"),
        side_nav: document.getElementById("mySidenav"),
        menuButton: document.getElementById("menu-button"),
        listFolder :document.getElementById("list-folder"),
        backButton:document.getElementById("back-button"),
        subTrack : document.getElementsByTagName("track")[0]
    },

    create: {
        elements: function (element) {
            return document.createElement(element);
        },
    },

    stringElement: {
        nameFolder: folder => {
            return `<div class="img-folder"></div><p>${folder.substring(folder.lastIndexOf("\\") + 1)}</>`;
        },
    },
};
