/**
* Represents a collidable object in the game world.
* Extends MovableObject to include collision offsets.
*
* @class CollidableObject
* @extends MovableObject
*/
class CollidableObject extends MovableObject {
/**
* Defines the collision boundaries offset for the object.
* These offsets adjust the effective collision area.
*
* @type {{top: number, bottom: number, left: number, right: number}}
*/
offset = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
};
}