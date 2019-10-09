import { System } from "../../base/ecs";
import { GetMoveComponentList } from "../../common/move/utils";
import { LinkIterator } from "../../base/structure/link";

/**
 * 2019.09.29
 *      经过考虑，目前只做简单版本，不要想得太长远
 *      所以先不用系统统一更新位置，直接在action中setpos就好
 */
class PosUpdateSystem extends System {
    onUpdate(dt = 0){
        LinkIterator(GetMoveComponentList(), moveCom => {
            let vec = moveCom.vec;
            let pos = moveCom.pos;
            pos.x += vec.x;
            pos.y += vec.y;
            vec.x = 0;
            vec.y = 0;
        });
    }
}

var sys = null;
function GetPosUpdateSystem(){
    if(!sys){
        sys = new PosUpdateSystem();
    }
    return sys;
}

/**
 * 暂时放着，以后可能要放在systemList[0]，以便每帧初始化临时数据
 */
class ClearSystem extends System {
    onUpdate(dt = 0){
        LinkIterator(GetMoveComponentList(), moveCom => {
            let vec = moveCom.vec;
            vec.x = 0;
            vec.y = 0;
        });
    }
}

export{GetPosUpdateSystem}