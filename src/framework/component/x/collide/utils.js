import { CreateRectDefault } from "../../base/rect";
import { Link, PushToLink, RemoveByKeyId } from "../../structure/link";

var blockColliderList = new Link();
function GetBlockColliderList(){
    return blockColliderList;
}

function AddBlockCollider(entityId = 0, rect = null) {
    let tuple = new BlockCollider(entityId, rect);
    PushToLink(blockTupleList, tuple, tuple.id);
    return tuple;
}

function RemoveBlockCollider(tupleId = 0){
    RemoveByKeyId(blockColliderList, tupleId);
}


var bodyColliderList = new Link();
function GetBodyColliderList(){
    return bodyColliderList;
}

function AddBodyCollider(entityId = 0, rect = null) {
    let tuple = new BodyCollider(entityId, rect);

    //以下几个属性应加到Collider中
    tuple.rectCenterPos = new Pos(rect.x + rect.width * 0.5, rect.y + rect.height * 0.5);
    tuple.moveCom = GetMoveComponent(entityId);
    tuple.unitPos = GetPosComponent(entityId);
    tuple.extRect = CreateRectDefault(0, 0);
    tuple.lineFormulaA = null;
    PushToLink(bodyColliderList, tuple, tuple.id);
    return tuple;
}

function RemoveBodyCollider(tupleId = 0){
    RemoveByKeyId(bodyColliderList, tupleId);
}