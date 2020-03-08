
var gC = {
    width: 996,
    height: 498,
    level:'A',
    spriteH:128,
    spriteW:128,
    bulletH:15,
    bulletW:15,
    muberAnimationPoints: 3,
    fr: 500,
    offset_arrow:5,
    offset_bullet:5,
    score:0,
    demonAttr:{},
    shipAttr:{},
    canvasFilter:'none',
    animationWidth:200,
    animationHeight:100,
    transparencyStep:0.05,
    readJsonData: function(gCDataName,jsonUrl){
        return new Promise(function(res,rej){
            if(!gC[gCDataName]){
                var xmlhttp = new XMLHttpRequest();
                var url = jsonUrl;
                xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        gC[gCDataName] = JSON.parse(this.responseText);
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
            var resArray = [];
            resArray.push(me.readJsonData('demonTitle','assets/games/demontitle/demontitle4js.json'));
            resArray.push(me.readJsonData('bullets','assets/games/demonbull/animsjs/demonbull4js.json'));
            resArray.push(me.readJsonData('demonfx','assets/games/demonfx/animsjs/demonfx4js.json'));
            resArray.push(me.readJsonData('demonData','assets/games/demons/animsjs/demons4js.json'));
            resArray.push(me.readJsonData('shipData','assets/games/demonship/demonship/demonship4js.json'));
            resArray.push(me.readJsonData('demonBack','assets/games/demonback/demonback4js.json'));
            resArray.push(me.readJsonData('controller','assets/games/controller.json'));
            resArray.push(me.readJsonData('ambient','assets/games/audio/ambient.json'));

            Promise.all(resArray).then(
                (succ)=>{
                    res();
                }
            )              
        })
    },
    loadAmbientAudio: function(){
        return new Promise((res,rej)=>{
            let i = Utils.random(1, Object.keys(gC.ambient).length ).toString().padStart(2,'0');
            gC.ambient_audio = new Audio('assets/games/audio/'+i+'.mp3');
              gC.ambient_audio.addEventListener("canplay", function() {
                res();
              }, true);
        })
        
    }
};

gC.spritePosXA = gC.width-gC.animationWidth;
gC.spritePosYA = gC.height-gC.animationHeight;
gC.spritePosX = gC.width-gC.spriteW;
gC.spritePosY = gC.height-gC.spriteH;

//export { gC }
