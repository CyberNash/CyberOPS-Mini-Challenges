<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Play Store CTF</title>

<style>
body {
    margin: 0;
    background: #f1f3f4;
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
}

.store {
    width: 92%;
    max-width: 380px;
    background: white;
    margin: 20px 0;
    border-radius: 12px;
    padding: 15px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.top {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: #5f6368;
    margin-bottom: 10px;
}

.app {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 0;
    border-bottom: 1px solid #eee;
}

.icon {
    width: 45px;
    height: 45px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
}

.g1 { background: #22c55e; }
.g2 { background: #3b82f6; }
.g3 { background: #ef4444; }
.g5 { background: #f59e0b; }

.name { font-size: 14px; font-weight: bold; }
.dev { font-size: 11px; color: #6b7280; }
.meta { font-size: 11px; color: #9ca3af; }

.update-btn {
    margin-left: auto;
    font-size: 11px;
    background: #1a73e8;
    color: white;
    padding: 6px 8px;
    border-radius: 6px;
    cursor: pointer;
}

.progress {
    margin-top: 10px;
    height: 8px;
    background: #e0e0e0;
    border-radius: 10px;
    overflow: hidden;
    display: none;
}

.bar {
    height: 100%;
    width: 0%;
    background: #1a73e8;
}

.status {
    font-size: 12px;
    text-align: center;
    margin-top: 10px;
    color: #555;
}

.result, .flag {
    margin-top: 10px;
    text-align: center;
    font-size: 13px;
    display: none;
}

.result { color: #ef4444; }
.flag { color: #22c55e; font-weight: bold; }
</style>
</head>

<body>

<div class="store">

<div class="top">
    <span>Google Play</span>
    <span>Search 🔍</span>
</div>

<!-- APPS -->
<div class="app">
    <div class="icon g1">W</div>
    <div>
        <div class="name">WhatsClone</div>
        <div class="dev">Meta Studio</div>
        <div class="meta">4.2 ★ • 10M+</div>
    </div>
    <div class="update-btn" onclick="updateApp('other', this)">UPDATE</div>
</div>

<div class="app">
    <div class="icon g2">N</div>
    <div>
        <div class="name">NoteSync Pro</div>
        <div class="dev">Simple Tools</div>
        <div class="meta">4.6 ★ • 5M+</div>
    </div>
    <div class="update-btn" onclick="updateApp('other', this)">UPDATE</div>
</div>

<!-- TARGET -->
<div class="app">
    <div class="icon g5">N</div>
    <div>
        <div class="name">NovaShare</div>
        <div class="dev">CyberOPS Studio</div>
        <div class="meta">4.8 ★ • 2M+</div>
    </div>
    <div class="update-btn" onclick="updateApp('target', this)">UPDATE</div>
</div>

<div class="app">
    <div class="icon g3">S</div>
    <div>
        <div class="name">Secure VPN Lite</div>
        <div class="dev">NetShield</div>
        <div class="meta">4.1 ★ • 1M+</div>
    </div>
    <div class="update-btn" onclick="updateApp('other', this)">UPDATE</div>
</div>

<!-- UI -->
<div class="progress" id="progress">
    <div class="bar" id="bar"></div>
</div>

<div class="status" id="status"></div>

<div class="result" id="result"></div>
<div class="flag" id="flag"></div>

</div>

<script src="script.js"></script>

</body>
</html>
