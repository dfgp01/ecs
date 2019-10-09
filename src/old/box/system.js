import { LinkIterator } from "../base/structure/link";
import { GetRectHalfWidth, GetRectHalfHeight, GetRectHeight, GetRectX2, GetRectWidth, GetRectY2 } from "../base/geometric/rect";
import { NewLineWithVec, NewFormulaA, GetDistance, NewLineWithEnd } from "../base/geometric/line";
import { IsLineCross } from "../utils/line";
import { NewPos } from "../base/geometric/pos";
import { GetBodyColliderList, GetBlockColliderList } from "./utils";
import { ColliderSystem } from "../base";


/**
 * 优化逻辑：
 * 背景约束：
 *      1.物体必须是移动中的状态
 *      2.在检测碰撞前，物体和block没有发生碰撞
 *      3.body.vec的线段只会碰到block.rect最近的两条线的其中一条
 *      4.取vec经过的外延线段中最近的点即可
 * 
 * 第一阶段：快速排斥
 * 1.   判断body有无移动
 * 2.   根据vec的方向，和block的位置关系判断是否需要检测
 * 3.   通过line，快速判断线段是否相交
 * 第二阶段：计算交点
 * 4.   根据直线方程或直线算出交点，等待更近的点
 * 5.   确定最终位置，修复vec
 * 
 */

class BoxColliderSystem extends ColliderSystem {
    onUpdate(dt = 0){
        LinkIterator(GetBodyColliderList(), body => {
            let vec = GetVec(body.entityId);
            if(vec.x == 0 && vec.y == 0){
                return;
            }
            let pos = GetPos(body.entityId);
            updateBodyInfo(body, pos, vec);
            LinkIterator(GetBlockColliderList(), block => {
                doFix(body, pos, vec, block);
            });
        });
    }
}

/**
 * 更新bodyRect的移动参数
 */
function updateBodyInfo(bodyCollider = null, pos = null, vec = null){
    let line = NewLineWithVec(pos.x, pos.y, vec.x, vec.y);
    bodyCollider.line = line;
    bodyCollider.formulaA = NewFormulaA(line);
    bodyCollider.distance = GetDistance(line);
}

function doFix(bodyCollider = null, pos = null, vec = null, blockCollider = null){

    let newPos = fixByLeft(bodyCollider, pos, vec, blockCollider) ||
        fixByRight(bodyCollider, pos, vec, blockCollider);

    //block的两条线是(x,y)边角垂线，因此只要和其中一条相交，就不必判断另一条了
    if(newPos){
        updateNewLine(bodyCollider, newPos.x, newPos.y);
        return;
    }

    newPos = fixByTop(bodyCollider, pos, vec, blockCollider) ||
        fixByBottom(bodyCollider, pos, vec, blockCollider);

    //TODO 理论上不会有newPos=null的情况
    if(!newPos){
        console.error(newPos.x, newPos.y);
    }
    updateNewLine(bodyCollider, newPos.x, newPos.y);
    return;
}

function fixByLeft(bodyCollider = null, pos = null, vec = null, blockCollider = null){
    let blockRect = blockCollider.rect;
    let bodyRect = bodyCollider.rect;
    //左外延线
    let x = GetRectX1(blockRect) - GetRectHalfWidth(bodyRect);
    let y = GetRectY1(blockRect) - GetRectHalfHeight(bodyRect);
    let height = GetRectHeight(blockRect) + GetRectHeight(bodyRect);

    //必要性判断：unit位置必须在block左边且vec向右移动
    if(pos.x > x || vec.x <= 0 || !IsLineCross(bodyCollider.line, NewLine(x, y, 0, height))){
        return null;
    }

    //没有斜率的话，就是平移
    let resultY = pos.y;
    if(bodyCollider.formulaA){
        resultY = GetY(bodyCollider.formulaA, x);
    }
    return NewPos(x, resultY);
}

function fixByRight(bodyCollider = null, pos = null, vec = null, blockCollider = null){
    let blockRect = blockCollider.rect;
    let bodyRect = bodyCollider.rect;
    //右外延线
    let x = GetRectX2(blockRect) + GetRectHalfWidth(bodyRect);
    let y = GetRectY1(blockRect) - GetRectHalfHeight(bodyRect);
    let height = GetRectHeight(blockRect) + GetRectHeight(bodyRect);

    //必要性判断：unit位置必须在block右边且vec向左移动
    if(pos.x < x || vec.x >= 0 || !IsLineCross(bodyCollider.line, NewLine(x, y, 0, height))){
        return null;
    }

    //没有斜率的话，就是平移
    let resultY = bodyCollider.pos.y;
    if(bodyCollider.formulaA){
        resultY = GetY(bodyCollider.formulaA, x);
    }
    return NewPos(x, resultY);
}

function fixByTop(bodyCollider = null, pos = null, vec = null, blockCollider = null){
    let blockRect = blockCollider.rect;
    let bodyRect = bodyCollider.rect;
    //顶部外延线
    let x = GetRectX1(blockRect) + GetRectHalfWidth(bodyRect);
    let y = GetRectY1(blockRect) - GetRectHalfHeight(bodyRect);
    let width = GetRectWidth(blockRect) + GetRectWidth(bodyRect);

    //必要性判断：unit位置必须在block上边且vec向下移动
    if(pos.y > y || vec.y <=0 || !IsLineCross(bodyCollider.line, NewLine(x, y, width, 0))){
        return null;
    }

    //没有斜率的话，就是平移
    let resultX = bodyCollider.pos.x;
    if(bodyCollider.formulaA){
        resultX = GetX(bodyCollider.formulaA, y);
    }
    return NewPos(resultX, y);
}

function fixByBottom(bodyCollider = null, pos = null, vec = null, blockCollider = null){
    let blockRect = blockCollider.rect;
    let bodyRect = bodyCollider.rect;
    //顶部外延线
    let x = GetRectX1(blockRect) + GetRectHalfWidth(bodyRect);
    let y = GetRectY2(blockRect) - GetRectHalfHeight(bodyRect);
    let width = GetRectWidth(blockRect) + GetRectWidth(bodyRect);

    //必要性判断：unit位置必须在block下边且vec向上移动
    if(pos.y < y || vec.y >= 0 || !IsLineCross(bodyCollider.line, NewLine(x, y, width, 0))){
        return null;
    }

    //没有斜率的话，就是平移
    let resultX = bodyCollider.pos.x;
    if(bodyCollider.formulaA){
        resultX = GetX(bodyCollider.formulaA, y);
    }
    return NewPos(resultX, y);
}

function updateNewLine(bodyCollider, pos = null, vec = null, endX = 0, endY = 0){
    let newLine = NewLineWithEnd(pos.x, pos.y, endX, endY);
    if(GetDistance(newLine) < GetDistance(bodyCollider.line)){
        bodyCollider.line = newLine;
        vec.x = newLine.vec.x;
        vec.x = newLine.vec.y;
    }
}


var boxColliderSys = null
function GetBoxColliderSystem(){
    if(!boxColliderSys){
        boxColliderSys = new BoxColliderSystem();
    }
    return boxColliderSys;
}

export {GetBoxColliderSystem}