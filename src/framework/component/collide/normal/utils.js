import { PushToLink, RemoveByKeyId, Link } from '../../../base/structure/link';
import { Collider } from '../base';

var colliderList = new Link();
function GetNormalColliderList(){
    return colliderList;
}

function AddNormalCollider(entityId = 0, rect = null, tag = 0) {
    let c = new Collider(entityId, rect, tag);
    PushToLink(colliderList, c);
    return c;
}

function RemoveNormalCollider(colliderId = 0) {
    RemoveByKeyId(colliderList, colliderId);
}

export{GetNormalColliderList, AddNormalCollider, RemoveNormalCollider}