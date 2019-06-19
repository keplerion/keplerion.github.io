class splash{
    constructor(str){
        this.images = {};
        this.stringToWrite = str;
	    this.level = 's';
	    if(!this.images[this.level])this.images[this.level] = {};
    }
    
    preload(){
		 var me = this;
	return new Promise((res,rej)=>{
		
		    let preloaded = [];
		if(!this.indexes)
			this.indexes = {}
		
	    if(!this.indexes.LW)
		    this.indexes.LW= Utils.random( 1, Object.keys(gC.demonTitle.LW).length ).toString().padStart(2,'0');
		if(!this.indexes.RW)
		    this.indexes.RW= this.indexes.LW;
		if(!this.indexes.LB)
		    this.indexes.LB= Utils.random(1, Object.keys(gC.demonTitle.LB).length ).toString().padStart(2,'0');
		if(!this.indexes.HE)
		    this.indexes.HE= Utils.random(1, Object.keys(gC.demonTitle.HE).length ).toString().padStart(2,'0');
		if(!this.indexes.BO)
		    this.indexes.BO= Utils.random(1, Object.keys(gC.demonTitle.BO).length ).toString().padStart(2,'0');

		var lI = Utils.loadImage;

		let bid = '';
		gC.debugStr += 'SPLASH LW: '+this.indexes.LW+', RW:'+this.indexes.RW+', LB:'+this.indexes.LB+', HE:'+this.indexes.HE+', BO:'+this.indexes.BO+'; BU:'+bid+' <br>';


			preloaded.push(lI(me.images[me.level],'assets/games/demontitle/'+gC.demonTitle['RW'][this.indexes.RW].img, 'RW',gC.demonTitle['RW'][this.indexes.RW]));
			preloaded.push(lI(me.images[me.level],'assets/games/demontitle/'+gC.demonTitle['HE'][this.indexes.HE].img, 'HE',gC.demonTitle['HE'][this.indexes.HE]));
			preloaded.push(lI(me.images[me.level],'assets/games/demontitle/'+gC.demonTitle['LB'][this.indexes.LB].img, 'LB',gC.demonTitle['LB'][this.indexes.LB]));
			preloaded.push(lI(me.images[me.level],'assets/games/demontitle/'+gC.demonTitle['LW'][this.indexes.LW].img, 'LW',gC.demonTitle['LW'][this.indexes.LW]));
			preloaded.push(lI(me.images[me.level],'assets/games/demontitle/'+gC.demonTitle['BO'][this.indexes.BO].img, 'BO',gC.demonTitle['BO'][this.indexes.BO]));
			
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
	

	create(){
        var me = this;
        return new Promise((res,rej)=>{
            
	    Utils.drawImages(me.images[me.level], 0, 0);
		
            if(!this.stringToWrite) this.stringToWrite = 'Press  s  to  start';
        	Utils.drawText(this.stringToWrite,380,400,'#FFF')
            function k(e){
            switch(e.keyCode){
                case 83:
                    document.removeEventListener('keydown',k,false)
        
                    res();
                    break;
                
            }
        }
        document.addEventListener('keydown',k,false)
        Utils.c2c();   
        })
        
        
    }
	/*
	   create(){
        var me = this;
        return new Promise((res,rej)=>{
        Utils.clearCanvas('#000');
        Utils.drawImage(me.images['SP'],0,100);
        if(!this.stringToWrite) this.stringToWrite = 'Press  s  to  start';
        Utils.drawText(this.stringToWrite,380,400,'#FFF') 
        function k(e){
            switch(e.keyCode){
                case 83:
                    document.removeEventListener('keydown',k,false)
        
                    res();
                    break;
                
            }
        }
        document.addEventListener('keydown',k,false)
        Utils.c2c();
        
        
    })
*/
    
		/*   
	createOffscreen(){
        var me = this;
        return new Promise((res,rej)=>{
        //Utils.clearCanvas('#000');
        Utils.drawImage(me.images['SP'],100,100);
        Utils.drawText('Press s to start',100,200,'#FFF') 
        function k(e){
            switch(e.keyCode){
                case 83:
                    document.removeEventListener('keydown',k,false)
        
                    res();
                    break;
                
            }
        }
        document.addEventListener('keydown',k,false)
        Utils.c2osc();
        
        
    })*/
//}
createLevel(){
    var me = this;
    return new Promise((res,rej)=>{
    Utils.clearCanvas('#000');
    if(!this.stringToWrite) this.stringToWrite = 'Press  s  to  start';
    Utils.drawText(this.stringToWrite,380,400,'#FFF') 
    Utils.c2c();
    res();
        
})
}
}

//export { enemy };
