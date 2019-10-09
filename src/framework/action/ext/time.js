import { Action, actionStart, isStop, actionEnd, actionStop, actionUpdate } from "../base";

/**
 * 计时逻辑，参数内的action，需要实现：
 * 1.开始计时，运行action.start();
 * 2.计时结束，运行action.end();
 * 3.不运行action.update();
 * 4.注意内action的生命周期，其end后，本action依旧执行到点为止，建议duration > this.action的生命周期
 */
class TimeoutAction extends Action {
    constructor(entityId = 0, duration = 0, action = null){
        super(entityId);
        this.duration = duration;
        this.action = action;
        this._pass = 0;
    }
    onStart(){
        this._pass = 0;
        actionStart(this.action);
    }
    onUpdate(dt = 0){
        this._pass += dt;
    }
    isEnd(){
        return this._pass >= this.duration
    }
    onEnd(){
        if(!isStop(this.action)){
            actionEnd(this.action);
        }
    }
    onStop(){
        actionStop(this.action);
    }
}

function CreateTimeoutAction(entityId = 0, duration = 0, action = null){
    if(duration <= 0 || !action){
        return null;
    }
    return new TimeoutAction(entityId, duration, action);
}

/**
 * 继承TimeoutAction，倒计时期间会运行action.update()
 * 同样需要注意内action的生命周期
 */
class DurationAction extends TimeoutAction {
    constructor(entityId = 0, duration = 0, action = null){
        super(entityId, duration, action);
    }
    onUpdate(dt = 0){
        actionUpdate(this.action);
    }
}

function CreateDurationAction(entityId = 0, duration = 0, action = null){
    if(duration <= 0 || !action){
        return null;
    }
    return new DurationAction(entityId, duration, action);
}

export {CreateTimeoutAction, CreateDurationAction}