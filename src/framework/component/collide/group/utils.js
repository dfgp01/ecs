import { Collider } from "../base";
import { RemoveByKeyId, PushToLink, NewLink } from "../../../foundation/structure/link";

class GroupPair {
    constructor(type1 = 0, team1 = null, type2 = 0, team2 = null){
        this.type1 = type1;
        this.type2 = type2;
        this.team1 = team1;
        this.team2 = team2;
        this.mask = type1 | type2;
        this.id = this.mask     //link use
    }
}

var teams = new Map();
function getTeam(type = 0){
    let team = teams.get(type);
    if(!team){
        team = new Link();
        teams.set(type, team);
    }
    return team;
}
function addToTeam(type = 0, collider){
    let team = getTeam(type);
    PushToLink(team, collider);
}

function AddGroupCollider(entityId = 0, rect = null, tag = 0, type = 0) {
    let collider = new Collider(entityId, rect, tag);
    addToTeam(type, collider);
    return collider;
}

function RemoveGroupCollider(colliderId = 0, type = 0) {
    let team = getTeam(type);
    RemoveByKeyId(team, colliderId);
}

var pairs = NewLink();
function GetGroupPairList(){
    return pairs
}
function AddGroupPair(type1 = 0, type2 = 0){
    let team1 = getTeam(type1);
    let team2 = getTeam(type2);
    let pair = new GroupPair(type1, team1, type2, team2);
    PushToLink(pairs, pair);
    return pair;
}


export {GetAllGroupColliderList, AddGroupCollider, RemoveGroupCollider, GetGroupColliderByEntityId, GetGroupPairList, AddGroupPair}