import { GetPos } from "./utils";

/**
 * 矩形位置关系元件
 */
class RectPosTuple extends Tuple {
    constructor(unitPos = null, xOffset = 0, yOffset = 0, rect = null){
        super();
        this.unitPos = unitPos;
        this.offset = NewVec(xOffset, yOffset);
        this.rect = rect;
    }
}

var rectPosList = new Link();
function createRectPosTuple(entityId = 0, xOffset = 0, yOffset = 0, rect = null) {
    let com = new RectPosTuple(GetPos(entityId), xOffset, yOffset, rect);
    PushToLink(rectPosList, com);
    return com;
}

function removeRectPosTuple(tupleId = 0){
    RemoveById(rectPosList, tupleId);
}

export{createRectPosTuple, removeRectPosTuple}