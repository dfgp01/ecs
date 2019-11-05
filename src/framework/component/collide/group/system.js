import { GetGroupPairList } from "./utils";
import { LinkIterator, LinkCompare } from "../../../foundation/structure/link";
import { IsRectsCrossWithVec } from "../../pos/rect/utils";
import { System } from "../../../foundation/structure/ecs";

//分组碰撞检测系统
class GroupColliderSystem extends System {
    constructor(callback = null){
        super(800);
        this.callback = callback;
    }
    onUpdate(dt = 0){
        LinkIterator(GetGroupPairList(), pair => {
            if(pair.team2 == null){
                //one team
                LinkCompare(pair.team1, (collider1, collider2) => {
                    if(IsRectsCrossWithVec(collider1.rect, collider2.rect)){
                        this.callback(collider1, collider2);
                    }
                });
            }else{
                //two team
                LinkIterator(pair.team1, collider1 => {
                    LinkIterator(pair.team2, collider2 => {
                        if(IsRectsCrossWithVec(collider1.rect, collider2.rect)){
                            this.callback(collider1, collider2);
                        }
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