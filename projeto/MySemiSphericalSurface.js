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

    this.patchLengthS = (this.maxS - this.minS) / this.tetaDivisions;
    this.patchLengthT = (this.maxT - this.minT) / (this.phiDivisions + 1);

    this.tetaPeriod = this.tetaDivisions + 1;

    this.initBuffers();
}

MySemiSphericalSurface.prototype = Object.create(CGFobject.prototype);
MySemiSphericalSurface.prototype.constructor = MySemiSphericalSurface;

MySemiSphericalSurface.prototype.display = function() {

    this.scene.pushMatrix();
    if (typeof this.surfaceAppearance !== 'undefined') this.surfaceAppearance.apply();
    CGFobject.prototype.display.call(this);
    this.scene.popMatrix();
};

MySemiSphericalSurface.prototype.initBuffers = function() {

    this.vertices = [];
    this.normals = [];
    this.indices = [];
    this.texCoords = [];

    var phiAcc = 0;
    var tCoord = this.maxT;
    for (var phiIndex = 0; phiIndex <= this.phiDivisions; ++phiIndex) {

        var tetaAcc = 0;
        var tetaPeriodTimesN = this.tetaPeriod * phiIndex;
        var tetaPeriodTimesNnext = this.tetaPeriod * (phiIndex + 1);

        var sCoord = this.minS;
        for (var tetaIndex = 0; tetaIndex <= this.tetaDivisions; ++tetaIndex) {

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
                sCoord,
                tCoord
            );

            /* Normal */
            this.normals.push(
                vertexX,
                vertexY,
                vertexZ
            );

            /* Indices */
            var startVertex = tetaIndex;
            if (phiIndex != this.phiDivisions) {
                if (tetaIndex != this.tetaDivisions) {
                    this.indices.push(
                        startVertex + tetaPeriodTimesN,
                        startVertex + 1 + tetaPeriodTimesNnext,
                        startVertex + 1 + tetaPeriodTimesN,
                        startVertex + tetaPeriodTimesN,
                        startVertex + tetaPeriodTimesNnext,
                        startVertex + 1 + tetaPeriodTimesNnext
                    );
                }
            }
            tetaAcc += this.tetaStep;
            sCoord += this.patchLengthS;
        }

        phiAcc += this.phiStep;
        tCoord -= this.patchLengthT;
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};

MySemiSphericalSurface.prototype.setAppearance = function(appearance) {
    this.surfaceAppearance = appearance;
};
