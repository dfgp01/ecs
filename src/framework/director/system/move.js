import { System } from "../../foundation/structure/ecs";
import { LinkIterator } from "../../foundation/structure/link";
import { GetMoverList } from "../../component/pos/utils";

/**
 * 2019.09.29
 *      经过考虑，目前只做简单版本，不要想得太长远
 *      所以先不用系统统一更新位置，直接在action中setpos就好
 */
class PosUpdateSystem extends System {
    constructor(){
        super(100);
    }
    onUpdate(dt = 0){
        LinkIterator(GetMoverList(), moveCom => {
            let vec = moveCom.vec;
            if(vec.x == 0 && vec.y == 0 ){
                return;
            }
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

export{GetPosUpdateSystem}