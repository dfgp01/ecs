import { isStop, isStart, actionStart, actionStop } from './base';
import { PushToLink, RemoveByKeyId } from '../foundation/structure/link';


var actionList = new Link();
function GetRunnigActionList(){
    return actionList;
}

/**
 * 运行action，并加入到action系统link中，一般供外部调用 
 */
function RunAction(action = null){
    if(isStop(action)){
        actionStart(action);
        PushToLink(actionList, action, action.id);
    }
}

/**
 * 立即终止action并移出action系统link，一般供外部调用
 */
function StopAction(action = null){
    if(isStart(action)){
        actionStop(action);
        RemoveByKeyId(actionList, action.id);
    }
}

export {GetRunnigActionList, RunAction, StopAction}