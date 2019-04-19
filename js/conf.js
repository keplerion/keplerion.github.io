var gC = {
    width: 996,
    height: 498,
    level:'A',
    spriteH:128,
    spriteW:128,
    bulletH:10,
    bulletW:10,
    muberAnimationPoints: 3,
    fr: 500,
    offset_arrow:5,
    offset_bullet:5,
    score:0,
    readDemonData: function(){
        return new Promise(function(res,rej){
            if(!gC.demonData){
                var xmlhttp = new XMLHttpRequest();
                var url = 'assets/games/demons/demons4js.json';
                xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        gC.demonData = JSON.parse(this.responseText);
                        return res();
                    }
                };
                xmlhttp.open("GET", url, true);
                xmlhttp.send();
            }else{
                return res();
            }
        })


    },
    readShipData: function(){
        return new Promise(function(res,rej){
            if(!gC.shipData){
                var xmlhttp = new XMLHttpRequest();
                var url = 'assets/games/demonship/demonship/demonship4js.json';
                xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        gC.shipData = JSON.parse(this.responseText);
                        return res();
                    }
                };
                xmlhttp.open("GET", url, true);
                xmlhttp.send();
            }else{
                return res();
            }
        })


    },

    readBackData: function(){
        return new Promise(function(res,rej){
            if(!gC.demonBack){
                var xmlhttp = new XMLHttpRequest();
                var url = 'assets/games/demonback/demonback4js.json';
                xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        gC.demonBack = JSON.parse(this.responseText);
                        return res();
                    }
                };
                xmlhttp.open("GET", url, true);
                xmlhttp.send();
            }else{
                return res();
            }
        })


    },

    readControllerData: function(){
        return new Promise(function(res,rej){
            if(!gC.shipData){
                var xmlhttp = new XMLHttpRequest();
                var url = 'assets/games/controller.json';
                xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        gC.controller = JSON.parse(this.responseText);
                        return res();
                    }
                };
                xmlhttp.open("GET", url, true);
                xmlhttp.send();
            }else{
                return res();
            }
        })


    },
    readAmbientData: function(){
        return new Promise(function(res,rej){
            if(!gC.ambient){
                var xmlhttp = new XMLHttpRequest();
                var url = 'assets/games/audio/ambient.json';
                xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        gC.ambient = JSON.parse(this.responseText);
                        return res();
                    }
                };
                xmlhttp.open("GET", url, true);
                xmlhttp.send();
            }else{
                return res();
            }
        })


    },
    loadJsons: function(){
        var me = this;
        return new Promise((res,rej)=>{
            me.readDemonData().then(
                (succ)=>{
                    me.readShipData().then(
                        (succ)=>{
                            me.readBackData().then(
                                (succ)=>{
                                    me.readControllerData().then(
                                        (succ)=>{
                                            me.readAmbientData().then(
                                                (succ)=>{
                                                    res()
                                            
                                                }
                                                
                                            )
                                        }
                                    )
                                }
                                
                            )
                        }
                        
                    )
                }
                
            )
                           
        })
    },
    loadAmbientAudio: function(){
        let i = Utils.random(1, Object.keys(gC.ambient).length ).toString().padStart(2,'0');
        gC.ambient = new Audio('assets/games/audio/'+i+'.mp3');
    }
};

gC.spritePosX = gC.width-gC.spriteW;
gC.spritePosY = gC.height-gC.spriteH;

//export { gC }
