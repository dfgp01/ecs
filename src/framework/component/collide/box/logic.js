import { GetRectStartPos, GetRectHalfWidth, GetRectWidth, GetRectHalfHeight, GetRectHeight } from "../../../foundation/geometric/rect";
import { NewPos, GetDistance } from "../../../foundation/geometric/point";


function doFix(bodyCollider = null, pos = null, vec = null, blockCollider = null){

    //block的两条线是(x,y)边角垂线，因此只要和其中一条相交，就不必判断另一条了
    let newPos = touchVerticalLine(bodyCollider, pos, vec, blockCollider) ||
    touchHorizontalLine(bodyCollider, pos, vec, blockCollider);

    if(newPos){
        updateNewLine(bodyCollider, newPos.x, newPos.y);
        return true;
    }
    return false;
}

//与block左右碰撞
function touchVerticalLine(bodyCollider = null, pos = null, vec = null, blockCollider = null){
    let blockRect = blockCollider.rect;
    let bodyRect = bodyCollider.rect;

    //位置和方向是否正确
    let x = 0;
    let x1 = GetRectStartPos(blockRect).x - GetRectHalfWidth(bodyRect);
    let x2 = x1 + GetRectWidth(bodyRect);

    if(pos.x <= x1 && vec.x > 0){
        x = x1;
    }else if(pos.x >= x2 && vec.x < 0){
        x = x2;
    }else{
        return null;
    }

    //是否可能碰撞
    if(!isPossibleCross(bodyCollider.line, getVerticalLine(x, bodyRect, blockRect))){
        return null;
    }

    //确认是否真的碰撞，没有斜率即平移，平移一定有交点 
    let resultY = GetY(bodyCollider.line, x);
    if(resultY >= GetStartY(blockLine) && resultY <= GetEndY(blockLine)){
        //得到交点坐标了，但是这里要做的是按vec修复
        return NewPos(x, GetEndY(bodyCollider.line));
    }
    return null;
}

//与block上下碰撞
function touchHorizontalLine(bodyCollider = null, pos = null, vec = null, blockCollider = null){
    let blockRect = blockCollider.rect;
    let bodyRect = bodyCollider.rect;

    //位置和方向是否正确
    let y = 0;
    let y1 = GetRectStartPos(blockRect).y - GetRectHalfHeight(bodyRect);
    let y2 = y1 + GetRectHeight(bodyRect);
    if(pos.y <= y1 && vec.y > 0){
        y = y1;
    }else if(pos.y >= y2 && vec.y < 0){
        y = y2;
    }else{
        return null;
    }

    //是否可能碰撞
    if(!isPossibleCross(bodyCollider.line, getHorizontalLine(y, bodyRect, blockRect))){
        return null;
    }

    //确认是否真的碰撞，没有斜率即平移，平移一定有交点 
    let resultX = GetX(bodyCollider.line, y);
    if(resultX >= GetStartX(blockLine) && resultX <= GetEndX(blockLine)){
        //得到交点坐标了，但是这里要做的是按vec修复
        return NewPos(GetEndX(bodyCollider.line), y);
    }
    return null;
}

//快速排斥：是否可能相交
function isPossibleCross(line1 = null, line2 = null){
    let left = line1.start.x > line2.start.x ? line1.start.x : line2.start.x;
    let right = line1.end.x < line2.end.x ? line1.end.x : line2.end.x;
    let top = line1.start.y > line2.start.y ? line1.start.y : line2.start.y;
    let bottom = line1.end.y < line2.end.y ? line1.end.y : line2.end.y;
    return right >= left && bottom >= top;
}

//竖线，左右外延线
function getVerticalLine(x = 0, bodyRect = null, blockRect = null){
    let y = GetRectY1(blockRect) - GetRectHalfHeight(bodyRect);
    let height = GetRectHeight(blockRect) + GetRectHeight(bodyRect);
    return NewLine(x, y, 0, height);
}
//横线，上下外延线
function getHorizontalLine(y = 0, bodyRect = null, blockRect = null){
    let x = GetRectX1(blockRect) + GetRectHalfWidth(bodyRect);
    let width = GetRectWidth(blockRect) + GetRectWidth(bodyRect);
    return NewLine(x, y, width, 0);
}

//取最近距离
function updateNewLine(bodyCollider, endX = 0, endY = 0){
    let pos = bodyCollider.pos;
    let vec = bodyCollider.vec;
    let newLine = NewLineWithPos(pos.x, pos.y, endX, endY);
    if(GetDistance(newLine.vec) < GetDistance(bodyCollider.line.vec)){
        bodyCollider.line = newLine;
        vec.x = newLine.vec.x;
        vec.x = newLine.vec.y;
    }
}

export{doFix}