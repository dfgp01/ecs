import { getEngine } from "./model";

var _engine = getEngine();

function clear() {
    let c = _engine.canvas;
    _engine.ctx.clearRect(0, 0, c.width, c.height);
}

function Draw(imgData, x = 0, y = 0, width = 0, height = 0) {
    let ctx = _engine.ctx;
	ctx.drawImage(imgData, x, y, width, height);
}

const Radius = Math.PI/180;
function DrawImageWithAngle(angle = 0, imgData, sx = 0, sy = 0, swidth = 0, sheight = 0, x = 0, y = 0, width = 0, height = 0) {
    let ctx = _engine.ctx;
    ctx.save();
    ctx.translate(x + width/2, y + height/2);
    ctx.rotate(angle * Radius);
    DrawImage(imgData, sx, sy, swidth, sheight, -width/2, -height/2, width, height);
    ctx.restore();

    // ctx.translate(100, 100);
	// ctx.rotate(90 * Math.PI/180);	//以上面的偏移点为准，进行旋转
	// ctx.drawImage(i, 187, 0, 186, 130, -0, -0, 100, 100);
}

//参考：context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
function drawImage(imgData, sx = 0, sy = 0, swidth = 0, sheight = 0, x = 0, y = 0, width = 0, height = 0) {
    let ctx = _engine.ctx;
	ctx.drawImage(imgData, sx, sy, swidth, sheight, x, y, width, height);
}

function drawRect(x = 0, y = 0, width = 0, height = 0){
    let ctx = _engine.ctx;
    ctx.strokeRect(x, y, width, height);
}

function drawLine(x1 = 0, y1 = 0, x2 = 0, y2 = 0){
    let ctx = _engine.ctx;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function drawCircle(x = 0, y = 0, radius = 0){
    let ctx = _engine.ctx;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
}

export{clear, drawImage, drawRect, drawLine, drawCircle}