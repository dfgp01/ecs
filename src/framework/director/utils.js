import { GetRectStartPos } from '../base/geometric/rect';
import { FixInRect, IsPosInRect, IsRectsCross } from '../base/geometric/utils';
import { getSystemList, runWithScene } from './system/run';
import { initGame } from './world/res'
import { LoadResource } from '../foundation/render/utils';
import { getStageRect } from './world/tile';
import { canvasDrawLine } from '../foundation/render/canvas';
import { GetStartPos, GetEndPos } from '../base/geometric/line';
import { ToLocatePos } from '../base/geometric/point';


//不能越出舞台
function FixInWorld(targetRect = null, unitPos = null){
    FixInRect(getStageRect(), targetRect, unitPos);
}

/**
 * 用于判断目标单位是否在场景内
 */
function IsPosInStage(x = 0, y = 0){
    return IsPosInRect(x, y, getstageRect());
}
function IsRectInStage(targetRect = null){
    return IsRectsCross(targetRect, getstageRect());
}

export {FixInWorld, IsPosInStage, IsRectInStage}