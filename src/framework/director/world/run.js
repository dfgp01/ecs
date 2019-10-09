import { initSystems } from "../system/run";
import { initTile } from "./tile";
import { OpenCollider } from "../../common/collide/utils";
import { initCamera } from "./camera";

/**
 * 通过参数配置初始化系统
 */
function initGame(options = null) {

    //引擎初始化
    initCanvas(options.screen.width, options.screen.height, options.fps);

    //注册按键回调，画布
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

export{initGame}