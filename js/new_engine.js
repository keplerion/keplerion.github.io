//import { gC } from "./conf.js";
//import { Utils } from "./utils.js";
//import { enemy } from "./enemy.js";

var assets = [];

function startGame(){
    
	Utils.showScore(gC.score)
    let a_l = assets.length;
    gC.demonBulletFrame%=gC.demonBulletInterval;

    if(!gC.demonBulletFrame) var demonFire = true;

    gC.demonBulletFrame++;
    if(!gC.pause){
        /**
         * if enterdelaydem
         *  if demonsCountdowm < nummaxdem
         *   if totDemonsInLevel + 1 < numtotdem
         *      push dem
         *      totDemonsInLevel++
         *      demonsCountdown++
         */
        if(!gC.controller.timestamp) gC.controller.timestamp = new Date().getTime();
        let now = new Date().getTime();
        if((now - gC.controller.timestamp)>(gC.controller.level.enterdelaydem*100*2)){
            gC.controller.timestamp = now;
            if(gC.demonsCountdown < gC.controller.level.nummaxdem){
                if((gC.totDemonsInLevel+1)<=gC.controller.level.numtotdem){
                    var e = new enemy("e_"+gC.levelChar);
                    assets.push(e);
                    gC.totDemonsInLevel++;
                    gC.demonsCountdown++;
                }
            }
        }
        if(gC.demonsCountdown && gC.lifes>0){
            for(let a = 0;a<a_l;a++){
                if(!assets[a].end){
                    if(assets[a] instanceof enemy && demonFire){
                         assets.push(assets[a].fire('bd_'+gC.levelChar,'d'))
                         //demonFire = false;
                    }
                    assets[a].start()
                    .then(
                        (succ)=>{
                        if(assets[a].animation)
                            assets[a].animation(assets[a].getPosX(),assets[a].getPosY())
                            
                        //else
                        //    console.log('asset senza animazione')
                        }
                    )
                    .catch(
                        (err)=>{
                        console.log(err);
                        }
                    )
                }
                if(a==(a_l-1)){
                    
                    /*
                    for(let e = 0;e<a_l;e++){
                        if(assets[e].end)
                            assets.splice(e,1);
                    }
                    */    
                    //Utils.c2osc();
                    function fn(){
                        Utils.c2c();
                        requestAnimationFrame(this.gAF);
                    }
                    if(gC.debug){
                        Utils.debug().then(
                            fn()
                        )
                    }else{
                        fn()
                    }
                    
                }
            }
        }else{
            if(gC.lifes>0){
                gC.gameLevel++;
                //gC.numbOfDemons--;
		if(gC.gameLevel)
                	showSplashLevel().then(
                    		(succ)=>{
                        		l()
                    		}
                	)
		else
			this.showSplashEnd().then(
			    (succ)=>{
				reset()
				l()
			    }
			); 
		 
            }else{
                this.showSplashEnd().then(
                    (succ)=>{
                        reset()
                        l()
                    }
                ); 
            }
            
        }
    }
    
	
}

function addDemoAssets(c,n){
    return new Promise(function(res,rej){
	    //ToDo:finish line of enemies
	    var totFreeSpaceFromEnemies, freeSpaceBetweenEnemies;
	    if(n){
            gC.demonsCountdown = n;
            gC.totDemonsInLevel = n;
            let spritesTotWidth = gC.spriteW * n;
            if(spritesTotWidth<gC.width){
                totFreeSpaceFromEnemies = gC.width - spritesTotWidth;
                freeSpaceBetweenEnemies = Math.round(totFreeSpaceFromEnemies / (n + 1));
                let spriteXPos = 0;
                function addAllDemons(spr){
                    var e = new enemy(c,freeSpaceBetweenEnemies+spriteXPos,freeSpaceBetweenEnemies);
                    spriteXPos += freeSpaceBetweenEnemies + gC.spriteW;
                    e.preload().then(
                        (succ) => {
                            assets.push(e);
                            if(spr<n-1) return addAllDemons(spr+1)
                            else return res()
                        }
                    )
                }
                return addAllDemons(0)
            }
	    }else{
            var e = new enemy(c);
            e.preload().then(
                (succ) => {
                    assets.push(e);
                    res();
                }
            )
        }
        
    })
    
        
}

