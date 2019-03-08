import {CST} from "../CST";
var GV = require('./Globals.js');	
var FN = require('./Functions.js');
var CS = require('./Classes.js');

export class GameScene extends Phaser.Scene {
    constructor(){
        super({
            key: CST.SCENES.GAME
        })
    }
    
    //Preload function loads assets before game starts
 
    init(data) {
		GV.scene = CST.SCENES.GAME;
        GV.PLAYER_HEALTH = 100;
		var graphics = this.add.graphics();    
		FN.drawLines(graphics);
		
		this.add.image(960, 512, 'map').setDepth(0);

		var coords = [
			[ -1, 6, 6,12,12, 9, 9,19,19,24,24,30], //x
			[ 5, 5, 2, 2, 9, 9,13,13, 8, 8, 4, 4]  //y
		];

		for(var i = 0; i < coords[0].length; i++ )
		{
			if(i == 0)
			{
				GV.WALKPATH = this.add.path((coords[0][i]+0.5)*64, (coords[1][i]+0.5)*64);		//start point for path coords
				//GV.MAP[coords[1][i]-1][coords[0][i]-1] = 0
			}
			else if(i == coords[0].length-1)
			{
				GV.WALKPATH.lineTo((coords[0][i]+0.5)*64, (coords[1][i]+0.5)*64);
				//GV.MAP[coords[1][i]-1][coords[0][i]-1] = 0
			}
			else
			{
				GV.WALKPATH.lineTo((coords[0][i]+0.5)*64, (coords[1][i]+0.5)*64);
				//GV.MAP[coords[1][i]-1][coords[0][i]-1] = 0
			}
		}
		
		graphics.lineStyle(1, 0xffffff, 1);
		GV.WALKPATH.draw(graphics);
		
		GV.FLYPATH = this.add.path(-1, 352);
		GV.FLYPATH.lineTo(1920, 288);
		GV.FLYPATH.draw(graphics);
		
		GV.MAP = [
		[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1, 0,-1, 0, 0, 0, 0, 0,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0, 0, 0, 0, 0, 0, 0],
		[ 0, 0, 0, 0, 0, 0,-1, 0,-1,-1,-1, 0,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,-1,-1,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1,-1,-1, 0,-1,-1,-1, 0,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,-1, 0, 0, 0, 0, 0],
		[ 0, 0, 0, 0, 0, 0, 0, 0,-1,-1,-1, 0,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,-1, 0,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,-1, 0,-1,-1,-1,-1, 0, 0, 0, 0, 0, 0,-1, 0,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1,-1,-1,-1, 0, 0, 0, 0,-1, 0,-1,-1,-1,-1, 0,-1,-1,-1,-1,-1,-1, 0,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1,-1,-1,-1, 0,-1,-1,-1,-1, 0,-1,-1,-1,-1, 0,-1, 0, 0, 0, 0, 0, 0,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1,-1,-1,-1, 0,-1, 0, 0, 0, 0,-1,-1,-1,-1, 0,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1,-1,-1,-1, 0,-1, 0,-1,-1,-1,-1,-1,-1,-1, 0,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1,-1,-1,-1, 0,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1,-1,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1,-1,-1,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
		];
    }

    //create function initializes and adds assets to game
    create() {
		this.bgm = this.sound.add('castlegates');
		this.bgm.volume = 0.04;
		this.bgm.loop = true;
		this.bgm.play();			
		
        /*creates a group for a tower type, that way we can use GV.TOWER_GROUP.get(towerStats) to instantiate new towers easily
		loop through GV.TOWER_ARRAY to get each tower object
		then add each object to GV.TOWER_GROUP arr
		we do this becuase GV.TOWER_GROUP can now be easily used to manipulate tower objects with Phaser functions.*/
		//loop through all 23 towers
		for(var i = 0; i < 23; i++) {
			var towerClass = "CS."+GV.TOWER_ARRAY[i].towerName;
			GV.TOWER_GROUP[GV.TOWER_ARRAY[i].towerId] = this.add.group({ classType: eval(towerClass), runChildUpdate: true });
		}

        //enemy group will be a loop similar to tower group
        for (var i = 0; i < 18; i++) {
            var enemyClass = "CS."+GV.ENEMY_ARRAY[i].enemyName;
            GV.ENEMY_GROUP[GV.ENEMY_ARRAY[i].enemyId] = this.physics.add.group({ classType: eval(enemyClass), runChildUpdate: true});
        }
		
        //turned into attack group soon for different attack types
		for (var i = 0; i < 23; i++) {
			var attackClass = "CS."+GV.ATTACK_ARRAY[i].attackName;
			/* console.log(GV.ATTACK_ARRAY[i]);
			console.log(GV.ATTACK_ARRAY[i].attackId);
			console.log(GV.ATTACK_ARRAY[i].attackName);
			console.log(attackClass); */
			GV.ATTACK_GROUP[GV.ATTACK_ARRAY[i].attackId] = this.physics.add.group({ classType: eval(attackClass), runChildUpdate: true});
			//console.log(GV.ATTACK_GROUP[GV.ATTACK_ARRAY[i].attackId]);
		}
		
		//button group
		GV.BUTTON_GROUP = this.add.group();
		
        //build the game map, this includes pathing, map image, animations, background sounds, and general game assets
        FN.buildMap(this, 'map');
		
        //create animations
        FN.createAnimations(this, GV.ENEMY_ARRAY, 0);
        FN.createAnimations(this, GV.TOWER_ARRAY, 1);
		
		//wave management
 		this.buttonImg = this.add.image(1660, 1008, 'waveHUD').setDepth(1);
		this.nextEnemy = this.sys.game.loop.time + GV.WAVE_DELAY;
        this.complete = this.add.text(1660, 1008, 'Wave Complete', {fontFamily: 'VT323', fontSize: 30, color: '#ff0000'}).setDepth(1).setOrigin(.8,0.5);
        this.complete.setVisible(false);
        this.delay = this.add.text(1660, 1008, 'Next Level in ' + (GV.WAVE_DELAY/1000) + ' Seconds', {fontFamily: 'VT323', fontSize: 30, color: '#ff0000'}).setDepth(1).setOrigin(.8,0.5);
        this.skipWave = this.add.text(1660,1008, 'Skip Wait?', {fontFamily: 'VT323', fontSize: 30, color: '#ff0000'}).setDepth(1).setOrigin(-0.8,0.5);
        this.skipWave.setInteractive({ useHandCursor: true });
        this.skipWave.on("pointerup", ()=>{
            this.nextEnemy = 0;
            this.skipWave.setVisible(false);
			this.delay.setVisible(false);
			this.buttonImg.setVisible(false);
        });
		
/*      this.nextEnemy = this.sys.game.loop.time + GV.WAVE_DELAY;
        this.complete = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2, 'Wave Complete', {fontFamily: 'VT323', fontSize: 50, color: '#ff0000'}).setDepth(1);
        this.complete.setVisible(false);
        this.delay = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 50, 'Next Level in ' + (GV.WAVE_DELAY/1000) + ' Seconds', {fontFamily: 'VT323', fontSize: 50, color: '#ff0000'}).setDepth(1);
        
		this.skipWave = this.add.text(this.game.renderer.width / 2,this.game.renderer.height / 2 + 100, 'Skip Wait?', {fontFamily: 'VT323', fontSize: 50, color: '#ff0000'}).setDepth(1);
        this.skipWave.setInteractive();
        this.skipWave.on("pointerup", ()=>{
            this.nextEnemy = 0;
            this.skipWave.setVisible(false);
        }); */

        //input related actions in userAction function
        this.input.on('pointerdown', function (pointer){FN.userAction(pointer, this)});

        let nextScene = this.add.text(30, 990, 'Next Level', { fontFamily: 'Arial', fontSize: 25, color: '#ffffff' }).setDepth(1);
        nextScene.setInteractive();
        nextScene.on("pointerup", ()=>{
            this.scene.remove('HUD');
            //this.scene.restart();
            this.scene.start(CST.SCENES.TRANSITION1);
			this.bgm.stop();
        });		

		
    }

    //update function constantly refreshes so to progress game
    update(time, delta) {  
		//Wave timer and skip in bottom HUD
		FN.waveHUD(this, Math.trunc((this.nextEnemy - time) / 1000));

        //Check if player still alive
/*         if (GV.PLAYER_HEALTH <= 0)
        {
            this.scene.remove('HUD');
            this.delay.destroy();
            this.complete.destroy();
            this.skipWave.destroy();
            this.cameras.main.fade(2500,0,0,0, false);
            this.cameras.main.once('camerafadeoutcomplete', ()=>{
                this.scene.start(CST.SCENES.GAMEOVER);
            }); 
        }
        else { */
        this.delay.setText('Next wave in ' + Math.trunc((this.nextEnemy - time) / 1000) + ' Seconds');
        if (time > this.nextEnemy) {
            //Hide wave completion items
/*             this.complete.setVisible(false);
            this.delay.setVisible(false);
            this.skipWave.setVisible(false);
			this.buttonImg.setVisible(false); */
			
            switch (GV.WAVE) {
                case 1: //Spawn 10 skeletons
                    if (GV.SPAWNED < 10) {
                        var enemy = GV.ENEMY_GROUP[1].get(GV.ENEMY_ARRAY[1]);
                        if (enemy) {
                            enemy.setActive(true);
                            enemy.setVisible(true);
                            enemy.startOnPath(GV.WALKPATH);
                            this.nextEnemy = time + GV.ENEMY_SPAWN_RATE;
                            GV.SPAWNED += 1;
                        }
                    }
                    else if (GV.ENEMY_GROUP[1].countActive(true) === 0) {
                        /* this.complete.setVisible(true);
                        this.delay.setVisible(true);
                        this.skipWave.setVisible(true);
						this.buttonImg.setVisible(true); */
						
						
                        GV.SPAWNED = 0;
                        GV.WAVE += 1;
                        this.nextEnemy = time + GV.WAVE_DELAY;
                    }
                    break;
                case 2: //10 Witches
                    if (GV.SPAWNED < 10) {
                        enemy = GV.ENEMY_GROUP[7].get(GV.ENEMY_ARRAY[7]);
                        if (enemy) {
                            enemy.setActive(true);
                            enemy.setVisible(true);
                            enemy.startOnPath(GV.WALKPATH);
                            this.nextEnemy = time + GV.ENEMY_SPAWN_RATE;
                            GV.SPAWNED += 1;
                        }
                    }
                    else if (GV.ENEMY_GROUP[7].countActive(true) === 0) {
    /*                     this.complete.setVisible(true);
                        this.delay.setVisible(true);
                        this.skipWave.setVisible(true);
						this.buttonImg.setVisible(true); */
						
                        GV.SPAWNED = 0;
                        GV.WAVE += 1;
                        this.nextEnemy = time + GV.WAVE_DELAY;
                    }
                    break;
                case 3: //10 Goblins
                    if (GV.SPAWNED < 10) {
                        enemy = GV.ENEMY_GROUP[3].get(GV.ENEMY_ARRAY[3]);
                        if (enemy) {
                            enemy.setActive(true);
                            enemy.setVisible(true);
                            enemy.startOnPath(GV.WALKPATH);
                            this.nextEnemy = time + GV.ENEMY_SPAWN_RATE;
                            GV.SPAWNED += 1;
                        }
                    }
                    else if (GV.ENEMY_GROUP[3].countActive(true) === 0) {
                        /* this.complete.setVisible(true);
                        this.delay.setVisible(true);
                        this.skipWave.setVisible(true);
						this.buttonImg.setVisible(true); */
						
                        GV.SPAWNED = 0;
                        GV.WAVE += 1;
                        this.nextEnemy = time + GV.WAVE_DELAY;
                    }
                    break;
                case 4: //10 Bats
                    if (GV.SPAWNED < 10) {
                        enemy = GV.ENEMY_GROUP[2].get(GV.ENEMY_ARRAY[2]);
                        if (enemy) {
                            enemy.setActive(true);
                            enemy.setVisible(true);
                            enemy.startOnPath(GV.FLYPATH);
                            this.nextEnemy = time + GV.ENEMY_SPAWN_RATE;
                            GV.SPAWNED += 1;
                        }
                    }
                    else if (GV.ENEMY_GROUP[2].countActive(true) === 0) {
/*                         this.complete.setVisible(true);
                        this.delay.setVisible(true);
                        this.skipWave.setVisible(true);
						this.buttonImg.setVisible(true); */
						
                        GV.SPAWNED = 0;
                        GV.WAVE += 1;
                        this.nextEnemy = time + GV.WAVE_DELAY;
                    }
                    break;
                case 5: //skeletons + miniboss
                    if (GV.SPAWNED < 10) {
                        enemy = GV.ENEMY_GROUP[1].get(GV.ENEMY_ARRAY[1]);
                        if (enemy) {
                            enemy.setActive(true);
                            enemy.setVisible(true);
                            enemy.startOnPath(GV.WALKPATH);
                            this.nextEnemy = time + GV.ENEMY_SPAWN_RATE;
                            GV.SPAWNED += 1;
                        }
                        if (GV.SPAWNED == 5) {
                            enemy = GV.ENEMY_GROUP[6].get(GV.ENEMY_ARRAY[6]);
                            enemy.setActive(true);
                            enemy.setVisible(true);
                            enemy.startOnPath(GV.WALKPATH);
                        }
                    }
                    else if (GV.ENEMY_GROUP[1].countActive(true) === 0 && GV.ENEMY_GROUP[6].countActive(true) === 0) {
/*                         this.complete.setVisible(true);
                        this.delay.setVisible(true);
                        this.skipWave.setVisible(true);
						this.buttonImg.setVisible(true); */
						
                        GV.SPAWNED = 0;
                        GV.WAVE += 1;
                        this.nextEnemy = time + GV.WAVE_DELAY;
                    }
                    break;
                case 6: // 20 goblins spawned in a bunch (3)
                    if (GV.SPAWNED < 20) {
                        enemy = GV.ENEMY_GROUP[3].get(GV.ENEMY_ARRAY[3]);
                        if (enemy) {
                            enemy.setActive(true);
                            enemy.setVisible(true);
                            enemy.startOnPath(GV.WALKPATH);
                            this.nextEnemy = time + 250;
                            GV.SPAWNED += 1;
                        }
                    }
                    else if (GV.ENEMY_GROUP[3].countActive(true) === 0) {
/*                         this.complete.setVisible(true);
                        this.delay.setVisible(true);
                        this.skipWave.setVisible(true);
						this.buttonImg.setVisible(true); */
						
                        GV.SPAWNED = 0;
                        GV.WAVE += 1;
                        this.nextEnemy = time + GV.WAVE_DELAY;
                    }
                    break;
                case 7: //Witches(7) + Bats(2) spawn together
                    if (GV.SPAWNED < 20) {
                        if (GV.SPAWNED % 2 === 0) {
                            enemy = GV.ENEMY_GROUP[2].get(GV.ENEMY_ARRAY[2]);
                            if (enemy) {
                                enemy.setActive(true);
                                enemy.setVisible(true);
                                enemy.startOnPath(GV.FLYPATH);
                                this.nextEnemy = time + GV.ENEMY_SPAWN_RATE / 2;
                                GV.SPAWNED += 1;
                            }
                        }
                        else {
                            enemy = GV.ENEMY_GROUP[7].get(GV.ENEMY_ARRAY[7]);
                            if (enemy) {
                                enemy.setActive(true);
                                enemy.setVisible(true);
                                enemy.startOnPath(GV.WALKPATH);
                                this.nextEnemy = time + GV.ENEMY_SPAWN_RATE / 2;
                                GV.SPAWNED += 1;
                            }
                        }
                    }
                    else if (GV.ENEMY_GROUP[2].countActive(true) === 0 && GV.ENEMY_GROUP[7].countActive(true) === 0) {
/*                         this.complete.setVisible(true);
                        this.delay.setVisible(true);
                        this.skipWave.setVisible(true);
						this.buttonImg.setVisible(true); */
						
                        GV.SPAWNED = 0;
                        GV.WAVE += 1;
                        this.nextEnemy = time + GV.WAVE_DELAY;
                    }
                    break;
                case 8: //Mass spawn of skeletons
                    if (GV.SPAWNED < 25) {
                        enemy = GV.ENEMY_GROUP[1].get(GV.ENEMY_ARRAY[1]);
                        if (enemy) {
                            enemy.setActive(true);
                            enemy.setVisible(true);
                            enemy.startOnPath(GV.WALKPATH);
                            this.nextEnemy = time + 500;
                            GV.SPAWNED += 1;
                        }
                    }
                    else if (GV.ENEMY_GROUP[1].countActive(true) === 0) {
/*                         this.complete.setVisible(true);
                        this.delay.setVisible(true);
                        this.skipWave.setVisible(true);
						this.buttonImg.setVisible(true); */

                        GV.SPAWNED = 0;
                        GV.WAVE += 1;
                        this.nextEnemy = time + GV.WAVE_DELAY;
                    }
                    break;
                case 9: //Spawn skeletons, witches and goblins
                    if (GV.SPAWNED < 30) {
                        if (GV.SPAWNED % 3 === 0) {
                            enemy = GV.ENEMY_GROUP[3].get(GV.ENEMY_ARRAY[3]);
                            if (enemy) {
                                enemy.setActive(true);
                                enemy.setVisible(true);
                                enemy.startOnPath(GV.WALKPATH);
                                this.nextEnemy = time + GV.ENEMY_SPAWN_RATE / 3;
                                GV.SPAWNED += 1;
                            }
                        }
                        else if (GV.SPAWNED % 2 === 0) {
                            enemy = GV.ENEMY_GROUP[7].get(GV.ENEMY_ARRAY[7]);
                            if (enemy) {
                                enemy.setActive(true);
                                enemy.setVisible(true);
                                enemy.startOnPath(GV.WALKPATH);
                                this.nextEnemy = time + GV.ENEMY_SPAWN_RATE / 3;
                                GV.SPAWNED += 1;
                            }
                        }
                        else {
                            enemy = GV.ENEMY_GROUP[1].get(GV.ENEMY_ARRAY[1]);
                            if (enemy) {
                                enemy.setActive(true);
                                enemy.setVisible(true);
                                enemy.startOnPath(GV.WALKPATH);
                                this.nextEnemy = time + GV.ENEMY_SPAWN_RATE / 3;
                                GV.SPAWNED += 1;
                            }
                        }
                    }
                    else if (GV.ENEMY_GROUP[3].countActive(true) === 0 && GV.ENEMY_GROUP[1].countActive(true) === 0 && GV.ENEMY_GROUP[7].countActive(true) === 0) {
/*                         this.complete.setVisible(true);
                        this.delay.setVisible(true);
                        this.skipWave.setVisible(true);
						this.buttonImg.setVisible(true); */

                        GV.SPAWNED = 0;
                        GV.WAVE += 1;
                        this.nextEnemy = time + GV.WAVE_DELAY;
                    }
                    break;
                case 10: //Ogre Boss
                    if (GV.SPAWNED < 2) {
                        enemy = GV.ENEMY_GROUP[4].get(GV.ENEMY_ARRAY[4]);
                        if (enemy) {
                            enemy.setActive(true);
                            enemy.setVisible(true);
                            enemy.startOnPath(GV.WALKPATH);
                            this.nextEnemy = time + 5000;
                            GV.SPAWNED += 1;
                        }
                    }
                    else if (GV.ENEMY_GROUP[4].countActive(true) === 0) {                   
                        this.delay.destroy();
                        this.complete.destroy();
                        this.skipWave.destroy();
                        this.scene.remove('HUD');
                        this.add.text(this.game.renderer.width / 2 - 150, 200, 'VICTORY', { fontFamily: 'VT323', fontSize: 150, color: '#ffffff', align: 'center' });
                        this.scene.transition({
                            target: CST.SCENES.TRANSITION1,
                            duration: 3000,
                            moveBelow: true
                            //sleep: true
                        })

                        /*this.cameras.main.once('camerafadeoutcomplete', ()=> {                        
                            this.scene.start(CST.SCENES.TRANSITION1);
                        });
                        this.cameras.main.fade(2500, 0, 0, 0, false);*/
                    }
                    break;
            }

        }
    }
}