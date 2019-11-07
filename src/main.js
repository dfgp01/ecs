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
import { KEY_A, KEY_W, KEY_S, KEY_D, KEY_SPACE } from './framework/foundation/engine/h5/model';
import { GetCmdComponent, PushCmd, cmd_mv_up, cmd_mv_left, cmd_mv_down, cmd_mv_right, ReleaseCmd, CreateCMDMoveAction, cmd_jump } from './game/cmd';
import { RunAction } from './framework/action/utils';
import { GetStatusChangerAction, BoxCallback } from './game/action';
import { AddGroupCollider } from './framework/component/collide/group/utils';

/**
 *  2019.10.09
 *      vs忽然不提示import了，按照网上的方法，加了个jsconfig.json就可以了
 */

//谨记数据驱动，分清业务配置和框架逻辑配置
var options = Object.assign(data, {
    keyDownHandler : keyDownHandler,
    keyUpHanler : keyUpHanler,
    collide : {
		useBox : true,
        group : [
        {
            team1 : 1,
            team2 : 2
        }],
        callback : BoxCallback
	}
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
            NewBlock(pos.x, pos.y, GetGridWidth(tilemap.gridmap), GetGridHeight(tilemap.gridmap));
            break;
    }
}

function NewBlock(x = 0, y = 0, width = 0, height = 0){
    let id = new Entity().id;
    SetPos(id, x, y);
    let rect = NewRectPosTuple(
        id, 0, 0, NewRect(0, 0, width, height)
    );
    AddBlockCollider(id, rect);
    AddGroupCollider(id, rect, 0, 2);
}

var plyId = 0;
var cmdCom = null;
function NewPlayer(x = 0, y = 0){
    plyId = new Entity().id;
    SetPos(plyId, x, y);
    let rect = NewRectPosTuple(
        plyId, 0, 0, NewRect(0, 0, options.bodySize, options.bodySize)
    );
    AddBodyCollider(plyId, rect);
    AddGroupCollider(plyId, rect, 0, 1);
    cmdCom = GetCmdComponent(plyId);
    //RunAction(CreateCMDMoveAction(plyId, 0, options.dx, options.dy));
    RunAction(
        GetStatusChangerAction(plyId, options.dx, options.jumpDy, options.fallDy, options.maxFallDy)
    );
}

function keyDownHandler(code = 0){
    switch(code){
        // case KEY_W:
        //     PushCmd(cmdCom, cmd_mv_up);
        //     break;
        // case KEY_S:
        //     PushCmd(cmdCom, cmd_mv_down);
        //     break;
        case KEY_A:
            PushCmd(cmdCom, cmd_mv_left);
            break;
        case KEY_D:
            PushCmd(cmdCom, cmd_mv_right);
            break;
        case KEY_SPACE:
            PushCmd(cmdCom, cmd_jump);
    }
}
function keyUpHanler(code = 0){
    switch(code){
        // case KEY_W:
        //     ReleaseCmd(cmdCom, cmd_mv_up);
        //     break;
        // case KEY_S:
        //     ReleaseCmd(cmdCom, cmd_mv_down);
        //     break;
        case KEY_A:
            ReleaseCmd(cmdCom, cmd_mv_left);
            break;
        case KEY_D:
            ReleaseCmd(cmdCom, cmd_mv_right);
            break;
        case KEY_SPACE:
                ReleaseCmd(cmdCom, cmd_jump);
    }
}

class MyScene {
    onStart(){}
    onUpdate(dt = 0){
    }
}

(function (){
    console.log(options);
    StartTest(options, new MyScene());
})()