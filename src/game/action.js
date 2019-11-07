import { Action } from "../framework/action/base";
import { GetVec, SetVec, SetVecY } from "../framework/component/pos/utils";
import { RunAction, StopAction } from "../framework/action/utils";
import { GetRectPosCenter } from "../framework/component/pos/rect/component";
import { GetRectHalfWidth } from "../framework/foundation/geometric/rect";
import { Abs } from "../framework/foundation/geometric/math";
import { CreateCMDMoveAction, cmd_jump, IsPushJump } from "./cmd";
import { CreateFallAction } from "./fall";
import { IsLanding, IsOnland, SetOnland, SetFall, IsFall } from "./state";


var onLandCheckFlag = 0;

class StatusChangerAction extends Action{
    constructor(entityId = 0, priority = 0, moveDx = 0, jumpDy = 0, fallDy = 0, fallMaxDy = 0){
        super(entityId, priority);
        this.jumpDy = jumpDy;
        this.fallAct = CreateFallAction(entityId, priority + 1, fallDy, fallMaxDy);
        this.moveAct = CreateCMDMoveAction(entityId, priority + 1, moveDx, 0);
    }
    onStart(){
        SetOnland(this.entityId);
        RunAction(this.moveAct);
    }
    onUpdate(dt = 0){
        do{
            //着陆切换
            if(onLandCheckFlag && IsFall(this.entityId)){
                SetOnland(this.entityId);
                //SetVecY(sca.vec, 0);  无需清理
                StopAction(this.fallAct);
                break;
            }
            //站地状态
            else if(IsOnland(this.entityId)){
                if(!onLandCheckFlag){
                    SetFall(this.entityId);
                    RunAction(this.fallAct);
                    break;
                }
                if(IsPushJump(this.entityId)){
                    SetVecY(this.entityId, -this.jumpDy);
                    SetFall(this.entityId);
                    RunAction(this.fallAct);
                    break;
                }
            }
        }while(false);
        onLandCheckFlag = 0;
    }
}

var sca = null;
function GetStatusChangerAction(entityId = 0, moveDx = 0, jumpDy = 0, fallDy = 0, fallMaxDy = 0) {
    if(!sca){
        sca = new StatusChangerAction(entityId, 0, moveDx, jumpDy, fallDy, fallMaxDy);
    }
    return sca;
}

function BoxCallback(bodyCollider = null, blockCollider = null) {
    let bodyPos = GetRectPosCenter(bodyCollider.rect);
    let blockPos = GetRectPosCenter(blockCollider.rect);
    //左右无视
    let w = Abs(bodyPos.x - blockPos.x);
    if(w >= GetRectHalfWidth(bodyCollider.rect.rect) + GetRectHalfWidth(blockCollider.rect.rect)){
        return;
    }
    if(bodyPos.y <= blockPos.y){
        //踩地
        onLandCheckFlag = 1;
    }else{
        //撞头
        SetVecY(bodyCollider.entityId, 0);
    }
}

export{GetStatusChangerAction, BoxCallback}