/**
 * MyPrism
 * @constructor
 */
function MyPrism(scene, slices, stacks) {
    CGFobject.call(this, scene);

    this.slices = slices;
    this.stacks = stacks;
    this.stackStep = 1 / stacks;

    this.teta = (2 * Math.PI) / this.slices;
    this.halfTeta = this.teta / 2;
    this.startVertexPeriod = (this.stacks + 1) * 2;

    this.initBuffers();
}

MyPrism.prototype = Object.create(CGFobject.prototype);
MyPrism.prototype.constructor = MyPrism;

MyPrism.prototype.initBuffers = function() {

    this.vertices = [0, 0, 0.5];
    this.indices = [];
    this.normals = [0, 0, 1];

    var nextSlice;
    var sliceIndex;
    var basePeriod = this.slices + 1;

    // The bases
    for (var i = 0; i < 2; ++i) {
        for (sliceIndex = 0; sliceIndex < this.slices; ++sliceIndex) {

            // Vertices
            // Vertex 1
            var pointRad = sliceIndex * this.teta;
            if (i === 0) {
                this.vertices.push(
                    Math.cos(pointRad),
                    Math.sin(pointRad),
                    0.5
                );
            } else {
                this.vertices.push(
                    Math.cos(pointRad),
                    Math.sin(pointRad),
                    -0.5
                );
            }

            // Indices
            if (i === 0) {
                this.indices.push(0);
                this.indices.push(sliceIndex + 1);
                if (sliceIndex == (this.slices - 1)) this.indices.push(1);
                else this.indices.push(sliceIndex + 2);
            } else {
                this.indices.push(basePeriod);
                if (sliceIndex == (this.slices - 1)) this.indices.push(basePeriod + 1);
                else this.indices.push(basePeriod + 2 + sliceIndex);
                this.indices.push(basePeriod + 1 + sliceIndex);
            }

            // Normals
            if (i === 0) {
                this.normals.push(
                    0,
                    0,
                    1
                );
            } else {
                this.normals.push(
                    0,
                    0, -1
                );

            }
        }
        // The new center
        this.vertices.push(
            0, 0, -0.5
        );
        this.normals.push(
            0, 0, -1
        );
    }

    // The lateral faces
    var lateralFacesOffset = basePeriod * 2 + 1;
    for (sliceIndex = 0; sliceIndex < this.slices; ++sliceIndex) {
        var stackAcc = -0.5;
        nextSlice = sliceIndex + 1;
        var periodSlicesN = this.startVertexPeriod * sliceIndex + lateralFacesOffset;
        // A lateral face
        for (var stackIndex = 0; stackIndex <= this.stacks; ++stackIndex) {

            /* Vertices */
            // Vertex 1
            var currentRad = sliceIndex * this.teta;
            this.vertices.push(
                Math.cos(currentRad),
                Math.sin(currentRad),
                stackAcc
            );
            // Vertex 2
            var nextRad = nextSlice * this.teta;
            this.vertices.push(
                Math.cos(nextRad),
                Math.sin(nextRad),
                stackAcc
            );
            stackAcc += this.stackStep;

            /* Normals */
            this.normals.push(
                Math.cos(currentRad + this.halfTeta),
                Math.sin(currentRad + this.halfTeta),
                0
            );
            this.normals.push(
                Math.cos(currentRad + this.halfTeta),
                Math.sin(currentRad + this.halfTeta),
                0
            );

            /* Indices */
            if (stackIndex != this.stacks) {
                var startVertex = 2 * (stackIndex + 1);
                this.indices.push(
                    startVertex + periodSlicesN,
                    (startVertex - 2) + periodSlicesN,
                    (startVertex - 1) + periodSlicesN,
                    startVertex + periodSlicesN,
                    (startVertex - 1) + periodSlicesN,
                    (startVertex + 1) + periodSlicesN
                );
            }
        }
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};
