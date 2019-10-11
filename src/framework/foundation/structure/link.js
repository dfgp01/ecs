class LinkNode {
	constructor(data = null, prep = null, next = null) {
		this.data = data;
		this.prep = prep;
        this.next = next;
	}
}

class Link {
	constructor() {
		this.head = new LinkNode();		//empty data node
		this.tail = new LinkNode();
		this.head.next = this.tail;
		this.tail.prep = this.head;
		this._map = new Map();
		this._size = 0;
        this._delList = [];
        this._curr = this.head;
        this._lock = false;
	}
}

function NewLink(){
    return new Link();
}


/**
 * 获取
 */
function GetLinkData(link = null, keyId = 0, required = false){
    if(!link) {
        console.error("link is null.");
        return
    }
    let node = link._map.get(keyId);
    if(node){
        return node.data;
    }
    if(required){
        console.error("can't find keyId: ", keyId);
    }
    return null;
}

function GetLinkSize(link = null){
    if(!link) {
        //log here
        return
    }
    return link._size;
}

/**
 * 添加到末尾
 */
function PushToLink(link = null, data = null) {
    return addToLink(link, data, link.tail);
}

/**
 * 插入到列表中
 * data.priority顺序号，由大到小排序，默认为0
 */
function InsertToLink(link = null, data = null){
    let priority = data && data.priority ? data.priority : 0;
    let node = link.head.next;
	while(node != link.tail){
        if(priority > node.data.priority){
            break;
        }
		node = node.next;
    }
    return addToLink(link, data, node);
}

function addToLink(link = null, data = null, next = null){
    if(!link || !data || !data.id){
        //log here
        console.error("error param: ", link, data, data.id);
        return null;
    }
    //不能重复添加
    if(link._map.get(data.id)){
        console.error("error id:%d is exist", data.id);
        return null;
    }
    //新节点连接
    let prep = next.prep;
    let node = new LinkNode(data, prep, next);
    prep.next = node;
    next.prep = node;

    link._map.set(data.id, node);
    link._size++;
    return node;
}

/**
 * 删除
 */
function RemoveByKeyId(link = null, keyId = 0){
    if(!link || keyId==0) {
        //log here
        console.error("error param: ", link, keyId);
        return
    }
    if(link._lock){
        link._delList.push(keyId);
        return;
    }
    remove(link, keyId);
}

function remove(link = null, keyId = 0){
    let node = link._map.get(keyId);
    if(!node){
        //log here
        return
    }
    link._map.delete(keyId);
    let p = node.prep;
    let n = node.next;
    p.next = n;
    n.prep = p;
    link._size--;
}

/**
 * 轮询, callback = function(<? extends entity>){}
 */
function LinkIterator(link = null, callback = null){
    if(!link || !callback) {
        //log here
        return
    }
    link._lock = true;
    let node = link.head.next;
	while(node != link.tail){
		if(callback(node.data)){
            break;
        }
		node = node.next;
    }
    while(link._delList.length > 0){
        remove(link, link._delList.pop());
    }
    link._lock = false;
}

function GetFirst(link = null){
    if(!link) {
        //log here
        return
    }
    let node = link.head.next;
    if(node){
        return node.data
    }
    return null;
}

function GetLast(link = null){
    if(!link) {
        //log here
        return
    }
    let node = link.tail.prep;
    if(node){
        return node.data
    }
    return null;
}

/**
 * 将列表中的元素两两对比，callback = function(<? extends entity or component> front, next){}
 */
function LinkCompare(link = null, callback = null){
    if(!link || !callback) {
        //log here
        return
    }
    link._lock = true;
    let outNode = link.head.next;
    while(outNode != link.tail){
        let inNode = outNode.next;
        while(inNode != link.tail){
            callback(outNode.data, inNode.data);
            inNode = inNode.next;
        }
        outNode = outNode.next;
    }
    link._lock = false;
    link._delList.forEach(keyId => {
        RemoveByKeyId(link, keyId);
    });
}

export {Link, LinkNode, NewLink, GetFirst, GetLast, GetLinkData, GetLinkSize, PushToLink, InsertToLink, RemoveByKeyId, LinkIterator, LinkCompare}