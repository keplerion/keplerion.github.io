class explosion extends entity{
    constructor(level,x,y,type){
		super(level)
		//this.id = this.__proto__.explosionId++;
		this.BBoxColor = 'green';
		this.frames;
		this.frame = 0;
		this.randomX = x;
		this.randomY = y;
				this.type = type;
				this.cameraShake = [-50,50,50,-50,-50,50,50,-50,-50,50];
				this.filterBN = ['3','0','3','0','3','0','3','0','3','0'];

    }
	
    create(){
		var me = this;
		return new Promise((res,rej)=>{
			
			if(!me.frames) me.frames = me.__proto__.images[me.level]['EX'].width/gC.spriteW;
			if(me.frame===me.frames){
				assets[me.id].end = true;
				if(me.type == 'demon'){
					gC.demonsCountdown--;
				}
				else{ 
					if((gC.lifes-1)>=0)gC.lifes--;
				}
				res();
			}else{
				Utils.drawAnimation(me.__proto__.images[me.level]['EX'], gC.spriteW*me.frame, 0,gC.spriteW,gC.spriteH, me.randomX, me.randomY,gC.spriteW,gC.spriteH);
				if(me.type != 'demon'){
					Utils.cameraShake(me.cameraShake[me.frame]);
					Utils.setFilter(me.filterBN[me.frame]);
				}
			//add the echo feature
			//Utils.drawBBox(me.BBoxX, me.BBoxY,gC.bulletW,gC.bulletH,me.BBoxColor);
			//gC.fireAudio.play();
			me.frame++;
			res();
			}
			
		})
    }
	
    animation(){
		var me = this;
		return new Promise((res,rej)=>{
			
				res();
			
			
		})

	}
    
    preload(){
		 var me = this;
	return new Promise((res,rej)=>{
		let preloaded = [];
		if(!this.indexes)
			this.indexes = {}
		
		var lI = Utils.loadImage;
		//lI(me.__proto__.images[me.level],'assets/games/bullets/BULLET-001.png', 'BU');
		lI(me.__proto__.images[me.level],'assets/games/animations/explosions/explosion1.png', 'EX');
		res();
        })
        
    }    
	
	bbox(){
		var me = this;
		return new Promise((res,rej)=>{
			res();
		})
	}

}

