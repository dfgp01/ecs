
 /**
  * gridmap的网格单元
  */
class Grid {
    constructor(rowIndex = 0, colIndex = 0, data = null){
        this.rowIndex = rowIndex;
        this.colIndex = colIndex;
        this.data = data;       //存储的对象
    }
}

/**
 * 网格表
 * rows = 行数
 * columns = 列数
 * gridWidth, gridHeight = 每个网格的宽高范围，建议1:1
 * 
 */
class GridMap {
    constructor(rows = 0, columns = 0, gridWidth = 0, gridHeight = 0, grids = null){
        this.rows = rows;
        this.columns = columns;
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.grids = grids;
    }
}

function NewGridMap(rows = 0, columns = 0, gridWidth = 0, gridHeight = 0){
    let grids = [];
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
        for (let colIndex = 0; colIndex < columns; colIndex++) {
            let grid = new Grid(rowIndex, colIndex);
            grids.push(grid);
        }
    }
    return new GridMap(rows, columns, gridWidth, gridHeight, grids);
}

function GetGridWidth(gridmap = null){
    return gridmap.gridWidth;
}
function GetGridHeight(gridmap = null){
    return gridmap.gridHeight;
}
function GetGridMapWidth(gridmap = null){
    return gridmap.columns * gridmap.gridWidth;
}
function GetGridMapHeight(gridmap = null){
    return gridmap.rows * gridmap.gridHeight;
}

/**
 * 根据位置定位grid
 * x, y是gridmap左上角开始算
 */
function GetGrid(gridmap = null, x = 0, y = 0){
    if(!checkIn(gridmap, x, y)){
        return null;
    }
    let column = parseInt(x / gridmap.gridWidth);
    let row = parseInt(y / gridmap.gridHeight);
    return gridmap.grids[row * gridmap.columns + column];
}

function checkIn(gridmap = null, x = 0, y = 0){
    return x > 0 && x < GetGridMapWidth(gridmap) && y > 0 && y < GetGridMapHeight(gridmap);
}

function IteratorGridmap(gridmap = null, callback = null){
    gridmap.grids.forEach(grid => {
        callback(grid);
    });
}

function GetGridData(gridmap = null, x = 0, y = 0){
    let grid = GetGrid(gridmap, x, y);
    return grid ? grid.data : null;
}

export {
    NewGridMap, GetGridWidth, GetGridHeight, GetGridMapWidth, GetGridMapHeight, GetGrid, IteratorGridmap, GetGridData
}