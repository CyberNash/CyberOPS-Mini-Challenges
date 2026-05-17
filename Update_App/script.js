let isUpdating = false;

// load flag from external JSON
async function getData(){
    const res = await fetch("./api/data.json");
    return await res.json();
}

// main update function
function updateApp(type, btn){

    // ❌ BLOCK if already updating
    if(isUpdating){
        alert("⚠ Please wait until current update finishes.");
        return;
    }

    isUpdating = true;

    let bar = document.getElementById("bar");
    let status = document.getElementById("status");

    bar.style.width = "0%";

    document.getElementById("progress").style.display = "block";
    document.getElementById("result").style.display = "none";
    document.getElementById("flag").style.display = "none";

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
        }

    }, 50);
}
