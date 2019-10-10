import { NewRect } from "../../base/geometric/rect";
import { SetFrame } from "../component/view/utils";
import { Action } from "./base";
import { GetSpriteFrameWidth, GetSpriteFrameHeight } from "../foundation/structure/frame";

export const ANIMATE_TYPE_NORMAL = 0;
export const ANIMATE_TYPE_REPEAT = 1;
export const ANIMATE_TYPE_STOP_LAST = 2;
export const ANIMATE_TYPE_GOTO_FIRST = 3;



/**
 * 动画帧、或者叫显示帧DisplayFrame
 */
class AnimateFrame {
    constructor(spriteFrame = null, duration = 0, displayArea = null) {
        this.spriteFrame = spriteFrame;
        this.duration = duration;
        this.displayArea = displayArea;
    }
}

function CreateAnimateFrame(spriteFrame = null, duration = 0, xOffset = 0, yOffset = 0){
    let displayArea = NewRect(xOffset, yOffset,
        GetSpriteFrameWidth(spriteFrame), GetSpriteFrameHeight(spriteFrame));
    return new AnimateFrame(spriteFrame, duration, displayArea);
}

/**
 * 只切换帧，还有移除帧元件
 */
class SetFrameAction extends Action {
    constructor(entityId = 0, spriteFrame = null, displayArea = null){
        super(entityId);
        this.spriteFrame = spriteFrame;
        this.displayArea = displayArea;
    }
    onStart(){
        SetFrame(this.entityId, this.spriteFrame, this.displayArea);
    }
    onEnd(){
        //Hide(this.entityId);
    }
}



/**
 * TODO
 * 0.播放完后结束，移出view-tuple-list
 * 1.停在最后一帧
 * 2.返回到第一帧
 */
function CreateAnimateAction(type = ANIMATE_TYPE_NORMAL, entityId = 0, animateFrames = null){
    switch(type){
        case ANIMATE_TYPE_NORMAL:
        return createAnimate(entityId, animateFrames);
        case ANIMATE_TYPE_REPEAT:
        return createRepeatAnimate(entityId, animateFrames);
    }
    return null;
}

function createAnimate(entityId = 0, animateFrames = null){
    let actions = [];
    animateFrames.forEach(animateFrame => {
        actions.push(
            CreateTimeoutAction(entityId, animateFrame.duration, 
                new SetFrameAction(entityId, animateFrame.spriteFrame, animateFrame.displayArea)));
    });
    return CreateSeqAction(entityId, actions);
}

function createRepeatAnimate(entityId = 0, animateFrames = null){
    return CreateRepeatForeverAction(entityId, 
        createAnimate(entityId, animateFrames));
}

export{CreateAnimateFrame, CreateAnimateAction}