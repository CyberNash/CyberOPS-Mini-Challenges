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

    // 🔥 FORCE UI UPDATE (IMPORTANT FIX)
    status.innerText = "Updating...";
    status.style.display = "block";

    let appName = btn.closest(".app").querySelector(".name").innerText;

    let p = 0;

    let interval = setInterval(async () => {

        p++;
        bar.style.width = p + "%";

        if(p === 1){
            // force repaint (fix “not showing Updating...” bug)
            status.innerText = "Updating " + appName + "...";
        }

        if(p === 30){
            status.innerText = "Downloading update...";
        }

        if(p === 70){
            status.innerText = "Installing components...";
        }

        if(p >= 100){
            clearInterval(interval);

            let data = await getData();

            status.innerText = "Update completed";

            // ✅ DISABLE BUTTON (FIXED RELIABLE WAY)
            btn.classList.add("disabled");
            btn.innerText = "UPDATED";

            // extra safety
            btn.style.background = "#9ca3af";
            btn.style.pointerEvents = "none";
            btn.style.opacity = "0.5";

            if(type === "target"){
                flag.style.display = "block";
                flag.innerText = "ACCESS GRANTED: " + data.flag;
            } else {
                result.style.display = "block";
                result.innerText = "Ops, no useful changes found.";
            }

            isUpdating = false;
        }

    }, 30);
}
