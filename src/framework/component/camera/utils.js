import { SetPos } from "../pos/utils";
import { NewRect, UpdateRectPosByUnit, GetRectStartPos } from "../../foundation/geometric/rect";
import { ToLocatePos, NewPos } from "../../foundation/geometric/point";
import { Entity } from "../../foundation/structure/ecs";
import { IsRectsCross } from "../../foundation/geometric/utils";


/**
 * 代码量少，暂时这样放
 */
class Camera extends Entity {
    constructor(){
        super();
        this.pos = null;
        this.rect = null;
    }
}

function NewCamera(x = 0, y = 0, width = 0, height = 0){
    let camera = new Camera();
    camera.pos = SetPos(camera.id, x, y);
    camera.rect = NewRect(0, 0, width, height);
    UpdateRectPosByUnit(camera.rect, x, y);
    return camera;
}

//目标矩形是否在镜头内
function IsInCamera(camera = null, rect = null){
    return IsRectsCross(camera.rect, rect);
}

/**
 * 转为镜头坐标
 * targetPos，如果是rect，请用startPos
 */
function ToScreenPos(camera = null, targetPos = null){
    return ToLocatePos(targetPos, GetRectStartPos(camera.rect));
}

/**
 * 镜头坐标转为全局坐标
 */
function ToWorldPos(camera = null, screenX = 0, screenY = 0){
    let start = GetRectStartPos(camera.rect);
    return NewPos(
        start.x + screenX,
        start.y + screenY
    );
}

/**
 * 镜头移动
 */
function CameraMove(camera = null, x = 0, y = 0){
    SetPos(camera.id, x, y);
    UpdateRectPosByUnit(camera.rect, x, y);
}

export{NewCamera, IsInCamera, ToScreenPos, ToWorldPos}