import { getMoveComponent, getMoveComponentList } from './component';
import { RemoveByKeyId } from '../../base/structure/link';

function SetPos(entityId = 0, x = 0, y = 0){
    let pos = getMoveComponent(entityId).pos;
    pos.x = x;
    pos.y = y;
    return pos;
}

function GetPos(entityId = 0){
    let com = getMoveComponent(entityId);
    return com.pos;
}

function GetVec(entityId = 0){
    let com = getMoveComponent(entityId);
    return com.vec;
}

function SetVec(entityId = 0, x = 0, y = 0){
    let vec = getMoveComponent(entityId).vec;
    vec.x = x;
    vec.y = y;
    return vec;
}

function GetMoveComponent(entityId = 0){
    return getMoveComponent(entityId);
}
function GetMoveComponentList(){
    return getMoveComponentList();
}
function RemoveMoveComponent(entityId = 0){
    RemoveByKeyId(getMoveComponentList(), entityId);
}

export {SetPos, GetPos, GetVec, SetVec, GetMoveComponent, GetMoveComponentList, RemoveMoveComponent}