class CollectableObject extends MovableObject {

    collected = false;

    Mana_Images = [
        'assets/img/CollectableMana/Mana1.png',
        'assets/img/CollectableMana/Mana2.png',
        'assets/img/CollectableMana/Mana3.png',
        'assets/img/CollectableMana/Mana4.png',
    ]

    constructor(x, y) {
        super();
        this.loadImage(this.Mana_Images[0]);
        this.loadImages(this.Mana_Images);
        this.x = 200 + Math.random() * 1000;
        this.y = 200 + Math.random() * 70;
        this.width = 20;
        this.height = 20;        
        this.animateMana();
    }

    animateMana() {
        setInterval(() => {
            this.playAnimation(this.Mana_Images);
            }, 100);
        }    
}