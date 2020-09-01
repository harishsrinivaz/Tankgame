
cc.Class({
    extends: cc.Component,

    onCollisionEnter(other,self){
        if(other.tag === 3){
            this.node.parent.getComponent('game').addScore1();
            this.node.destroy();
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.enemyMovements();        
        this.posY = 150;
    }, 
 
    enemyMovements : function(){
        cc.tween(this.node)
            .to(15,{position: cc.v2(this.node.x + 95, this.node.y)}) 
            .to(5,{position: cc.v2(this.node.x + 95, this.node.y - 50)}) 
            .to(15,{position: cc.v2(this.node.x - 5, this.node.y - 50)})     
            .to(5,{position: cc.v2(this.node.x - 5, this.node.y - 100)})  

            .to(15,{position: cc.v2(this.node.x + 95, this.node.y - 100)}) 
            .to(5,{position: cc.v2(this.node.x + 95, this.node.y - 150)}) 
            .to(15,{position: cc.v2(this.node.x - 5, this.node.y - 150)})     
            .to(5,{position: cc.v2(this.node.x - 5, this.node.y - 200)})

            .to(15,{position: cc.v2(this.node.x + 95, this.node.y - 200)}) 
            .to(5,{position: cc.v2(this.node.x + 95, this.node.y - 250)}) 
            .to(15,{position: cc.v2(this.node.x - 5, this.node.y - 250)})     
            .to(5,{position: cc.v2(this.node.x - 5, this.node.y - 300)})

            .to(15,{position: cc.v2(this.node.x + 95, this.node.y - 300)}) 
            .to(5,{position: cc.v2(this.node.x + 95, this.node.y - 250)}) 
            .to(15,{position: cc.v2(this.node.x - 5, this.node.y - 250)})     
            .to(5,{position: cc.v2(this.node.x - 5, this.node.y - 400)})

            .start()
    },

    update (dt){
        if(this.node.y <= -80){
            this.node.destroy();
            this.node.parent.getComponent('game').showPopUp();
        }
    }
});
