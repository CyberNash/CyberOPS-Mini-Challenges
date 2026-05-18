fetch("api/data.json")
  .then(res => res.json())
  .then(data => {

    // combine encoded parts
    const combined = data.part1 + data.part2;

    // decode base64
    const flag = atob(combined);

    // show in console (CTF-style)
    console.log("%cSYSTEM ALERT: FLAG DETECTED", "color: lime; font-size:14px;");
    console.log(flag);

    // optional: show hint in page (not direct flag)
    document.querySelector(".warn").innerText =
      "WARN Suspicious encoded string isolated: check console logs";
  });
