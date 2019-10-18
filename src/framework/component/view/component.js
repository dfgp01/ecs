import { Component } from "../../foundation/structure/ecs";
import { PushToLink, GetLinkData, RemoveByKeyId, NewLink } from "../../foundation/structure/link";
import { NewRectPosTuple } from "../pos/rect/component";
import { NewRect } from "../../foundation/geometric/rect";
import { GetSpriteFrameWidth, GetSpriteFrameHeight } from "../../foundation/structure/frame";
import { GetPos } from "../pos/utils";


/**
 * 显示组件，包含一些矩阵数据
 */
class RenderComponent extends Component {
	constructor(entityId = 0, angle = 0, scale = 1) {
        super(entityId);
        this.angle = angle;
        this.scale = scale;
	}
}

var renderComs = NewLink();
function createRenderComponent(entityId = 0, viewData = null) {
    viewData = viewData ? viewData : {};
    let com = new RenderComponent(entityId, viewData.angle, viewData.scale);
    PushToLink(renderComs, com);
    return com;
}

function GetRenderComponent(entityId = 0, viewData = null) {
    let com = GetLinkData(renderComs, entityId);
    return com ? com : createRenderComponent(entityId, viewData);
}


/**
 * 显示元件
 * 目前使用tuple，可以兼容一个unit同时挂多个spriteFrame的需求
 * 如果需要限制一个unit仅有一个spriteFrame，就使用component
 */
class DisplayTuple extends Tuple {
    constructor(entityId = 0, spriteFrame = null, displayArea = null){
        super(entityId);
        this.spriteFrame = spriteFrame;
        this.displayArea = displayArea;
    }
}

/**
 * 画布上的显示队列
 */
var displayList = NewLink();
function GetDisplayList(){
    return displayList;
}

/**
 * 加入渲染队列
 * @param {*} displayArea Rect类型
 */
function AddDisplay(entityId = 0, spriteFrame = null, xOffset = 0, yOffset = 0) {
    let pos = GetPos(entityId);
    let rectPos = NewRectPosTuple(pos, xOffset, yOffset,
        NewRect(
            GetSpriteFrameWidth(spriteFrame),
            GetSpriteFrameHeight(spriteFrame)));
    let t = new DisplayTuple(entityId, spriteFrame, rectPos);
    PushToLink(displayList, t);
    return t;
}

function RemoveDisplay(displayId = 0) {
    RemoveByKeyId(displayList, displayId);
}

export {GetRenderComponent, GetDisplayList, AddDisplay, RemoveDisplay}