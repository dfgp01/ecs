import { NewPos, NewVec } from "../../../foundation/geometric/point";
import { GetRectHalfWidth, GetRectHalfHeight } from "../../../foundation/geometric/rect";
import { GetPos, GetVec } from "../utils";

/**
 * 矩形与位置的关系元件
 */
class RectPosTuple{
    constructor(entityId = 0, xOffset = 0, yOffset = 0, rect = null){
        this.entityId = entityId;
        this.unitPos = null;
        this.unitVec = null;
        this.offset = NewVec(xOffset, yOffset);
        this.rect = rect;
    }
}

function NewRectPosTuple(entityId = 0, xOffset = 0, yOffset = 0, rect = null) {
    if(!rect){
        return null;
    }
    let r = new RectPosTuple(entityId, xOffset, yOffset, rect);
    r.unitPos = GetPos(entityId);
    r.unitVec = GetVec(entityId);
    return r;
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