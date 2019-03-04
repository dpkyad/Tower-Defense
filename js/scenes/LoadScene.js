import { CST} from "../CST";

export class LoadScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.LOAD
        })
    }

    preload(){
		this.load.image('HUD', 'assets/HUD.png');
		this.load.image('vol', 'assets/volume.png');
		this.load.image('volDown', 'assets/volDown.png');
		this.load.image('play', 'assets/play.png');
		this.load.image('playDown', 'assets/playDown.png');
		this.add.text(230, 230, 'Loading', { font: '50px Arial', fill: '#fff' });
		 
        this.load.atlas('apprentice', 'assets/towers/apprentice.png', 'assets/towers/towers.json');
		this.load.atlas('archer', 'assets/towers/archer.png', 'assets/towers/towers.json');
		this.load.atlas('assassin', 'assets/towers/assassin.png', 'assets/towers/towers.json');
		this.load.atlas('beastmaster', 'assets/towers/beastmaster.png', 'assets/towers/towers.json');
		this.load.atlas('cannoneer', 'assets/towers/cannoneer.png', 'assets/towers/towers.json');
        this.load.atlas('commander', 'assets/towers/commander.png', 'assets/towers/towers.json');
        this.load.atlas('cutpurse', 'assets/towers/cutpurse.png', 'assets/towers/towers.json');
        this.load.atlas('duelist', 'assets/towers/duelist.png', 'assets/towers/towers.json');
        this.load.atlas('firemage', 'assets/towers/firemage.png', 'assets/towers/towers.json');
		this.load.atlas('priestess', 'assets/towers/highpriestess.png', 'assets/towers/towers.json');
		this.load.atlas('icemage', 'assets/towers/icemage.png', 'assets/towers/towers.json');
        this.load.atlas('knight', 'assets/towers/knight.png', 'assets/towers/towers.json');
        this.load.atlas('lightningmage', 'assets/towers/lightningmage.png', 'assets/towers/towers.json');
        this.load.atlas('paladin', 'assets/towers/paladin.png', 'assets/towers/towers.json');
		this.load.atlas('peasant', 'assets/towers/peasant.png', 'assets/towers/towers.json');
		this.load.image('placeholder', 'assets/towers/placeholder.png');
		this.load.atlas('ranger', 'assets/towers/ranger.png', 'assets/towers/towers.json');
        this.load.atlas('rifleman', 'assets/towers/rifleman.png', 'assets/towers/towers.json');
        this.load.atlas('sharpshooter', 'assets/towers/sharpshooter.png', 'assets/towers/towers.json');
		this.load.atlas('soldier', 'assets/towers/soldier.png', 'assets/towers/towers.json');
		this.load.atlas('sorceress', 'assets/towers/sorceress.png', 'assets/towers/towers.json');
		this.load.atlas('swordmaster', 'assets/towers/swordmaster.png', 'assets/towers/towers.json');
		this.load.atlas('warlock', 'assets/towers/warlock.png', 'assets/towers/towers.json');
        this.load.atlas('wizard', 'assets/towers/wizard.png', 'assets/towers/towers.json');

		//load enemy sprites, will be a loop like load tower sprites
        this.load.atlas('deathknight', 'assets/deathknight.png', 'assets/deathknight.json');
        this.load.atlas('skeleton', 'assets/skeleton.png', 'assets/skeleton.json');
        this.load.atlas('bat', 'assets/bat.png', 'assets/bat.json');
        this.load.atlas('ogre', 'assets/ogre.png', 'assets/ogre.json');
        this.load.atlas('goblin', 'assets/goblin.png', 'assets/goblin.json');
        this.load.atlas('bossskeleton', 'assets/bossskeleton.png', 'assets/bossskeleton.json');
        this.load.atlas('reaper', 'assets/reaper.png', 'assets/reaper.json');
        this.load.atlas('witch', 'assets/witch.png', 'assets/witch.json');
        this.load.atlas('ghost', 'assets/ghost.png', 'assets/ghost.json');
        this.load.atlas('jacko', 'assets/jacko.png', 'assets/jacko.json');
        this.load.atlas('horseman', 'assets/horseman.png', 'assets/horseman.json');
		
		//load map
		//this.load.image('map', 'assets/castle-gates.png', { frameWidth: 640, frameHeight: 512 });
		this.load.image('map', 'assets/castle gates - big.png', { frameWidth: 1920, frameHeight: 1024 });
		this.load.image('map2', 'assets/armory.png', { frameWidth: 640, frameHeight: 512 });
		
		//load sounds
		this.load.audio('dkDeath', 'assets/Sounds/Death Screams/Human/sfx_deathscream_human5.wav');
		this.load.audio('hit', 'assets/Sounds/General Sounds/Simple Damage Sounds/sfx_damage_hit2.wav');
		this.load.audio('walk', 'assets/Sounds/Movement/Footsteps/sfx_movement_footstepsloop4_slow.wav');
		this.load.audio('background', 'assets/Sounds/random silly chip song.ogg');
		this.load.audio('upgradeSound', 'assets/Sounds/General Sounds/Positive Sounds/sfx_sounds_powerup6.wav');
		this.load.audio('explosionSound', 'assets/Sounds/Explosions/Short/sfx_exp_short_hard2.wav');
		this.load.audio('menuSounds', 'assets/Sounds/Other/FFmenu.wav');
		this.load.audio('mapSounds', 'assets/Sounds/Other/00029.wav');
		this.load.audio('errorSounds', 'assets/Sounds/Other/Cursor No.wav');
		this.load.audio('cancelSounds', 'assets/Sounds/Other/Cursor Cancel.wav');
		
		//load misc
		//this.load.image('towerbutton', './assets/buttons/blackbox.png');
		this.load.image('tomato', 'assets/attacks/Tomato.png');
		this.load.image('arrow', 'assets/attacks/Arrow.png');
		this.load.image('sword', 'assets/attacks/Sword.png');
		this.load.image('whitemagic', 'assets/attacks/WhiteMagic.png');
		this.load.image('bluemagic', 'assets/attacks/BlueMagic.png');
		this.load.image('pinkmagic', 'assets/attacks/PinkMagic.png');
		this.load.image('coin', 'assets/attacks/coin.png');
		this.load.image('highlight', 'assets/blue.png');
		this.load.image('explosion', 'assets/muzzleflash3.png');
		this.load.image('menuscreen', 'assets/bg.png', { frameWidth: 1280, frameHeight: 1024 });
		this.load.image('newgame', 'assets/new.png');
        this.load.image('bottomHUD', 'assets/bottomHUD.png');
        this.load.image('waveHUD', 'assets/waveHUD.png');
        this.load.image('towerbutton', 'assets/menuBar.png');
        this.load.image('cancel', 'assets/cancel.png');
        this.load.image('towerButtonBG', 'assets/towerButtonBG.png');
    }
    create(){
        //Creating menu screen background layers

        this.scene.start(CST.SCENES.MENU, "Loading complete");
        }
}