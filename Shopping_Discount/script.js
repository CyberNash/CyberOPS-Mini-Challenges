let price = 100;
let discount = 0;
let unlocked = false;
let wallet = 0;

function decodeBase64(str){
    try { return atob(str); }
    catch { return null; }
}

function applyVoucher(){

    let v = document.getElementById("voucher").value.trim();
    let decoded = decodeBase64(v);

    if(decoded === "cyberops20"){
        discount = 20;
        update();
        return;
    }

    if(decoded === "cyberops50"){
        discount = 50;
        update();
        return;
    }

    if(decoded === "cyberops100"){
        discount = 100;
        unlocked = true;
        update();

        document.getElementById("msg").innerText =
        "Full voucher detected. Payment route unlocked.";
        return;
    }

    document.getElementById("msg").innerText = "Invalid voucher.";
}

function update(){
    let final = price - (price * discount / 100);

    document.getElementById("msg").innerText =
    "Discount: " + discount + "%\nAmount to pay: RM " + final.toFixed(2);
}

function payNow(){

    let final = price - (price * discount / 100);

    if(final > wallet){
        document.getElementById("msg").innerText =
        "❌ Payment failed: Insufficient wallet balance.";
        return;
    }

    if(unlocked && final === 0){

        fetch("api/data.json")
        .then(res => res.json())
        .then(data => {
            document.getElementById("msg").innerText =
            "🧾 PAYMENT VERIFIED\n" + data.flag;
        })
        .catch(() => {
            document.getElementById("msg").innerText =
            "Error loading receipt.";
        });

    } else {
        document.getElementById("msg").innerText =
        "❌ Payment denied.";
    }
}
