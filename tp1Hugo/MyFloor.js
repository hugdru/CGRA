/**
 * MyFloor
 * @param {WebGLRenderingContext} scene
 * @constructor
 */
function MyFloor(scene, material) {
    CGFobject.call(this, scene);
    this.cube = new MyUnitCubeQuad(this.scene);
    this.cube.initBuffers();
    this.material = material;
}

MyFloor.prototype = Object.create(CGFobject.prototype);
MyFloor.prototype.constructor = MyFloor;

MyFloor.prototype.display = function() {
    this.scene.pushMatrix();
        if (typeof this.material !== 'undefined') this.material.apply();
        this.scene.scale(8, 0.1, 6);
        this.cube.display();
    this.scene.popMatrix();
};

