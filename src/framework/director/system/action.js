import { actionUpdate, actionEnd } from "../../common/action/base";
import { System } from "../../base/ecs";
import { LinkIterator } from "../../base/structure/link";

/**
 * 动作系统
 */
class ActionSystem extends System {
    onUpdate(dt = 0) {
        LinkIterator(GetRunnigActionList(), action => {
            actionUpdate(action, dt);
            if(action.isEnd()){
                actionEnd(action);
            }
        });
    }
}

var sys = null;
function GetActionSystem(){
    if(!sys){
        sys = new ActionSystem();
    }
    return sys;
}

export{GetActionSystem}