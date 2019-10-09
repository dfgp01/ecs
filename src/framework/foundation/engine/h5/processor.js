
function loadImg(imgSrc, onLoadCallback){
    let img = new Image();
    img.src = imgSrc;
    img.onload = function () {
        onLoadCallback(img);
    }
}

var _callback;
var _frameNo = 0;
var _dt = 0;
var _last = 0;
var _isEnd = false;
function tick(timestamp) {
    _dt = timestamp - _last;
    _last = timestamp;
    _callback(_dt);
    if(!_isEnd){
        _frameNo = window.requestAnimationFrame(tick);
    }
}

function Run2222(onUpdateCallback = null) {
    _isEnd = false;
    _callback = onUpdateCallback;
    _frameNo = window.requestAnimationFrame(tick);
}

/**
 * debug
 */
var start = null;
var last = new Date().getTime();
function runTick(onUpdateCallback = null) {
    _isEnd = false;
    _callback = onUpdateCallback;
    setInterval(() => {
        start = new Date().getTime();
        if(!_isEnd){
            _callback(start - last);
        }
        last = new Date().getTime();
    }, _engine.tick);
}

function stop(){
    _isEnd = true;
}


//因为按住键的话，会不断触发onKeydown，所以做个map判断
var _keyDownMap = new Map();
function onKeyCallback(keyDownCallback = null, keyUpCallback = null){
    window.addEventListener("keydown", e => {
        let code = e.keyCode;
        if(_keyDownMap.get(code)){
            return;
        }
        _keyDownMap.set(code, 1);
        keyDownCallback(e.keyCode);
    });
    window.addEventListener("keyup", e => {
        let code = e.keyCode;
        _keyDownMap.delete(code);
        keyUpCallback(e.keyCode);
    });
}

function onMouseCallback(mousedownCallback = null, mouseupCallback = null){
    _engine.canvas.addEventListener("mousedown", event => {
        mousedownCallback(event.x, event.y);
    });
    _engine.canvas.addEventListener("mouseup", event => {
        mouseupCallback(event.x, event.y);
    });
    //_engine.canvas.addEventListener("mousemove",doMouseMove,false);
    //_engine.canvas.addEventListener("mouseout",doMouseOut,false);
}

export{
    loadImg, runTick, stop, onKeyCallback, onMouseCallback
}