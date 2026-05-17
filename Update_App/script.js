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

    const duration = 120000; // 2 minutes
    const start = performance.now();

    function animate(now){

        let elapsed = now - start;
        let percent = Math.min((elapsed / duration) * 100, 100);

        bar.style.width = percent + "%";

        if(percent > 5 && percent < 10){
            status.innerText = "Updating system...";
        }

        if(percent > 10 && percent < 50){
            status.innerText = "Downloading update...";
        }

        ifpercent > 50 && percent < 90){
            status.innerText = "Installing components...";
        }

        if(percent >= 100){

            status.innerText = "Update completed";

            btn.classList.add("disabled");
            btn.innerText = "UPDATED";
            btn.style.pointerEvents = "none";
            btn.style.opacity = "0.5";
            btn.style.background = "#9ca3af";

            getData().then(data => {

                if(type === "target"){
                    flag.style.display = "block";
                    flag.innerText = "BUG FIXED: " + data.flag;
                } else {
                    result.style.display = "block";
                    result.innerText = "Ops, no useful changes found.";
                }

                isUpdating = false;
            });

            return;
        }

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}
