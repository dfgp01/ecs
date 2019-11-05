import { Entity, System } from "../../foundation/structure/ecs";
import { IsRectsCross } from "../../foundation/geometric/utils";

/**
 * 碰撞元件
 * tag : 自定义标识码
 */
class Collider extends Entity {
    constructor(entityId = 0, rect = null, tag = 0) {
        super();
        this.entityId = entityId;
        this.rect = rect;
        this.tag = tag;
    }
}

function GetRectPosTuple(collider = null){
    return collider.rect;
}


/**
 * 碰撞检测主系统
 * callback = function(dt, collider1, collider2)
 */
class ColliderSystem extends System {
    constructor(callback = null){
        super();
        this.callback = callback;
    }
    check(dt = 0, collider1 = null, collider2 = null){
        if(IsRectsCross(collider1.rect, collider2.rect)){
            this.callback(dt, collider1, collider2);
            return true;
        }
        return false;
    }
}

export{Collider, ColliderSystem}