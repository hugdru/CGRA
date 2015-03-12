/**
 * MyUnitCubeQuad
 * @param {WebGLRenderingContext} scene
 * @constructor
 */
function MyUnitCubeQuad(scene) {
    CGFobject.call(this, scene);
    this.quad = new MyQuad(this.scene);
    this.quad.initBuffers();
    this.deg90ToRad = Math.PI / 180 * 90;
}

MyUnitCubeQuad.prototype = Object.create(CGFobject.prototype);
MyUnitCubeQuad.prototype.constructor = MyUnitCubeQuad;

MyUnitCubeQuad.prototype.display = function() {

    var i = 0;

    for (i = 0; i < 4; ++i) {
        this.scene.pushMatrix();
            this.scene.rotate(this.deg90ToRad * i, 0, 1, 0);
            this.scene.translate(0, 0, 0.5);
            this.quad.display();
        this.scene.popMatrix();
    }

    this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(this.deg90ToRad, 1, 0, 0);
        this.quad.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(this.deg90ToRad, -1, 0, 0);
        this.quad.display();
    this.scene.popMatrix();

};
