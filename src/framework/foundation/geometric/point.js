/**
 * 基础2D坐标
 */
class Pos {
    constructor(x = 0, y = 0){
        this.x = x;
        this.y = y;
    }
}

function NewPos(x = 0, y = 0){
    return new Pos(x, y);
}

/**
 * 计算相对坐标
 * 以targetPos为准，计算referPos于targetPos的相对坐标
 * 举例：
 *      摄像机位于(50, 50)处，referPos
 *      单位A位于(120, 30)处，targetPos
 *      那么，单位A在摄像机的(120-50, 30-50)处
 */
function ToLocatePos(targetPos = null, referPos = null){
    return NewPos(
        targetPos.x - referPos.x,
        targetPos.y - referPos.y);
}

// function ToLocateX(targetX = 0, referX = 0){
//     return targetX - referX;
// }

// function ToLocateY(targetY = 0, referY = 0){
//     return targetY - referY;
// }


/**
 * 基础向量
 * distance: 距离系数，注意不是实际距离，只用于比较距离大小
 */
class Vec {
    constructor(x = 0, y = 0){
        this.x = x;
        this.y = y;
        this.distance = x * x + y * y;
    }
}

function NewVec(x = 0, y = 0){
    return new Vec(x, y);
}

function NewVecWithPos(x1 = 0, y1 = 0, x2 = 0, y2 = 0){
    return new NewVec(x2 - x1, y2 - y1);
}

/**
 * 距离系数
 * 注意，并非实际距离值，因为开根号计算消耗大
 * 若只用于对比大小，此系数即可
 */
function GetDistance(vec = null){
    return vec.distance;
}

export {NewPos, ToLocatePos,
    NewVec, NewVecWithPos, GetDistance}