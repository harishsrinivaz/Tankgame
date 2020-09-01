
cc.Class({
    extends: cc.Component,

    onCollisionEnter (other,self) {
        if(other.tag === 2 || other.tag === 1 || other.tag === 3 || other.tag === 5){
            this.node.parent.getComponent('game').animation(this.node);
            if(other.tag !== 2){
                this.node.parent.getComponent('game').playExplosionSoundEffect1();
           }
            this.node.destroy();
        }
    },

    onLoad () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },

   selfDestroy : function(){
       return this.node.destroy();
   }

});
