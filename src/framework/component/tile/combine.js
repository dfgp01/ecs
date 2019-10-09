import { CreateRectNormal } from "../base/rect";


/**
 * 寻找最大矩形算法，合并矩形
 */

class GirdNode {
    constructor(val = 0){
        this.val = val;
        this._isVisited = false;
        this.width = 0;
        this.height = 0;
        this.maxWidth = 0;
        this.maxHeight = 0;
        this.total = 0;
    }
}

class ResultNode {
    constructor(value = 0, rect = null){
        this.value = value;
        this.rect = rect;
    }
}

class Box {
    constructor(tilemap = null){
        this.tilemap = tilemap;
        this.nodes = [];
        this.results = [];
    }
}

//无效节点，避免遍历时下标越界
var InvaildNode = new GirdNode(0);
function getNode(box = null, rowIndex = 0, columnIndex = 0){
    if(columnIndex >= box.tilemap.columns || rowIndex >= box.tilemap.rows){
        return InvaildNode;
    }
    return box.nodes[rowIndex][columnIndex];
}

/**
 * 递归遍历节点，每节点只计算一次
 */
function iteratorNode(box = null, rowIndex = 0, columnIndex = 0){
    let node = getNode(box, rowIndex, columnIndex);
    if(node._isVisited){
        return node;
    }
    node._isVisited = true;
    
    //优先向下遍历，获得高度权，再向右遍历，获得宽度权以及计算最大矩形面积
    let downNode = iteratorNode(rowIndex + 1, columnIndex);
    let rightNode = iteratorNode(rowIndex, columnIndex + 1);

    //空节点无需计算
    if(node.val==0){
        return node;
    }

    node.height = node.val == downNode.val ? downNode.height + 1 : 1;
    node.width = node.val == rightNode.val ? rightNode.width + 1 : 1;

    getMax(node, rowIndex, columnIndex);
    //console.log('[%d, %d], total: %d, mw: %d, mh: %d, w: %d, h: %d', rowIndex, columnIndex, node.total, node.maxWidth, node.maxHeight, node.width, node.height);
    return node;
}

var MaxNode = InvaildNode;
var RowIndex = 0;
var ColumnIndex = 0;

/**
 * 找出最大权，演变顺序：
 *      设有高度列表：a=[11,4,5,5,3,2,1,2]
 *      从a[7]=2处开始计算，算得该节点最大矩形=1x1
 *      到a[6]=1处计算，由于a[6]<a[6+1]，算得最大矩形=1x2
 *      继续a[5]=2，a[5]>a[5+1]，首先算出a[5]最大矩形=1*5，然后将a[5]=[5+1]=1，由于a[6]最大矩形=1x2，所以a[5]最大矩形为 max(1+1x2, 1*5)
 *      依次类推a[1]=4处，由于a[1]<a[2]<a[3]>a[4]，因此最大矩形为 max(4*3, 3*4, 2*5, 1*7)
*/
function getMax(currNode = null, rowIndex = 0, columnIndex = 0){
    //注意初始化此值，以免下次遍历时数值逻辑错误
    currNode.total = 0;
    let minHeight = currNode.height;
    let widthDx = 1;

    while(minHeight){
        let rightNode = getNode(rowIndex, columnIndex + widthDx);
        //深度优先，从最大深度开始探索最大合并矩形
        if(minHeight > rightNode.height){
            let total = minHeight * widthDx;
            if(total > currNode.total){
                currNode.total = total;
                currNode.maxWidth = widthDx;
                currNode.maxHeight = minHeight;
            }
            minHeight = rightNode.height;
            if(minHeight == rightNode.maxHeight){
                //已达最优解，无需继续向右探索
                total = minHeight * (widthDx + rightNode.maxWidth);
                if(total > currNode.total){
                    currNode.total = total;
                    currNode.maxWidth = widthDx + rightNode.maxWidth;
                    currNode.maxHeight = minHeight;
                }
                break;
            }
        }
        widthDx++;
    }

    //当前是否最大矩形
    if(currNode.total > MaxNode.total){
        MaxNode = currNode;
        RowIndex = rowIndex;
        ColumnIndex = columnIndex;
    }
}

function getRect(tilemap = null){
    let width = MaxNode.maxWidth * tilemap.gridWidth;
    let height = MaxNode.maxHeight * tilemap.gridHeight;
    let x = tilemap.pos.x + ColumnIndex * tilemap.gridWidth;
    let y = tilemap.pos.y + RowIndex * tilemap.gridHeight;
    let rect = CreateRectNormal(0, 0, width, height, x, y);
    return rect;
}

function clearNodeData(node = null){
    node.val = 0;
    node.total = 0;
    node.maxWidth = 0;
    node.maxHeight = 0;
    node.width = 0;
    node.height = 0;
}

/**
 * callback = function(Grid) return uint
 * 若不想参与合并box-rect，callback返回0即可
 */
function CreateCombineNodes(tilemap = null, boxHandler = null){
    MaxNode = null;

    let b = new Box(tilemap);
    //init nodes[][]
    for(let i=0; i<tilemap.rows; i++){
        let arr = [];
        for(let j=0; j<tilemap.columns; j++){
            let grid = tilemap.grids[i][j];
            let val = boxHandler(grid.value, grid.data);
            arr.push(new GirdNode(val));
        }
        b.nodes.push(arr);
    }

    while(MaxNode != InvaildNode){
        MaxNode = InvaildNode;
        iteratorNode(b, 0, 0);
        
        if(MaxNode != InvaildNode){
            b.results.push(new ResultNode(MaxNode.val, getRect(b.tilemap)));
            //clear data
            for(let i = RowIndex; i<RowIndex + MaxNode.maxHeight; i++){
                for(let j = ColumnIndex; j<ColumnIndex + MaxNode.maxWidth; j++){
                    clearNodeData(b.nodes[i][j]);
                }
            }
            //reset node
            for(let i=0; i<b.nodes.length; i++){
                for(let j=0; j<b.nodes[i].length; j++){
                    let node = b.nodes[i][j];
                    node._isVisited = false;
                }
            }
        }
    }
    return b.results;
}

export {CreateCombineNodes}