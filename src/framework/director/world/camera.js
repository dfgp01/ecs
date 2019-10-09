import { NewCamera } from "../../common/camera/utils";

/**
 * 摄像机，全局单例
 */
var camera = null;
function initCamera(cameraData = null, screenData = null){
    let width = cameraData.width ? cameraData.width : screenData.width;
    let height = cameraData.height ? cameraData.height : screenData.height;
    camera = NewCamera(cameraData.x, cameraData.y, width, height);
}
function GetCamera(){
    return camera;
}

export{initCamera, GetCamera}