import { MoveAction } from "../framework/action/move";
import { SetVecY } from "../framework/component/pos/utils";

//TODO 需要优化
class FallAction extends MoveAction {
    constructor(entityId = 0, priority = 0, dy = 0, maxDy = 0){
        super(entityId, priority, 0, dy);
        this.maxDy = maxDy;
    }
    onStart(){
        super.onStart();
        this._count = this.vec.y;
    }
    onUpdate(dt = 0){
        //TODO vec会被清0，需要每帧累加
        this._count += this.dy;
        if(this._count > this.maxDy){
            this._count = this.maxDy;
        }
        this.vec.y += this._count;
    }
    onEnd(){
        this._count = 0;
        //暂时这样，后期优化重构逻辑
    }
}

function CreateFallAction(entityId = 0, priority = 0, dy = 0, maxDy = 0) {
    if(dy <= 0 || maxDy < dy){
        return null;
    }
    return new FallAction(entityId, priority, dy, maxDy);
}

export{CreateFallAction}