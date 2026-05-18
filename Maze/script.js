const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

const SIZE = 30;
let tile;

// responsive canvas
function resize(){
    const size = Math.min(window.innerWidth * 0.92, 420);
    canvas.width = size;
    canvas.height = size;
    tile = size / SIZE;
}

resize();
window.addEventListener("resize", resize);

// game state
let gameEnded = false;

// entities
let p = {x:0, y:0};
let g = {x:29, y:29};
let e = {x:26, y:28};

// walls
let walls = [];

for(let y=0;y<SIZE;y++){
    if(y!==2 && y!==9 && y!==16 && y!==23) walls.push({x:6,y});
    if(y!==4 && y!==11 && y!==18 && y!==25) walls.push({x:12,y});
    if(y!==6 && y!==14 && y!==20 && y!==27) walls.push({x:18,y});
    if(y!==3 && y!==10 && y!==19 && y!==26) walls.push({x:24,y});
}

for(let x=0;x<SIZE;x++){
    if(x!==5 && x!==12 && x!==19 && x!==28) walls.push({x,y:7});
    if(x!==2 && x!==10 && x!==21 && x!==27) walls.push({x,y:15});
    if(x!==4 && x!==13 && x!==22 && x!==29) walls.push({x,y:22});
}

function hit(x,y){
    return walls.some(w=>w.x===x&&w.y===y);
}

// draw
function draw(){
    ctx.fillStyle="#111827";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle="#374151";
    walls.forEach(w=>{
        ctx.fillRect(w.x*tile,w.y*tile,tile,tile);
    });

    ctx.fillStyle="#22c55e";
    ctx.fillRect(g.x*tile,g.y*tile,tile,tile);

    ctx.fillStyle="#ef4444";
    ctx.fillRect(e.x*tile,e.y*tile,tile,tile);

    ctx.fillStyle="#3b82f6";
    ctx.fillRect(p.x*tile,p.y*tile,tile,tile);
}

// MOVE (1 STEP ONLY)
function move(dir){

    if(gameEnded) return;

    let nx = p.x;
    let ny = p.y;

    if(dir==="up") ny--;
    if(dir==="down") ny++;
    if(dir==="left") nx--;
    if(dir==="right") nx++;

    if(nx>=0 && ny>=0 && nx<SIZE && ny<SIZE && !hit(nx,ny)){
        p.x = nx;
        p.y = ny;
    }

    checkWin();
}

// WIN CHECK
function checkWin(){

    if(gameEnded) return;

    if(p.x === g.x && p.y === g.y){

        gameEnded = true;

        clearInterval(loop);

        fetch("api/flag.json")
        .then(res => res.json())
        .then(data => {
            const f = document.getElementById("flag");
            f.style.display = "block";
            f.innerText = "ACCESS GRANTED: " + data.flag;
        });

    }
}

// enemy AI (BFS)
function getNextMove(){
    let queue=[[e.x,e.y,[]]];
    let visited=new Set();
    visited.add(e.x+","+e.y);

    let dirs=[[1,0],[-1,0],[0,1],[0,-1]];

    while(queue.length){
        let [x,y,path]=queue.shift();

        if(x===p.x && y===p.y){
            return path[0] || [0,0];
        }

        for(let d of dirs){
            let nx=x+d[0];
            let ny=y+d[1];
            let key=nx+","+ny;

            if(nx>=0&&ny>=0&&nx<SIZE&&ny<SIZE&&!hit(nx,ny)&&!visited.has(key)){
                visited.add(key);
                queue.push([nx,ny,[...path,d]]);
            }
        }
    }

    return [0,0];
}

// enemy move
function moveEnemy(){

    if(gameEnded) return;

    let step = getNextMove();

    e.x += step[0];
    e.y += step[1];

    if(e.x===p.x && e.y===p.y){

        document.getElementById("meme").style.display="block";

        setTimeout(()=>{
            document.getElementById("meme").style.display="none";
        },700);

        p = {x:0,y:0};
        e = {x:26,y:28};
    }
}

// loop
let loop = setInterval(()=>{
    moveEnemy();
    draw();
},120);

// keyboard support (PC)
document.addEventListener("keydown", (e)=>{

    if(gameEnded) return;

    if(e.key === "ArrowUp") move("up");
    if(e.key === "ArrowDown") move("down");
    if(e.key === "ArrowLeft") move("left");
    if(e.key === "ArrowRight") move("right");
});

draw();
