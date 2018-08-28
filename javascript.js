window.onload = () => {
    setInterval(function(){draw()}, 500);
};

function draw() {
    const cvs = document.getElementById("myCanvas");

    if(!cvs || !cvs.getContext) {
        return false;
    }

    const ctx = cvs.getContext("2d");

    const x = Math.round(Math.random()*400);
    const y = Math.round(Math.random()*400);
    const col = Math.round(Math.random()*255);

    ctx.fillStyle = `rgba(${col}, ${col}, ${col}, 0.5)`;
    ctx.beginPath();
    ctx.arc(x, y, 50, 0*Math.PI, (360/180)*Math.PI);
    ctx.fill();
    ctx.stroke();
}

document.getElementById("update").addEventListener("click",() => {
    draw();
});

addEventListener("click", (e) => {
    const cvs = document.getElementById("myCanvas");

    if(!cvs || !cvs.getContext) {
        return false;
    }

    const ctx = cvs.getContext("2d");

    ctx.beginPath();
    ctx.arc(e.clientX, e.clientY, 50, 0*Math.PI, (360/180)*Math.PI);
    ctx.fill();
    ctx.stroke();
});
