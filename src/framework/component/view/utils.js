import { AddDisplay, RemoveDisplay } from "./component";

/**
 * 切换显示帧
 * TODO 需要判断重复性
 */
function SetFrame(entityId = 0, spriteFrame = null, xOffset = 0, yOffset = 0){
    AddDisplay(entityId, spriteFrame, xOffset, yOffset);
}

/**
 * 隐藏当前单位的帧图像，剔除出显示队列
 */
function Hide(entityId = 0){
    RemoveDisplay(entityId);
}

export {SetFrame, Hide}