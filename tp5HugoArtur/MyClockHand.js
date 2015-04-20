/**
 * MyClockHand
 * @constructor
 */
function MyClockHand(scene) {
    CGFobject.call(this, scene);
    this.hand = new MyQuad(this.scene, 0, 1, 0, 1);
    this.angle = 0;
    this.degToRad = Math.PI / 180.0;
}

MyClockHand.prototype = Object.create(CGFobject.prototype);
MyClockHand.prototype.constructor = MyClockHand;

MyClockHand.prototype.display = function() {
    this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(this.angle, 0, 0, -1);
        this.hand.display();
    this.scene.popMatrix();
};

MyClockHand.prototype.setAngle = function(angle) {
    this.angle = degToRad * angle;
}
