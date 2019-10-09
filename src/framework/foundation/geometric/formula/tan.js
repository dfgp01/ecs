
/**
 * 利用tan求得斜率比例，
 *  tan = 对边/邻边，即vec.y/vec.x
 */
class FormulaB {
    constructor(tan = 0){
        this.tan = tan;
    }
}
function newFormulaB(line = null){
    if(line.vec.y == 0 || line.vec.x == 0){
        return null;
    }
    let tan = line.vec.y / line.vec.x;
    return new FormulaB(tan);
}

/**
 * 根据y值计算x值
 * 若没有方程，即为平行于y轴直线，直接返回x，此处不判定x是否在直线上
 */
function GetX(line = null, y = 0){
    let formula = line.formula;
    return !formula ? line.start.x : y / formula.tan;
}

/**
 * 根据x值计算y值
 * 若没有方程，即为平行于x轴直线，直接返回y，此处不判定y是否在直线上
 */
function GetY(line = null, x = 0){
    let formula = line.formula;
    return !formula ? line.start.y : x * formula.tan;
}