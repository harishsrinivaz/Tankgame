
cc.Class({
    extends: cc.Component,

    properties: {
        playerBulletPrefab : {
            default: null,
            type: cc.Prefab
        },
        defense : {
            default: null,
            type: cc.Prefab
        },

        player: {
            default: null,
            type: cc.Node
        },
        background: {
            default: null,
            type: cc.Node
        },      
        firstEnemyPrefab : {
            default: null,
            type: cc.Prefab
        },
        secondEnemyPrefab : {
            default: null,
            type: cc.Prefab
        },
        thirdEnemyPrefab : {
            default: null,
            type: cc.Prefab
        },
        enemyBulletPrefab :{
            default: null,
            type: cc.Prefab
        },
        livesNode:{
            default: null,
            type: cc.Node
        },
        livesDisplay:{
            default: null,
            type: cc.Label
        },
        scoreNode:{
            default: null,
            type: cc.Node
        },
        scoreDisplay:{
            default: null,
            type: cc.Label
        },
        gameOver:{
            default: null,
            type: cc.Node
        },
        retry:{
            default: null,
            type: cc.Node
        },
        explosionNode:{
            default: null,
            type: cc.Node
        },
        explosionAnimation:{
            default: null,
            type: cc.Animation
        },
        firingSoundEffect:{
            default: null,
            type: cc.AudioClip
        },
        explosionSoundEffect1:{
            default: null,
            type: cc.AudioClip
        },
        explosionSoundEffect2:{
            default: null,
            type: cc.AudioClip
        },
        bulletDuration : 0 
    },
    
    onLoad () {
        this.score = 0;
        this.lives = 3;
        this.playerBulletIndex = 0;
        this.firstEnemyBulletIndex = 0;
        this.secondEnemyBulletIndex = 0;
        this.thirdEnemyBulletIndex = 0;
        this.playerBullet = [];
        this.firstEnemyBullet = [];
        this.secondEnemyBullet = [];
        this.thirdEnemyBullet = [];
        this.isFirstEnemyCreated = false;
        this.isSecondEnemyCreated = false;
        this.isThirdEnemyCreated = false;
        this.screenX = cc.view.getVisibleSize().width/2;
        this.screenY = cc.view.getVisibleSize().height/2;
        this.livesNode.setPosition(-this.screenX + 60, this.screenY -30);
        this.scoreNode.setPosition(this.screenX - 60, this.screenY -30);
        this.createDefense();
        this.createFirstEnemy(this.firstEnemyPrefab,130);
        this.createSecondEnemy(this.secondEnemyPrefab,180);
        this.createThirdEnemy(this.thirdEnemyPrefab,240);
        this.background.on('touchstart',this.createPlayerBullets,this);
        this.retry.on('touchstart',this.retryClicked,this);
        this.schedule(this.firstEnemyRandomFiring,3);
        this.schedule(this.secondEnemyRandomFiring,4);
        this.schedule(this.thirdEnemyRandomFiring,5);

    },

    createDefense : function(){
        this.newDefensePositionX = -130;
        var count = 1; 
        do{
            if(count%3 !== 0){
                var newDefense = cc.instantiate(this.defense);
                newDefense.setPosition(this.newDefensePositionX,-140);
                newDefense.parent = this.node;
            }
            else{
                var newDefense = cc.instantiate(this.defense);
                newDefense.setPosition(this.newDefensePositionX-45,-110);
                newDefense.parent = this.node;
                this.newDefensePositionX += 30;
            }
            this.newDefensePositionX += 30;
            count++;
        } while(this.newDefensePositionX <= 180);    
    },

    createFirstEnemy : function(enemyPrefab,enemyPosY){
        this.firstEnemyPool = [];
        this.newEnemyPositionX = -130;
        for (let i = 0; i < 5; i++) {
                this.firstEnemyPool[i] = cc.instantiate(enemyPrefab); 
                this.firstEnemyPool[i].setPosition(this.newEnemyPositionX, enemyPosY);
                this.firstEnemyPool[i].parent = this.node;
                this.newEnemyPositionX += 44;
                this.isFirstEnemyCreated = true;
        }
    },

    createSecondEnemy : function(enemyPrefab,enemyPosY){
        this.secondEnemyPool = [];
        this.newEnemyPositionX = -130;
        for (let i = 0; i < 5; i++) {
                this.secondEnemyPool[i] = cc.instantiate(enemyPrefab); 
                this.secondEnemyPool[i].setPosition(this.newEnemyPositionX, enemyPosY);
                this.secondEnemyPool[i].parent = this.node;
                this.newEnemyPositionX += 44;
                this.isSecondEnemyCreated = true;
        }
    },

    createThirdEnemy : function(enemyPrefab,enemyPosY){
        this.thirdEnemyPool = [];
        this.newEnemyPositionX = -130;
        for (let i = 0; i < 5; i++) {
                this.thirdEnemyPool[i] = cc.instantiate(enemyPrefab); 
                this.thirdEnemyPool[i].setPosition(this.newEnemyPositionX, enemyPosY);
                this.thirdEnemyPool[i].parent = this.node;
                this.newEnemyPositionX += 44;
                this.isThirdEnemyCreated = true;
        }
    },

    createFirstEnemyBullets : function(enemy){
        if(this.isFirstEnemyCreated){
            this.enemyPosX = this.firstEnemyPool[enemy].x;
            this.enemyPosY = this.firstEnemyPool[enemy].y;
            this.firstEnemyBullet[this.firstEnemyBulletIndex] = cc.instantiate(this.enemyBulletPrefab);
            this.firstEnemyBullet[this.firstEnemyBulletIndex].setPosition(this.enemyPosX,this.enemyPosY - 30);
            this.firstEnemyBullet[this.firstEnemyBulletIndex].parent = this.node;
            cc.tween(this.firstEnemyBullet[this.firstEnemyBulletIndex]).to(10,{position: cc.v2(this.enemyPosX,-350)}).start();
            cc.audioEngine.playEffect(this.firingSoundEffect,false);   
            this.firstEnemyBulletIndex++;         
        }
    },

    createSecondEnemyBullets : function(enemy){
        if(this.isSecondEnemyCreated){
            this.enemyPosX = this.secondEnemyPool[enemy].x;
            this.enemyPosY = this.secondEnemyPool[enemy].y;
            this.secondEnemyBullet[this.secondEnemyBulletIndex] = cc.instantiate(this.enemyBulletPrefab);
            this.secondEnemyBullet[this.secondEnemyBulletIndex].setPosition(this.enemyPosX,this.enemyPosY - 30);
            this.secondEnemyBullet[this.secondEnemyBulletIndex].parent = this.node;
            cc.tween(this.secondEnemyBullet[this.secondEnemyBulletIndex]).to(10,{position: cc.v2(this.enemyPosX,-350)}).start();
            cc.audioEngine.playEffect(this.firingSoundEffect,false);        
            this.secondEnemyBulletIndex++;    
        }
    },

    createThirdEnemyBullets : function(enemy){
        if(this.isThirdEnemyCreated){
            this.enemyPosX = this.thirdEnemyPool[enemy].x;
            this.enemyPosY = this.thirdEnemyPool[enemy].y;
            this.thirdEnemyBullet[this.thirdEnemyBulletIndex] = cc.instantiate(this.enemyBulletPrefab);
            this.thirdEnemyBullet[this.thirdEnemyBulletIndex].setPosition(this.enemyPosX,this.enemyPosY - 30);
            this.thirdEnemyBullet[this.thirdEnemyBulletIndex].parent = this.node;
            cc.tween(this.thirdEnemyBullet[this.thirdEnemyBulletIndex]).to(10,{position: cc.v2(this.enemyPosX,-350)}).start();
            cc.audioEngine.playEffect(this.firingSoundEffect,false);   
            this.thirdEnemyBulletIndex++;         
        }
    },

    firstEnemyRandomFiring : function(){
        var enemy = Math.floor(Math.random() * 5);
            if(this.firstEnemyPool[enemy]._name !== ""){
                this.createFirstEnemyBullets(enemy);
            }
    },

    secondEnemyRandomFiring : function(){
        var enemy = Math.floor(Math.random() * 5);
            if(this.secondEnemyPool[enemy]._name !== ""){
                this.createSecondEnemyBullets(enemy);
            }
    },

    thirdEnemyRandomFiring : function(){
        var enemy = Math.floor(Math.random() * 5);
            if(this.thirdEnemyPool[enemy]._name !== ""){
                this.createThirdEnemyBullets(enemy);
            }
    },

    createPlayerBullets : function(){
        this.playerBullet[this.playerBulletIndex] = cc.instantiate(this.playerBulletPrefab);
        this.playerBullet[this.playerBulletIndex].setPosition(this.player.x,-185);
        this.playerBullet[this.playerBulletIndex].parent = this.node;
        cc.tween(this.playerBullet[this.playerBulletIndex])
            .to(this.bulletDuration,{position: cc.v2(this.player.x,this.screenY )})
            .start();
        cc.audioEngine.playEffect(this.firingSoundEffect,false);   
        this.playerBulletIndex++;         
    },

    addScore1 : function(){
        this.score += 1;
        this.scoreDisplay.string = "SCORE : "+this.score;
    },
    
    addScore2 : function(){
        this.score += 2;
        this.scoreDisplay.string = "SCORE : "+this.score;
    },

    addScore3 : function(){
        this.score += 3;
        this.scoreDisplay.string = "SCORE : "+this.score;
    },

    playerLives : function(){
        this.lives -= 1;
        this.livesDisplay.string = "LIVES : "+this.lives;
    },

    destroyEnemy : function(node){
        for(let i=0; i<5; i++){
            if(node[i]._name !== ""){
                node[i].destroy();
            }
        }
    },

    destroyBullets : function(node){
        for(let i=0; i<node.length; i++){
            if(node[i]._name !== ""){
                node[i].destroy();
            }
        }
    },

    showPopUp : function(){
        this.destroyEnemy(this.firstEnemyPool);
        this.destroyEnemy(this.secondEnemyPool);
        this.destroyEnemy(this.thirdEnemyPool);
        this.destroyBullets(this.firstEnemyBullet);
        this.destroyBullets(this.secondEnemyBullet);
        this.destroyBullets(this.thirdEnemyBullet);
        this.destroyBullets(this.playerBullet);

        this.retry.scale = 0.5;
        this.gameOver.scale = 0.1;

        cc.tween(this.retry)
            .to(0.3,{scale: 1.3, opacity : 255})
            .start()

        cc.tween(this.gameOver)
            .to(0.3,{scale : 0.5, opacity : 255})
            .start()
    },

    retryClicked : function(){
        cc.tween(this.retry)
            .to(0.3,{scale: 0.1, opacity : 0})
            .start()

        cc.tween(this.gameOver)
            .to(0.3,{scale : 0.1, opacity : 0})
            .call(() => cc.director.loadScene('Game'))
            .start()
        ;
    },

    animation : function(node){
        this.explosionNode.setPosition(node.x,node.y);
        return this.explosionAnimation.play('explosion');
    },

    playExplosionSoundEffect1 : function(){
        cc.audioEngine.playEffect(this.explosionSoundEffect1,false);
    },

    playExplosionSoundEffect2 : function(){
        cc.audioEngine.playEffect(this.explosionSoundEffect2,false);
    },

    update(dt){
        if(this.score === 30){
            cc.director.loadScene('Game');
        }
    }

});
