class Slime extends MovableObject {

    constructor() {
        super().loadImage('../assets/img/SlimeGreen/SlimeBasic_00000.png');

        this.x = 200 + Math.random()*500;
        this.width = 45;
        this.height = 45;
        this.y = 340;
    }

}