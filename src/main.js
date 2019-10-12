import data from './data';
import { StartTest } from './framework/director/utils/game';
import { NewPos } from './framework/foundation/geometric/point';
import { NewLineWithPos } from './framework/foundation/geometric/line';
import { InterSectionPos } from './framework/foundation/geometric/utils';
import { DrawCircle, DrawLine, DrawRect } from './framework/director/utils/render';
import { GetGridCenter } from './framework/component/tile/tilemap';
import { GetGridWidth, GetGridHeight } from './framework/foundation/structure/gridmap';

/**
 *  2019.10.09
 *      vs忽然不提示import了，按照网上的方法，加了个jsconfig.json就可以了
 */

//谨记数据驱动
var options = Object.assign(data, {
    debug : false
});
options.tilemap.initHandler = initHandler;

function initHandler(val = 0, tilemap = null, grid = null){
    let pos = GetGridCenter(tilemap, grid);
    console.log(pos.x, pos.y);
    DrawRect(pos.x, pos.y, GetGridWidth(tilemap.gridmap), GetGridHeight(tilemap.gridmap));
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