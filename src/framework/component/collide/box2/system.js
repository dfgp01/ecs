import { NewInnerRect } from "../../pos/rect/utils";
import { GetArea, GetRectWidth, GetRectHeight } from "../../../foundation/geometric/rect";
import { GetRectPosCenter, FixUnitPos, GetRectPosStart, GetRectPosEnd } from "../../pos/rect/component";
import { System } from "../../../foundation/structure/ecs";

/**
 * 简易方案构想：
 *  1. body的位移不能过大，不能出现穿透或者包含了block的情况
 *  2. 根据第1条准则，body和block发生碰撞后，只会有一小部分交叠，位置关系较清晰，所以不用根据vec的情况判断碰撞前的位置关系
 *  3. 根据交叠矩形的长宽比，修复位置，这是目前最粗暴的解决方式
 */

class BoxColliderSystem extends System {
    onUpdate(dt = 0){
        LinkIterator(GetBodyColliderList(), body => {
            LinkIterator(GetBlockColliderList(), block => {
                findMax(body, block);
            });
            doFix(body);
        });
    }
}

var boxColliderSys = null
function GetBoxColliderSystem(callback = null){
    if(!boxColliderSys){
        boxColliderSys = new BoxColliderSystem(callback);
    }
    return boxColliderSys;
}

/**
 * 找出触碰面积最大的block
 */
var _maxArea = 0;
var _innerRect = null;
var _blockRect = null;
function findMax(bodyCollider = null, blockCollider = null){

    let rectTuple = NewInnerRect(bodyCollider.rectTuple, blockCollider.rectTuple);
    if(!rectTuple){
        return;
    }

    let area = GetArea(rectTuple.rect);
    if(area > _maxArea){
        _maxArea = area;
        _innerRect = rectTuple.rect;
        _blockRect = blockCollider.rectTuple;
    }
}

function doFix(bodyCollider = null){
    if(_maxArea <= 0){
        return;
    }
    //clear
    _maxArea = 0;

    //body.rect和交叉rect的位置关系
    let bodyRect = bodyCollider.rectTuple;
    let bodyPos = GetRectPosCenter(bodyRect);
    let blockPos = GetRectPosCenter(_blockRect);
    if(GetRectWidth(_innerRect) > GetRectHeight(_innerRect)){
        //上下
        if(bodyPos.y < blockPos.y){
            FixUnitPos(bodyRect, bodyPos.x, GetRectPosStart(_blockRect).y);
        }else{
            FixUnitPos(bodyRect, bodyPos.x, GetRectPosEnd(_blockRect).y);
        }
    }else{
        //左右
        if(bodyPos.x < blockPos.x){
            FixUnitPos(bodyRect, GetRectPosStart(_blockRect).x, bodyPos.y);
        }else{
            FixUnitPos(bodyRect, GetRectPosEnd(_blockRect).x, bodyPos.y);
        }
    }
}

export {GetBoxColliderSystem}