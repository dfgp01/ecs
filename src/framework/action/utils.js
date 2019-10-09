import { isStop, isStart, actionStart, actionStop } from './base';
import { CreateAnimateFrame, CreateAnimateAction } from './animate';


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


/**
 * 根据json数据创建序列帧动画
 */
function CreateAnimateWithData(animateData = null){
    if(!animateData){
        return null;
    }
    
    let framesData = animateData['frames'];
    if(!framesData || framesData.length == 0){
        return null;
    }

    let animateFrames = [];
    framesData.forEach(frameData => {
        animateFrames.push(
            CreateAnimateFrame(GetSpriteFrame(spriteFrameName),
                frameData['duration'], frameData['xOffset'], frameData['yOffset']));
    });
    return CreateAnimateAction(animateData['animate-type'], entityId, animateFrames);
}

export {GetRunnigActionList, RunAction, StopAction, CreateAnimateWithData}