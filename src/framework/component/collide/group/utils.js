import { Collider } from "../base";
import { RemoveByKeyId, PushToLink, NewLink } from "../../../foundation/structure/link";

class GroupPair {
    constructor(id = 0, team1 = null, team2 = null){
        this.id = id;     //link use
        this.team1 = team1;
        this.team2 = team2;
    }
}

var teams = new Map();
function getTeam(team = 0){
    let t = teams.get(team);
    if(!t){
        t = NewLink();
        teams.set(team, t);
    }
    return t;
}

function AddGroupCollider(entityId = 0, rect = null, tag = 0, team = 0) {
    let collider = new Collider(entityId, rect, tag);
    PushToLink(getTeam(team), collider);
    return collider;
}

function RemoveGroupCollider(colliderId = 0, team = 0) {
    RemoveByKeyId(getTeam(team), colliderId);
}

var pairs = NewLink();
function GetGroupPairList(){
    return pairs;
}
function AddGroupPair(team1 = 0, team2 = 0){
    if(team1==0 || team2==0){
        return null;
    }
    let t1 = getTeam(team1);
    let t2 = team1 == team2 ? null : getTeam(team2);
    let pair = new GroupPair(team1 | team2, t1, t2);
    PushToLink(pairs, pair);
    return pair;
}


export {GetAllGroupColliderList, AddGroupCollider, RemoveGroupCollider, GetGroupColliderByEntityId, GetGroupPairList, AddGroupPair}