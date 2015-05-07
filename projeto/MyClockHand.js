/**
 * MyClockHand
 * @constructor
 */
function MyClockHand(scene, scaleX, scaleY, angle) {
    CGFobject.call(this, scene);

    this.scaleX = scaleX;
    this.scaleY = scaleY;

    this.hand = new MyQuad(this.scene, 0, 1, 0, 1);
    this.degreeToRad = Math.PI / 180;

    if (typeof angle !== 'undefined') {
        this.setAngle(angle);
    } else {
        this.angle = 0;
    }
}

MyClockHand.prototype = Object.create(CGFobject.prototype);
MyClockHand.prototype.constructor = MyClockHand;

MyClockHand.prototype.display = function() {
    this.scene.pushMatrix();
        this.scene.rotate(this.angle, 0, 0, -1);
        this.scene.scale(this.scaleX, this.scaleY, 1);
        this.scene.translate(0, 0.5, 0);
        this.hand.display();
    this.scene.popMatrix();
};

MyClockHand.prototype.setAngle = function(angle) {
    this.angle = angle * this.degreeToRad;
};

MyClockHand.prototype.getAngle = function() {
    return this.angle / this.degreeToRad;
}
