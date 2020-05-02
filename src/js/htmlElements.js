getElement = {
    reproducer_list : document.getElementsByClassName("reproducer-list")[0],
    btn_chapter : document.getElementsByClassName("btn_chapter"),
    video_window : document.getElementById("video"),
    view_check: document.getElementsByClassName("view_check")
}

create = {
    elements : function(element){
        return document.createElement(element)
    }
}