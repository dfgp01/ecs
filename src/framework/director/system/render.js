import { GetDisplayList } from "../../component/view/component";
import { LinkIterator } from "../../foundation/structure/link";
import { GetPos } from "../../component/pos/utils";
import { GetRectWidth, GetRectHeight } from "../../foundation/geometric/rect";
import { GetCamera } from "../world/res";
import { IsInCamera, ToScreenPos } from "../../component/camera/utils";
import { drawImage, drawRect, clear } from "../../foundation/engine/h5/render";
import { System } from "../../foundation/structure/ecs";
import { GetBlockColliderList, GetBodyColliderList } from "../../component/collide/box2/utils";
import { GetRectPosStart } from "../../component/pos/rect/component";

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
        clear();
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
        LinkIterator(GetBlockColliderList(), collider => {
            drawRectInCamera(collider.rect);
        });
        LinkIterator(GetBodyColliderList(), collider => {
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

function drawRectInCamera(rectPosTuple = null){
    let camera = GetCamera();
    if(!IsInCamera(camera, rectPosTuple)){
        return;
    }
    //转为画布坐标
    let screenPos = ToScreenPos(camera, GetRectPosStart(rectPosTuple));
    drawRect(
        screenPos.x, screenPos.y,
        GetRectWidth(rectPosTuple.rect), GetRectHeight(rectPosTuple.rect));
}

export {GetRenderUpdateSystem, GetDrawRectSystem, drawFrameInCamera, drawRectInCamera}