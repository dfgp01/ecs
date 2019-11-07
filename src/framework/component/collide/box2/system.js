import { FixUnitPos, IsRectsCross, FixUnitVec, IsRectsCrossWithVec } from "../../pos/rect/utils";
import { GetArea, GetRectWidth, GetRectHeight, GetRectHalfHeight, GetRectHalfWidth } from "../../../foundation/geometric/rect";
import { GetRectPosCenter, GetRectPosStart, GetRectPosEnd, GetRectUnitPos } from "../../pos/rect/component";
import { System } from "../../../foundation/structure/ecs";
import { LinkIterator } from "../../../foundation/structure/link";
import { GetBodyColliderList, GetBlockColliderList } from "./utils";
import { GetVec, SetVecWithEndPos, SetVecX, SetVecY } from "../../pos/utils";
import { NewPos } from "../../../foundation/geometric/point";
import { Abs, Max, Min } from "../../../foundation/geometric/math";

/**
 * 简易方案构想，目前机制：
 *      body必须是移动中的，且和block碰撞了
 *      以vec为依据，确定最大活动范围
 *      若一边被收窄，还原另一边的活动
 */
class BoxColliderSystem extends System {
    constructor(callback = null){
        super(900);
        this.callback = callback;
    }
    onUpdate(dt = 0){
        LinkIterator(GetBodyColliderList(), body => {
            if(!bodyBefore(body)){
                return;
            }
            LinkIterator(GetBlockColliderList(), block => {
                logic(body, block);
            });
        });
    }
}

var boxColliderSys = null
function GetBoxColliderSystem(callback = null){
    if(!boxColliderSys){
        boxColliderSys = new BoxColliderSystem(callback);
    }
    return boxColliderSys;
}

var bodyStart = null;
var bodyEnd = null;
var blockStart = null;
var blockEnd = null;
var unitVec = null;
var bodyHalfWidth = 0;
var bodyHalfHeight = 0;
var bodyPos = null;
var bodyId = 0;

/**
 * 前置处理，临时变量赋值，以免重复计算
 */
function bodyBefore(bodyCollider = null){
    bodyId = bodyCollider.entityId;
    unitVec = GetVec(bodyCollider.entityId);
    if(unitVec.x == 0 && unitVec.y == 0){
        return false;
    }
    bodyHalfWidth = GetRectHalfWidth(bodyCollider.rect.rect);
    bodyHalfHeight = GetRectHalfHeight(bodyCollider.rect.rect);

    bodyStart = GetRectPosStart(bodyCollider.rect);
    bodyEnd = GetRectPosEnd(bodyCollider.rect);
    bodyPos = GetRectPosCenter(bodyCollider.rect);
    return true;
}

function logic(bodyCollider = null, blockCollider = null){
    if(!IsRectsCrossWithVec(bodyCollider.rect, blockCollider.rect)){
        return;
    }
    blockStart = GetRectPosStart(blockCollider.rect);
    blockEnd = GetRectPosEnd(blockCollider.rect);
    isLR() || isUD();
}

//可以实锤的左右关系
function isLR(){
    if(unitVec.x == 0){
        return false;
    }
    //检查纵边有效性，踩线不算
    let maxY1 = Max(bodyStart.y, blockStart.y);
    let minY2 = Min(bodyEnd.y, blockEnd.y);
    if(minY2 <= maxY1){
        return false;
    }
    //计算x最新活动范围（最短距离）
    let x = unitVec.x > 0 ? blockStart.x - bodyHalfWidth : blockEnd.x + bodyHalfWidth;
    SetVecX(bodyId, x - bodyPos.x);
    return true;
}

//可以实锤的上下关系
function isUD(){
    if(unitVec.y == 0){
        return false;
    }
    //检查横边有效性，踩线不算
    let maxX1 = Max(bodyStart.x, blockStart.x);
    let minX2 = Min(bodyEnd.x, blockEnd.x);
    if(minX2 <= maxX1){
        return false;
    }
    //计算y最新活动范围（最短距离）
    let y = unitVec.y > 0 ? blockStart.y - bodyHalfHeight : blockEnd.y + bodyHalfHeight;
    SetVecY(bodyId, y - bodyPos.y);
    return true;
}

export {GetBoxColliderSystem}