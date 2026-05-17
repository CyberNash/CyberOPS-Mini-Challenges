let queue = [];
let isUpdating = false;

// load data.json (flag stored outside JS)
async function loadData(){
    const res = await fetch("./api/data.json");
    return await res.json();
}

function updateApp(type, btn){
    queue.push({type, btn});
    processQueue();
}

async function processQueue(){

    if(isUpdating || queue.length === 0) return;

    isUpdating = true;

    let {type, btn} = queue.shift();

    let data = await loadData();

    let p = 0;

    document.getElementById("progress").style.display = "block";
    document.getElementById("result").style.display = "none";
    document.getElementById("flag").style.display = "none";

    let appName = btn.closest(".app").querySelector(".name").innerText;

    document.getElementById("status").innerText =
        "Updating " + appName + "...";

    let interval = setInterval(() => {

        p++;
        document.getElementById("bar").style.width = p + "%";

        if(p === 30){
            document.getElementById("status").innerText = "Downloading update...";
        }

        if(p === 70){
            document.getElementById("status").innerText = "Installing components...";
        }

        if(p >= 100){
            clearInterval(interval);

            document.getElementById("status").innerText =
                "Update completed";

            if(type === "target"){
                document.getElementById("flag").style.display = "block";
                document.getElementById("flag").innerText =
                    "ACCESS GRANTED: " + data.flag;
            } else {
                document.getElementById("result").style.display = "block";
                document.getElementById("result").innerText =
                    "Ops, no useful changes found.";
            }

            isUpdating = false;

            processQueue();
        }

    }, 100);
}
