// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,
 
    properties: {
        moveDuration: 0,
        moveDistance: 0,
        rightBtn: cc.Button,
        leftBtn: cc.Button,
    },
 
    onCollisionEnter(other,self){
        this.health -= 1;
        this.node.parent.getComponent('game').playerLives();
        if(other.tag === 3 && this.health === 0){
            this.node.destroy();
            this.node.parent.getComponent('game').showPopUp();
        }
    },

    onLoad () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.rightBtn.node.on('touchstart',this.onClickRight,this);
        this.leftBtn.node.on('touchstart',this.onClickLeft,this);
        this.health = 3;
    },

    onClickRight : function () {
            if(this.node.x + this.moveDistance < 130){
                cc.tween(this.node)
                    .to(this.moveDuration,{position : cc.v2(this.node.x + this.moveDistance,this.node.y)})
                    .start()
            }
            else{
                cc.tween(this.node)
                    .to(this.moveDuration,{position :cc.v2(130,this.node.y)})
                    .start()
            }
    },

    onClickLeft : function () {
            if(this.node.x - this.moveDistance > -130){
                cc.tween(this.node)
                    .to(this.moveDuration,{position : cc.v2(this.node.x - this.moveDistance,this.node.y)})
                    .start()
            }
            else{
                cc.tween(this.node)
                    .to(this.moveDuration,{position : cc.v2(-130,this.node.y)})
                    .start()
            }
    },

});
