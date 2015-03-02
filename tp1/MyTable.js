/**
 * MyTable
 * @param {WebGLRenderingContext} scene
 * @constructor
 */
function MyTable(scene) {
    CGFobject.call(this, scene);
    this.cube = new MyUnitCubeQuad(this.scene);
    this.cube.initBuffers();
}

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor = MyTable;

MyTable.prototype.display = function() {

    // Criar tampo
    this.scene.pushMatrix();
        this.scene.translate(0, 1.90, 0); // (0.3 + 3.5)/2
        this.scene.scale(5, 0.3, 3);
        this.cube.display();
    this.scene.popMatrix();

    // Criar pernas
    this.scene.pushMatrix();
        this.scene.translate(-2.35, 0, -1.35); // -5/2 + 0.3/2, _, -3/2 + 0.3/2
        this.scene.scale(0.3, 3.5, 0.3);
        this.cube.display();
    this.scene.popMatrix();
    this.scene.pushMatrix();
        this.scene.translate(-2.35, 0, 1.35);
        this.scene.scale(0.3, 3.5, 0.3);
        this.cube.display();
    this.scene.popMatrix();
    this.scene.pushMatrix();
        this.scene.translate(2.35, 0, 1.35); // 5/2 - 0.3/2, _, 3/2 - 0.3/2
        this.scene.scale(0.3, 3.5, 0.3);
        this.cube.display();
    this.scene.popMatrix();
    this.scene.pushMatrix();
        this.scene.translate(2.35, 0, -1.35);
        this.scene.scale(0.3, 3.5, 0.3);
        this.cube.display();
    this.scene.popMatrix();
};
