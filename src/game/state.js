import { NewLink, PushToLink, GetLinkData } from "../framework/foundation/structure/link";
import { Component } from "../framework/foundation/structure/ecs";

class StateComponent extends Component {
    constructor(entityId = 0) {
        super(entityId);
        this.val = 0;
    }
}

var stateComs = NewLink();
function createStateComponent(entityId = 0) {
    let com = new StateComponent(entityId);
    PushToLink(stateComs, com);
    return com;
}

function GetStateComponent(entityId = 0) {
    let com = GetLinkData(stateComs, entityId);
    return com ? com : createStateComponent(entityId);
}

const state_landing = 1;
const state_onland = 2;
const state_fall = 3;

function SetLanding(entityId = 0){
    setState(entityId, state_landing);
}
function SetOnland(entityId = 0){
    setState(entityId, state_onland);
}
function SetFall(entityId = 0){
    setState(entityId, state_fall);
}
function setState(entityId = 0, val = 0){
    let com = GetStateComponent(entityId);
    com.val = val;
}

function IsLanding(entityId = 0){
    return checkState(entityId, state_landing);
}
function IsOnland(entityId = 0){
    return checkState(entityId, state_onland);
}
function IsFall(entityId = 0){
    return checkState(entityId, state_fall);
}
function checkState(entityId = 0, val = 0){
    let com = GetStateComponent(entityId);
    return com.val == val;
}

export{GetStateComponent, SetLanding, SetOnland, SetFall, IsLanding, IsOnland, IsFall}