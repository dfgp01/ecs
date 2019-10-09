import { drawImage, drawRect, drawLine, drawCircle } from "../../foundation/engine/h5/render";
import { getSpriteFrameByName } from "../../foundation/";

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

function DrawRect(x = 0, y = 0, width = 0, height = 0){
    drawRect(x, y , width, height);
}

function DrawLine(x1 = 0, y1 = 0, x2 = 0, y2 = 0){
    drawLine(x1, y1, x2, y2);
}

function DrawCircle(x = 0, y = 0, radius = 0){
    drawCircle(x, y, radius);
}

export{GetSpriteFrame, DrawFrame, DrawRect, DrawLine, DrawCircle}