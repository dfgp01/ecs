import { NewPos } from "./point";
import { NewRect, GetRectStartPos, GetRectEndPos, GetRectCenterPos, GetRectHalfWidth, GetRectHalfHeight, FixUnitPos, UpdateRectCenterPos } from "./rect";
import { interSectionPos } from "./formula/abc";


/**
 * 求两直线交点
 * 用直线一般方程式
 */
function InterSectionPos(line1 = null, line2 = null){
    return interSectionPos(line1.formula, line2.formula);
}

/**
 * 是否平行于x,y轴的线
 */
function IsHorizontalLine(line = null){
    return line.vec.y == 0;
}
function IsVerticalLine(line = null){
    return line.vec.x == 0;
}

/**
 * 两个矩形是否相交，基础碰撞检测（需要先更新坐标）
 * 原理：
 *  左x，取两者最大值
 *  右x，取两者最小值
 *  如果右x大于左x，则x轴相交
 * Y同理：
 *  上y，取两者最大值
 *  下y，取两者最小值
 *  如果下y大于上y，则y轴相交
 *  目前，即使两边重叠，也不算相交，这样能避免很多问题
 */
function NewInnerRect(rect1 = null, rect2 = null){

    let start1 = GetRectStartPos(rect1);
    let start2 = GetRectStartPos(rect2);
    let end1 = GetRectEndPos(rect1);
    let end2 = GetRectEndPos(rect2);

    let r1x1 = start1.x;
    let r2x1 = start2.x;
    let maxX1 = r1x1 > r2x1 ? r1x1 : r2x1;

    let r1x2 = end1.x;
    let r2x2 = end2.x;
    let minX2 = r1x2 < r2x2 ? r1x2 : r2x2;
    if(minX2 < maxX1){
        return null;
    }

    let r1y1 = start1.y;
    let r2y1 = start2.y;
    let maxY1 = r1y1 > r2y1 ? r1y1 : r2y1;
    let r1y2 = end1.y;
    let r2y2 = end2.y;
    let minY2 = r1y2 < r2y2 ? r1y2 : r2y2;
    if(minY2 < maxY1){
        return null;
    }

    return NewRect(0, 0, minX2 - maxX1, minY2 - maxY1);
}

/**
 * 判断是否相交
 * 暂时使用NewInnerRect，后期看情况是否需要手动回收资源 
 */
function IsRectsCross(rect1 = null, rect2 = null){
    let rect = NewInnerRect(rect1, rect2);
    return rect ? true : false;
}


/**
 * inner.rect不准越出outter.rect，修正pos位置
 * inner和outter都是rectTuple
 */
function FixInRect(outter = null, inner = null, innerUnitPos = null){
    let innerPos = GetRectCenterPos(inner);
    let innerStartPos = GetRectStartPos(inner);
    let innerEndPos = GetRectEndPos(inner);
    let outterStartPos = GetRectStartPos(outter);
    let outterEndPos = GetRectEndPos(outter);

    let x = innerPos.x;
    if(innerStartPos.x < outterStartPos.x){
        x = outterStartPos.x + GetRectHalfWidth(inner);
    }else if(innerEndPos.x > outterEndPos.x){
        x = outterEndPos.x - GetRectHalfWidth(inner);
    }

    let y = innerPos.y;
    if(innerStartPos.y < outterStartPos.y){
        y = outterStartPos.y + GetRectHalfHeight(inner);
    }else if(innerEndPos.y > outterEndPos.y){
        y = outterStartPos.y - GetRectHalfHeight(inner);
    }

    if(x != innerPos.x || y != innerPos.y){
        UpdateRectCenterPos(inner, x, y);
        FixUnitPos(rect, innerUnitPos);
    }
}


/**
 * 当前位置是否在矩形中（同样需要先更新rect位置）
 * 这里不包含踩线，因此不能用>=和<=
 * 为了避免类似 tile的 rowIndex = x/gridWidth导致数组越界问题
 */
function IsPosInRect(x = 0, y = 0, rect = null){
    let startPos = GetRectStartPos(rect);
    let endPos = GetRectEndPos(rect);
    return x > startPos.x && x < endPos.x
        && y > startPos.y && y < endPos.y;
}

export {InterSectionPos, 
    IsHorizontalLine, IsVerticalLine,
    IsRectsCross, FixInRect, IsPosInRect}

//----------------- 以下待定

/**
 * 根据线段作矩形
 */
function NewOutterRect(x1 = 0, y1 = 0, x2 = 0, y2 = 0){
    let width = x2 - x1;
    let height = y2 - y1;
    if(width <= 0 || height <= 0){
        return null;
    }
    let centerX = x1 + (x2 - x1) * 0.5;
    let centerY = y1 + (y2 - y1) * 0.5;
    let rect = NewRectDefault(width, height);
    UpdateRectPos(rect, centerX, centerY);
    return rect;
}

/**
 * 两个矩形间的外接矩形
 */
function NewOutterRectByRects(rect1 = null, rect2 = null){
    let r1x1 = GetRectX1(rect1);
    let r2x1 = GetRectX1(rect2);
    let x1 = r1x1 < r2x1 ? r1x1 : r2x1;
    let r1x2 = GetRectX2(rect1);
    let r2x2 = GetRectX2(rect2);
    let x2 = r1x2 > r2x2 ? r1x2 : r2x2;

    let r1y1 = GetRectY1(rect1);
    let r2y1 = GetRectY1(rect2);
    let y1 = r1y1 < r2y1 ? r1y1 : r2y1;
    let r1y2 = GetRectY2(rect1);
    let r2y2 = GetRectY2(rect2);
    let y2 = r1y2 > r2y2 ? r1y2 : r2y2;

    return NewOutterRect(x1, y1, x2, y2);
}


/**
 * 矩形排斥，targetRect会被blockRect弹出去
 * TODO，以后完善注释
 */
function FixExcludeRect(blockRect = null, targetRect = null){
    let pos1 = blockRect.pos;
    let pos2 = targetRect.pos;
    //计算关系，上下左右
    let vx = pos1.x - pos2.x;
    let vy = pos1.y - pos2.y;
    let x = vx < 0 ? vx*-1 : vx;
    let y = vy < 0 ? vy*-1 : vy;
    if(x > y){
        //左右
        if(vx > 0){
            //rect2在左
            pos2.x = blockRect.posStart.x - targetRect.width - targetRect.xOffset;
        }else{
            //rect2在右
            pos2.x = blockRect.posEnd.x - targetRect.xOffset;
        }
    }else{
        //上下
        if(vy > 0){
            //rect2在上
            pos2.y = blockRect.posStart.y - targetRect.height - targetRect.yOffset;
        }
        else{
            //rect2在下
            pos2.y = blockRect.posEnd.y - targetRect.yOffset;
        }
    }
    UpdateRect(targetRect);
}

/**
 * rect1是否完全过了rect2
 */
function IsRectsCrossOver(rect1 = null, rect2 = null){

}

function IsRectsCrossWithVec(rect1 = null, vx = 0, vy = 0, rect2 = null){
    
}