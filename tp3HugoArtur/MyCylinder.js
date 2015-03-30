/**
 * MyCylinder
 * @constructor
 */
function MyCylinder(scene, slices, stacks) {
    CGFobject.call(this, scene);

    this.slices = slices;
    this.stacks = stacks;
    this.stackStep = 1 / stacks;

    this.teta = (2 * Math.PI) / this.slices;
    this.startVertexPeriod = this.stacks + 1;

    this.initBuffers();
}

MyCylinder.prototype = Object.create(CGFobject.prototype);
MyCylinder.prototype.constructor = MyCylinder;

MyCylinder.prototype.initBuffers = function() {

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
                    Math.sin(pointRad), -0.5
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
                    0, 0, 1
                );
            } else {
                this.normals.push(
                    0, 0, -1
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

        // A lateral face
        var stackAcc = -0.5;
        var periodSlicesN = this.startVertexPeriod * sliceIndex + lateralFacesOffset;
        var periodSlicesNnext = this.startVertexPeriod * (sliceIndex + 1) + lateralFacesOffset;
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
                        0 + stackIndex + lateralFacesOffset,
                        startVertex + periodSlicesN,
                        0 + stackIndex + lateralFacesOffset,
                        1 + stackIndex + lateralFacesOffset
                    );
                }
            }
        }
    }

    console.log(this.vertices);
    console.log(this.vertices.length);
    console.log(this.indices);
    console.log(this.indices.length);

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};
