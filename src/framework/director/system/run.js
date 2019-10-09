import { GetActionSystem } from "./action";
import { GetRenderUpdateSystem, GetDrawRectSystem } from "./render";
import { GetPosUpdateSystem } from "./move";
import { runTick } from "../../foundation/render/canvas";

/**
 * 主系统列表
 */
var posSys = GetPosUpdateSystem();
var logicSystems = [GetActionSystem()];
var renderSystems = [GetRenderUpdateSystem()];
function initSystems(debug = false){
    //初始默认系统
    if(debug){
        renderSystems.push(GetDrawRectSystem());
    }
}

var logicTick = 16;     //60fps
var renderTick = 41;    //24fps
var _t1, _t2 = 0;
function runWithScene(scene){
    logicSystems.forEach((system)=>{
        system.onStart();
    });
    //posSys.onStart();

    renderSystems.forEach((system)=>{
        system.onStart();
    });
    scene.onStart();

    //main loop
    runTick((dt)=>{
        _t1 += dt;
        if(_t1 >= logicTick){
            _t1 -= logicTick;
            scene.onUpdate(dt);
            logicSystems.forEach(system => {
                system.onUpdate(dt);
            });
            //posSys.onUpdate(dt);
        }

        _t2 += dt;
        if(_t2 >= renderTick){
            _t2 -= renderTick;
            renderSystems.forEach(system => {
                system.onUpdate(dt);
            });
        }
    });
}

function getSystemList(){
    return logicSystems;
}

export{initSystems, runWithScene, getSystemList}