class enemy extends entity{
    constructor(level,xpos,offset){
		super(level,xpos,offset)
    }
	animation(x,y){
        /**
            if(this.offset)
                return this.gaussian();
            else
                return this.rightBorder2LeftBorder(); 
            return this.superformula(9,6,4,2,2,2,1,400,1,100);

        */
       //this.circle(gC.width/2,100,100,10)
       this.parallelepiped(1,1,200,100,10)
        
		
		
	}
    
    preload(){
		 var me = this;
	return new Promise((res,rej)=>{
		let preloaded = [];
		if(!this.indexes)
			this.indexes = {}
		
	    if(!this.indexes.LW)
            this.indexes.LW= Utils.random( 1, Object.keys(gC.demonData.LW).length ).toString().padStart(2,'0');
        if(!this.indexes.RW)
            this.indexes.RW= this.indexes.LW;
        if(!this.indexes.LB)
            this.indexes.LB= Utils.random(1, Object.keys(gC.demonData.LB).length ).toString().padStart(2,'0');
        if(!this.indexes.HE)
            this.indexes.HE= Utils.random(1, Object.keys(gC.demonData.HE).length ).toString().padStart(2,'0');
        if(!this.indexes.BO)
            this.indexes.BO= Utils.random(1, Object.keys(gC.demonData.BO).length ).toString().padStart(2,'0');
		gC.debugStr += 'Demon LW: '+this.indexes.LW+', RW:'+this.indexes.RW+', LB:'+this.indexes.LB+', HE:'+this.indexes.HE+', BO:'+this.indexes.BO+'; <br>';
        var lI = Utils.loadImage;
        

		preloaded.push(lI(me.__proto__.images[me.level],Utils.demonImagePath(gC.demonData['LW'][this.indexes.LW]), 'LW',gC.demonData['LW'][this.indexes.LW]));
		preloaded.push(lI(me.__proto__.images[me.level],Utils.demonImagePath(gC.demonData['RW'][this.indexes.RW]), 'RW',gC.demonData['RW'][this.indexes.RW]));
		preloaded.push(lI(me.__proto__.images[me.level],Utils.demonImagePath(gC.demonData['LB'][this.indexes.LB]), 'LB',gC.demonData['LB'][this.indexes.LB]));
		preloaded.push(lI(me.__proto__.images[me.level],Utils.demonImagePath(gC.demonData['BO'][this.indexes.BO]), 'BO',gC.demonData['BO'][this.indexes.BO]));
		preloaded.push(lI(me.__proto__.images[me.level],Utils.demonImagePath(gC.demonData['HE'][this.indexes.HE]), 'HE',gC.demonData['HE'][this.indexes.HE]));

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

}

//export { enemy };
