var GV = require('./Globals.js');
var CS = require('./Classes.js');

//build the pathing and map for level
export function buildMap(scene, mapBG){
	//path to which enemey follows
/*     var graphics = scene.add.graphics();    
    drawLines(graphics);
    GV.WALKPATH = scene.add.path(0, 352);		//start point for path coords
    GV.WALKPATH.lineTo(416, 352);
    GV.WALKPATH.lineTo(416, 160);
    GV.WALKPATH.lineTo(800, 160);
    GV.WALKPATH.lineTo(800, 608);
    GV.WALKPATH.lineTo(608, 608);
    GV.WALKPATH.lineTo(608, 864);
    GV.WALKPATH.lineTo(1248, 864);
    GV.WALKPATH.lineTo(1248, 544);
    GV.WALKPATH.lineTo(1568, 544);
    GV.WALKPATH.lineTo(1568, 288);
    GV.WALKPATH.lineTo(1920, 288);
    graphics.lineStyle(1, 0xffffff, 1);
    GV.WALKPATH.draw(graphics); */

    /* GV.FLYPATH = scene.add.path(0, 352);
    GV.FLYPATH.lineTo(1920, 288);
    GV.FLYPATH.draw(graphics); */
    
	//add map image
	//scene.add.image(960, 512, mapBG).setDepth(0);

	//add background music
/* 	scene.bgm = scene.sound.add('castlegates');
	scene.bgm.volume = 0.04;
	scene.bgm.loop = true;
	//bgm.play();			 */													//sounds

	
	//menu sounds
	scene.menuSounds = scene.sound.add('menuSounds');
	scene.menuSounds.volume = 0.04;
	scene.menuSounds.loop = false;
	//scene.menuSounds.play();
	
	//map sounds
	scene.mapSounds = scene.sound.add('mapSounds');
	scene.mapSounds.volume = 0.04;
	scene.mapSounds.loop = false;
	//scene.mapSounds.play();
	
	//error sounds
	scene.errorSounds = scene.sound.add('errorSounds');
	scene.errorSounds.volume = 0.04;
	scene.errorSounds.loop = false;
	//scene.errorSounds.play();
	
	//error sounds
	scene.cancelSounds = scene.sound.add('cancelSounds');
	scene.cancelSounds.volume = 0.04;
	scene.cancelSounds.loop = false;
	//scene.cancelSounds.play();
	
	//add HUD
	scene.scene.add('HUD', CS.HUD, true, { x: 680, y: 66 });

	//misc
	scene.nextEnemy = 0;
	scene.physics.add.overlap(GV.ENEMY_GROUP, GV.ATTACK_GROUP, damageEnemy);
    scene.input.mouse.disableContextMenu();
}

//create animations for all enemies and towers
export function createAnimations(scene, sprites, side) {
    for (var i = 0; i < sprites.length; i++) {
		if(side == 0)
		{
			var enemy = sprites[i].enemyName.toLowerCase();
			var frameEnd = sprites[i].frameEnd;
			var movement = "walk";
			if(sprites[i].flying){movement = "fly";}
			
			scene.anims.create({
				key: enemy + "_down",
				frames: scene.anims.generateFrameNames(enemy, { prefix: movement+'_down_', start: 1, end: frameEnd }),
				frameRate: 5,
				repeat: -1
			});
			scene.anims.create({
				key: enemy + "_right",
				frames: scene.anims.generateFrameNames(enemy, { prefix: movement+'_right_', start: 1, end: frameEnd }),
				frameRate: 5,
                repeat: -1
			}); 
			scene.anims.create({
			    key: enemy + "_up",
			    frames: scene.anims.generateFrameNames(enemy, { prefix: movement+'_up_', start: 1, end: frameEnd }),
			    frameRate: 5,
			    repeat: -1
			}); 
		}
		if(side == 1)
		{
			var tower = sprites[i].towerName.toLowerCase();

			scene.anims.create({
				key: tower + "_idle",
				frames: scene.anims.generateFrameNames(tower, { prefix: 'idle_down_', start: 1, end: 2 }),
				frameRate: 5,
				repeat: -1
			});
			scene.anims.create({
				key: tower + "_atk",
				frames: scene.anims.generateFrameNames(tower, { prefix: 'atk_down_', start: 1, end: 5 }),
				frameRate: 15* 325/sprites[i].atkRate,
				repeat: -1
			}); 
			
		}
	}
}

