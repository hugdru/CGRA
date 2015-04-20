/**
 * MyTable
 * @param {WebGLRenderingContext} scene
 * @constructor
 */
function MyTable(scene, top, legs) {
    CGFobject.call(this, scene);
    this.cube = new MyUnitCubeQuad(this.scene);
    this.top = top;
    this.legs = legs;
}

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor = MyTable;

MyTable.prototype.display = function() {

    // Criar tampo
    this.scene.pushMatrix();
        if (typeof this.top !== 'undefined') this.top.apply();
        this.scene.translate(0, 3.8 / 2, 0);
        this.scene.pushMatrix();
            this.scene.translate(0, 1.90, 0); // (0.3 + 3.5)/2
            this.scene.scale(5, 0.3, 3);
            this.cube.display();
        this.scene.popMatrix();

        // Criar pernas
        if (typeof this.legs !== 'undefined') this.legs.apply();
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
    this.scene.popMatrix();
};
