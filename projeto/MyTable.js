/**
 * MyTable
 * @param {WebGLRenderingContext} scene
 * @constructor
 */
function MyTable(scene, topAppearance, legsAppearance,
                 nrDivsTop, nrDivsLegs,
                 minSTop, maxSTop, minTTop, maxTTop,
                 minSLegs, maxSLegs, minTLegs, maxTLegs
                ) {

    CGFobject.call(this, scene);
    this.topCube = new MyCube(this.scene, nrDivsTop, minSTop, maxSTop, minTTop, maxTTop);
    this.legsCube = new MyCube(this.scene, nrDivsLegs, minSLegs, maxSLegs, minTLegs, maxTLegs);

    this.topAppearance = topAppearance;
    this.legsAppearance = legsAppearance;
}

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor = MyTable;

MyTable.prototype.display = function() {

    // Criar tampo
    this.scene.pushMatrix();
        if (typeof this.topAppearance !== 'undefined') this.topAppearance.apply();
        this.scene.translate(0, 3.8 / 2, 0);
        this.scene.pushMatrix();
            this.scene.translate(0, 1.90, 0); // (0.3 + 3.5)/2
            this.scene.scale(5, 0.3, 3);
            this.topCube.display();
        this.scene.popMatrix();

        // Criar pernas
        if (typeof this.legsAppearance !== 'undefined') this.legsAppearance.apply();
        this.scene.pushMatrix();
            this.scene.translate(-2.35, 0, -1.35); // -5/2 + 0.3/2, _, -3/2 + 0.3/2
            this.scene.scale(0.3, 3.5, 0.3);
            this.legsCube.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
            this.scene.translate(-2.35, 0, 1.35);
            this.scene.scale(0.3, 3.5, 0.3);
            this.legsCube.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
            this.scene.translate(2.35, 0, 1.35); // 5/2 - 0.3/2, _, 3/2 - 0.3/2
            this.scene.scale(0.3, 3.5, 0.3);
            this.legsCube.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
            this.scene.translate(2.35, 0, -1.35);
            this.scene.scale(0.3, 3.5, 0.3);
            this.legsCube.display();
        this.scene.popMatrix();
    this.scene.popMatrix();
};
