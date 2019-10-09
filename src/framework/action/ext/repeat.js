import { Action, actionStart, actionStop, actionUpdate, actionEnd } from "../base";


class RepeatAction extends Action {
    constructor(entityId = 0, count = 1, action = null){
        super(entityId);
        this.count = count;
        this.action = action;
        this._times = 0;
    }
    onStart(){
        this._times = 0;
        actionStart(this.action);
    }
    onUpdate(dt = 0){
        actionUpdate(this.action);
    }
    isEnd(){
        if(this.action.isEnd()){
            actionEnd(this.action);
            this._times++;
            if(this._times >= this.count){
                return true;
            }
            actionStart(this.action);
        }
        return false;
    }
    onStop(){
        actionStop(this.action);
    }
}

function CreateRepeatAction(entityId = 0, times = 0, action = null){
    if(times == 0 || !action){
        return null;
    }
    return new RepeatAction(entityId, times, action);
}

function CreateRepeatForeverAction(entityId = 0, action = null){
    return CreateRepeatAction(entityId, -1, action);
}

export {CreateRepeatAction, CreateRepeatForeverAction}