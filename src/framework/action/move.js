import { Action } from "./base";
import { GetVec, AddMover, RemoveMover } from "../component/pos/utils";

class MoveAction extends Action{
    constructor(entityId = 0, priority = 0, dx = 0, dy = 0){
        super(entityId, priority);
        this.dx = dx;
        this.dy = dy;
    }
    onStart(){
        this.vec = GetVec(this.entityId);
        AddMover(this.entityId);
    }
    onUpdate(dt = 0){
        this.vec.x += this.dx;
        this.vec.y += this.dy;
    }
    onEnd(){
        RemoveMover(this.entityId);
    }
}

function CreateMoveAction(entityId = 0, priority = 0, dx = 0, dy = 0) {
    if(dx == 0 && dy == 0){
        return null;
    }
    return new MoveAction(entityId, priority, dx, dy);
}

export{MoveAction, CreateMoveAction}