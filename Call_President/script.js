let number = "";

// keypad
function add(n){
    number += n;
    document.getElementById("display").innerText = number;
}

function clearNum(){
    number = number.slice(0,-1);
    document.getElementById("display").innerText = number;
}

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
