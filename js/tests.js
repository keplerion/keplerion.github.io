class Test{
    constructor(){}
    setVariables(){
        this.randomX = Utils.random(1,gC.spritePosX);
        this.randomY = Utils.random(1,gC.spritePosY);
        let width = gC.width - gC.spriteW;
        let height = gC.height - gC.spriteH;
            
        this.coords =[{x:0,y:0},{x:width,y:0},{x:0,y:height},{x:this.randomX,y:this.randomY},{x:width,y:height}]
    }
    drawImageCompose(o,x,y){
        return new Promise((res,rej)=>{
            //data structure with start points (4 screen angles)
            //if no variable in image->use coordinates in data structure, store coordinateds in image calculated as middle point from angle to x,y
            //if variable -> use this coordinates, store new coordinateds in image calculated as middle point from coordinates in image to x,y
            //if variable < 0 use x,y
            for(let p = 0,p_l = o.length;p<p_l;p++){
                let i = o[p];
                if(!i.startx && !i.starty){
                    i.startx = o[p].x;
                    i.starty = o[p].y;
                }
                
                Utils.drawCircle(i.startx,i.starty, 50);
                
                if(x>i.startx) if((x - i.startx)>2)i.startx = i.startx + ((x - i.startx)/2);
                else if((i.startx - x)>2)i.startx = i.startx + ((i.startx - x)/2);
                if(y>i.starty) if((y - i.starty)>2)i.starty = i.starty + ((y - i.starty)/2);
                else if((i.starty - y)>2)i.starty = i.starty + ((i.starty - y)/2);
                if(p==(p_l-1))res();
            }
        })
	    
    }
    run(){
        var me = this;
        this.setVariables();
        return new Promise((res,rej)=>{
            this.drawImageCompose(me.coords,me.randomX,me.randomY).then(
                (succ)=>{
                    res();
                }
            )
        })
        
        
    }
}
