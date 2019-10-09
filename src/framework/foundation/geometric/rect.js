import { NewPos, NewVec } from "./point";


/**
 * 2D基础矩形，由参考坐标，偏移量，宽高组成
 * 位置是根据相对坐标算出来
 * xOffset, yOffset : 相对坐标偏移量
 * width, height : 宽高
 * center : 实际位置（矩形中心），内部使用，center = unit.pos + rect.offset
 */
class Rectangle {
    constructor(offset = null, width = 0, height = 0, center = null) {
        this.offset = offset;
        this.width = width;
        this.height = height;
        this.center = center;
    }
}

/**
 * 矩形默认居中于owner
 * 此方法一般由collider调用
 */
function NewRect(xOffset = 0, yOffset = 0, width = 0, height = 0){
    let offset = NewVec(xOffset, yOffset);
    return new Rectangle(offset, width, height, NewPos());
}

/**
 * 更新当前矩形属性（位置、偏移量、大小等），后面所有涉及矩形计算的函数，都必须建立在已更新了绝对坐标的矩形的基础之上
 * x, y是绝对坐标
 */
function UpdateRectSize(rect = null, width = 0, height = 0){
    rect.width = width;
    rect.height = height;
}
function UpdateRectOffset(rect = null, xOffset = 0, yOffset = 0){
    rect.offset.x = xOffset;
    rect.offset.y = yOffset;
}

function UpdateRectCenterPos(rect = null, x = 0, y = 0){
    rect.center.x = x;
    rect.center.y = y;
}

/**
 * 根据所属单位的位置更新矩形位置（一般场景调用）
 */
function UpdateRectPosByUnit(rect = null, unitPosX = 0, unitPosY = 0){
    rect.center.x = unitPosX + rect.offset.x;
    rect.center.y = unitPosY + rect.offset.y;
}

/**
 * 反向修复unit位置（fixInRect调用）
 */
function FixUnitPos(rect = null, unitPos = null){
    unitPos.x = rect.center.x - rect.offset.x;
    unitPos.y = rect.center.y - rect.offset.y;
}


/**
 * 矩形各个点位置和参数，记住要在update后再调用，以免数据有误
 */
function GetRectOffsetVec(rect = null){
    return rect.offset;
}
function GetRectCenterPos(rect = null){
    return rect.center;
}
function GetRectStartPos(rect = null){
    return NewPos(
        rect.center.x - GetRectHalfWidth(rect),
        rect.center.y - GetRectHalfHeight(rect)
    );
}
function GetRectEndPos(rect = null){
    return NewPos(
        rect.center.x + GetRectHalfWidth(rect),
        rect.center.y + GetRectHalfHeight(rect)
    );
}

function GetRectWidth(rect = null){
    return rect.width;
}
function GetRectHeight(rect = null){
    return rect.height;
}
function GetRectHalfWidth(rect = null){
    return rect.width * 0.5;
}
function GetRectHalfHeight(rect = null){
    return rect.height * 0.5;
}


//求面积
function GetArea(rect = null){
    return rect.width * rect.height;
}


export {
    NewRect, UpdateRectSize, UpdateRectOffset, UpdateRectCenterPos, UpdateRectPosByUnit, FixUnitPos,
    GetRectOffsetVec, GetRectCenterPos, GetRectStartPos, GetRectEndPos,
    GetRectWidth, GetRectHalfWidth, GetRectHeight, GetRectHalfHeight,
    GetArea
}

// function GetRectCenterX(rect = null){
//     return rect.center.x;
// }
// function GetRectX1(rect = null){
//     return GetRectCenterX(rect) - rect.width * 0.5;
// }
// function GetRectX2(rect = null){
//     return GetRectCenterX(rect) + rect.width * 0.5;
// }

// function GetRectOffsetY(rect = null){
//     return rect.offset.y;
// }

// function GetRectCenterY(rect = null){
//     return rect.center.y;
// }
// function GetRectY1(rect = null){
//     return GetRectCenterY(rect) - rect.height * 0.5;
// }
// function GetRectY2(rect = null){
//     return GetRectCenterY(rect) + rect.height * 0.5;
// }