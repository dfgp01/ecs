import { FixUnitPos, IsRectsCross } from "../../pos/rect/utils";
import { GetArea, GetRectWidth, GetRectHeight, GetRectHalfHeight, GetRectHalfWidth } from "../../../foundation/geometric/rect";
import { GetRectPosCenter, GetRectPosStart, GetRectPosEnd, GetRectUnitPos } from "../../pos/rect/component";
import { System } from "../../../foundation/structure/ecs";
import { LinkIterator } from "../../../foundation/structure/link";
import { GetBodyColliderList, GetBlockColliderList } from "./utils";
import { GetVec } from "../../pos/utils";
import { NewPos } from "../../../foundation/geometric/point";
import { Abs, Max, Min } from "../../../foundation/geometric/math";
import { BlockCollider } from "../../x/collide/model";

/**
 * 简易方案构想，目前机制：
 *      body必须是移动中的，且和block碰撞了
 *      以vec为依据，确定最大活动范围
 *      若一边被收窄，还原另一边的活动
 */
class BoxColliderSystem extends System {
    onUpdate(dt = 0){
        LinkIterator(GetBodyColliderList(), body => {
            if(!bodyBefore(body)){
                return;
            }
            LinkIterator(GetBlockColliderList(), block => {
                logic(body, block);
            });
            bodyAfter(body);
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

var bodyX = 0;
var bodyY = 0;
var minX = 0;
var maxX = 0;
var minY = 0;
var maxY = 0;
var lastBodyStart = null;
var lastBodyEnd = null;
var blockStart = null;
var blockEnd = null;
var unitVec = null;
var bodyHalfWidth = 0;
var bodyHalfHeight = 0;

/**
 * 前置处理，临时变量赋值，以免重复计算
 */
function bodyBefore(bodyCollider = null){
    unitVec = GetVec(bodyCollider.entityId);
    if(unitVec.x == 0 && unitVec.y == 0){
        return false;
    }
    bodyHalfWidth = GetRectHalfWidth(bodyCollider.rect.rect);
    bodyHalfHeight = GetRectHalfHeight(bodyCollider.rect.rect);
    let pos = GetRectPosCenter(bodyCollider.rect);
    bodyX = pos.x;
    bodyY = pos.y;

    let start = GetRectPosStart(bodyCollider.rect);
    lastBodyStart = NewPos(
        start.x - unitVec.x,
        start.y - unitVec.y
    );
    let end = GetRectPosEnd(bodyCollider.rect);
    lastBodyEnd = NewPos(
        end.x - unitVec.x,
        end.y - unitVec.y
    );
    minX = end.x;
    maxX = start.x;
    minY = end.y;
    maxY = start.y;
    return true;
}

function logic(bodyCollider = null, blockCollider = null){
    if(!IsRectsCross(bodyCollider.rect, blockCollider.rect)){
        return;
    }
    blockBefore(blockCollider);
    isLR() || isUD();
}

function blockBefore(blockCollider = null){
    blockStart = GetRectPosStart(blockCollider.rect);
    blockEnd = GetRectPosEnd(blockCollider.rect);
}

//可以实锤的左右关系
function isLR(){
    if(unitVec.x == 0){
        return false;
    }
    if(!checkVEdge()){
        return false;
    }
    return minDistanceX();
}

/**
 * 检查纵边有效性，踩线不算
 */
function checkVEdge() {
    let maxY1 = Max(lastBodyStart.y, blockStart.y);
    let minY2 = Min(lastBodyEnd.y, blockEnd.y);
    return minY2 > maxY1;
}

/**
 * 计算x最新活动范围（最短距离）
 */
function minDistanceX(){
    if(unitVec.x > 0){
        if(blockStart.x < minX){
            minX = blockStart.x;
        }
    }else{
        if(blockEnd.x > maxX){
            maxX = blockEnd.x;
        }
    }
    return true;
}

//可以实锤的上下关系
function isUD(){
    if(unitVec.y == 0){
        return false;
    }
    if(!checkHEdge()){
        return false;
    }
    return minDistanceY();
}

/**
 * 检查横边有效性，踩线不算
 */
function checkHEdge() {
    let maxX1 = Max(lastBodyStart.x, blockStart.x);
    let minX2 = Min(lastBodyEnd.x, blockEnd.x);
    return minX2 > maxX1;
}

/**
 * 计算x最新活动范围（最短距离）
 */
function minDistanceY(){
    if(unitVec.y > 0){
        if(blockStart.y < minY){
            minY = blockStart.y;
        }
    }else{
        if(blockEnd.y > maxY){
            maxY = blockEnd.y;
        }
    }
    return true;
}

function bodyAfter(bodyCollider = null) {
    let x = 0;
    if(unitVec.x > 0){
        x = minX - bodyHalfWidth;
    }else if(unitVec.x < 0){
        x = maxX + bodyHalfWidth;
    }else{
        x = bodyX;
    }

    let y = 0;
    if(unitVec.y > 0){
        y = minY - bodyHalfHeight;
    }else if(unitVec.y < 0){
        y = maxY + bodyHalfHeight;
    }else{
        y = bodyY;
    }
    FixUnitPos(bodyCollider.rect, x, y);
}

/**
 * 检查纵边有效性，踩线不算
 *  vy==0，一定算数
 *  vy>0 且 block顶边要在Y活动范围内
 *  vy<0 且 block底边要在Y活动范围内
 */
function checkVEdge_bk(){
    return unitVec.y == 0 ||
        (unitVec.y > 0 && blockStart.y < minY) ||
        (unitVec.y < 0 && blockEnd.y > maxY);
}

export {GetBoxColliderSystem}