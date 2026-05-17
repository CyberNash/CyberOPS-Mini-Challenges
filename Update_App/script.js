let isUpdating = false;

async function getData(){
    const res = await fetch("./api/data.json");
    return await res.json();
}

function updateApp(type, btn){

    if(isUpdating || btn.classList.contains("disabled")) return;

    isUpdating = true;

    const bar = document.getElementById("bar");
    const status = document.getElementById("status");
    const result = document.getElementById("result");
    const flag = document.getElementById("flag");
    const progress = document.getElementById("progress");

    progress.style.display = "block";
    bar.style.width = "0%";

    result.style.display = "none";
    flag.style.display = "none";

    status.innerText = "Updating...";

    let p = 0;

    // 2 minutes = 120 seconds
    // 120 seconds × 10 steps = 12 sec per step (smooth fake progress)
    let interval = setInterval(async () => {

        p += 1;
        bar.style.width = p + "%";

        if(p === 10){
            status.innerText = "Downloading update...";
        }

        if(p === 50){
            status.innerText = "Installing components...";
        }

        if(p === 90){
            status.innerText = "Finalizing system patch...";
        }

        if(p >= 100){
            clearInterval(interval);

            let data = await getData();

            status.innerText = "Update completed";

            // disable button
            btn.classList.add("disabled");
            btn.innerText = "UPDATED";
            btn.style.pointerEvents = "none";
            btn.style.opacity = "0.5";
            btn.style.background = "#9ca3af";

            if(type === "target"){
                flag.style.display = "block";
                flag.innerText = "BUG FIXED: " + data.flag;
            } else {
                result.style.display = "block";
                result.innerText = "Ops, no useful changes found.";
            }

            isUpdating = false;
        }

    }, 1200); // 🔥 slow interval = ~2 minutes total
}
