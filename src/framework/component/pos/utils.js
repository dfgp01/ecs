import { GetPosComponent } from './component';

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


function Move(entityId = 0, dx = 0, dy = 0){
    let pos = GetPosComponent(entityId).pos;
    pos.x += dx;
    pos.y += dy;
}

export {SetPos, GetPos, GetVec, SetVec}