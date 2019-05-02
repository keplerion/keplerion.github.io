class back extends entity{
    constructor(level){
        super(level)
    }
    
    preload(){
		 var me = this;
	return new Promise((res,rej)=>{
		let preloaded = [];
		if(!this.indexes)
			this.indexes = {}
		
	    if(!this.indexes.LW)
            this.indexes.LW= Utils.random(1,Object.keys(gC.demonBack.LW).length).toString().padStart(2,'0');
        if(!this.indexes.RW)
            this.indexes.RW= this.indexes.LW;
        if(!this.indexes.LB)
            this.indexes.LB= Utils.random(1,Object.keys(gC.demonBack.LB).length).toString().padStart(2,'0');
        if(!this.indexes.HE)
            this.indexes.HE= Utils.random(1,Object.keys(gC.demonBack.HE).length).toString().padStart(2,'0');
        if(!this.indexes.BO)
            this.indexes.BO= Utils.random(1,Object.keys(gC.demonBack.BO).length).toString().padStart(2,'0');
    
        gC.debugStr = 'Back LW: '+this.indexes.LW+', RW:'+this.indexes.RW+', LB:'+this.indexes.LB+', HE:'+this.indexes.HE+', BO:'+this.indexes.BO+'; <br>';

        var lI = Utils.loadImage;
        preloaded.push(lI(me.__proto__.images[me.level],'assets/games/demonback/'+gC.demonBack['LW'][this.indexes.LW].img, 'LW',gC.demonBack['LW'][this.indexes.LW]));
		preloaded.push(lI(me.__proto__.images[me.level],'assets/games/demonback/'+gC.demonBack['RW'][this.indexes.RW].img, 'RW',gC.demonBack['RW'][this.indexes.RW]));
		preloaded.push(lI(me.__proto__.images[me.level],'assets/games/demonback/'+gC.demonBack['LB'][this.indexes.LB].img, 'LB',gC.demonBack['LB'][this.indexes.LB]));
		preloaded.push(lI(me.__proto__.images[me.level],'assets/games/demonback/'+gC.demonBack['BO'][this.indexes.BO].img, 'BO',gC.demonBack['BO'][this.indexes.BO]));
		preloaded.push(lI(me.__proto__.images[me.level],'assets/games/demonback/'+gC.demonBack['HE'][this.indexes.HE].img, 'HE',gC.demonBack['HE'][this.indexes.HE]));

		Promise.all(preloaded)
            .then(
                (succ)=>{
                    
                res();
                }
            )
            .catch(
                (err)=>{
                rej();
                }
            )
        })
        
	}   
	
	bbox(){
		var me = this;
		return new Promise((res,rej)=>{
			me.randomX = 0;
			me.randomY = 0;//Utils.random(1,gC.spritePosY);
			res();			
		})
	}

	hit(x,y,w,h){
		   return false;
	   }
	
	   create(){
        var me = this;
        return new Promise((res,rej)=>{
            var ret = Utils.setFilter('4');
		    
	        ret = Utils.drawBackground(me.__proto__.images[this.level]);
            ret = Utils.setFilter('0');
        
            
            res();
            
        })
        
        
    }

}

//export { enemy };
