import { GetBodyColliderList, GetBlockColliderList } from "./utils";
import { ColliderSystem } from "../base";
import { doFix } from "./logic";
import { NewLineWithVec } from "../../../foundation/geometric/line";
import { LinkIterator } from "../../../foundation/structure/link";


/**
 * 目前，vec线段和rect的关系总结：
 *      line和rect一般情况下最多有两个交点，分别在两条边上
 *      但是，若line刚好经过边角，则一个点同时与两边相交，同理，line过两边角，则和四边均相交
 *      因为vec带有方向，因此只需取最近交点，短路判断仅取一边，无视顶点相交情况，具体左右优先还是上下优先都无所谓
 * 
 * 步骤：
 *  1.快速排斥，线段是否完全不相交
 *  2.方程计算线段是否相交，求出交点，修正vec
 *  3.确定最近交点
 *  4.修正pos
 */
class BoxColliderSystem extends ColliderSystem {
    constructor(callback = null){
        super(callback)
    }
    onUpdate(dt = 0){
        LinkIterator(GetBodyColliderList(), body => {
            let vec = GetVec(body.entityId);
            if(vec.x == 0 && vec.y == 0){
                return;
            }
            let pos = GetPos(body.entityId);
            bodyCollider.line = NewLineWithVec(pos.x, pos.y, vec.x, vec.y);
            LinkIterator(GetBlockColliderList(), block => {
                if(doFix(body, pos, vec, block)){
                    this.callback(dt, body, block);
                }
            });
        });
    }
}

var boxColliderSys = null
function GetBoxColliderSystem(callback = null){
    if(!boxColliderSys){
        boxColliderSys = new BoxColliderSystem(callback);
    }
    return boxColliderSys;
}

export {GetBoxColliderSystem}