const submit = document.querySelector("#submit");
const routedisplay = document.querySelector("#route");
const startinput = document.querySelector("#start");
const endinput = document.querySelector("#end");
const routelist = document.querySelector("#routelist");
const timeoutput = document.querySelector("#time");
const ticketoutput = document.querySelector("#tickets");
const attractionoutput = document.querySelector("#attractionoutput");

//Array, check common

let lines = [["Schneier Road", "Central", "Grand Station", "Gates Marsh"],["Torvalds Park", "Central", "Kernighan Way", "Stallman Bridge"],["Wozniak Bridge", "Grand Station", "Lecun Street", "Chollet Lane", "Poettering Wood"]];
let linenames = ["grey", "red", "blue"];
let attractions = {
    Schneier_Road: "Zoo",
    Central: "Natural History Museum",
    Grand_Station: "CIA black site",
    Gates_Marsh: "Shopping centre",
    Torvalds_Park: "Water Park",
    Kernighan_Way: "Jeffrey Epstein's mansion",
    Stallman_Bridge: "Obama's Drone Depot",
    Wozniak_Bridge: "Bush Centre for Bombing Civilians",
    Lecun_Street: "CIA Institute of Staging Coups in Developing Countries and Blaming their Failures on Socialism",
    Chollet_Lane: "Memorial of War Criminals",
    Poettering_Wood: "Bude Tunnel Replica"
}

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
    if (startline == endline) {
        routedisplay.textContent = "You cheeky bastard";
    }

    routelist.textContent = "Station order: " + route.slice(0, route.length + 1).join(" -> ");

    //Time and ticket prices
    let timetaken = (route.length - 1) * 30;
    timeoutput.textContent = "Your journey will take " + String(timetaken) + " minutes";
    let tickettype;
    let ticketprice;
    if (timetaken > 720) {
        tickettype = "24-hour";
        ticketprice = "1900kj"
    } else if (timetaken > 240) {
        tickettype = "12-hour";
        ticketprice = "10000kj";
    } else if (timetaken > 120) {
        tickettype = "4-hour";
        ticketprice = "300kj";
    } else if (timetaken > 60) {
        tickettype = "2-hour";
        ticketprice = "200kj";
    } else if (timetaken > 0) {
        tickettype = "1-hour";
        ticketprice = "100kj";
    }

    if (timetaken > 0) {
        ticketoutput.textContent = `You will need a ${tickettype} ticket, which will cost you ${ticketprice}.`
    } else {
        ticketoutput.textContent = "You don't need a ticket, silly."
    }

    attractionoutput.textContent = "An attraction close to your destination is the " + attractions[end.replace(" ", "_")];
})