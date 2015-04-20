/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTable(scene) {
    CGFobject.call(this,scene);
    
    this.cube = new MyUnitCubeQuad(this.scene);
    this.cube.initBuffers();
};


MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor=MyTable;

MyTable.prototype.display = function(legsMaterial, BoardMaterial) {

    // LEGS
    //1
    this.scene.pushMatrix();
    this.scene.translate(2.35,1.85,1.35);
    this.scene.scale(0.3,3.5,0.3);

    legsMaterial.apply();
    this.cube.display();
    this.scene.popMatrix();

    //2
    this.scene.pushMatrix();
    this.scene.translate(2.35,1.85,-1.35);
    this.scene.scale(0.3,3.5,0.3);

    legsMaterial.apply();
    this.cube.display();
    this.scene.popMatrix();

    //3
    this.scene.pushMatrix();
    this.scene.translate(-2.35,1.85,1.35);
    this.scene.scale(0.3,3.5,0.3);

    legsMaterial.apply();
    this.cube.display();
    this.scene.popMatrix();

    //4
    this.scene.pushMatrix();
    this.scene.translate(-2.35,1.85,-1.35);
    this.scene.scale(0.3,3.5,0.3);

    legsMaterial.apply();
    this.cube.display();
    this.scene.popMatrix();
    //--------

    //TABLE PLANE
    this.scene.pushMatrix();
    this.scene.translate(0,3.75,0);
    this.scene.scale(5,0.3,3);

    BoardMaterial.apply();
    this.cube.display();
    this.scene.popMatrix();
}
