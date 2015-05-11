/**
 * MyLamp
 * @constructor
 */
function MyLamp(scene, tetaDivisions, phiDivisions, surfaceAppearance, minS, maxS, minT, maxT) {
    CGFobject.call(this, scene);

    this.lamp = new MySemiSphericalSurface(scene, tetaDivisions, phiDivisions, surfaceAppearance, minS, maxS, minT, maxT);
}

MyLamp.prototype = Object.create(CGFobject.prototype);
MyLamp.prototype.constructor = MyLamp;

MyLamp.prototype.display = function() {
    this.lamp.display();
};
