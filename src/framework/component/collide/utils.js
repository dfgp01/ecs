import { GetGroupColliderSystem } from './group/system';
import { AddGroupPair, AddGroupCollider, RemoveGroupCollider } from './group/utils';
import { GetBoxColliderSystem } from './box/system';
import { AddBodyCollider, AddBlockCollider, RemoveBodyCollider, RemoveBlockCollider } from './box/utils';
import { AddNormalCollider, RemoveNormalCollider } from './normal/utils';

/**
 * 启用碰撞检测机制
 * {
 *      useGroup : true
 *      pairs : [[1, 2], [2, 4], [1, 8]...]
 *      useBox : true
 * }
 * callback : callback = function(dt, collider1, collider2)
 */
var cfg = {
    useGroup : false,
    pairs : [],
    useBox : false,
    callback : null,
    sysList : []
};

function OpenCollider(options = null){
    cfg.useGroup = options.useGroup ? options.useGroup : cfg.useGroup;
    cfg.pairs = options.pairs ? options.pairs : cfg.pairs;
    cfg.useBox = options.useBox ? options.useBox : cfg.useBox;
    cfg.callback = options.callback;

    if(cfg.useBox){
        cfg.sysList.push(GetBoxColliderSystem(options.callback));
    }
    if(cfg.useGroup){
        cfg.sysList.push(GetGroupColliderSystem(options.callback));
        cfg.pairs.forEach(pair => {
            AddGroupPair(pair[0], pair[1]);
        });
    }
    cfg.sysList.push(GetNormalColliderSystem(options.callback));
    cfg.sysList.forEach(sys => {
        AddLogicSystems(sys);
    });
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