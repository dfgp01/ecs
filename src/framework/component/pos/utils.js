import { GetPosComponent } from './component';
import { RemoveByKeyId, NewLink, GetLinkData, PushToLink } from '../../foundation/structure/link';

function GetPos(entityId = 0){
    return GetPosComponent(entityId).pos;
}

function SetPos(entityId = 0, x = 0, y = 0){
    setPosVal(GetPos(entityId), x, y);
}

function SetPosX(entityId = 0, x = 0){
    let pos = GetPos(entityId);
    setVPosVal(pos, x, pos.y);
}

function SetPosY(entityId = 0, y = 0){
    let pos = GetPos(entityId);
    setVPosVal(pos, pos.x, y);
}

function setPosVal(pos = null, x = 0, y = 0){
    pos.x = x;
    pos.y = y;
}

function GetVec(entityId = 0){
    return GetPosComponent(entityId).vec;
}

function SetVec(entityId = 0, x = 0, y = 0){
    setVecVal(GetVec(entityId), x, y);
}

function SetVecX(entityId = 0, x = 0){
    let vec = GetVec(entityId);
    setVecVal(vec, x, vec.y);
}

function SetVecY(entityId = 0, y = 0){
    let vec = GetVec(entityId);
    setVecVal(vec, vec.x, y);
}

function setVecVal(vec = null, x = 0, y = 0){
    vec.x = x;
    vec.y = y;
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

export {SetPos, GetPos, SetPosX, SetPosY, GetVec, SetVec, SetVecX, SetVecY, GetMoverList, AddMover, RemoveMover}