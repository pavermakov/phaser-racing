/* globals __DEV__ */
import Phaser from 'phaser';

export default class extends Phaser.State {
  init() {
    this.gameData = {
      treeSpawn: {
        left: {
          x: this.world.width * 0.45,
          y: this.world.centerY,
          offsetX: -350,
        },
        right: {
          x: this.world.width * 0.55,
          y: this.world.centerY,
          offsetX: this.world.width + 350,
        }  
      },
      treeScale: 9,
      easing: Phaser.Easing.Exponential.In,
      timing: 1700,
    };
  }

  create() {
    const skyHeight = this.cache.getImage('sky').height;
    this.sky = this.add.tileSprite(0, 0, this.world.width, skyHeight, 'sky');
    this.sky.scale.y =  this.world.centerY / skyHeight;

    this.road = this.add.sprite(0, this.world.centerY, 'road');
    this.road.width = this.world.width;
    this.road.height = this.world.height * 0.5;


    this.trees = this.add.group();

    // timer that creates new tree
    this.treeTimer = this.time.create(false);
    this.treeTimer.loop(200, this._createTrees, this);
    this.treeTimer.start(); 
  }

  _createTrees() {
    const spawnLeft = this.gameData.treeSpawn.left;
    const spawnRight = this.gameData.treeSpawn.right;

    const leftTree = this._createTree(spawnLeft.x, spawnLeft.y, spawnLeft.offsetX);
    const rightTree = this._createTree(spawnRight.x, spawnRight.y, spawnRight.offsetX);
    // console.log(this.trees.length)
  }
  
  _createTree(x, y, offset) {
    let tree = this.trees.getFirstExists(false);
    if(!tree) {
      tree = this.trees.create(x, y, 'tree');
    } else {
      tree.reset(x, y);
    }

    tree.anchor.setTo(0.5);
    tree.scale.setTo(0.01);
    this.trees.sendToBack(tree); 

    this.add.tween(tree).to({ x: offset }, this.gameData.timing, this.gameData.easing, true);
    this.add.tween(tree.scale).to({ x: this.gameData.treeScale, y: this.gameData.treeScale }, this.gameData.timing, this.gameData.easing, true).onComplete.add(() => {
      tree.kill();
    }, this);

    return tree;
  }
}
