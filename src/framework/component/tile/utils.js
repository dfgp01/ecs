import { GetTilemapStart } from "./tilemap";
import { GetGrid, GetGridData } from "../../foundation/structure/gridmap";

function IteratorTileMap(tilemap = null, callback = null){
    IteratorGridmap(tilemap.gridmap, callback);
}

/**
 * 移动tilemap
 */
function MoveTilemap(tilemap = null, x = 0, y = 0){
    tilemap.pos.x = x;
    tilemap.pos.y = y;
}

/**
 * 根据目标现在位置，求当前所在的grid的相关坐标点
 */
function GetTilemapGrid(tilemap = null, targetPos = null){
    let locatePos = ToLocatePos(targetPos, GetTilemapStart(tilemap));
    return GetGrid(tilemap.gridmap, locatePos.x, locatePos.y);
}

function GetTilemapGridData(tilemap = null, x = 0, y = 0){
    let locatePos = ToLocatePos(targetPos, GetTilemapStart(tilemap));
    return GetGridData(tilemap.gridmap, locatePos.x, locatePos.y);
}

export{IteratorTileMap, MoveTilemap, GetTilemapGrid, GetTilemapGridData}