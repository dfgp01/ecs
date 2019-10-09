import * as cst from './const'
import { GetPosComponent, SetPos } from '../common/pos/utils';
import { GetCommandComponent } from '../common/command/utils';
import { CreateUnit, GenUnit } from './unit';
import { MoveAction } from '../common/action/other';
import { Action } from '../common/base/action';

//简单应付了事
class CmdMoveAction extends MoveAction {
    onStart(){
        this._cmdCom = GetCommandComponent(this.entityId);
        this._pos = GetPosComponent(this.entityId);
    }
    onUpdate(dt = 0){
        let cmd = this._cmdCom.val;
        let pos = this._pos;
        if(cmd & cst.COMMAND_RIGHT) {
            pos.x += this.dx;
        }
        else if(cmd & cst.COMMAND_LEFT) {
            pos.x -= this.dx;
        }
        if(cmd & cst.COMMAND_DOWN) {
            pos.y += this.dy;
        }
        else if(cmd & cst.COMMAND_UP) {
            pos.y -= this.dy;
        }
    }
}

class GenUnitAction extends Action {
    constructor(entityId = 0, dataKey = "", x = 0, y = 0) {
        super(entityId);
        this.dataKey = dataKey;
        this.x = x;
        this.y = y;
    }
    onStart(){
        let pos = GetPosComponent(this.entityId);
        let uid = CreateUnit(this.dataKey);
        SetPos(uid, pos.x + this.x, pos.y + this.y);
    }
}

class GenUnitRandomPos extends Action {
    constructor(entityId, max = 0, dataKey = ""){
        super(entityId);
        this.max = max;
        this.dataKay = dataKey;
    }
    onStart(){
        SetPos(this.entityId, Math.random() * this.max, 20);
        let pos = GetPosComponent(this.entityId);
        GenUnit(this.entityId, this.dataKay, pos.x, pos.y);
    }
}

export {CmdMoveAction, GenUnitAction, RollBackgroundAction, GenUnitRandomPos}