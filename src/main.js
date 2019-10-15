import data from './data';
import { StartTest } from './framework/director/utils/game';
import { DrawCircle, DrawLine, DrawRect } from './framework/director/utils/render';
import { GetGridCenter } from './framework/component/tile/tilemap';
import { GetGridWidth, GetGridHeight } from './framework/foundation/structure/gridmap';
import { ToWorldPos } from './framework/component/camera/utils';
import { GetCamera } from './framework/director/world/res';

/**
 *  2019.10.09
 *      vs忽然不提示import了，按照网上的方法，加了个jsconfig.json就可以了
 */

//谨记数据驱动
var options = Object.assign(data, {
    debug : false,
    mousedownHandler : mousedownHandler,
    mouseupHandler : function(){}
});
options.tilemap.initHandler = initHandler;

function initHandler(val = 0, tilemap = null, grid = null){
    let pos = GetGridCenter(tilemap, grid);
    console.log(pos.x, pos.y);
    DrawRect(pos.x, pos.y, GetGridWidth(tilemap.gridmap), GetGridHeight(tilemap.gridmap));
    DrawRect(pos.x, pos.y, 2, 2);
}

function mousedownHandler(screenX = 0, screenY = 0){
    console.log(screenX, screenY);
    let pos = ToWorldPos(GetCamera(), screenX, screenY);
    console.log(pos.x, pos.y);
    DrawRect(pos.x, pos.y, 5, 5);
}

class MyScene {
    onStart(){

    }
    onUpdate(dt = 0){
        
    }
}

(function (){
    console.log(options);
    StartTest(options, new MyScene());
})()

