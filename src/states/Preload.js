import Phaser from 'phaser';

export default class extends Phaser.State {
  preload() {
    // индикатор загрузки
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bar');
    this.preloadBar.anchor.setTo(0.5);
    this.load.setPreloadSprite(this.preloadBar);

    // подгрузи ассеты для всей игры здесь
    this.load.image('road', 'assets/images/road.png');
    this.load.image('sky', 'assets/images/sky.png');
    this.load.image('tree', 'assets/images/tree.png');
    this.load.image('hill', 'assets/images/hill.png');
    this.load.image('ground', 'assets/images/ground.png');

    // по завершении загрузки ассетов, перейди в другой state
    this.load.onLoadComplete.add(() => {
      this.game.state.start('Game');
    }, this);
  }
}
