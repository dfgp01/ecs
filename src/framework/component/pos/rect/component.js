import { NewPos, NewVec } from "../../../foundation/geometric/point";
import { GetRectHalfWidth, GetRectHalfHeight } from "../../../foundation/geometric/rect";

/**
 * 矩形与位置的关系元件
 */
class RectPosTuple{
    constructor(unitPos = null, xOffset = 0, yOffset = 0, rect = null){
        this.unitPos = unitPos;
        this.offset = NewVec(xOffset, yOffset);
        this.rect = rect;
    }
}

function NewRectPosTuple(unitPos = null, xOffset = 0, yOffset = 0, rect = null) {
    if(!unitPos || !rect){
        return null;
    }
    return new RectPosTuple(unitPos, xOffset, yOffset, rect);
}

function UpdateRectPosOffset(rectPosTuple = null, xOffset = 0, yOffset = 0){
    rectPosTuple.offset.x = xOffset;
    rectPosTuple.offset.y = yOffset;
}

function GetRectUnitPos(rectPosTuple = null){
    return rectPosTuple.unitPos;
}

function GetRectPosOffset(rectPosTuple = null){
    return rectPosTuple.offset;
}

function GetRectPosCenter(rectPosTuple = null){
    return NewPos(
        rectPosTuple.unitPos.x + rectPosTuple.offset.x,
        rectPosTuple.unitPos.y + rectPosTuple.offset.y,
    );
}

function GetRectPosStart(rectPosTuple = null){
    let pos = GetRectPosCenter(rectPosTuple);
    return NewPos(
        pos.x - GetRectHalfWidth(rectPosTuple.rect),
        pos.y - GetRectHalfHeight(rectPosTuple.rect)
    );
}

function GetRectPosEnd(rectPosTuple = null){
    let pos = GetRectPosCenter(rectPosTuple);
    return NewPos(
        pos.x + GetRectHalfWidth(rectPosTuple.rect),
        pos.y + GetRectHalfHeight(rectPosTuple.rect)
    );
}

export{
    NewRectPosTuple, UpdateRectPosOffset,
    GetRectUnitPos, GetRectPosOffset, GetRectPosCenter, GetRectPosStart, GetRectPosEnd
}