//highlights the location the user clicks on to place/upgrade/remove tower
export function highlightLoc(scene, i, j){

	//checks if highlight box exists already, if so destroy before creating a new one.
	if(typeof scene.lightBox === 'object'){scene.lightBox.destroy();}
	
	//create a box at any clickable location on the map
	if(GV.MAP[i][j] != -1)
	{
		scene.scene.mapSounds.play();
		var x = j * 64 + 64/2;
		var y = i * 64 + 64/2;
		//var shape = new Phaser.Geom.Circle(0, 0, 20);
		var shape = new Phaser.Geom.Rectangle(-32, -32, 64, 64);
		scene.lightBox = scene.scene.add.particles('highlight');
		scene.lightBox.createEmitter({
			x: x, 
			y: y,
			//tint: 0xff00ff,
			scale: { start: 0.3, end: 0 },
			frequency: 15,
			blendMode: 'SCREEN',
			emitZone: { type: 'edge', source: shape, quantity: 30, yoyo: false}
		});
	}
}

export function showTowerRange(scene, i, j) {
	
	if(typeof scene.rangeCircle ==='object'){scene.rangeCircle.destroy();}
	
	if(typeof GV.MAP[i][j] === 'object') {
		var x = j * 64 + 64/2;
		var y = i * 64 + 64/2;
		scene.rangeCircle = scene.scene.add.circle(x, y, GV.MAP[i][j].atkRange, 0x0099ff, 127);
	}
}

export function waveHUD(scene, t){
	if(t == 0)
	{		
		function onCompleteHandler (tween, targets, myImage)
		{
			scene.complete.setVisible(false);
			scene.delay.setVisible(false);
			scene.skipWave.setVisible(false);
			scene.buttonImg.setVisible(false);
			
			scene.complete.setPosition(1660, 1008);
			scene.buttonImg.setPosition(1660, 1008);
			scene.delay.setPosition(1660, 1008);
			scene.skipWave.setPosition(1660, 1008);
		}
		
		scene.tweens.add({
			targets: [scene.buttonImg, scene.delay, scene.skipWave],
			x: -1150,
			ease: 'Linear',
			duration: 200,
			delay: 0,
			repeat: 0,
			onComplete: onCompleteHandler
		});
		

	}
	else if(t == (GV.WAVE_DELAY/1000) || t == (GV.WAVE_DELAY/1000)-1)
	{
		scene.complete.setVisible(true);
		scene.delay.setVisible(true);
		scene.skipWave.setVisible(true);
		scene.buttonImg.setVisible(true);
		
		scene.tweens.add({
			targets: [scene.buttonImg, scene.delay, scene.skipWave],
			x: 1150,
			ease: 'Linear',
			duration: 200,
			delay: 0,
			repeat: 0
		});
	}
}

export function createButton(scene, x, y, z, title){

	var height = 965 - z;
	var buttonImg = scene.scene.add.image(x, y, 'towerbutton').setDepth(1);
    var buttonText = scene.scene.add.text(x, y, title, { fontFamily: 'VT323', fontSize: 30, color: '#ffffff' }).setDepth(2).setOrigin(0.5);
	var buttonBG = scene.scene.add.image(x, y, 'towerButtonBG').setDepth(0);
	
	GV.BUTTON_GROUP.add(buttonImg);
	GV.BUTTON_GROUP.add(buttonText);
	GV.BUTTON_GROUP.add(buttonBG);

	scene.scene.tweens.add({
		targets: [buttonImg, buttonText,buttonBG],
		y: height,
		ease: 'Linear',
		duration: 200,
		delay: 0,
		repeat: 0
	});
	
	return buttonImg;
}

