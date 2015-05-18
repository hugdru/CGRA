/**
 * MyOldRobot
 * @constructor
 */
function MyOldRobot(scene, minS, maxS, minT, maxT) {
    CGFobject.call(this, scene);

    this.minS = typeof minS !== 'undefined' ? minS : 0;
    this.maxS = typeof maxS !== 'undefined' ? maxS : 1;
    this.minT = typeof minT !== 'undefined' ? minT : 0;
    this.maxT = typeof maxT !== 'undefined' ? maxT : 1;

    this.midS = this.minS + (this.maxS - this.minS) / 2;

    this.translationFromReference = {x: 0, z: 0};
    this.angleFromReference = 0;

    this.movementDifferential = 0.1;
    this.rotationDifferential = Math.PI / 180;

    this.speed = 1;

    this.initBuffers();
}

MyOldRobot.prototype = Object.create(CGFobject.prototype);
MyOldRobot.prototype.constructor = MyOldRobot;

MyOldRobot.prototype.display = function() {

    this.scene.pushMatrix();
        this.scene.translate(this.translationFromReference.x, 0, this.translationFromReference.z);
        this.scene.rotate(this.angleFromReference, 0, 1, 0);
        CGFobject.prototype.display.call(this);
    this.scene.popMatrix();
};

MyOldRobot.prototype.initBuffers = function() {
    this.vertices = [
        0, 0.3, 2,
        0.5, 0.3, 0,
        -0.5, 0.3, 0
    ];

    this.indices = [
        0, 1, 2
    ];

    this.texCoords = [
        this.midS, this.maxT,
        this.maxS, this.minT,
        this.minS, this.minT
    ];

    this.normals = [
        0, 1, 0,
        0, 1, 0,
        0, 1, 0
    ];

    this.primitiveType = this.scene.gl.TRIANGLES;

    this.initGLBuffers();
};

MyOldRobot.prototype.moveForwards = function() {
    this.translationFromReference.x += this.speed * this.movementDifferential * Math.sin(this.angleFromReference);
    this.translationFromReference.z += this.speed * this.movementDifferential * Math.cos(this.angleFromReference);
};

MyOldRobot.prototype.moveBackwards = function() {
    this.translationFromReference.x -= this.speed * this.movementDifferential * Math.sin(this.angleFromReference);
    this.translationFromReference.z -= this.speed * this.movementDifferential * Math.cos(this.angleFromReference);
};

MyOldRobot.prototype.rotateCounterClockWise = function() {
    this.angleFromReference += this.speed * this.rotationDifferential;
};

MyOldRobot.prototype.rotateClockWise = function() {
    this.angleFromReference -= this.speed * this.rotationDifferential;
};

MyOldRobot.prototype.setSpeed= function(speed) {
    this.speed = speed ? speed : 1;
}