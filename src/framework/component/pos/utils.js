import { GetPosComponent } from './component';
import { RemoveByKeyId, NewLink, GetLinkData, PushToLink } from '../../foundation/structure/link';

function SetPos(entityId = 0, x = 0, y = 0){
    let pos = GetPosComponent(entityId).pos;
    pos.x = x;
    pos.y = y;
    return pos;
}

function GetPos(entityId = 0){
    return GetPosComponent(entityId).pos;
}

function SetVec(entityId = 0, x = 0, y = 0){
    let vec = GetPosComponent(entityId).vec;
    vec.x = x;
    vec.y = y;
    return vec;
}

function GetVec(entityId = 0){
    return GetPosComponent(entityId).vec;
}

var moveList = NewLink();
function GetMoverList(){
    return moveList;
}

function AddMover(entityId = 0) {
    let m = GetLinkData(moveList, entityId);
    if(m){
        return;
    }
    PushToLink(moveList, GetPosComponent(entityId));
}

function RemoveMover(entityId = 0) {
    RemoveByKeyId(moveList, entityId);
}

export {SetPos, GetPos, GetVec, SetVec, GetMoverList, AddMover, RemoveMover}