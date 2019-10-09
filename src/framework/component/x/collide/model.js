
class BlockCollider extends Entity {
    constructor(entityId = 0, rect = null){
        super();
        this.entityId = entityId;
        this.rect = rect;
    }
}

class BodyCollider extends Entity {
    constructor(entityId = 0, rect = null){
        super();
        this.entityId = entityId;
        this.rect = rect;
    }
}

export {BlockCollider, BodyCollider}