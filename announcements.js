const grid = document.querySelector(".grid");
let announcements = JSON.parse(localStorage.getItem("announcements"));

//Initial display
for (let i of announcements) {
    let announcement = document.createElement("div");
    announcement.textContent = i;
    grid.appendChild(announcement);
}