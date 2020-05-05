getElement = {
    reproducer_list: document.getElementsByClassName("reproducer-list")[0],
    btn_chapter: document.getElementsByClassName("btn_chapter"),
    video_window: document.getElementById("video"),
    video_details: document.getElementById("videoDetails"),
    view_check: document.getElementsByClassName("view_check"),
    side_nav: document.getElementById("mySidenav"),
    menu_button: document.getElementById("menu-button")
}

create = {
    elements: function (element) {
        return document.createElement(element)
    }
}