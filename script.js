//Array, check common

let lines = [["Schneier Road", "Central", "Grand Station", "Gates Marsh"],["Torvalds Park", "Central", "Kernighan Way", "Stallman Bridge"],["Wozniak Bridge", "Grand Station", "Lecun Street", "Chollet Lane", "Poettering Wood"]];


//Start and end stations, as well as the lines they are on
let start = prompt("Enter start: ");
let startline;
let end = prompt("Enter end: ")
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

function doubleroute(middlestation) {
    //Route with 1 swap
    addtoroute(start, middlestation, startline, startline);
    route.pop();
    addtoroute(middlestation, end, endline, endline);
}


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

//If they're in the same line, get straightforward route
if (startline == endline) {
    addtoroute(start, end, startline, endline);
} else {
    if (startline.indexOf("Central") > -1 && endline.indexOf("Central") > -1) {
        //Both lines have Central station
        doubleroute("Central");
    } else if (startline.indexOf("Grand Station") > -1 && endline.indexOf("Grand Station") > -1) {
        //Both lines have Grand Station
        doubleroute("Grand Station");
    } else {
        //Lines don't share a station
        if (startline == lines[1]) {
            addtoroute(start, "Central", startline, startline);
            addtoroute("Grand Station", end, endline, endline);
        } else {
            addtoroute(start, "Grand Station", startline, startline);
            addtoroute("Central", end, endline, endline);
        }
    }
}

console.log(route)