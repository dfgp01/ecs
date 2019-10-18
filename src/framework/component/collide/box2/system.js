import { NewInnerRect, FixUnitPos } from "../../pos/rect/utils";
import { GetArea, GetRectWidth, GetRectHeight, GetRectHalfHeight, GetRectHalfWidth } from "../../../foundation/geometric/rect";
import { GetRectPosCenter, GetRectPosStart, GetRectPosEnd } from "../../pos/rect/component";
import { System } from "../../../foundation/structure/ecs";
import { LinkIterator } from "../../../foundation/structure/link";
import { GetBodyColliderList, GetBlockColliderList } from "./utils";

/**
 * 简易方案构想：
 *  1. body的位移不能过大，不能出现穿透或者包含了block的情况
 *  2. 根据第1条准则，body和block发生碰撞后，只会有一小部分交叠，位置关系较清晰，所以不用根据vec的情况判断碰撞前的位置关系
 *  3. 根据交叠矩形的长宽比，修复位置，这是目前最粗暴的解决方式
 *  4. 总结，两个rect之间，(body和block)只有左右或上下两种位置关系
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
 * TODO 可根据vec优化
 */
var _maxArea = 0;
var _innerRect = null;
var _udMaxArea = 0;
var _lrMaxArea = 0;
var _udBlockRect = null;
var _lrBlockRect = null;
function findMax(bodyCollider = null, blockCollider = null){
    let rectTuple = NewInnerRect(bodyCollider.rect, blockCollider.rect);
    if(!rectTuple){
        return;
    }
    if(GetRectWidth(rectTuple.rect) > GetRectHeight(rectTuple.rect)){
        findUD(rectTuple.rect, blockCollider);
    }else{
        findLR(rectTuple.rect, blockCollider);
    }
}

function findUD(innerRect = null, blockCollider = null){
    let area = GetArea(innerRect);
    if(area > _udMaxArea){
        _udMaxArea = area;
        _udBlockRect = blockCollider.rect;
    }
}

function findLR(innerRect = null, blockCollider = null){
    let area = GetArea(innerRect);
    if(area > _lrMaxArea){
        _lrMaxArea = area;
        _lrBlockRect = blockCollider.rect;
    }
}

function doFix(bodyCollider = null){
    doFixUD(bodyCollider);
    doFixLR(bodyCollider);
}

function doFixUD(bodyCollider = null){
    if(_udMaxArea <= 0){
        return;
    }
    //clear
    _udMaxArea = 0;

    //body.rect和交叉rect的位置关系
    let bodyRect = bodyCollider.rect;
    let bodyPos = GetRectPosCenter(bodyRect);
    let blockPos = GetRectPosCenter(_udBlockRect);
    if(bodyPos.y < blockPos.y){
        FixUnitPos(bodyRect, bodyPos.x, GetRectPosStart(_udBlockRect).y - GetRectHalfHeight(bodyRect.rect));
    }else{
        FixUnitPos(bodyRect, bodyPos.x, GetRectPosEnd(_udBlockRect).y + GetRectHalfHeight(bodyRect.rect));
    }
}

function doFixLR(bodyCollider = null){
    if(_lrMaxArea <= 0){
        return;
    }
    //clear
    _lrMaxArea = 0;

    //body.rect和交叉rect的位置关系
    let bodyRect = bodyCollider.rect;
    let bodyPos = GetRectPosCenter(bodyRect);
    let blockPos = GetRectPosCenter(_lrBlockRect);
    if(bodyPos.x < blockPos.x){
        FixUnitPos(bodyRect, GetRectPosStart(_lrBlockRect).x - GetRectHalfWidth(bodyRect.rect), bodyPos.y);
    }else{
        FixUnitPos(bodyRect, GetRectPosEnd(_lrBlockRect).x + GetRectHalfWidth(bodyRect.rect), bodyPos.y);
    }
}

export {GetBoxColliderSystem}