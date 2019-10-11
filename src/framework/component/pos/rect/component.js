import { NewPos, NewVec } from "../../../foundation/geometric/point";
import { GetRectHalfWidth, GetRectHalfHeight } from "../../../foundation/geometric/rect";

/**
 * 矩形与位置的关系元件
 */
class RectPosTuple{
    constructor(unitPos = null, xOffset = 0, yOffset = 0, rect = null){
        super();
        this.unitPos = unitPos;
        this.offset = NewVec(xOffset, yOffset);
        this.rect = rect;
    }
}

function NewRectPosTuple(unitPos = null, xOffset = 0, yOffset = 0, rect = null) {
    return new RectPosTuple(unitPos, xOffset, yOffset, rect);
}

function UpdateRectPosOffset(rectPosTuple = null, xOffset = 0, yOffset = 0){
    rectPosTuple.offset.x = xOffset;
    rectPosTuple.offset.y = yOffset;
}

/**
 * 修复位置，根据rect的中心位置修复unit.pos
 */
function FixUnitPos(rectPosTuple = null, rectX = 0, rectY = 0){
    rectPosTuple.unitPos.x = rectX - rectPosTuple.offset.x;
    rectPosTuple.unitPos.y = rectY - rectPosTuple.offset.y;
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
    let pos = GetRectPosTupleCenter(rectPosTuple);
    return NewPos(
        pos.x - GetRectHalfWidth(rect),
        pos.y - GetRectHalfHeight(rect)
    );
}

function GetRectPosEnd(rect = null){
    let pos = GetRectPosTupleCenter(rectPosTuple);
    return NewPos(
        pos.x + GetRectHalfWidth(rect),
        pos.y + GetRectHalfHeight(rect)
    );
}

export{
    NewRectPosTuple, UpdateRectPosOffset, FixUnitPos,
    GetRectUnitPos, GetRectPosOffset, GetRectPosCenter, GetRectPosStart, GetRectPosEnd
}