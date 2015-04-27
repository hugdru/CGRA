/**
 * MyLamp
 * @constructor
 */
function MyLamp(scene, slices, stacks) {
    CGFobject.call(this, scene);

    this.tetaDivisions = slices;
    this.phiDivisions = stacks;

    this.tetaStep = (2 * Math.PI) / this.tetaDivisions;
    this.phiStep = Math.PI / (2 * this.phiDivisions);

    this.tetaPeriod = this.tetaDivisions;

    this.initBuffers();
}

MyLamp.prototype = Object.create(CGFobject.prototype);
MyLamp.prototype.constructor = MyLamp;

MyLamp.prototype.initBuffers = function() {

    this.vertices = [];
    this.normals = [];
    this.indices = [];

    var phiAcc = 0;
    for (var phiIndex = 0; phiIndex < this.phiDivisions; ++phiIndex) {

        var tetaAcc = 0;
        var tetaPeriodTimesN = this.tetaPeriod * phiIndex;
        var tetaPeriodTimesNnext = this.tetaPeriod * (phiIndex + 1);
        for (var tetaIndex = 0; tetaIndex < this.tetaDivisions; ++tetaIndex) {

            /* Vertex */
            var vertexX = Math.cos(phiAcc) * Math.cos(tetaAcc);
            var vertexY = Math.sin(phiAcc);
            var vertexZ = Math.cos(phiAcc) * Math.sin(tetaAcc);

            this.vertices.push(
                vertexX,
                vertexY,
                vertexZ
            );

            /* Normal */
            this.normals.push(
                vertexX,
                vertexY,
                vertexZ
            );

            /* Indices */
            var startVertex = tetaIndex;
            if (phiIndex != (this.phiDivisions - 1)) {
                if (tetaIndex != (this.tetaDivisions - 1)) {
                    this.indices.push(
                        startVertex + tetaPeriodTimesN,
                        startVertex + 1 + tetaPeriodTimesNnext,
                        startVertex + 1 + tetaPeriodTimesN,
                        startVertex + tetaPeriodTimesN,
                        startVertex + tetaPeriodTimesNnext,
                        startVertex + 1 + tetaPeriodTimesNnext
                    );
                } else {
                    this.indices.push(
                        startVertex + tetaPeriodTimesN,
                        0 + tetaPeriodTimesNnext,
                        0 + tetaPeriodTimesN,
                        startVertex + tetaPeriodTimesN,
                        startVertex + tetaPeriodTimesNnext,
                        0 + tetaPeriodTimesNnext
                    );
                }
            } else {
                if (tetaIndex != (this.tetaDivisions - 1)) {
                    this.indices.push(
                        startVertex + tetaPeriodTimesN,
                        0 + tetaPeriodTimesNnext,
                        startVertex + 1 + tetaPeriodTimesN
                    );
                } else {
                    this.indices.push(
                        startVertex + tetaPeriodTimesN,
                        0 + tetaPeriodTimesNnext,
                        0 + tetaPeriodTimesN
                    );
                }
            }

            tetaAcc += this.tetaStep;
        }

        if (phiIndex == (this.phiDivisions - 1)) {
            this.vertices.push(
                0, 1, 0
            );

            this.normals.push(
                0, 1, 0
            );
        }

        phiAcc += this.phiStep;
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};
