/**
 * MyTable
 * @param {WebGLRenderingContext} scene
 * @constructor
 */
function MyTable(scene, topAppearance, legsAppearance,
                 nrDivsTop, nrDivsLegs,
                 minSTop, maxSTop, minTTop, maxTTop,
                 minSLegs, maxSLegs, minTLegs, maxTLegs) {

    CGFobject.call(this, scene);
    this.topCube = new MyCube(this.scene, nrDivsTop, minSTop, maxSTop, minTTop, maxTTop);
    this.legsCube = new MyCube(this.scene, nrDivsLegs, minSLegs, maxSLegs, minTLegs, maxTLegs);

    this.topAppearance = topAppearance;
    this.legsAppearance = legsAppearance;

    this.tableScale = {x: 5, y: 0.3, z: 3};
    this.legScale = {x: 0.3, y: 3.5, z: 0.3};

    this.halfTable = {};
    this.halfLeg = {};
    for (var property in this.tableScale) {
        this.halfTable[property] = this.tableScale[property] / 2;
        this.halfLeg[property] = this.legScale[property] / 2;
    }
}

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor = MyTable;

MyTable.prototype.display = function() {


    // Criar tampo
    this.scene.pushMatrix();
        if (typeof this.topAppearance !== 'undefined') this.topAppearance.apply();
        this.scene.translate(0, this.halfLeg.y, 0);
        this.scene.pushMatrix();
            this.scene.translate(0, this.halfLeg.y + this.halfTable.y, 0);
            this.scene.scale(this.tableScale.x, this.tableScale.y, this.tableScale.z);
            this.topCube.display();
        this.scene.popMatrix();

        // Criar pernas
        if (typeof this.legsAppearance !== 'undefined') this.legsAppearance.apply();
        this.scene.pushMatrix();
            this.scene.translate(this.halfTable.x - this.halfLeg.x, 0, this.halfTable.z - this.halfLeg.z);
            this.scene.scale(this.legScale.x, this.legScale.y, this.legScale.z);
            this.legsCube.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
            this.scene.translate(this.halfTable.x - this.halfLeg.x, 0, -this.halfTable.z + this.halfLeg.z);
            this.scene.scale(this.legScale.x, this.legScale.y, this.legScale.z);
            this.legsCube.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
            this.scene.translate(-this.halfTable.x + this.halfLeg.x, 0, -this.halfTable.z + this.halfLeg.z);
            this.scene.scale(this.legScale.x, this.legScale.y, this.legScale.z);
            this.legsCube.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
            this.scene.translate(-this.halfTable.x + this.halfLeg.x, 0, this.halfTable.z - this.halfLeg.z);
            this.scene.scale(this.legScale.x, this.legScale.y, this.legScale.z);
            this.legsCube.display();
        this.scene.popMatrix();
    this.scene.popMatrix();
};
