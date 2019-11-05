import { GetGroupColliderSystem } from './group/system';
import { AddGroupPair, AddGroupCollider, RemoveGroupCollider } from './group/utils';
import { AddBodyCollider, AddBlockCollider, RemoveBodyCollider, RemoveBlockCollider } from './box/utils';
import { AddNormalCollider, RemoveNormalCollider } from './normal/utils';
import { AddSystem } from '../../director/system/run';
import { GetBoxColliderSystem } from './box2/system';

/**
 * 启用碰撞检测机制
 * {
 *      useGroup : true
 *      pairs : [[1, 2], [2, 4], [1, 8]...]
 *      useBox : true
 * }
 * callback : callback = function(dt, collider1, collider2)
 */
function OpenCollider(options = null){
    if(options.useBox){
        AddSystem(GetBoxColliderSystem());
    }
    if(options.group && options.group.length > 0){
        options.group.forEach(pair => {
            AddGroupPair(pair['team1'], pair['team2']);
        });
        AddSystem(GetGroupColliderSystem(options.callback));
    }
}


function AddCollider(entityId = 0, rect = null, tag = 0, group = 0, isBody = false, isBlock = false) {
    if(cfg.useBox){
        if(isBody){
            return AddBodyCollider(entityId, rect, tag);
        }
        else if(isBlock){
            return AddBlockCollider(entityId, rect, tag);
        }
    }
    if(cfg.useGroup){
        return AddGroupCollider(entityId, rect, tag, group);
    }
    return AddNormalCollider(entityId, rect, tag);
}


function RemoveCollider(colliderId = 0, group = 0, isBody = false, isBlock = false) {
    if(group > 0){
        RemoveGroupCollider(colliderId, group);
        return;
    }
    if(isBody){
        RemoveBodyCollider(colliderId);
        return;
    }
    if(isBlock){
        RemoveBlockCollider(colliderId);
        return;
    }
    RemoveNormalCollider(colliderId);
}

export {OpenCollider, AddCollider, RemoveCollider}