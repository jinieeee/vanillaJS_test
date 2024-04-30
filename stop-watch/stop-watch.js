let intervalId = 0;
let start = 0;
let stop = 0;
let preLap = 0;
let lapArray = [];
let shortest = Number.MAX_SAFE_INTEGER;
let longest = 0;

function formatToLeadingZero(microSeconds) {
    console.log(microSeconds);
    const microSecondsStr = microSeconds.toString();
    if(microSeconds < 10) {
        return `00:00${microSecondsStr}`;
    } else if(microSeconds < 100) {
        return `00:0${microSecondsStr}`;
    } else if(microSeconds < 1000) {
        return `00:${microSecondsStr}`;
    } else if (microSeconds < 10000) {
        return `0${microSecondsStr.slice(0, 1)}:${microSecondsStr.slice(-3)}`;
    } else {
        return `${microSecondsStr.slice(0, -3)}:${microSecondsStr.slice(-3)}`
    }
}

function startStopWatch() {
    if(intervalId) return;
    intervalId = setInterval(function () {
        document.getElementById('timer').innerText = formatToLeadingZero(Date.now() - start);
    }, 1);
}

function lapTime() {
    let lapHtml = document.createElement("li");
    let now = Date.now();
    let lap = now - preLap;
    preLap = now;
    lapArray.push(lap);

    lapHtml.innerText = `랩 ${lapArray.length} ${formatToLeadingZero(lap)}`;
    document.getElementById("record_list").append(lapHtml);

    shortest = lap < shortest ? lap : shortest;
    longest = lap > longest ? lap : longest;
    lapCss();
}

function lapCss() {
    document.querySelectorAll("li").forEach((item, index) => {
        item.classList.remove("shortest");
        item.classList.remove("longest");
        if (lapArray[index] === longest || shortest === longest) {
            item.classList.add("longest");
        } else if(lapArray[index] === shortest) {
            item.classList.add("shortest");
        }
    })
}

function initialize() {
    intervalId = 0;
    start = 0;
    preLap = 0;
    lapArray = [];
    shortest = Number.MAX_SAFE_INTEGER;
    longest = 0;
    document.getElementById("record_list").innerHTML = "";
    document.getElementById('timer').innerText = "00:000";
}

function changeStatus(status) {
    switch (status) {
        case "start": {
            document.querySelectorAll(".button_list").forEach((item, index) => {
                item.classList.remove("visible");
                if(index === 1) item.classList.add("visible");
            })
            break;
        }
        case "stop": {
            document.querySelectorAll(".button_list").forEach((item, index) => {
                item.classList.remove("visible");
                if(index === 2) item.classList.add("visible");
            })
            break;
        }
        default : {
            document.querySelectorAll(".button_list").forEach((item, index) => {
                item.classList.remove("visible");
                if(index === 0) item.classList.add("visible");
            })
            break;
        }
    }
}

function init() {
    document.getElementById("start").onclick = function () {
        start = Date.now();
        preLap = Date.now();
        startStopWatch();
        changeStatus("start")
    }

    document.getElementById("stop").onclick = function () {
        clearInterval(intervalId);
        lapTime();
        stop = Date.now();
        intervalId = 0;
        changeStatus("stop")
    }

    document.getElementById("restart").onclick = function () {
        start = new Date( Date.now() - (stop - start));
        preLap = new Date(Date.now() - (stop - start));
        startStopWatch();
        changeStatus("start");
    }

    document.getElementById("initialize").onclick = function () {
        initialize();
        changeStatus();
    }

    document.getElementById("lap").onclick = function () {
        lapTime();
    }
}

init();
