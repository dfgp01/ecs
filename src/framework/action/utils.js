import { PushToLink, RemoveByKeyId, NewLink } from '../foundation/structure/link';

var actionList = NewLink();
function GetRunnigActionList(){
    return actionList;
}

const ACTION_STATE_RUNNING = 1;
const ACTION_STATE_END = 2;

/**
 * 运行action，并加入到action系统link中，一般供外部调用 
 */
function RunAction(action = null, dt = 0){
    if(action.state == ACTION_STATE_RUNNING){
        return;
    }
    PushToLink(actionList, action, action.id);
    action.state = ACTION_STATE_RUNNING;
    action.onStart();
    action.onUpdate(dt);
}

/**
 * 立即终止action并移出action系统link，一般供外部调用
 */
function StopAction(action = null){
    if(action.state != ACTION_STATE_RUNNING){
        return;
    }
    RemoveByKeyId(actionList, action.id);
    action.state = ACTION_STATE_END;
    action.onEnd();
}

export {GetRunnigActionList, RunAction, StopAction}