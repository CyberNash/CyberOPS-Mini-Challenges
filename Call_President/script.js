let number = "";

// update UI safely
function updateDisplay(){
    document.getElementById("display").innerText =
        number.length ? number : "";
}

// keypad input
function add(n){
    number += n;
    updateDisplay();
}

// delete fix
function clearNum(){
    number = number.slice(0, -1);
    updateDisplay();
}

// fake API call (GitHub Pages compatible)
async function call(){

    document.getElementById("result").innerText =
        "Connecting to CyberOPS server...";

    try {
        let res = await fetch("./api/data.json");
        let data = await res.json();

        setTimeout(() => {

            if(data[number]){
                document.getElementById("result").innerText =
                    "CALL CONNECTED\nFLAG: " + data[number];
            } else {
                document.getElementById("result").innerText =
                    "❌ Call Declined";
            }

        }, 1000);

    } catch(e){
        document.getElementById("result").innerText =
            "Server error";
    }
}
