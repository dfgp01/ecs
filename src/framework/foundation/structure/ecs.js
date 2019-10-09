
/**
*   The Base Struct
*	尽管我们只需要NewEntityId()，但是所有需要id的类都要继承此类
*/
class Entity {
	constructor() {
		this.id = NewEntityId();
	}
}

var id = 1;
function NewEntityId(){
	return id++;
}

/**
*	The base Component
*	每个entity对每种组件只能持有一个
*/
class Component {
	constructor(entityId = 0) {
		this.entityId = entityId;
		this.id = entityId;			//给link使用
	}
}

/**
 * 基础元件
 */
class Tuple {
	constructor(priority = 0){
		this.priority = priority;	//给link使用
		this.id = NewEntityId();	//给link使用
	}
}

/**
*	The base System
*/
class System {
    onStart(){}
    onUpdate(dt = 0){}
    onEnd(){}
}

export {Entity, Component, Tuple, System}