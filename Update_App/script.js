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

    let duration = 120000; // 🔥 2 minutes in ms
    let start = Date.now();

    let interval = setInterval(async () => {

        let elapsed = Date.now() - start;
        let percent = Math.floor((elapsed / duration) * 100);

        bar.style.width = percent + "%";

        if(percent === 10){
            status.innerText = "Downloading update...";
        }

        if(percent === 50){
            status.innerText = "Installing components...";
        }

        if(percent === 90){
            status.innerText = "Finalizing system patch...";
        }

        if(percent >= 100){
            clearInterval(interval);

            bar.style.width = "100%";

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

    }, 200); // smooth update check
}
