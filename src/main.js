import data from './data';
import { StartTest } from './framework/director/utils/game';
import { GetGridCenter } from './framework/component/tile/tilemap';
import { GetGridWidth, GetGridHeight } from './framework/foundation/structure/gridmap';
import { AddBlockCollider, AddBodyCollider } from './framework/component/collide/box2/utils';
import { Entity } from './framework/foundation/structure/ecs';
import { NewRectPosTuple } from './framework/component/pos/rect/component';
import { NewPos } from './framework/foundation/geometric/point';
import { NewRect } from './framework/foundation/geometric/rect';
import { SetPos, Move } from './framework/component/pos/utils';
import { KEY_A, KEY_W, KEY_S, KEY_D } from './framework/foundation/engine/h5/model';
import { GetCmdComponent, PushCmd, cmd_mv_up, cmd_mv_left, cmd_mv_down, cmd_mv_right, ReleaseCmd, CreateCMDMoveAction } from './game/cmd';
import { RunAction } from './framework/action/utils';

/**
 *  2019.10.09
 *      vs忽然不提示import了，按照网上的方法，加了个jsconfig.json就可以了
 */

//谨记数据驱动
var options = Object.assign(data, {
    keyDownHandler : keyDownHandler,
    keyUpHanler : keyUpHanler,
    dx : 8,
    dy : 8,
    bodySize : 25,
    blockSize : 20
});
options.tilemap.initHandler = initHandler;

function initHandler(val = 0, tilemap = null, grid = null){
    let pos = GetGridCenter(tilemap, grid);
    switch(val){
        case 0:
            break;
        case 9:
            NewPlayer(pos.x, pos.y);
            break;
        default:
            NewBlock(pos.x, pos.y, options.blockSize * val, options.blockSize * val);
            break;
    }
}

function NewBlock(x = 0, y = 0, width = 0, height = 0){
    let id = new Entity().id;
    SetPos(id, x, y);
    AddBlockCollider(id, NewRectPosTuple(
        id, 0, 0, NewRect(0, 0, width, height)
    ));
}

var plyId = 0;
var cmdCom = null;
function NewPlayer(x = 0, y = 0){
    plyId = new Entity().id;
    SetPos(plyId, x, y);
    AddBodyCollider(plyId, NewRectPosTuple(
        plyId, 0, 0, NewRect(0, 0, options.bodySize, options.bodySize)
    ));
    cmdCom = GetCmdComponent(plyId);
    RunAction(
        CreateCMDMoveAction(plyId, 0, options.dx, options.dy));
}

function keyDownHandler(code = 0){
    switch(code){
        case KEY_W:
            PushCmd(cmdCom, cmd_mv_up);
            break;
        case KEY_A:
            PushCmd(cmdCom, cmd_mv_left);
            break;
        case KEY_S:
            PushCmd(cmdCom, cmd_mv_down);
            break;
        case KEY_D:
            PushCmd(cmdCom, cmd_mv_right);
            break;
    }
}
function keyUpHanler(code = 0){
    switch(code){
        case KEY_W:
            ReleaseCmd(cmdCom, cmd_mv_up);
            break;
        case KEY_A:
            ReleaseCmd(cmdCom, cmd_mv_left);
            break;
        case KEY_S:
            ReleaseCmd(cmdCom, cmd_mv_down);
            break;
        case KEY_D:
            ReleaseCmd(cmdCom, cmd_mv_right);
            break;
    }
}

class MyScene {
    onStart(){}
    onUpdate(dt = 0){}
}

(function (){
    console.log(options);
    StartTest(options, new MyScene());
})()