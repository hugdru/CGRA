/**
 * MySemiSphericalSurface
 * @constructor
 */
function MySemiSphericalSurface(scene, tetaDivisions, phiDivisions, surfaceAppearance, minS, maxS, minT, maxT) {
    CGFobject.call(this, scene);

    this.tetaDivisions = tetaDivisions || 8;
    this.phiDivisions = phiDivisions || 8;

    this.surfaceAppearance = surfaceAppearance;

    this.minS = minS || 0;
    this.maxS = maxS || 1;
    this.minT = minT || 0;
    this.maxT = maxT || 1;

    this.tetaStep = (2 * Math.PI) / this.tetaDivisions;
    this.phiStep = Math.PI / (2 * this.phiDivisions);

    this.diffSHalf = (this.maxS - this.minS) / 2;
    this.diffTHalf = (this.maxT - this.minT) / 2;
    this.centerS = this.minS + this.diffSHalf;
    this.centerT = this.minT + this.diffTHalf;

    this.tetaPeriod = this.tetaDivisions;

    this.initBuffers();
}

MySemiSphericalSurface.prototype = Object.create(CGFobject.prototype);
MySemiSphericalSurface.prototype.constructor = MySemiSphericalSurface;

MySemiSphericalSurface.prototype.display = function() {

    this.scene.pushMatrix();
        if (typeof this.surfaceAppearance !== "undefined") this.surfaceAppearance.apply();
        CGFobject.prototype.display.call(this);
    this.scene.popMatrix();
};

MySemiSphericalSurface.prototype.initBuffers = function() {

    this.vertices = [];
    this.normals = [];
    this.indices = [];
    this.texCoords = [];

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

            this.texCoords.push(
                this.centerS + this.diffSHalf * vertexX,
                this.centerT + this.diffTHalf * vertexZ
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

            this.texCoords.push(
                this.centerS,
                this.centerT
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