export function placeTowerAction(pointer, scene, i, j){
	
    var placetowerImg = createButton(scene, 1660, 1024, 0, "Place Tower");
	
    placetowerImg.setInteractive({ useHandCursor: true }).on('pointerdown', ()=> {
        GV.BUTTON_GROUP.clear(true,true);
		scene.scene.menuSounds.play();
		var peasantImg = createButton(scene,1660, 1024, 0, "Peasant | 5g");
		
        peasantImg.setInteractive({ useHandCursor: true }).on('pointerdown', function (event) {
            var hud = this.scene.get('HUD');
			var newTower = GV.TOWER_GROUP[GV.PEASANT_STATS.towerId].get(GV.PEASANT_STATS);
			//have to set new tower to false for active and visible because it was placing
			//the tower while the menu was open before actually selecting an upgrade
			newTower.setActive(false);
			newTower.setVisible(false);
			if (newTower.checkCost())
			{
				newTower.placeTower(i, j, scene);
				GV.BUTTON_GROUP.clear(true,true);
			}
			else
			{
				scene.scene.errorSounds.play();
				GV.BUTTON_GROUP.clear(true,true);
				createButton(scene,1660, 1024, 0, "Not Enough Gold");
				cancelAction(scene);
            }

            hud.tooltipText.setVisible(false);
            hud.tooltip.setVisible(false);
            scene.upgradeCircle.destroy();
        }, scene.scene);

        peasantImg.on('pointerover', function (event) {
            var hud = this.scene.get('HUD');
            hud.tooltip.setVisible(true);
            var towerInfo = [
                GV.PEASANT_STATS.towerName,
                "Attack Speed:  " + GV.PEASANT_STATS.atkRate,
                "Attack Range:  " + GV.PEASANT_STATS.atkRange,
                "Damage:        " + GV.PEASANT_STATS.str,
                "Damage Type:   " + GV.PEASANT_STATS.atkType,
                "Hit Flying:    " + GV.PEASANT_STATS.hitFly,
                ];

            //Add Attack Range Visibly
            var x = j * 64 + 64 / 2;
            var y = i * 64 + 64 / 2;
            scene.upgradeCircle = scene.scene.add.circle(x, y, GV.PEASANT_STATS.atkRange, 0xffffff, 0.25);

            hud.tooltipText.setText(towerInfo);
            hud.tooltipText.setVisible(true);
        }, scene.scene);

        peasantImg.on('pointerout', function(event) {
            var hud = this.scene.get('HUD');
            hud.tooltip.setVisible(false);
            hud.tooltipText.setVisible(false);
            scene.upgradeCircle.destroy();
        }, scene.scene);
    });

  
}


export function removeTowerAction(pointer, scene, i, j){
	var removeButtonImg = createButton(scene,1660, 1024, 0, "Remove Tower");
	
	removeButtonImg.setInteractive({ useHandCursor: true }).on('pointerdown', () =>{
		scene.scene.menuSounds.play();
		var tower = GV.MAP[i][j];
		if(typeof tower ==="object")
		{
			tower.removeTower(i, j, scene);
		}
		
		GV.BUTTON_GROUP.clear(true,true);
	});
}

