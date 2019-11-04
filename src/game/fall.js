import { MoveAction } from "../framework/action/move";

class FallAction extends MoveAction {
    constructor(entityId = 0, priority = 0, dy = 0, maxDy = 0){
        super(entityId, priority, 0, dy);
        this.maxDy = maxDy;
    }
    onUpdate(dt = 0){
        this._vec.y += this.dy;
        if(this._vec.y > this.maxDy){
            this._vec.y = this.maxDy;
        }
    }
}

function CreateFallAction(entityId = 0, priority = 0, dy = 0, maxDy = 0) {
    if(dy <= 0 || maxDy < dy){
        return null;
    }
    return new FallAction(entityId, priority, dy, maxDy);
}

export{CreateFallAction}