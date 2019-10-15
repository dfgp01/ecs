import { GetDisplayList } from "../../component/view/component";
import { LinkIterator } from "../../foundation/structure/link";
import { GetPos } from "../../component/pos/utils";
import { UpdateRectPosByUnit, GetRectStartPos, GetRectWidth, GetRectHeight } from "../../foundation/geometric/rect";
import { GetCamera } from "../world/res";
import { IsInCamera, ToScreenPos } from "../../component/camera/utils";
import { drawImage, drawRect } from "../../foundation/engine/h5/render";
import { System } from "../../foundation/structure/ecs";

/**
 * 渲染系统，逻辑步骤：
 * 1.   清除画布
 * 2.   重定位摄像机
 * 3.   计算单位显示矩形是否在摄像机矩形内
 * 4.   转换为画布坐标
 * 5.   画出图像
 */
class RenderUpdateSystem extends System {
    onUpdate(dt = 0){
        //canvasClear();
        LinkIterator(GetDisplayList(), displayTuple => {
            let pos = GetPos(displayTuple.entityId);
            UpdateRectPosByUnit(displayTuple.displayArea, pos.x, pos.y);
            drawFrameInCamera(displayTuple);
        });
    }
}

var renderSys = null;
function GetRenderUpdateSystem(){
    if(!renderSys){
        renderSys = new RenderUpdateSystem();
    }
    return renderSys;
}


/**
 * 将所有矩形画出来
 */
class DrawRectSystem extends System {
    onUpdate(dt = 0){
        //DrawRect(GetCamera(), this._camera.rect);
        LinkIterator(GetRectList(), collider => {
            drawRectInCamera(collider.rect);
        });
    }
}

var debugSys = null;
function GetDrawRectSystem(){
    if(!debugSys){
        debugSys = new DrawRectSystem();
    }
    return debugSys;
}


/**
 * 渲染到画布，只渲染在镜头内的
 */
function drawFrameInCamera(displayTuple = null){
    let camera = GetCamera();
    let displayArea = displayTuple.displayArea;
    if(!IsInCamera(camera, displayArea)){
        return;
    }
    //转为画布坐标
    let screenPos = ToScreenPos(camera, GetRectStartPos(displayArea));

    let textureArea = displayTuple.spriteFrame.textureArea;
    drawImage(displayTuple.spriteFrame.bitmapData,
        textureArea.x, textureArea.y, textureArea.width, textureArea.height,
        screenPos.x, screenPos.y, GetRectWidth(displayArea), GetRectHeight(displayArea));
}

function drawRectInCamera(displayArea = null){
    let camera = GetCamera();
    if(!IsInCamera(camera, displayArea)){
        return;
    }
    //转为画布坐标
    let screenPos = ToScreenPos(camera, GetRectStartPos(displayArea));
    drawRect(
        screenPos.x, screenPos.y,
        GetRectWidth(displayArea), GetRectHeight(displayArea));
}

export {GetRenderUpdateSystem, GetDrawRectSystem, drawFrameInCamera, drawRectInCamera}