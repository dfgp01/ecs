import { NewPos, NewVecWithPos, GetDistance } from "./point";
import { newFormulaC } from "./formula/abc";

/**
 * 基础线段
 * start = Pos(x, y)
 * end = Pos(x, y)
 */
class Line {
    constructor(start = null, vec = null){
        this.start = start;
        this.vec = vec;
        this.end = NewPos(start.x + vec.x, start.y + vec.y);
        this.formula = null;
    }
}

function NewLineWithVec(x = 0, y = 0, vx = 0, vy = 0){
    let vec = NewVec(vx, vy);
    return newLine(x, y, vec);
}

function NewLineWithPos(x1 = 0, y1 = 0, x2 = 0, y2 = 0){
    let vec = NewVecWithPos(x1, y1, x2, y2);
    return newLine(x1, y1, vec);
}

function newLine(x = 0, y = 0, vec = null){
    if(GetDistance(vec) == 0){
        return null;
    }
    let line = new Line(NewPos(x, y), vec);
    let formula = newFormulaC(line);
    line.formula = formula;
    return line;
}

/**
 * 基础属性 
 */
function GetStartPos(line = null){
    return line.start;
}
function GetEndPos(line = null){
    return line.end;
}
function GetVec(line = null){
    return line.vec;
}

export{ NewLineWithVec, NewLineWithPos, 
    GetStartPos, GetEndPos, GetVec}