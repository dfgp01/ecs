
import { GetCommandComponent } from "../common/command/utils";
import * as cst from "./const"
import { GetPosComponent } from "../common/pos/utils";
import { CreateRectDefault } from "../common/base/rect";

var player = {
    action : null,
    id : 0,
    cmdCom : null,
    pos : null,
    body : null,
}

function GetPlayer(){
    return player;
}

function PressPlayerCmd(cmd = 0) {
    if (cmd == 0) return
    player.cmdCom.val = player.cmdCom.val | cmd;
}

function ReleasePlayerCmd(cmd = 0) {
    if (cmd == 0) return
    player.cmdCom.val = player.cmdCom.val & (cst.COMMAND_ALL_DIRECTION ^ cmd);
}

function CreatePlayer() {
    let unitData = GetData("player");
    let unit = new Entity();
    let pos = GetPosComponent(unit.id, unitData.x, unitData.y);
    let rect = CreateRectDefault(unitData.width, unitData.height, unitData.x, unitData.y);
    let collider = AddBodyCollider(unit.id, rect);

    player.id = unit.id;
    player.pos = pos;
    player.body = collider.rect;
    player.cmdCom = GetCommandComponent(player.id);
    player.collider = collider;
    return player;
}

function CreateBlock() {
    let unitData = GetData("block");
    let unit = new Entity();
    let pos = GetPosComponent(unit.id, unitData.x, unitData.y);
    let rect = CreateRectDefault(unitData.width, unitData.height, unitData.x, unitData.y);
    let collider = AddBlockCollider(unit.id, rect);
    return;
}

export {GetPlayer, PressPlayerCmd, ReleasePlayerCmd, CreatePlayer, CreateBlock}