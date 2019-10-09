import { RepeatForeverAction } from "./ext";
import { GetPosComponent } from "../pos/utils";
import { Action } from "../base/action";

/**
 * 还未分类的，临时放着的
 */

 
class MoveAction extends Action {
    constructor(entityId = 0, dx = 0, dy = 0) {
        super(entityId);
        this.dx = dx;
        this.dy = dy;
    }
    onStart(){
        this._pos = GetPosComponent(this.entityId);
    }
    onUpdate(dt = 0){
        this._pos.x += this.dx;
        this._pos.y += this.dy;
    }
}


//包装类，等于 repeat-forever + timeout
class IntervalAction extends RepeatForeverAction {
    constructor(entityId = 0, interval = 0, action = null){
        super(entityId, new TimeoutAction(entityId, interval, action));
        //this.interval = interval;
        //this.action = action;
    }
}

export {MoveAction, IntervalAction}