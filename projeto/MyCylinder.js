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

    this.firstBaseAppearance = firstBaseAppearance;
    this.secondBaseAppearance = secondBaseAppearance;
    this.lateralFacesAppearance = lateralFacesAppearance;

    this.firstBase = new MyCylinderBase(this.scene, slices,
                                        minSFirstBase, maxSFirstBase, minTFirstBase, maxTFirstBase);
    this.secondBase = new MyCylinderBase(this.scene, slices,
                                        minSSecondBase, maxSSecondBase, minTSecondBase, maxTSecondBase);
    this.lateralFaces = new MyCylinderLateralFaces(this.scene, slices, stacks,
                                                   minSLateralFaces, maxSLateralFaces, minTLateralFaces, maxTLateralFaces);
}

MyCylinder.prototype = Object.create(CGFobject.prototype);
MyCylinder.prototype.constructor = MyCylinder;

MyCylinder.prototype.display = function() {

    // First Base
    this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.firstBaseAppearance.apply();
        if (typeof this.firstBaseAppearance !== 'undefined') this.firstBaseAppearance.apply();
        this.firstBase.display();
    this.scene.popMatrix();

    // Second Base
    this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        if (typeof this.secondBaseAppearance !== 'undefined') this.secondBaseAppearance.apply();
        this.secondBase.display();
    this.scene.popMatrix();

    // Lateral Faces
    this.scene.pushMatrix();
        if (typeof this.lateralFacesAppearance !== 'undefined') this.lateralFacesAppearance.apply();
        this.lateralFaces.display();
    this.scene.popMatrix();

};
