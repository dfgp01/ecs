import { Action, actionUpdate, actionStop, actionStart, actionEnd, isStop } from "../base";

/**
 * 顺序执行的action序列
 */
class SeqAction extends Action {
    constructor(entityId = 0, actions = null){
        super(entityId);
        this.actions = actions;
        this.index = 0;
    }
    onStart(){
        this.index = 0;
        this._action = this.actions[0];
        actionStart(this._action);
    }
    onUpdate(dt = 0){
        actionUpdate(this._action, dt);
    }
    isEnd(){
        if(this._action.isEnd()){
            actionEnd(this._action);
            this.index++;
            if(this.index >= this.actions.length){
                return true;
            }
            this._action = this.actions[this.index];
            actionStart(this._action);
            return false;
        }
        return false;
    }
    onStop(){
        actionStop(this._action);
    }
}

function CreateSeqAction(entityId = 0, actions = null){
    if(!actions || actions.length == 0){
        return null;
    }
    return new SeqAction(entityId, actions);
}

/**
 * 并行执行的action集合，仅当所有action都end了，自身才end
 */
class ParallelAction extends Action {
    constructor(entityId = 0, actions = null){
        super(entityId);
        this.actions = actions;
    }
    onStart(dt = 0){
        this.actions.forEach(action => {
            actionStart(action, dt);
        });
    }
    onUpdate(dt = 0){
        this.actions.forEach(action => {
            if(!isStop(action)){
                actionUpdate(action, dt);
            }
        });
    }
    isEnd(){
        let count = 0;
        this.actions.forEach(action => {
            if(isStop(action)){
                count++;
            }else if(action.isEnd()){
                actionEnd(action);
                count++;
            }
            return count >= this.actions.length;
        });
    }
    onStop(){
        this.actions.forEach(action => {
            if(!isStop(action)){
                actionStop(action);
            }
        });
    }
}

function CreateParallelAction(entityId = 0, actions = null){
    if(!actions || actions.length == 0){
        return;
    }
    return new ParallelAction(entityId, actions);
}

export{CreateSeqAction, CreateParallelAction}