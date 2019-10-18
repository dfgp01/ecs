import { initSystems } from "../system/run";
import { initCanvas } from "../../foundation/engine/h5/model";
import { onKeyCallback, onMouseCallback } from "../../foundation/engine/h5/processor";
import { NewCamera } from "../../component/camera/utils";
import { createTileMapWithData } from "./adapter";
import { OpenCollider } from "../../component/collide/utils";

/**
 * 通过参数配置初始化系统资源
 */
function initGame(options = null) {

    //引擎初始化
    initCanvas(options.screen.width, options.screen.height, options.fps);

    //注册按键回调
    if(options.keyDownHandler && options.keyUpHanler){
        onKeyCallback(options.keyDownHandler, options.keyUpHanler);
    }
    if(options.mousedownHandler && options.mouseupHandler){
        onMouseCallback(options.mousedownHandler, options.mouseupHandler);
    }
    
    initCamera(options.camera, options.screen);
    initSystems(options.debug);

    //瓷砖地图，舞台
    if(options.tilemap){
        initTile(options.tilemap);
    }

    //开启碰撞系统
    if(options.collide){
        OpenCollider(options.collide);

        // if(options.useTileCombine){
        //     let resultNodes = CreateCombineNodes(tilemap, collide.boxHandler);
        //     resultNodes.forEach(result => {
        //         collide.loadCallback(result.value, result.rect);
        //     });
        // }
    }
}

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


/**
 * 瓷砖地图，舞台，全局单例
 */
var tilemap = null;
function initTile(tilemapData = null){
    tilemap = createTileMapWithData(tilemapData, tilemapData.initHandler);
}
function getTilemap(){
    return tilemap;
}

export{initGame, initCamera, GetCamera, initTile, getTilemap}