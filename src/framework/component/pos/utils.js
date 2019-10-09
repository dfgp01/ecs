import { getPosComponent, getPosComponentList } from './component';
import { RemoveByKeyId } from '../../base/structure/link';

function SetPos(entityId = 0, x = 0, y = 0){
    let pos = getPosComponent(entityId).pos;
    pos.x = x;
    pos.y = y;
    return pos;
}

function GetPos(entityId = 0){
    return getPosComponent(entityId).pos;
}

function SetVec(entityId = 0, x = 0, y = 0){
    let vec = getPosComponent(entityId).vec;
    vec.x = x;
    vec.y = y;
    return vec;
}

function GetVec(entityId = 0){
    return getPosComponent(entityId).vec;
}

function GetPosComponent(entityId = 0){
    return getPosComponent(entityId);
}
function GetPosComponentList(){
    return getPosComponentList();
}
function RemovePosComponent(entityId = 0){
    RemoveByKeyId(getPosComponentList(), entityId);
}

export {SetPos, GetPos, GetVec, SetVec, GetPosComponent, GetPosComponentList, RemovePosComponent}