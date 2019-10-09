import { NewPos } from "../point";

/**
 * 已知直线上的两点P1(X1,Y1)和P2(X2,Y2)，P1和P2两点不重合，对于AX+BY+C=0，则有:
 * A=Y2-Y1
 * B=X1-X2
 * C=X2*Y1-X1*Y2
 * 
 * 推导：https://baike.baidu.com/item/%E7%9B%B4%E7%BA%BF%E7%9A%84%E4%B8%80%E8%88%AC%E5%BC%8F%E6%96%B9%E7%A8%8B
 */
class FormulaC {
    constructor(a = 0, b = 0, c = 0){
        this.a = a;
        this.b = b;
        this.c = c;
    }
}

function newFormulaC(line = null){
    let y2 = line.end.y;
    let y1 = line.start.y;
    let x2 = line.end.x;
    let x1 = line.start.x;
    
    let a = y2 - y1;
    let b = x1 - x2;
    let c = x2 * y1 - x1 * y2;
    return new FormulaC(a, b, c);
}

/**
 * 求两直线交点
 * 用直线一般方程式
 */
function interSectionPos(formula1 = null, formula2 = null){
    let a1 = formula1.a;
    let b1 = formula1.b;
    let c1 = formula1.c;
    let a2 = formula2.a;
    let b2 = formula2.b;
    let c2 = formula2.c;

    let m = a1 * b2 - a2 * b1
    if(m == 0){
        //无交点
        return null;
    }
    let x = (c2 * b1 - c1 * b2) / m;
    let y = (c1 * a2 - c2 * a1) / m;
    return NewPos(x, y);
}

export{newFormulaC, interSectionPos}