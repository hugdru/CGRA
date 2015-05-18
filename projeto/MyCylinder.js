/**
 * MyCylinder
 * @constructor
 */
function MyCylinder(scene, slices, stacks,
                    firstBaseAppearance, secondBaseAppearance, lateralFacesAppearance,
                    minSFirstBase, maxSFirstBase, minTFirstBase, maxTFirstBase,
                    minSSecondBase, maxSSecondBase, minTSecondBase, maxTSecondBase,
                    minSLateralFaces, maxSLateralFaces, minTLateralFaces, maxTLateralFaces) {
    CGFobject.call(this, scene);

    this.firstBase = new MyCylinderBase(this.scene, slices, firstBaseAppearance,
                                        minSFirstBase, maxSFirstBase, minTFirstBase, maxTFirstBase);
    this.secondBase = new MyCylinderBase(this.scene, slices, secondBaseAppearance,
                                        minSSecondBase, maxSSecondBase, minTSecondBase, maxTSecondBase);
    this.lateralFaces = new MyCylinderLateralFaces(this.scene, slices, stacks, lateralFacesAppearance,
                                                   minSLateralFaces, maxSLateralFaces, minTLateralFaces, maxTLateralFaces);
}

MyCylinder.prototype = Object.create(CGFobject.prototype);
MyCylinder.prototype.constructor = MyCylinder;

MyCylinder.prototype.display = function() {

    // First Base
    this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 1, 0, 0);
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
