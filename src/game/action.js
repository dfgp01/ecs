import { Action } from "../framework/action/base";
import { GetVec, SetVec, SetVecY } from "../framework/component/pos/utils";
import { RunAction, StopAction } from "../framework/action/utils";
import { GetRectPosCenter } from "../framework/component/pos/rect/component";
import { GetRectHalfWidth } from "../framework/foundation/geometric/rect";
import { Abs } from "../framework/foundation/geometric/math";
import { CreateCMDMoveAction, cmd_jump } from "./cmd";
import { CreateFallAction } from "./fall";

class StatusChangerAction extends Action{
    constructor(entityId = 0, priority = 0, moveDx = 0, jumpDy = 0, fallDy = 0, fallMaxDy = 0){
        super(entityId, priority);
        this.jumpDy = jumpDy;
        this.fallAct = CreateFallAction(entityId, priority + 1, fallDy, fallMaxDy);
        this.moveAct = CreateCMDMoveAction(entityId, priority + 1, moveDx, 0);
        this.status = 0;
    }
    onStart(){
        this.cmd = GetCmd(this.entityId);
        this.vec = GetVec(this.entityId);
        RunAction(this.moveAct);
    }
    onUpdate(dt = 0){
        do{
            //地面起跳
            if(this.status == status_onLand && this.cmd & cmd_jump){
                switchJump();
                break;
            }
            if(onLandCheckFlag == 0){
                switchOnFall();
                break;
            }
        }while(false);
        onLandCheckFlag = 0;
    }
}

const onLandCheckFlag = 0;
const status_landing = 1;
const status_onLand = 2;
const status_onFall = 3;

var sca = null;
function GetStatusChangerAction(entityId = 0, moveDx = 0, jumpDy = 0, fallDy = 0, fallMaxDy = 0) {
    if(!sca){
        sca = new StatusChangerAction(entityId, 0, moveDx, jumpDy, fallDy, fallMaxDy);
    }
    return sca;
}

function switchOnland() {
    if(sca.status == status_onLand || sca.vec.y <= 0){
        return;
    }
    sca.status = status_onLand;
    SetVecY(sca.vec, 0);
    StopAction(sca.fallAct);
}

function switchOnFall() {
    if(sca.status == status_onFall){
        return;
    }
    sca.status = status_onFall;
    RunAction(sca.fallAct);
}

function switchJump() {
    if(sca.status == status_onFall){
        return;
    }
    SetVecY(sca.vec, -sca.jumpDy);
    switchOnFall();
}

function BoxCallback(bodyCollider = null, blockCollider = null) {
    let bodyPos = GetRectPosCenter(bodyCollider.rect);
    let blockPos = GetRectPosCenter(blockCollider.rect);
    //左右无视
    let w = Abs(bodyPos.x - blockPos.x);
    if(w >= GetRectHalfWidth(bodyCollider.rect.rect) + GetRectHalfWidth(bodyCollider.rect.rect)){
        return;
    }
    if(bodyPos.y <= blockPos.y){
        //踩地
        onLandCheckFlag = 1;
        switchOnland();
    }else{
        //撞头
        //touchTop();
    }
}

function touchTop() {
    if(sca.status != status_onFall){
        return;
    }
    let v = GetVec(sca.entityId);
    SetVec(sca.entityId, v.x, 0);
}

export{GetStatusChangerAction, BoxCallback}