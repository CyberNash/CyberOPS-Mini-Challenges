let number = "";

// always update display safely
function updateDisplay(){
    document.getElementById("display").innerText =
        number === "" ? "" : number;
}

// add number
function add(n){
    number += n;
    updateDisplay();
}

// FIXED delete function
function clearNum(){
    if(number.length > 0){
        number = number.slice(0, -1);
    }
    updateDisplay();
}

// call function (unchanged)
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
