
/**
 * 浏览器的key-code
 */
export const KEY_RIGHT = 39;
export const KEY_LEFT = 37;
export const KEY_UP = 38;
export const KEY_DOWN = 40;

export const KEY_SPACE = 32;

export const KEY_W = 87;
export const KEY_A = 65;
export const KEY_S = 83;
export const KEY_D = 68;

/**
 *  engine = web-browser, canvas
 */
var _engine = {
	ctx : null,
    canvas : null,
    fps : 0,
    tick : 0
};

function getEngine(){
    return _engine;
}

function initCanvas(width = 0, height = 0, fps = 10){
    let canvas = document.getElementById("canvas");
    canvas.width = width;
    canvas.height = height;
    _engine.canvas = canvas;
    _engine.ctx = canvas.getContext("2d");
    _engine.ctx.strokeStyle="#0000ff";          //画矩形框用的
    _engine.fps = fps;
    _engine.tick = 1000 / fps;
}

export{getEngine, initCanvas}