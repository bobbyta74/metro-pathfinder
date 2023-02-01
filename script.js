const submit = document.querySelector("#submit");
const routedisplay = document.querySelector("#route");
const startinput = document.querySelector("#start");
const endinput = document.querySelector("#end");
const routelist = document.querySelector("#routelist");


//Array, check common

let lines = [["Schneier Road", "Central", "Grand Station", "Gates Marsh"],["Torvalds Park", "Central", "Kernighan Way", "Stallman Bridge"],["Wozniak Bridge", "Grand Station", "Lecun Street", "Chollet Lane", "Poettering Wood"]];
let linenames = ["grey", "red", "blue"]

//Start and end stations, as well as the lines they are on
let startline;
let endline;
let route = [];

function addtoroute(ministart, miniend, ministartline, miniendline) {
    if (ministartline.indexOf(miniend) > ministartline.indexOf(ministart)) {
        route = route.concat(ministartline.slice(ministartline.indexOf(ministart), ministartline.indexOf(miniend) + 1));
    } else {
        ministartline = ministartline.reverse();
        route = route.concat(ministartline.slice(ministartline.indexOf(ministart), ministartline.indexOf(miniend) + 1));
    }
}

submit.addEventListener("click", function () {
    route = [];
    let start = startinput.value;
    let end = endinput.value;

    //Checks which metro line the stations are in
    for (let line of lines) {
        if (line.indexOf(start)>-1) {
            //startline is the index of the array containing start in the 2d array "lines"
            startline = lines.indexOf(line);
            //startline is now the array containing start
            startline = lines[startline];
        }
        if (line.indexOf(end)>-1) {
            endline = lines.indexOf(line);
            //endline is now the array containing end
            endline = lines[endline]
        }
    }
    if (endline.indexOf(start) > -1) {
        startline = endline;
    }
    if (startline.indexOf(end) > -1) {
        endline = startline;
    }

    let haschangeover = true;
    let has2changeovers = false;
    let changeover1;
//If they're in the same line, get straightforward route
    if (startline == endline) {
        addtoroute(start, end, startline, endline);
        haschangeover = false;
    } else {
        if (startline.indexOf("Central") > -1 && endline.indexOf("Central") > -1) {
            //Both lines have Central station
            addtoroute(start, "Central", startline, startline);
            route.pop();
            addtoroute("Central", end, endline, endline);
            changeover1 = "Central";
        } else if (startline.indexOf("Grand Station") > -1 && endline.indexOf("Grand Station") > -1) {
            //Both lines have Grand Station
            addtoroute(start, "Grand Station", startline, startline);
            route.pop();
            addtoroute("Grand Station", end, endline, endline);
            changeover1 = "Grand Station";
        } else {
            has2changeovers = true;
            //Lines don't share a station
            if (startline == lines[1]) {
                addtoroute(start, "Central", startline, startline);
                addtoroute("Grand Station", end, endline, endline);
                changeover1 = "Central";
                changeover2 = "Grand Station";
            } else {
                addtoroute(start, "Grand Station", startline, startline);
                addtoroute("Central", end, endline, endline);
                changeover2 = "Central";
                changeover1 = "Grand Station";
            }
        }
    }

    let startlinename = linenames[lines.indexOf(startline)];
    let endlinename = linenames[lines.indexOf(endline)];
    
    if (!haschangeover) {
        routedisplay.textContent = `Take the ${startlinename} line from ${start} to ${end}`
    } else if (!has2changeovers) {
        routedisplay.textContent = `Take the ${startlinename} line from ${start} to ${changeover1}, then the ${endlinename} line from ${changeover1} to ${end}`
    } else {
        routedisplay.textContent = `Take the ${startlinename} line from ${start} to ${changeover1}, then the grey line from ${changeover1} to ${changeover2}, then the ${endlinename} line from ${changeover2} to ${end}`
    }

    routelist.textContent = "Station order: " + route.slice(0, route.length + 1).join(" -> ");
})