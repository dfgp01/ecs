
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
    constructor(k = 0, b = 0){
        this.k = k;
        this.b = b;
    }
}
function newFormulaA(line = null){
    if(line.vec.y == 0 || line.vec.x == 0){
        return null;
    }
    let y2 = line.end.y;
    let y1 = line.start.y;
    let x2 = line.end.x;
    let x1 = line.start.x;
    let k = (y2 - y1) / (x2 - x1);
    let b = y1 - k * x1;
    return new FormulaA(k, b);
}

/**
 * 根据y值计算x值
 * 若没有方程，即为平行于y轴直线，直接返回x，此处不判定x是否在直线上
 */
function GetX(line = null, y = 0){
    let formula = line.formula;
    return !formula ? line.start.x : (y - formula.b) / formula.k;
}

/**
 * 根据x值计算y值
 * 若没有方程，即为平行于x轴直线，直接返回y，此处不判定y是否在直线上
 */
function GetY(line = null, x = 0){
    let formula = line.formula;
    return !formula ? line.start.y : formula,k * x + formula.b;
}