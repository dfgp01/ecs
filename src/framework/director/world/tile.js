import { CreateTileMapWithData } from "../../foundation/tile/utils";

/**
 * 瓷砖地图，舞台
 */
var tilemap = null;
function initTile(tilemapData = null){
    tilemap = CreateTileMapWithData(tilemapData, tilemapData.initHandler);
}

function getTilemap(){
    return tilemap;
}

export {initTile, getTilemap}