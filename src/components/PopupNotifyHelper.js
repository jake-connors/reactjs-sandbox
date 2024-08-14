function create_notification(msg, text_class = "", time_to_hide = 5000) {
    var msgbox = document.createElement("div");
    var msg_txt = document.createTextNode(msg);
    var div = document.createElement("div");

    div.appendChild(msg_txt);
    div.className = text_class;

    msgbox.appendChild(div);
    msgbox.className = "notification-msgbox enter";

    document.body.appendChild(msgbox);

    setTimeout(() => {
        msgbox.className = "notification-msgbox active";
    }, 100);

    setTimeout(() => {
        msgbox.className = "notification-msgbox leave";
    }, time_to_hide);
}

export default { create_notification };