export function upgradeTowerAction(i, j, scene, pointer, id){
    removeTowerAction(pointer, scene, i, j);

	var upgradeButtonImg = createButton(scene,1660, 1024, 54, "Upgrade tower");
	
	upgradeButtonImg.setInteractive({ useHandCursor: true }).on('pointerdown', () =>{
		scene.scene.menuSounds.play();
		GV.BUTTON_GROUP.clear(true,true);
        cancelAction(scene);
        
		if(GV.TOWER_ARRAY[id].upgrades)
		{
			var numOfUpgrades = GV.TOWER_ARRAY[id].upgrades.length;
			var currTower = GV.MAP[i][j];
			var z = 0;
			
			for (var count = 0; count < numOfUpgrades; count++) 
			{
				var upgradeID = GV.TOWER_ARRAY[id].upgrades[count];
				var upgradedTower = GV.TOWER_ARRAY[upgradeID];
				var newTower = GV.TOWER_GROUP[upgradeID].get(upgradedTower);
				//have to set new tower to false for active and visible because it was placing
				//the tower while the menu was open before actually selecting an upgrade
				newTower.setActive(false);
				newTower.setVisible(false);
				
				var towerButton = new CS.TowerButton(scene.scene, z);
				towerButton.upgradeTowerButton(pointer,scene, currTower, newTower,i,j); 

               	z = z + 54;	
			}
		}
		else
		{
			//removeTowerAction(pointer, scene, i, j);
			createButton(scene,1660, 1024, 0, "No Upgrades");

		}
		
	});		
}

export function cancelAction(scene){
	var cancelImg = scene.scene.add.image(1780, 1024, 'cancel').setDepth(1);
	GV.BUTTON_GROUP.add(cancelImg);
	
	scene.scene.tweens.add({
		targets: cancelImg,
		y: 965,
		ease: 'Linear',
		duration: 200,
		delay: 0,
		repeat: 0
	});
	
	cancelImg.setInteractive({ useHandCursor: true }).on('pointerdown', () =>{
		GV.BUTTON_GROUP.clear(true,true);
        scene.scene.cancelSounds.play();
	});
}

//user input related actions 
export function userAction(pointer, scene){
	var i = Math.floor(pointer.y/64);
	var j = Math.floor(pointer.x/64);
	if (pointer.leftButtonDown())
    {
		//highlight location clicked by user
		highlightLoc(scene, i, j);
		
		showTowerRange(scene, i , j);
		
		if(GV.MAP[i][j] != -1){GV.BUTTON_GROUP.clear(true,true);}
		
		//if new tower
		if(GV.MAP[i][j] == 0)
		{	
            cancelAction(scene);
			placeTowerAction(pointer, scene, i, j);
		}
		else if(typeof GV.MAP[i][j] ==="object")
		{
            cancelAction(scene);
			upgradeTowerAction(i, j, scene, pointer, GV.MAP[i][j].towerId);
		}
	}
}

export function getEnemy(x, y, distance, hitFly) {
    for (var j = 0; j < GV.ENEMY_GROUP.length; j++)
    {
        var enemyUnits = GV.ENEMY_GROUP[j].getChildren();
        for(var i = 0; i < enemyUnits.length; i++) {       
            if(enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) < distance)
                if (hitFly || !enemyUnits[i].flying)
                    return enemyUnits[i];
        }
    }
    return false;
} 

export function damageEnemy(enemy, attack) {  
    // only if both enemy and attack are alive
    if (enemy.active === true && attack.active === true) {
        // we remove the attack right away
        attack.setActive(false);
        attack.setVisible(false);    
        
        // decrease the enemy hp with ATTACK_DAMAGE
        enemy.receiveDamage(attack.damage);
        //damage.play();
    }
}

export function drawLines(graphics) {
    graphics.lineStyle(1, 0x0000ff, 0.8);
    for(var i = 0; i < 16; i++) {
        graphics.moveTo(0, i * 64);
        graphics.lineTo(1920, i * 64);
    }
    for(var j = 0; j < 30; j++) {
        graphics.moveTo(j * 64, 0);
        graphics.lineTo(j * 64, 1024);
    }
    graphics.strokePath();
}	

export function addAttack(x, y, angle, damage, type, towerID) {
	//REMOVE try/catch once all attack classes are finished.
	try {
		 var attack = GV.ATTACK_GROUP[towerID].get();
	}
	catch(err) {
		 var attack = GV.ATTACK_GROUP[0].get();
	}
   
   //var attack = GV.ATTACK_GROUP[towerID].get();
   
    if (attack)
    {
		console.log(attack);
        attack.fire(x, y, angle, damage, type);
    }
}