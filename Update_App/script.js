let isUpdating = false;

// load flag from JSON
async function getData(){
    const res = await fetch("./api/data.json");
    return await res.json();
}

function updateApp(type, btn){

    if(isUpdating) return;

    isUpdating = true;

    const bar = document.getElementById("bar");
    const status = document.getElementById("status");
    const result = document.getElementById("result");
    const flag = document.getElementById("flag");

    bar.style.width = "0%";

    document.getElementById("progress").style.display = "block";
    result.style.display = "none";
    flag.style.display = "none";

    status.innerText = "Updating...";

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

            // disable button AFTER update
            btn.style.background = "#9ca3af";
            btn.style.pointerEvents = "none";
            btn.style.opacity = "0.5";
            btn.innerText = "UPDATED";

            if(type === "target"){
                flag.style.display = "block";
                flag.innerText = "ACCESS GRANTED: " + data.flag;
            } else {
                result.style.display = "block";
                result.innerText = "Ops, no useful changes found.";
            }

            isUpdating = false;
        }

    }, 50);
}
