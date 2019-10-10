import { NewPos } from "../../foundation/geometric/point";
import { GetGridMapWidth, GetGridMapHeight, NewGridMap, GetGridWidth, GetGridHeight } from "../../foundation/structure/gridmap";

/**
 * 2d瓷砖地图，由GridMap扩展
 * sample:
 * [
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
]
 */
class TileMap {
    constructor(gridmap = null, x = 0, y = 0){
        this.gridmap = gridmap;
        this.pos = NewPos(x, y);
    }
}

function NewTileMap(rows = 0, columns = 0, gridWidth = 0, gridHeight = 0, x = 0, y = 0){
    let gridmap = NewGridMap(rows, columns, gridWidth, gridHeight);
    return new TileMap(gridmap, x, y);
}

function GetTilemapStart(tilemap = null){
    return NewPos(
        tilemap.pos.x - GetGridMapWidth(tilemap.gridmap) * 0.5,
        tilemap.pos.y - GetGridMapHeight(tilemap.gridmap) * 0.5
    );
}

function GetTilemapEnd(tilemap = null){
    return NewPos(
        tilemap.pos.x + GetGridMapWidth(tilemap.gridmap) * 0.5,
        tilemap.pos.y + GetGridMapHeight(tilemap.gridmap) * 0.5
    );
}

function GetTilemapCenter(tilemap = null){
    return NewPos(tilemap.pos.x, tilemap.pos.y);
}

function GetGridStart(tilemap = null, grid = null){
    let start = GetTilemapStart(tilemap);
    return NewPos(
        start.x + GetGridWidth(tilemap.gridmap) * grid.colIndex,
        start.y + GetGridHeight(tilemap.gridmap) * grid.rowIndex
    );
}

function GetGridEnd(tilemap = null, grid = null){
    let start = GetTilemapStart(tilemap);
    return NewPos(
        start.x + GetGridWidth(tilemap.gridmap) * (grid.colIndex + 1),
        start.y + GetGridHeight(tilemap.gridmap) * (grid.rowIndex + 1)
    );
}

function GetGridCenter(tilemap = null, grid = null){
    let start = GetTilemapStart(tilemap);
    return NewPos(
        start.x + GetGridWidth(tilemap.gridmap) * (grid.colIndex + 0.5),
        start.y + GetGridHeight(tilemap.gridmap) * (grid.rowIndex + 0.5)
    );
}

export {
    NewTileMap, GetTilemapStart, GetTilemapEnd, GetTilemapCenter, 
    GetGridWithPos, GetGridStart, GetGridEnd, GetGridCenter
}

/**
 * 找出与rect相交的所有grid
 * TODO 未定，可能不需要这种做法
 */
function GetGridsByRect(tileMap = null, rect = null){
    //是否在tilemap中
    if(!IsRectCross(tileMap.rect, rect)){
        return null;
    }
    let grids = [];
    let posStart = rect.posStart;
    let columnStart = parseInt(posStart.x / tileMap.gridWidth);
    let rowStart = parseInt(posStart.y / tileMap.gridHeight);
    columnStart = columnStart < 0 ? 0 : columnStart;
    rowStart = rowStart < 0 ? 0 : rowStart;

    let posEnd = rect.posEnd;
    let columnEnd = parseInt(posEnd.x / tileMap.gridWidth);
    let rowEnd = parseInt(posEnd.y / tileMap.gridHeight);
    columnEnd = columnEnd > tileMap.columns - 1 ? tileMap.columns - 1 : columnEnd;
    rowEnd = rowEnd > tileMap.rows - 1 ? tileMap.rows - 1 : rowEnd;

    for(let row=rowStart; row<=rowEnd; row++){
        for(let column=columnStart; column<=columnEnd; column++){
            grids.push(tileMap.grids[row][column]);
        }
    }
    return grids;
}