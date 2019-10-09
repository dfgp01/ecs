
//谨记数据驱动
var options = {
    debug : false,
    fps : data.fps,
    screen : {
        width : data.screen.width,
        height : data.screen.height
    },
    stage : {
        width : data.stage.width,
        height : data.stage.height
    },
    camera : {
        x : data.camera.x,
        y : data.camera.y
    },
    mousedownHandler : mousedownHandler,
    mouseupHandler : mouseupHandler
}

var startPos;
var endPos;
var line1;
var line2;

function mousedownHandler(x = 0, y = 0){
    startPos = NewPos(x, y);
}
function mouseupHandler(x = 0, y = 0){
    if(!startPos){
        return;
    }
    if(!line1){
        line1 = NewLineWithPos(startPos.x, startPos.y, x, y);
    }else{
        line2 = NewLineWithPos(startPos.x, startPos.y, x, y);
    }
    DrawLine(startPos.x, startPos.y, x, y);
    if(line1 && line2){
        let pos = InterSectionPos(line1, line2);
        console.log(pos);
        DrawCircle(pos.x, pos.y, 10);
    }
    startPos = null;
}

class MyScene {
    onStart(){

    }
    onUpdate(dt = 0){
        
    }
}

(function (){
    console.log(options);
    StartGameTest(options, new MyScene());
})()