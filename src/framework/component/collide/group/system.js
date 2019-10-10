import { GetGroupPairList } from "./utils";
import { ColliderSystem } from "../base";
import { LinkIterator, LinkCompare } from "../../../foundation/structure/link";

//分组碰撞检测系统
class GroupColliderSystem extends ColliderSystem {
    constructor(callback = null){
        super(callback)
    }
    onUpdate(dt = 0){
        LinkIterator(GetGroupPairList(), pair => {
            if(pair.mask == pair.type1){
                //one team
                LinkCompare(pair.team1, (collider1, collider2) => {
                    super.check(dt, collider1, collider2, pair.type1, pair.type2);
                });
            }else{
                //two team
                LinkIterator(pair.team1, collider1 => {
                    LinkIterator(pair.team2, collider2 => {
                        super.check(dt, collider1, collider2, pair.type1, pair.type2);
                    });
                })
            }
        });
    }
}

var sys = null;
function GetGroupColliderSystem(callback = null){
    if(!sys){
        sys = new GroupColliderSystem(callback);
    }
    return sys;
}

export{GetGroupColliderSystem}