import { Entity } from "../common/base/ecs";
import { GetPosComponent } from "../common/pos/utils";
import * as cst from "./const"
import { CmdMoveAction, GenUnitAction } from "./action";
import { ErrorParamLog } from "../common/debug/log";
import { IntervalAction, MoveAction } from "../common/action/other";
import { CreateRect, CreateRectNormal } from "../common/base/rect";
import { GetData } from "../common/director/world";
import { Action } from "../common/base/action";
import { GetSpriteFrame, GetDefaultFrame, GetViewComponent } from "../common/view/utils";
import { ColliderTuple } from "../common/collide/model";
import { CreateAnimateAction } from "../common/view/action";


const STATE_ACTIVE = 0;
const STATE_DEAD = 1;

/**
 * 一般单位的状态管理机
 *  静止状态：DefaultAction -> DefaultFrame -> 等死
 *  活动状态：运行所有action
 */
class UnitAction extends Action {
    constructor(entityId = 0, collider = null, actions = [], firstFrame = null){
        super(entityId);
        this.collider = collider;
        this.actions = actions;
        this.firstFrame = firstFrame;
    }
}

/**
 * data : {
 *      sprite-frame : "sprite-frame-name",
 *      properties : {
 *          view : {
 *              angle : 0,
 *              scale : 1
 *          }
 *          pos : {
 *              x : 10,
 *              y : 10
 *          }
 *          body : {
 *              type : 0,
 *              rect : Rect
 *          }
 *      }
 *      actions : []
 * }
 */
function CreateUnit(dataKey = "", unitAction = null){
    let unitData = GetData(dataKey);
    let unit = new Entity();
    let pos = GetPosComponent(unit.id);
    
    let collider = null;
    if(unitData['properties']){
        let p = unitData['properties'];

        //初始位置
        initPos(p['pos'], pos);

        //显示配置
        createViewCom(unit.id, p['view']);

        //碰撞配置
        collider = createCollider(unit.id, p['body']);
    }

    let actions = [];
    let actionsData = unitData['actions'];
    if(actionsData && actionsData.length > 0){
        actionsData.forEach(actionData => {
            actions.push(createAction(unit.id, actionData));
        });
    }

    unitAction.entityId = unit.id;
    unitAction.collider = collider;
    unitAction.actions = actions;
    unitAction.firstFrame = unitData['sprite-frame'] ? GetSpriteFrame(unitData['sprite-frame']) : GetDefaultFrame();
    return;
}

//初始位置
function initPos(posData = null, pos = null){
    if(posData){
        pos.x = posData['x'];
        pos.y = posData['y'];
    }
}

function createViewCom(unitId = 0, viewData = null){
    if(viewData){
        return GetViewComponent(unitId, viewData);
    }
    return null;
}

//碰撞配置，rect默认值是和spriteFrame.rect一样
function createCollider(entityId = 0, bodyData = null){
    if(bodyData){
        let rect;
        let rectData = bodyData['rect'];
        if(rectData){
            rect = CreateRect(
                rectData['xOffset'], rectData['yOffset'], 
                rectData['width'], rectData['height']);
        }else{
            let spriteFrame = bodyData['sprite-frame'] ? GetSpriteFrame(bodyData['sprite-frame']) : GetDefaultFrame();
            rect = CreateRectNormal(
                spriteFrame.displayRect.xOffset, spriteFrame.displayRect.yOffset, 
                spriteFrame.displayRect.width, spriteFrame.displayRect.height);
        }
        return new ColliderTuple(entityId, rect, bodyData['type']);
    }
    return null;
}

function createAction(entityId = 0, actionData = null) {
    if(!actionData || !actionData.type)return null;
    let action;
    switch(actionData.type){
        case cst.ACTION_TYPE_MOVE:
            action = new MoveAction(entityId, actionData.dx, actionData.dy);
            break;
        case cst.ACTION_TYPE_INTERVAL:
            action = new IntervalAction(entityId, actionData.interval, createAction(entityId, actionData.action));
            break;
        case cst.ACTION_TYPE_CMD_MOVE:
            action = new CmdMoveAction(entityId, actionData.dx, actionData.dy);
            break;
        case cst.ACTION_TYPE_GEN_UNIT:
            action = new GenUnitAction(entityId, actionData.dataKey, actionData.x, actionData.y);
            break;
        case cst.ACTION_TYPE_ANIMATE:
            action = CreateAnimateAction(entityId, actionData);
            break;
        default:
            ErrorParamLog("actionData", actionData);
            return null;
    }
    //action.id = actionData.id;
    //action.entityId = entityId;
    return action;
}

export {UnitAction, GetUnitPosList, BaseScriptComponent, CreateUnit, UnitDead, NodeScriptSystem, GenUnit}