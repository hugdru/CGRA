/**
 * MyLamp
 * @constructor
 */
function MyLamp(scene, tetaDivisions, phiDivisions, minS, maxS, minT, maxT) {
    CGFobject.call(this, scene);

    this.lamp = new SemiSphericalSurface(scene, tetaDivisions, phiDivisions, minS, maxS, minT, maxT);
}

MyLamp.prototype = Object.create(CGFobject.prototype);
MyLamp.prototype.constructor = MyLamp;

MyLamp.prototype.display = function() {
    this.lamp.display();
};
