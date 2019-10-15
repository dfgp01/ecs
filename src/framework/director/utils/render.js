import { drawImage, drawLine, drawCircle } from "../../foundation/engine/h5/render";
import { getSpriteFrameByName } from "../../foundation/structure/frame";
import { drawRectInCamera } from "../system/render";
import { NewRect, UpdateRectCenterPos } from "../../foundation/geometric/rect";

 /**
  * 获取精灵帧
  * TODO 可能会改成id形式
  */
 function GetSpriteFrame(name = ""){
    if(name == ""){
        return null;
    }
    return getSpriteFrameByName(name);
}

/**
 * TODO 可能会改成spriteFrameId参数
 * 以下的x, y 都是屏幕坐标
 */
function DrawFrame(spriteFrame = null, x = 0, y = 0, width = 0, height = 0){
    let textureArea = spriteFrame.textureArea;
    drawImage(spriteFrame.bitmapData,
        textureArea.x, textureArea.y, textureArea.width, textureArea.height,
        x, y , width, height);
}

/**
 * TODO 以后要变为rectPosTuple
 */
function DrawRect(x = 0, y = 0, width = 0, height = 0){
    let rect = NewRect(0, 0, width, height);
    UpdateRectCenterPos(rect, x, y);
    drawRectInCamera(rect);
}

function DrawLine(x1 = 0, y1 = 0, x2 = 0, y2 = 0){
    drawLine(x1, y1, x2, y2);
}

function DrawCircle(x = 0, y = 0, radius = 0){
    drawCircle(x, y, radius);
}

export{GetSpriteFrame, DrawFrame, DrawRect, DrawLine, DrawCircle}