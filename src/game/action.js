import { Action } from "../framework/action/base";
import { Move, GetVec, SetVec } from "../framework/component/pos/utils";
import { RunAction, StopAction } from "../framework/action/utils";
import { GetRectPosCenter } from "../framework/component/pos/rect/component";
import { GetRectHalfHeight, GetRectHalfWidth } from "../framework/foundation/geometric/rect";
import { Abs } from "../framework/foundation/geometric/math";

class StatusChangerAction extends Action{
    constructor(entityId = 0, priority = 0, moveDx = 0, jumpDy = 0, fallDy = 0, fallMaxDy = 0){
        super(entityId, priority);
        this.jumpDy = jumpDy;
        this.fallAct = new FallAction(entityId, priority + 1, fallDy, fallMaxDy);
        this.moveAct = new CMDMoveAction(entityId, priority + 1, moveDx);
        this.status = 0;
    }
    onStart(){
        this.cmd = GetCmd(this.entityId);
        RunAction(this.moveAct);
    }
    onUpdate(dt = 0){
        do{
            if(!onLandFlag){
                switchOnFall();
                break;
            }
            //地面起跳
            if(this.status == status_onLand && this.cmd & cmd_jump){
                switchJump();
                break;
            }
        }while(false);
        onLandFlag = 0;
    }
}

const onLandFlag = 0;
const status_onLand = 1;
const status_onFall = 2;

var sca = null;
function GetStatusChangerAction(entityId = 0, moveDx = 0, jumpDy = 0, fallDy = 0, fallMaxDy = 0) {
    if(!sca){
        sca = new StatusChangerAction(entityId, 0, moveDx, jumpDy, fallDy, fallMaxDy);
    }
    return sca;
}

function switchOnland() {
    sca.status = status_onLand;
    let v = GetVec(sca.entityId);
    SetVec(sca.entityId, v.x, 0);
    StopAction(sca.fallAct);
}

function switchOnFall() {
    sca.status = status_onFall;
    RunAction(sca.fallAct);
}

function switchJump() {
    let v = GetVec(sca.entityId);
    SetVec(sca.entityId, v.x, sca.jumpDy);
    switchOnFall();
}

function CollideCallback(collider1 = null, collider2 = null) {
    let bodyPos, blockPos;
    if(collider1.tag & tag_body){
        bodyPos = GetRectPosCenter(collider1.rect);
        blockPos = GetRectPosCenter(collider2.rect);
    }else{
        bodyPos = GetRectPosCenter(collider2.rect);
        blockPos = GetRectPosCenter(collider1.rect);
    }
    //左右无视
    let w = Abs(bodyPos.x - blockPos.x);
    if(w >= GetRectHalfWidth(bodyCollider.rect.rect) + GetRectHalfWidth(bodyCollider.rect.rect)){
        return;
    }
    if(bodyPos.y <= blockPos.y){
        //踩地
        touchLand();
    }else{
        //撞头
        touchTop();
    }
}

function touchLand() {
    onLandFlag = 1;
    if(sca.status != status_onFall){
        return;
    }
    switchOnland();
}

function touchTop() {
    if(sca.status != status_onFall){
        return;
    }
    let v = GetVec(sca.entityId);
    SetVec(sca.entityId, v.x, 0);
}

export{GetStatusChangerAction}