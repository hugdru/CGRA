/**
 * MyCylinder
 * @constructor
 */
function MyCylinder(scene, slices, stacks, firstBaseAppearance, secondBaseAppearance, lateralFacesAppearance) {
    CGFobject.call(this, scene);

    this.slices = slices;
    this.stacks = stacks;
    this.stackStep = 1 / stacks;

    this.firstBase = new MyCylinderBase(this.scene, slices, firstBaseAppearance);
    this.secondBase = new MyCylinderBase(this.scene, slices, secondBaseAppearance);
    this.lateralFaces = new MyCylinderLateralFaces(this.scene, slices, stacks, lateralFacesAppearance);
}

MyCylinder.prototype = Object.create(CGFobject.prototype);
MyCylinder.prototype.constructor = MyCylinder;

MyCylinder.prototype.display = function() {

    // First Base
    this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.firstBase.display();
    this.scene.popMatrix();

    // Second Base
    this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.secondBase.display();
    this.scene.popMatrix();

    // Lateral Faces
    this.scene.pushMatrix();
        this.lateralFaces.display();
    this.scene.popMatrix();

};
