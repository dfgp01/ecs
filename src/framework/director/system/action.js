import { System } from "../../foundation/structure/ecs";
import { GetRunnigActionList } from "../../action/utils";
import { LinkIterator } from "../../foundation/structure/link";
import { actionUpdate, actionEnd } from "../../action/base";

/**
 * 动作系统
 */
class ActionSystem extends System {
    constructor(){
        super(999);
    }
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