const myinp = document.querySelector("#anninp");
const submit = document.querySelector("#submit");
const myoutput = document.querySelector("#announcementoutput");
const clear = document.querySelector("#clear");
let announcements = JSON.parse(localStorage.getItem("announcements"));

//Initial display
if (announcements != null) {
    for (let i of announcements) {
        let announcement = document.createElement("li");
            announcement.textContent = i;
            myoutput.appendChild(announcement);
    }
} else {
    localStorage.setItem("announcements", JSON.stringify([]));
    announcements = [];
}

submit.addEventListener("click", function() {
    if (myinp.value != "") {
        announcements.push(myinp.value);
        let announcement = document.createElement("li");
        announcement.textContent = myinp.value;
        myoutput.appendChild(announcement);
        localStorage.setItem("announcements", JSON.stringify(announcements));
        myinp.value = "";
    }
})

clear.addEventListener("click", function () {
    announcements = [];
    myoutput.textContent = "";
    localStorage.setItem("announcements", JSON.stringify([]));
})