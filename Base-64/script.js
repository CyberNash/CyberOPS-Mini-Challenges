async function loadLogs() {
    const res = await fetch("api/data.json");
    const data = await res.json();

    const logBox = document.getElementById("logBox");
    logBox.innerHTML = "";

    data.logs.forEach((line) => {
        let output = line;

        // decode base64 if possible
        try {
            if (/^[A-Za-z0-9+/=]+$/.test(line)) {
                output = atob(line);
            }
        } catch (e) {}

        logBox.innerHTML += output + "\n";
    });

    console.log("Hint: Try pressing Ctrl + K...");
}

function revealSecret(encoded) {
    const step1 = atob(encoded);
    const final = atob(step1);

    console.log("%cFLAG: " + final, "color: lime; font-size:14px;");
    alert("⚠️ Check the console.");
}

window.addEventListener("keydown", async (e) => {
    if (e.ctrlKey && e.key.toLowerCase() === "k") {
        const res = await fetch("api/data.json");
        const data = await res.json();

        revealSecret(data.secret);
    }
});

loadLogs();
