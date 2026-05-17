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

    // safety check (VERY IMPORTANT)
    if(!status){
        alert("ERROR: status element not found in HTML");
        isUpdating = false;
        return;
    }

    progress.style.display = "block";
    bar.style.width = "0%";

    result.style.display = "none";
    flag.style.display = "none";

    // 🔥 FORCE FIRST RENDER
    status.style.display = "block";
    status.innerText = "Updating...";

    // FORCE BROWSER PAINT BEFORE LOOP
    requestAnimationFrame(() => {

        setTimeout(() => {

            let appName = btn.closest(".app").querySelector(".name").innerText;

            status.innerText = "Updating " + appName + "...";

            let p = 0;

            let interval = setInterval(async () => {

                p++;
                bar.style.width = p + "%";

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

                    // disable button
                    btn.classList.add("disabled");
                    btn.innerText = "UPDATED";

                    btn.style.pointerEvents = "none";
                    btn.style.opacity = "0.5";
                    btn.style.background = "#9ca3af";

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

        }, 50);

    });
}
