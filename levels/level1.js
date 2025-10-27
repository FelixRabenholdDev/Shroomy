const level1 = new Level(
  [new Slime(), new Slime(), new Slime(), new Slime(), new Endboss()],
  [new CollectableObject(), new CollectableObject(), new CollectableObject(), new CollectableObject()],
  [
    new BackgroundObject('assets/img/Background/backgroundInverted.jpg', -719, 0),
    new BackgroundObject('assets/img/Background/background.jpg', 0, 0),
    new BackgroundObject('assets/img/Background/backgroundInverted.jpg', 719, 0),
    new BackgroundObject('assets/img/Background/background.jpg', 719 * 2, 0),
    new BackgroundObject('assets/img/Background/backgroundInverted.jpg', 719 * 3, 0),
  ]
);
