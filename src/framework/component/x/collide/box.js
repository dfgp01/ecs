import { LinkIterator } from "../../structure/link";
import { IsRectCross, CloneRect, CreateRectNormal, UpdateRect } from "../../base/rect";

const mistake_val = 0.05;   //误差值

class BoxCollideSystem extends System {
    onUpdate(dt = 0){
        LinkIterator(GetCollideTupleList(), collider => {
            //更新矩形中心，以此坐标为基础进行计算
            updateRectCenter(collider);
            updateExtRect(collider);
            updateFormula(collider.lineFormulaA);
            //如果是直线运动，就不用搞那么复杂了

            updateLine(collider.line);
            LinkIterator(GetBlockColliderList(), blockCollider => {
                if(!IsRectCross(collider.extRect, blockCollider.rect)){
                    return;
                }
                let move = collider.moveCom;
                if(move.dx == 0 || move.dy == 0){
                    //直线
                    singleDirect(collider, blockCollider);
                }else{
                    //斜线
                    updateBlockExtRect(collider, blockCollider);
                    multiDirect(collider, blockCollider);
                }
            });
        });
    }
}

//更新矩形中心，以此坐标为基础进行计算
function updateRectCenter(collider = null){
    collider.rectCenterPos = GetRectCenter(collider.rect);
}

//更新外接矩形
function updateExtRect(collider = null){
    let move = collider.moveCom;
    if(move.dx == 0 && move.dy == 0){
        collider.extRect = collider.rect;
    }else{
        let rect = CloneRect(collider.rect);
        MoveRect(rect, move.dx, move.dy);
        collider.extRect = GetOutterRect(rect, collider.rect);
    }
}

function updateLine(collider = null){
    let pos = collider.rectCenterPos;
    let move = collider.moveCom;
    let x1 = pos.x;
    let y1 = pos.y;
    let x2 = x1 + move.dx;
    let y2 = x2 + move.dy;
    UpdateLine(collider.line, x1, x2, y1, y2);
}

//其实这一步也可以省略
function updateBlockExtRect(collider = null, blockCollider = null){
    let bRect = blockCollider.rect;
    let cRect = collider.rect;
    let x = bRect.x - cRect.width * 0.5;
    let y = bRect.y - cRect.height * 0.5;
    let width = bRect.width + cRect.width;
    let height = bRect.height + cRect.height;
    blockCollider.extRect = CreateRectNormal(0, 0, width, height, x, y);
}

function singleDirect(collider = null, blockCollider = null){
    let bRect = blockCollider.rect;
    let cRect = collider.rect;
    let unitPos = collider.unitPos;
    let move = collider.moveCom;

    //若运动方向是右，则在block左边阻隔，反之同理
    if(move.dx > 0){
        cRect.x = bRect.x - cRect.width;
    }else{
        cRect.x = bRect.x + bRect.width;
    }

    //若运动方向是下，则在block上边阻隔，反之同理
    if(move.dy > 0){
        cRect.y = bRect.y - cRect.height;
    }else{
        cRect.y = bRect.y + bRect.height;
    }
    UpdateUnitPos(unitPos, cRect);
}

var verticalLine = new Line();
var horizontalLine = new Line();
function multiDirect(collider = null, blockCollider = null){
    let bRect = blockCollider.extRect;
    let cRect = collider.rect;
    let pos = collider.rectCenterPos;
    let unitPos = collider.unitPos;
    let move = collider.moveCom;
    let formula = collider.lineFormulaA;

    let x1 = bRect.x;
    let x2 = bRect.x + bRect.width;
    let y1 = bRect.y;
    let y2 = bRect.y + height;

    //暂时用0来做非法值
    let resultX = pos.x < bRect.x ? x1 : pos.x > bRect.x + bRect.width ? x2 : 0;
    if(resultX){
        UpdateLine(verticalLine, resultX, y1, resultX, y2);
        y = GetY(formula, resultX);
        if(y > y1 - mistake_val && y < y2 + mistake_val){
            UpdateRect(cRect, resultX, y);
            UpdateUnitPos(unitPos, cRect);
        }
    }

    let resultY = pos.y < bRect.y ? y1 : pos.y > bRect.y + bRect.height ? y2 : 0;
    if(resultY){
        UpdateLine(horizontalLine, x1, resultY, x2, resultY);
        x = GetX(formula, x1);
        if(x > x1 - mistake_val && x < x2 + mistake_val){
            UpdateRect(cRect, y, resultY);
            UpdateUnitPos(unitPos, cRect);
        }
    }
}

//暂时放着，公式：y=kx+b
function updateFormula(formula = null){
    let x1 = formula.posStart.x;
    let y1 = formula.posStart.y;
    let x2 = formula.posEnd.x;
    let y2 = formula.posEnd.y;
    let k = (y2 - y1) / (x2 - x1);
    let b = y1 - k * x1;
    formula.k = k;
    formula.b = b;
}

function GetX(formula = null, y = 0){
    return (y - formula.b) / formula.k;
}

function GetY(formula = null, x = 0){
    return formula,k * x + formula.b;
}