class LinkNode {
	constructor(data = null, prep = null, next = null) {
		this.data = data;
		this.prep = prep;
        this.next = next;
        this.id = 0;
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
 * 添加
 * data必须是entity或component
 */
function PushToLink(link = null, data = null) {
    if(!link || !data){
        //log here
        console.error("error param: ", link, data, data.id);
        return
    }
    //不能重复添加
    if(link._map.get(data.id)){
        console.error("error keyId:%d is exist", data.id);
        return
    }
    let p = link.tail.prep;
    let n = link.tail;
    let node = new LinkNode(data, p, n);
    node.id = data.id;
    p.next = node;
    n.prep = node;
    link._map.set(data.id, node);
    link._size++;
    return;
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
    if(link._curr.id == keyId){
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
    link._curr = link.head.next;
	while(link._curr != link.tail){
		if(callback(link._curr.data)){
            break;
        }
		link._curr = node.next;
    }
    while(link._delList.length > 0){
        RemoveByKeyId(link, link._delList.pop());
    }
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

export {Link, LinkNode, NewLink, GetFirst, GetLast, GetLinkData, GetLinkSize, PushToLink, RemoveByKeyId, LinkIterator, LinkCompare}