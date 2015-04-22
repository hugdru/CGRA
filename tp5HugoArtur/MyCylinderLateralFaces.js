/**
 * MyCylinderLateralFaces
 * @constructor
 */
function MyCylinderLateralFaces(scene, slices, stacks, lateralFacesAppearance) {
    CGFobject.call(this, scene);

    this.slices = slices;
    this.stacks = stacks;
    this.stackStep = 1 / stacks;

    this.teta = (2 * Math.PI) / this.slices;
    this.startVertexPeriod = this.stacks + 1;
    this.basePeriod = this.slices + 1;

    this.lateralFacesAppearance = lateralFacesAppearance;

    this.initBuffers();
}

MyCylinderLateralFaces.prototype = Object.create(CGFobject.prototype);
MyCylinderLateralFaces.prototype.constructor = MyCylinderLateralFaces;

MyCylinderLateralFaces.prototype.initBuffers = function() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];

    // The lateral faces
    for (sliceIndex = 0; sliceIndex < this.slices; ++sliceIndex) {

        // A lateral face
        var stackAcc = -0.5;
        var periodSlicesN = this.startVertexPeriod * sliceIndex;
        var periodSlicesNnext = this.startVertexPeriod * (sliceIndex + 1);
        for (var stackIndex = 0; stackIndex <= this.stacks; ++stackIndex) {

            /* Vertex */
            var currentRad = sliceIndex * this.teta;
            var currentRadCos = Math.cos(currentRad);
            var currentRadSin = Math.sin(currentRad);
            this.vertices.push(
                currentRadCos,
                currentRadSin,
                stackAcc
            );
            stackAcc += this.stackStep;

            /* Normals */
            this.normals.push(
                currentRadCos,
                currentRadSin,
                0
            );

            /* Indices */
            if (stackIndex != this.stacks) {
                var startVertex = stackIndex + 1;
                if (sliceIndex != (this.slices - 1)) {
                    this.indices.push(
                        startVertex + periodSlicesN,
                        startVertex - 1 + periodSlicesN,
                        startVertex - 1 + periodSlicesNnext,
                        startVertex + periodSlicesN,
                        startVertex - 1 + periodSlicesNnext,
                        startVertex + periodSlicesNnext
                    );
                } else {
                    this.indices.push(
                        startVertex + periodSlicesN,
                        startVertex - 1 + periodSlicesN,
                        0 + stackIndex,
                        startVertex + periodSlicesN,
                        0 + stackIndex,
                        1 + stackIndex
                    );
                }
            }
        }
    }
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};
