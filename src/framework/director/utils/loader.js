import { createSpriteFrame } from "../../foundation/structure/frame";

/**
 * 加载资源，创建精灵帧
 * textures : [
 *          {
 *              img : "res/a.png",
 *              frames : [
 *                  {
 *                      name : "walk1"
 *                      textureArea : {
 *                          x : 0,
 *                          y : 0,
 *                          width : 0,
 *                          height : 0
 *                      }
 *                  }
 *              ]
 *          }
 *      ],
 */
function LoadResource(texturesData = null, OnloadCallback = null, OnCompleteCallback = null){
    //加载图像并创建显示帧
    if(!texturesData || texturesData.length == 0){
        return;
    }
    let _count = 0;
    texturesData.forEach(t =>{
        loadImg(t.img, (bitmapData)=>{
            t.frames.forEach(frameData => {
                createSpriteFrameWithData(frameData.name, bitmapData, frameData.textureArea);
            });
            _count++;
            if(OnloadCallback){
                OnloadCallback(_count);
            }
            if(texturesData.length == _count && OnCompleteCallback){
                OnCompleteCallback();
            }
        });
    });
}

/**
 * 创建精灵帧
 */
function createSpriteFrameWithData(name = "", bitmapData = null, textureAreaData = null){
    if(name=="" || !bitmapData || !textureAreaData){
        return null;
    }
    let width = textureAreaData['width'];
    let height = textureAreaData['height'];
    if(!width || !height){
        return null;
    }
    return createSpriteFrame(name, bitmapData, textureAreaData['x'], textureAreaData['y'], width, height);
}

export{LoadResource}