function addHero(l){
    return new Promise(function(res,rej){
    
        gC.player = new hero(l);
        gC.player.preload().then(
            (succ) => {
                assets.push(gC.player);
                res();
            }
        )
    })
        
}

function showSplash(){
    return new Promise(function(res,rej){
    
        let splasho = new splash();
        splasho.preload().then(
            (succ) => {
                splasho.create().then(
                    (succ) => {
                        loadMp3().then(
                            (succ) => {
                                res();
                            }        
                        )
                    }
                )
            }
        )
    })
        
}

function showSplashEnd(){
    return new Promise(function(res,rej){
    
        let splasho = new splash('Game Over: Press s to restart');
        splasho.preload().then(
            (succ) => {
                splasho.create().then(
                    (succ) => {
                        gC.coin.play();
			gC.ambient_audio.play();
                        res();
                            
                    }
                )
            }
        )
    })
        
}

function showSplashLevel(){
    return new Promise(function(res,rej){
    
        let splasho = new splash('Next Level: '+gC.gameLevel);
        splasho.preload().then(
            (succ) => {
        splasho.createLevel().then(
                    (succ) => {
                        res();
                    }
                )
                })
    })
        
}

function addBullet(l){
    return new Promise(function(res,rej){
    //il secondo parametro serve per non far parire l'audio
        gC.bullet = new bullet(l,'','','',true);
        gC.bullet.preload().then(
            (succ) => {
                res();
            }
        )
    })
        
}

function addBulletD(l){
    return new Promise(function(res,rej){
    
        gC.bulletD = new bulletD(l,'','','',true);
        gC.bulletD.preload().then(
            (succ) => {
                res();
            }
        )
    })
        
}

function addBulletFx(l){
    return new Promise(function(res,rej){
    
        gC.bulletFX = new bullExplosion(l,'','','',true);
        gC.bulletFX.preload().then(
            (succ) => {
                res();
            }
        )
    })
        
}

function addExplosion(l){
    return new Promise(function(res,rej){
    
        gC.explosion = new explosion(l);
        gC.explosion.preload().then(
            (succ) => {
                res();
            }
        )
    })
        
}

function addBack(l){
    return new Promise(function(res,rej){
    
        gC.back = new back(l);
        gC.back.preload().then(
            (succ) => {
                assets.push(gC.back);
                res();
            }
        )
    })
        
}

function readDemonData(){
    var me = this;
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
    
    
}

function readShipData(){
    var me = this;
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
    
    
}

function readBackData(){
    var me = this;
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
    
    
}

function readControllerData(){
    var me = this;
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
    
    
}

function addCanvas(){
    var me = this;
    return new Promise(function(res,rej){
        var canvas = Utils.getEBTN('canvas')
        if(typeof canvas === 'object' && canvas.length <= 0){
            //non c'è canvas
            //var a = Utils.getEBTN('body')[0]
            var a = Utils.getEBI('box');
            var b = Utils.createE('canvas');
            //memorizzo canvas e contesto
            Utils.setCanvas(b)
            
	    //Utils.setOffScreen(b)
            Utils.appendB2A(a,b)
            Utils.setAttribute(b,'width',gC.width)
            Utils.setAttribute(b,'height',gC.height)
            document.addEventListener('keydown',(e)=>{
                switch(e.keyCode){
                    case 37:
                        gC.player.leftDown();
                        break;
                    case 39:
                        gC.player.rightDown();
                        break;
                    case 32:
                        assets.push(gC.player.fire('b_'+gC.heroChar,'u'));
                        
                        break;
                }
            })
		
	    document.addEventListener('keyup',(e)=>{
                switch(e.keyCode){
                    case 37:
                        gC.player.leftUp();
                        break;
                    case 39:
                        gC.player.rightUp();
                        break;
                    case 32:
                        //assets.push(gC.player.fire('b_a'));
                        break;
                }
            })
        }
        res();
    })
}

