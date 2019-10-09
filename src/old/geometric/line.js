import { NewPos } from "./pos";


/**
 * 基础向量
 */
class Vec {
    constructor(x = 0, y = 0){
        this.x = x;
        this.y = y;
    }
}

function NewVec(x = 0, y = 0){
    return new Vec(x, y);
}

/**
 * TODO 暂定
 */
class D {
    constructor(x = 0, y = 0){
        this.x = x;
        this.y = y;
    }
}

/**
 * 基础线段
 * start = Pos(x, y)
 * distance: 距离系数，注意不是实际距离，只用于比较距离大小
 */
class Line {
    constructor(start = null, end = null, vec = null, distance = null){
        this.start = start;
        this.vec = vec;
        this.end = end;
        this.distance = distance;
    }
}

function NewLineWithVec(x = 0, y = 0, vx = 0, vy = 0){
    return newLine(x, y, vx, vy, x + vx, y + vy);
}

function NewLineWithEnd(x1 = 0, y1 = 0, x2 = 0, y2 = 0){
    return newLine(x1, y1, x2 - x1, y2 - y1, x2, y2);
}

function newLine(x1 = 0, y1 = 0, vx = 0, vy = 0, x2 = 0, y2 = 0){
    if(vx==0 && vy==0){
        return null;
    }
    let distance = (vx * vx) + (vy * vy);
    return new Line(
        NewPos(x1, y1), NewPos(x2, y2), new Vec(vx, vy), distance);
}

function GetDistance(line = null){
    return line.distance;
}


/**
 * 是否平行于x,y轴的线
 */
function IsLineX(line = null){
    return line.vec.y == 0;
}
function IsLineY(line = null){
    return line.vec.x == 0;
}

/**
 * 距离系数
 * 注意，并非实际距离值，因此开根号计算消耗大
 * 若只用于对比大小，此系数即可
 */
function GetDistance(line = null){
    let x = line.vec.x;
    let y = line.vec.y;
    return x*x + y*y;
}

/**
 * 直线一般式方程
 * 公式：
 *  y = kx + b
 *  k = (y2 - y1) / (x2 - x1)
 *  b = y1 - k * x1;
 * 不能垂直于X轴，即 x2==x1
 * 若平行于X轴，即 y2==y1，则y=b，k=0，但此时方程没意义
 */
class FormulaA {
    constructor(line = null, k = 0, b = 0){
        this.line = line;
        this.k = k;
        this.b = b;
    }
}

function NewFormulaA(line = null){
    if(!line || IsLineX(line) || IsLineY(line)){
        return null;
    }
    let k = (y2 - y1) / (x2 - x1);
    let b = y1 - k * x1;
    return new FormulaA(line, k, b);
}

/**
 * 如果k=0，无法求出x
 * 目前在NewFormulaA中已屏蔽此错误
 */
function GetX(formula = null, y = 0){
    return (y - formula.b) / formula.k;
}

function GetY(formula = null, x = 0){
    return formula,k * x + formula.b;
}

export{ NewVec, NewLineWithVec, NewLineWithEnd, GetDistance, NewFormulaA }