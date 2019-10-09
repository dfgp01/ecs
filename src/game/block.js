import { AddCollider, RemoveCollider } from "../common/collide/utils";
import { UnitAction, CreateUnit } from "./unit";
import { GetPosComponent } from "../common/pos/utils";
import { Entity } from "../common/base/ecs";
import { Pos } from "../common/base/pos";
import { RunAction, StopAction } from "../common/action/utils";
import { ColliderTuple } from "../common/collide/model";
import { GetViewComponent, AddRender, RemoveRender } from "../common/view/utils";

class BlockTeamAction extends UnitAction {
    constructor(entityId = 0){
        super(entityId);
        this.entityIds = [];
        this.colliders = [];
        this.renders = [];
    }
    onStart(){
        this.colliders.forEach(collider => {
            AddCollider(collider);
        });
        let viewCom = GetViewComponent(this.entityId);
        this.entityIds.forEach(eId => {
            let pos = GetPosComponent(eId);
            this.renders.push(
                AddRender(viewCom, pos, this.firstFrame));
        });

        //目前同时运行所有动作，后期优化
        this.actions.forEach(item => {
            RunAction(item);
        });
    }
    onEnd(){
        this.colliders.forEach(collider => {
            RemoveCollider(collider);
        });
        this.renders.forEach(render => {
            RemoveRender(render);
        });
        this.actions.forEach(item => {
            StopAction(item);
        });
    }
}

var blockTeamAct = null;
function GetBlockAct(){
    if(!blockTeamAct){
        blockTeamAct = new BlockTeamAction();
        CreateUnit("block", blockTeamAct);
    }
    return blockTeamAct;
}

function AddBlock(x = 0, y = 0){
    let unit = new Entity();
    GetPosComponent(unit.id, new Pos(x, y));
    GetBlockAct().entityIds.push(unit.id);
}

function AddBlockCollider(rect = null, type = 0){
    let unit = new Entity();
    GetBlockAct().colliders.push(new ColliderTuple(unit.id, rect, type));
}

function RunBlock(){
    RunAction(blockTeamAct);
}

export {AddBlock, AddBlockCollider, BlockStart, RunBlock}