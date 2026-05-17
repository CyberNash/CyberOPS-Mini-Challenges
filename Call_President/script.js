let number = "";

function add(n){
    number += n;
    document.getElementById("display").innerText = number;
}

async function call(){

    document.getElementById("result").innerText =
        "Connecting to CyberOPS server...";

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
}
