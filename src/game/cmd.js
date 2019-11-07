import { NewLink, PushToLink, GetLinkData } from "../framework/foundation/structure/link";
import { Component } from "../framework/foundation/structure/ecs";
import { MoveAction } from "../framework/action/move";

class CmdComponent extends Component {
    constructor(entityId = 0) {
        super(entityId);
        this.val = 0;
    }
}

var cmdComs = NewLink();
function createCmdComponent(entityId = 0) {
    let com = new CmdComponent(entityId);
    PushToLink(cmdComs, com);
    return com;
}

function GetCmdComponent(entityId = 0) {
    let com = GetLinkData(cmdComs, entityId);
    return com ? com : createCmdComponent(entityId);
}

function PushCmd(cmdCom = null, val = 0) {
    cmdCom.val = cmdCom.val | val;
}

function ReleaseCmd(cmdCom = null, val = 0) {
    cmdCom.val = cmdCom.val ^ val;
}

function IsPushJump(entityId = 0){
    let com = GetCmdComponent(entityId);
    return (com.val & cmd_jump) > 0;
}


class CMDMoveAction extends MoveAction{
    constructor(entityId = 0, priority = 0, dx = 0, dy = 0){
        super(entityId, priority, dx, dy);
    }
    onStart(){
        super.onStart();
        this.cmd = GetCmdComponent(this.entityId);
    }
    onUpdate(dt = 0){
        let val = this.cmd.val;
        if((val & 15) == 0){
            return;
        }

        if(val & cmd_mv_right){
            this.vec.x += this.dx;
        }else if(val & cmd_mv_left){
            this.vec.x -= this.dx;
        }

        if(val & cmd_mv_down){
            this.vec.y += this.dy;
        }else if(val & cmd_mv_up){
            this.vec.y -= this.dy;
        }
    }
}

function CreateCMDMoveAction(entityId = 0, priority = 0, dx = 0, dy = 0){
    if(dx == 0 && dy == 0){
        return null;
    }
    return new CMDMoveAction(entityId, priority, dx, dy);
}


export const cmd_mv_right = 1;
export const cmd_mv_left = 2;
export const cmd_mv_up = 4;
export const cmd_mv_down = 8;
export const cmd_jump = 16;
export{GetCmdComponent, PushCmd, ReleaseCmd, IsPushJump, CreateCMDMoveAction}