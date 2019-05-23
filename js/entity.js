class entity{
    constructor(level,xpos,offset){
		this.id = assets.length;
		this.level = level;
		this.offset = offset;
		this.randomX = xpos;
		//if(!this.__proto__.bulletId)this.__proto__.bulletId = 0;
		if(!this.__proto__.explosionId)this.__proto__.explosionId = 0;
		if(!this.__proto__.images)this.__proto__.images = {};
        if(!this.__proto__.images[level])this.__proto__.images[level] = {};
    }
	rightBorder2LeftBorder(){
		return new Promise((res,rej)=>{
			if(!this.dir)this.dir='r'
			
			if(this.randomX<gC.spritePosX && this.dir === 'r'){
				this.randomX++;
				this.BBoxX++;
			}else{
				if(this.randomX === gC.spritePosX) this.dir = 'l';
				if(this.randomX>0 && this.dir === 'l'){
					this.randomX--;
					this.BBoxX--;
				}else{
					this.dir = 'r';

				}	
			}
			res();
		})
		
	}
	animationOffset(){
		return new Promise((res,rej)=>{
			if(!this.dir)this.dir='r'
			if(!this.animOffsetX)this.animOffsetX=0;
			
			if(this.animOffsetX<this.offset && this.dir === 'r'){
				this.animOffsetX++;
				this.randomX++;
				this.BBoxX++;
			}else{
				if(this.animOffsetX === this.offset) this.dir = 'l';
				if(this.animOffsetX>0 && this.dir === 'l'){
					this.animOffsetX--;
					this.randomX--;
					this.BBoxX--;
				}else{
					this.dir = 'r';

				}	
			}
			res();
		})
		
	}
	
	gaussian(){
		return new Promise((res,rej)=>{
			if(!this.dir)this.dir='r';
			if(!this.animOffsetX)this.animOffsetX=0;
			if(!this.animGaussX){
				this.animGaussX = [];
				//filed used to choose a different methot from ceil or floor.
				var round = true;
				for(let offset = this.offset;offset>0;){
					if(round)
						offset = Math.floor(offset/2);
					else
						offset = Math.ceil(offset/2);
					round = !round;
					this.animGaussX.push(offset)
				}
				//used to store difference from sum animGaussX steps and offset
				for(let steps=0,anim_length = this.animGaussX.length-1;steps < anim_length-1;steps++){
					
					this.animGaussX[steps] = this.animGaussX[steps]-this.animGaussX[steps+1];
					//sum += this.animGaussX[steps];
				}
				var sum = 0;
				for(let anim_length = this.animGaussX.length-1;anim_length>=0;anim_length--){
					this.animGaussX.push(this.animGaussX[anim_length])
					sum += this.animGaussX[anim_length];
				}
				var diff = (this.offset) - sum*2;
				if(diff>0){
					//put the difference in a step
					this.animGaussX[0] += diff;
				}
				for(let anim_length = this.animGaussX.length-1;anim_length>=0;anim_length--){
					this.animGaussX.push(-this.animGaussX[anim_length])
				}	
				this.animGaussXLength = this.animGaussX.length-1;
				this.indexAnimGaussXLength = this.animGaussXLength;
			}
			
			if(this.indexAnimGaussXLength >= 0 && this.dir === 'r'){
				if(this.indexAnimGaussXLength > this.animGaussXLength) this.indexAnimGaussXLength = this.animGaussXLength;
				this.animGaussX[this.indexAnimGaussXLength]
				this.animOffsetX+=this.animGaussX[this.indexAnimGaussXLength];
				this.randomX+=this.animGaussX[this.indexAnimGaussXLength];
				this.BBoxX+=this.animGaussX[this.indexAnimGaussXLength];
				this.indexAnimGaussXLength--;
				
			}else{
				if(this.indexAnimGaussXLength < 0){ 
					this.dir = 'l';
					this.indexAnimGaussXLength = 0;
				}
				if(this.indexAnimGaussXLength<=this.animGaussXLength && this.dir === 'l'){
					this.animOffsetX+=this.animGaussX[this.indexAnimGaussXLength];
					this.randomX+=this.animGaussX[this.indexAnimGaussXLength];
					this.BBoxX+=this.animGaussX[this.indexAnimGaussXLength];
					this.indexAnimGaussXLength++;
				}else{
					this.dir = 'r';

				}	
			}
			res();
		})
		
	}
	anim(){
		if(!this.sf_index || this.sf_index==this.sf_points.length && this.animDir == 'o')
			this.sf_index=0;
		if(this.sf_index<0 && this.animDir == 'a')
			this.sf_index=this.sf_points.length-1;
		if(!this.animDir) this.animDir = 'o';
		this.randomX = this.sf_points[this.sf_index].x;
		this.BBoxX=this.randomX;
		this.randomY = this.sf_points[this.sf_index].y;
		this.BBoxY=this.randomY;
		if(!this.TSmoveinv) this.TSmoveinv =  new Date().getTime();
		let TS = new Date().getTime();
		if((TS-this.TSmoveinv)>(gC.demonAttr.LB.moveinv*1000)) 
			this.animDir = (this.animDir == 'o')?'a':'o';
		if(this.animDir == 'o')
			this.sf_index++;
		else
			this.sf_index--;
	}
	superformula(m,n1,n2,n3,a,b,i,x,y,np){
		var me = this;
        return new Promise((res,rej)=>{
			function anim(){
				if(!me.sf_index || me.sf_index==me.sf_points.length)
					me.sf_index=0;
				me.randomX = me.sf_points[me.sf_index].x;
				me.BBoxX=me.randomX;
				me.randomY = me.sf_points[me.sf_index].y;
				me.BBoxY=me.randomY;
				me.sf_index++;
			}
			if(!me.sf_points){
				var sf = new superformulaobj(m,n1,n2,n3,a,b,i,x,y,np);
				sf.create().then(
					(vec)=>{
						me.sf_points = vec;
						me.anim();
					}
				)
			}else{
				me.anim();
			}
			
        })
	}

	circle(cx,cy,r,v){
		var me = this;
		if(!me.sf_points){
			var centerX=me.randomX;//Utils.random(r/2,gC.width-r);
			var centerY=me.randomY;//Utils.random(r/2,gC.height/2);
			var radius=r;

			// an array to save your points
			var points=[];
			if(!v) v = 1;
			for(var degree=0;degree<360;){
				var radians = degree * Math.PI/180;
				var x = centerX + radius * Math.cos(radians);
				var y = centerY + radius * Math.sin(radians);
				points.push({x:x,y:y});
				degree+=v;
			}
			me.sf_points = points;
			me.anim();	
		}else{
			me.anim();
		}
		
	}
	rectangle(sx,sy,w,h,v){
		if(!this.sf_points){
			sx=this.randomX;//Utils.random(0,gC.width-w);
			sy=this.randomY;//Utils.random(0,h);
			
			var tw = w/v;
			var th = h/v;
			var points = [];
			var pointsX = [];
			var pointsY = [];
			var pointsXR = [];
			var pointsYR = [];
			for(let x = 0;x<v;x++){
				pointsX.push({x:sx+tw,y:sy})
				sx+=tw;
			}
			for(let y = 0;y<v;y++){
				pointsY.push({x:sx,y:sy+th})
				sy+=th;
			}
			for(let x = 0;x<v;x++){
				pointsXR.push({x:sx-tw,y:sy})
				sx-=tw;
			}
			for(let y = 0;y<v;y++){
				pointsYR.push({x:sx,y:sy-th})
				sy-=th;
			}
			points = points.concat(pointsX);
			points = points.concat(pointsY);
			points = points.concat(pointsXR);
			points = points.concat(pointsYR);
			this.sf_points = points;
			this.anim();
		}else{
			this.anim();
		}	
	}
    start(){
        var me = this;
        return new Promise((res,rej)=>{
		me.bbox()
		.then(
                    (succ)=>{
                        me.create()
			.then(
			    (succ)=>{
				res('done');
			    }
			)
			.catch(
			    (err)=>{
				res(err);
			    }
			)
                    }
                )
                .catch(
                    (err)=>{
                        res(err);
                    }
                )
                    
            })
    }
    
  
    create(){
        var me = this;
        return new Promise((res,rej)=>{
            
	    Utils.drawImages(me.__proto__.images[me.level], me.randomX, me.randomY);
		
            
            res();
            
        })
        
        
    }

    hit(x,y,w,h){
	 //https://stackoverflow.com/questions/2752349/fast-rectangle-to-rectangle-intersection   
	  if ((x < (this.BBoxX + this.BBoxW)) && (this.BBoxX < (x + w)) && (y < (this.BBoxY + this.BBoxH)) && (this.BBoxY < y))
	    return true;
	  else
	    return false;

    }
	
paint(x,y){
        var me = this;
        return new Promise((res,rej)=>{
		
            Utils.drawImages(me.__proto__.images[this.level], x, y);
		
            
            res();
            
        })
        
        
    }
	
	bbox(){
		var me = this;
	return new Promise((res,rej)=>{
		if(me.dead === undefined){
			me.dead = false;
			if(!me.randomX)
				me.randomX = Utils.random(1,gC.spritePosX);
			me.BBoxX = me.randomX;
			me.randomY = 0;//Utils.random(1,gC.spritePosY);
			me.BBoxY = me.randomY;
			me.BBoxH = gC.spriteH;
			me.BBoxW = gC.spriteW;
			res();
			
                
            	}else{
			if(me.dead){
			    rej();
			}else{
				res();
			}
		    
            }
	})
}

getPosX(){
	return this.randomX;
}

getPosY(){
	return this.randomY;
}

fire(level,dir){
	if(dir == 'u') return new bullet(level,dir,this.getPosX(),this.getPosY());
	else if(dir == 'd') return new bulletD(level,dir,this.getPosX(),this.getPosY(),'',gC.demonAttr.HE.firesp);
}
}

