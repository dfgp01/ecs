import { GetNormalColliderList } from './utils';
import { ColliderSystem } from '../base';
import { LinkCompare } from '../../../foundation/structure/link';

/**
 * 独立检测系统
 * 各自为政，互相独立
 */
class NormalColliderSystem extends ColliderSystem {
    constructor(callback = null){
        super(callback)
    }
    onUpdate(dt = 0){
        LinkCompare(GetNormalColliderList(), (collider1, collider2) => {
            super.check(dt, collider1, collider2);
        });
    }
}

var sys = null;
function GetNormalColliderSystem(callback = null){
    if(!sys){
        return new NormalColliderSystem(callback);
    }
    return sys;
}

export {GetNormalColliderSystem}