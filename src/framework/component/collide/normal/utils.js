import { Collider } from '../base';
import { NewLink, PushToLink, RemoveByKeyId } from '../../../foundation/structure/link';

var colliderList = NewLink();
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