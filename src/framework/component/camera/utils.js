

/**
 * 代码量少，暂时这样放
 */
class Camera extends Entity {
    constructor(){
        super();
        this.pos = null;
        this.rect = null;
    }
}

function NewCamera(x = 0, y = 0, width = 0, height = 0){
    let camera = new Camera();
    camera.pos = SetPos(camera.id, x, y);
    camera.rect = NewRect(0, 0, width, height);
    UpdateRectPosByUnit(camera.rect, x, y);
    return camera;
}

//目标矩形是否在镜头内
function IsInCamera(camera = null, rect = null){
    return IsRectsCross(camera.rect, rect);
}

//转为镜头坐标x
function ToCameraX(camera = null, x = 0){
    return ToLocateX(x, camera.pos.x);
}
function ToCameraY(camera = null, y = 0){
    return ToLocateY(y, camera.pos.y);
}

/**
 * 镜头移动
 */
function CameraMove(camera = null, x = 0, y = 0){
    SetPos(camera.id, x, y);
    UpdateRectPosByUnit(camera.rect, x, y);
}

export{NewCamera, IsInCamera, ToCameraX, ToCameraY, CameraMove }