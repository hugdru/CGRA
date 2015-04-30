/**
 * MyCylinderLateralFaces
 * @constructor
 */
function MyCylinderLateralFaces(scene, slices, stacks,
                               minS, maxS, minT, maxT) {
    CGFobject.call(this, scene);

    this.slices = slices || 5;
    this.stacks = stacks || 5;
    this.minS = minS || 0;
    this.maxS = maxS || 1;
    this.minT = minT || 0;
    this.maxT = maxT || 1;

    this.patchLengthS = (this.maxS - this.minS) / 2;
    this.patchLengthT = (this.maxT - this.minT) / 2;

    this.stackStep = 1 / this.stacks;

    this.teta = (2 * Math.PI) / this.slices;
    this.startVertexPeriod = this.stacks + 1;

    this.initBuffers();
}

MyCylinderLateralFaces.prototype = Object.create(CGFobject.prototype);
MyCylinderLateralFaces.prototype.constructor = MyCylinderLateralFaces;

MyCylinderLateralFaces.prototype.initBuffers = function() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var sCoord = this.maxS;
    for (sliceIndex = 0; sliceIndex < this.slices; ++sliceIndex) {

        // A lateral face
        var stackAcc = -0.5;
        var periodSlicesN = this.startVertexPeriod * sliceIndex;
        var periodSlicesNnext = this.startVertexPeriod * (sliceIndex + 1);
        var currentRad = sliceIndex * this.teta;
        var tCoord = this.minT;
        for (var stackIndex = 0; stackIndex <= this.stacks; ++stackIndex) {

            /* Vertex */
            var currentRadCos = Math.cos(currentRad);
            var currentRadSin = Math.sin(currentRad);
            this.vertices.push(
                currentRadCos,
                currentRadSin,
                stackAcc
            );

            this.texCoords.push(
                sCoord,
                tCoord
            );

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
            stackAcc += this.stackStep;
            tCoord += this.patchLengthT;
        }
        sCoord -= this.patchLengthS;
    }
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};
