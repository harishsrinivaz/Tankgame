

cc.Class({
    extends: cc.Component,

    onCollisionEnter(other,self){
        if(other.tag == 3){
            this.node.parent.getComponent('game').playExplosionSoundEffect2();
            this.node.destroy(); 
        }
    },

    onLoad () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },

});
