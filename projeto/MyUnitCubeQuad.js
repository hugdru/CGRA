/**
 * MyObject
 * @constructor
 */
function MyUnitCubeQuad(scene) {
    CGFobject.call(this, scene);

    this.quad = new MyQuad(this.scene, 0.0, 1.0, 0.0, 1.0);
    this.quad.initBuffers();
}

MyUnitCubeQuad.prototype = Object.create(CGFobject.prototype);
MyUnitCubeQuad.prototype.constructor = MyUnitCubeQuad;

MyUnitCubeQuad.prototype.display = function() {
    var deg2rad = Math.PI / 180.0;
    var a_rad = 90.0 * deg2rad;


    //face da frente
    this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.quad.display();
    this.scene.popMatrix();

    //face de cima
    this.scene.pushMatrix();
        this.scene.rotate(-1 * a_rad, 1, 0, 0);
        this.scene.translate(0, 0, 0.5);
        this.quad.display();
    this.scene.popMatrix();

    //face da trás
    this.scene.pushMatrix();
        this.scene.rotate(-2 * a_rad, 1, 0, 0);
        this.scene.translate(0, 0, 0.5);
        this.quad.display();
    this.scene.popMatrix();

    //face da baixo
    this.scene.pushMatrix();
        this.scene.rotate(-3 * a_rad, 1, 0, 0);
        this.scene.translate(0, 0, 0.5);
        this.quad.display();
    this.scene.popMatrix();

    //face da direita
    this.scene.pushMatrix();
        this.scene.rotate(a_rad, 0, 1, 0);
        this.scene.translate(0, 0, 0.5);
        this.quad.display();
    this.scene.popMatrix();

    //face da esquerda
    this.scene.pushMatrix();
        this.scene.rotate(-1 * a_rad, 0, 1, 0);
        this.scene.translate(0, 0, 0.5);
        this.quad.display();
    this.scene.popMatrix();

};
