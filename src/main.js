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

/**
 *  2019.10.09
 *      vs忽然不提示import了，按照网上的方法，加了个jsconfig.json就可以了
 */

//谨记数据驱动
var options = Object.assign(data, {
    debug : true,
    collide : {
        useBox : true
    },
    keyDownHandler : keyDownHandler,
    keyUpHanler : keyUpHanler
});
options.tilemap.initHandler = initHandler;

function initHandler(val = 0, tilemap = null, grid = null){
    let pos = GetGridCenter(tilemap, grid);
    if(val == 1){
        NewBlock(pos.x, pos.y, GetGridWidth(tilemap.gridmap), GetGridHeight(tilemap.gridmap));
    }else if(val == 2){
        NewPlayer(pos.x, pos.y);
    }
}

function NewBlock(x = 0, y = 0, width = 0, height = 0){
    AddBlockCollider(new Entity().id, NewRectPosTuple(
        NewPos(x, y), 0, 0, NewRect(0, 0, width, height)
    ));
}

var plyId = 0;
var plyPos = null;
function NewPlayer(x = 0, y = 0){
    plyId = new Entity().id;
    plyPos = SetPos(plyId, x, y);
    AddBodyCollider(plyId, NewRectPosTuple(
        plyPos, 0, 0, NewRect(0, 0, 25, 25)
    ));
}

var keys = 0;   //1111 = 上下左右
function keyDownHandler(code = 0){
    switch(code){
        case KEY_W:
            keys = keys | 8;
            break;
        case KEY_A:
            keys = keys | 2;
            break;
        case KEY_S:
            keys = keys | 4;
            break;
        case KEY_D:
            keys = keys | 1;
            break;
    }
}
function keyUpHanler(code = 0){
    switch(code){
        case KEY_W:
            keys = keys & 7;
            break;
        case KEY_A:
            keys = keys & 13;
            break;
        case KEY_S:
            keys = keys & 11;
            break;
        case KEY_D:
            keys = keys & 14;
            break;
    }
}

var d = 2;
var dx = 0;
var dy = 0;
class MyScene {
    onStart(){

    }
    onUpdate(dt = 0){
        if(keys & 1){
            dx = d;
        }else if(keys & 2){
            dx = -d;
        }else{
            dx = 0;
        }

        if(keys & 4){
            dy = d;
        }else if(keys & 8){
            dy = -d;
        }else{
            dy = 0
        }
        Move(plyId, dx, dy);
    }
    
}

(function (){
    console.log(options);
    StartTest(options, new MyScene());
})()