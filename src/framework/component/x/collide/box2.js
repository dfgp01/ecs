import { LinkIterator } from "../../structure/link";
import { IsRectCross, CreateRectNormal, UpdateRect, CreateRectDefault } from "../../base/rect";
import { Pos } from "../../base/pos";

const mistake_val = 0.0001;   //误差值

class BoxCollideSystem extends System {
    onUpdate(dt = 0){
        LinkIterator(GetBodyColliderList(), bodyCollider => {
            updateRate(bodyCollider);
            updateCenterLine(bodyCollider);
            updateBodyExtRect(bodyCollider);

            LinkIterator(GetBlockColliderList(), blockCollider => {
                //快速排斥
                if(!IsRectCross(bodyExtRect, blockCollider.rect)){
                    return;
                }
                fix(bodyCollider);
            });
        });
    }
}

var rateDxy = 0;
var rateDyx = 0;
function updateRate(bodyCollider = null){
    let move = bodyCollider.moveCom;
    rateDxy = move.dy == 0 ? 0 : move.dx / move.dy;
    rateDyx = move.dx == 0 ? 0 : move.dy / move.dx;
}

//更新矩形中心，以此坐标为基础进行计算
var centerPos = null;
var centerLine = CreateLine();
function updateCenterLine(bodyCollider = null){
    centerPos = GetRectCenter(bodyCollider.rect);
    let move = bodyCollider.moveCom;
    UpdateLine(centerLine, centerPos.x, centerPos.y, centerPos.x + move.dx, centerPos.x + move.dy);
}

var bodyExtRect = CreateRectNormal();
function updateBodyExtRect(collider = null){
    let move = collider.moveCom;
    if(move.dx == 0 && move.dy == 0){
        bodyExtRect = collider.rect;
    }else{
        let rect = collider.rect;
        UpdateRect(bodyExtRect, 0, 0, rect.width, rect.height, rect.x + move.dx, rect.y + move.dy);
        bodyExtRect = GetOutterRect(bodyExtRect, rect);
    }
}


var verticalLine = new Line();
function getVerticalLine(bodyCollider = null, blockCollider = null){
    let bRect = blockCollider.rect;
    let cRect = bodyCollider.rect;
    let x1 = bRect.x - cRect.width * 0.5;
    let y1 = bRect.y - cRect.height * 0.5;
    let x2 = x1 + bRect.width + cRect.width;
    let y2 = y1 + bRect.height + cRect.height;
    let resultX = centerPos.x < x1 ? x1 : pos.x > x2 ? x2 : 0;
    if(resultX){
        UpdateLine(verticalLine, resultX, y1, resultX, y2);
        return verticalLine;
    }
    return null;
}

var horizontalLine = new Line();
function getHorizontalLine(bodyCollider = null, blockCollider = null){
    let bRect = blockCollider.rect;
    let cRect = bodyCollider.rect;
    let x1 = bRect.x - cRect.width * 0.5;
    let y1 = bRect.y - cRect.height * 0.5;
    let x2 = x1 + bRect.width + cRect.width;
    let y2 = y1 + bRect.height + cRect.height;
    let resultY = centerPos.y < y1 ? y1 : pos.y > y2 ? y2 : 0;
    if(resultY){
        UpdateLine(horizontalLine, x1, resultY, x2, resultY);
        return horizontalLine;
    }
    return null;
}

//两条线，一条必须垂直于x，另一条必须垂直于y
var interSectionPos = new Pos();
function getInterSectionPosByVertical(line1 = null, line2 = null){
    let pos1 = line1.posStart;
    let pos2 = line1.posEnd;
    let pos3 = line2.posStart;
    let pos4 = line2.posEnd;
    let vLine = pos1.x == pos2.x ? line1 : pos3.x == pos4.x ? line2 : null;
    let hLine = pos1.y == pos2.y ? line1 : pos3.y == pos4.y ? line2 : null;
    if(!vLine || !hLine){
        return null;
    }
    if(vLine.posStart.x >= hLine.posStart.x && vLine.posStart.x <= hLine.posEnd.x &&
    hLine.posStart.y >= vLine.posStart.y && hLine.posStart.y <= vLine.posEnd.y){
        interSectionPos.x = vLine.posStart.x;
        interSectionPos.y = hLine.posStart.y;
    }
    return null;
}

var tmpShadow = CreateRectDefault();
function fix(bodyCollider = null){
    let move = bodyCollider.moveCom;
    if(move.dx){
        let vLine = getVerticalLine();
        if(vLine){
            let y = rateDyx ? vLine.posStart.x * rateDyx : centerPos.y + move.dy;
            if(y >= vLine.posStart.y && y <= vLine.posEnd.y){
                centerPos.x = vLine.posStart.x;
                centerPos.y = y;
            }
        }
    }
    if(move.dy){
        let hLine = getHorizontalLine();
        if(hLine){
            let x = rateDxy ? hLine.posStart.y * rateDxy : centerPos.x + move.dx;
            if(y >= vLine.posStart.y && y <= vLine.posEnd.y){
                centerPos.x = x;
                centerPos.y = hLine.posStart.y;
            }
        }
    }
    UpdateRectPos(bodyCollider.rect, centerPos.x - bodyCollider.rect.width * 0.5, centerPos.y - bodyCollider.rect.height * 0.5);
    UpdatePosByRect(unitPos, collider.rect);
}

export {BoxCollideSystem}