function addCanvas3D(){
    var me = this;
    return new Promise(function(res,rej){
        Utils.init3D().then(
		(succ)=>{
			document.addEventListener('keydown',(e)=>{
				switch(e.keyCode){
				    case 37:
					gC.player.leftDown();
					break;
				    case 39:
					gC.player.rightDown();
					break;
				    case 32:
					assets.push(gC.player.fire('b_'+gC.heroChar,'u'));

                    break;
                    case 68:
					if(!gC.debug) gC.debug=true; else gC.debug=false;
                    break;
                    case 80:
					if(!gC.pause){
						gC.pause=true; 
					}else{
						gC.pause=false;
						requestAnimationFrame(gAF);
					}
					break;
				}
			    })

			document.addEventListener('keyup',(e)=>{
				switch(e.keyCode){
				    case 37:
					gC.player.leftUp();
					break;
				    case 39:
					gC.player.rightUp();
					break;
				    
				}
			    })
			
        		res();
		}
	)
        
    })
}

function gAF(c){
    gC.demoClock++;
    //Utils.clearCanvas();
    
    startGame()
}

function reset(){
    gC.demoClock = 0;
    gC.numbOfDemons = 1;
    gC.gameLevel = 1;
    gC.planetLevel = 1;
    gC.heroLevel = 1;
    gC.demonBulletInterval = 50;
    gC.demonBulletFrame = 1;
    gC.lifes = 3;
    gC.debugStr = '';
    gC.score = 0;
    Utils.resetCamera();
}

function s(){
    reset();
    
	gC.loadJsons().then(
		(succ)=>{
			addCanvas3D().then(
			(succ)=>{
			    showSplash().then(
				(succ)=>{
				    readControllerData().then(
					(succ)=>{    
					    gC.coin.play();

					    l();
					}
				    )

				}
			    )
			})
		}
	
    )
}

function loadMp3(){
    return new Promise(function(res,rej){
        gC.fireAudio = new Audio('assets/games/audio/Shoot001.mp3');
        gC.coin = new Audio('assets/games/audio/Coin001.wav');
        gC.explosionAudio1 = new Audio('assets/games/audio/Explosion001.mp3');
        gC.explosionAudio2 = new Audio('assets/games/audio/Explosion002.mp3');
        gC.explosionAudio2.addEventListener("canplay", function() {
            res();
          }, true);
    })
}

function loadWav(){
    return new Promise(function(res,rej){
        gC.coinAudio = new Audio('assets/games/audio/Coin001.mp3');
        res();
    })
}

function webgl(){
	Utils.init3D();
}
//every frame value, draw scene
function l(){

    gC.levelChar = gC.gameLevel;
    gC.heroChar = gC.heroLevel;
    var planet = gC.planetLevel;
    assets.length = 0;
                gC.loadAmbientAudio().then(
                    (succ)=>{
                        addBack('k_'+gC.planetChar).then(
                    (succ)=>{
                        addHero('h_'+gC.heroChar).then(
                            (succ)=>{
                                addDemoAssets('e_'+gC.levelChar,1).then(
                                    (succ)=>{
                                        loadMp3().then(
                                            (succ)=>{
                                                addBullet('b_'+gC.heroChar).then(
                                                    (succ)=>{
                                                        addExplosion('x_'+gC.heroChar).then(
                                                            (succ)=>{
                                                                addBulletD('bd_'+gC.levelChar).then(
                                                                    (succ)=>{
                                                                        addBulletFx('fx_'+gC.levelChar).then(
                                                                            (succ)=>{
                                                                                gC.ambient_audio.play();
                                                                                requestAnimationFrame(gAF);
        
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



                                    }
                                )

                            }
                        )

                    })
                    }
                )
                
                
        
			

		
	


	//    }
	//)


}
