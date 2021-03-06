/**
 * MyCylinderLateralFaces
 * @constructor
 */
function MyCylinderLateralFaces(scene, slices, stacks, facesAppearance,
                               minS, maxS, minT, maxT) {
    CGFobject.call(this, scene);

    this.slices = slices || 8;
    this.stacks = stacks || 8;

    this.facesAppearance = facesAppearance;

    this.minS = minS || 0;
    this.maxS = maxS || 1;
    this.minT = minT || 0;
    this.maxT = maxT || 1;

    this.patchLengthS = (this.maxS - this.minS) / this.slices;
    this.patchLengthT = (this.maxT - this.minT) / this.stacks;

    this.stackStep = 1 / this.stacks;

    this.teta = (2 * Math.PI) / this.slices;
    this.startVertexPeriod = this.stacks + 1;

    this.initBuffers();
}

MyCylinderLateralFaces.prototype = Object.create(CGFobject.prototype);
MyCylinderLateralFaces.prototype.constructor = MyCylinderLateralFaces;

MyCylinderLateralFaces.prototype.display = function() {
    if (typeof this.facesAppearance !== 'undefined') this.facesAppearance.apply();
    CGFobject.prototype.display.call(this);
};

MyCylinderLateralFaces.prototype.initBuffers = function() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var sCoord = this.maxS;
    for (sliceIndex = 0; sliceIndex <= this.slices; ++sliceIndex) {

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
            if (stackIndex != this.stacks && sliceIndex != this.slices) {
                var startVertex = stackIndex + 1;
                this.indices.push(
                    startVertex + periodSlicesN,
                    startVertex - 1 + periodSlicesN,
                    startVertex - 1 + periodSlicesNnext,
                    startVertex + periodSlicesN,
                    startVertex - 1 + periodSlicesNnext,
                    startVertex + periodSlicesNnext
                );
            }
            stackAcc += this.stackStep;
            tCoord += this.patchLengthT;
        }
        sCoord -= this.patchLengthS;
    }
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};

MyCylinderLateralFaces.prototype.setAppearance = function(appearance) {
    this.facesAppearance = appearance;
};
