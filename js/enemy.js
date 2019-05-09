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
		
       //x,y,r,v (v=10 +veloce, v=1 lento)
       //this.circle(gC.width/2,100,100,10)
       //x,y,w,h,v (v=10 veloce, v=30 più lento)
       switch(gC.demonAttr.HE.movetype){
            case 'rectangle':
                this.rectangle(1,1,200,100,30);
                break;
            case 'circle':
                this.circle(gC.width/2,100,100,1);
                break;
            default:
                this.circle(gC.width/2,100,100,1);
                break;
       }    
       
        
		
		
	}
    
	create(){
        var me = this;
        return new Promise((res,rej)=>{
            
	    Utils.drawImageCompose(me.__proto__.images[me.level], me.randomX, me.randomY);
		
            
            res();
            
        })
        
        
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
            
        var lI = Utils.loadImage;
        
        gC.demonAttr.LW = gC.demonData['LW'][this.indexes.LW];
		gC.demonAttr.RW = gC.demonData['RW'][this.indexes.RW];
		gC.demonAttr.LB = gC.demonData['LB'][this.indexes.LB];
		gC.demonAttr.BO = gC.demonData['BO'][this.indexes.BO];
		gC.demonAttr.HE = gC.demonData['HE'][this.indexes.HE];

        let bid = '';
        if(gC && gC.demonAttr && gC.demonAttr.LB && gC.demonAttr.LB.bid) bid = gC.demonAttr.LB.bid.toString().padStart(2,'0');
        gC.debugStr += 'Back LW: '+this.indexes.LW+', RW:'+this.indexes.RW+', LB:'+this.indexes.LB+', HE:'+this.indexes.HE+', BO:'+this.indexes.BO+'; BU:'+bid+' <br>';
        

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
