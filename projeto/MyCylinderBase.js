/**
 * MyCylinderBase
 * @constructor
 */
function MyCylinderBase(scene, slices, baseAppearance,
                        minS, maxS, minT, maxT) {
    CGFobject.call(this, scene);

    this.slices = slices || 8;
    this.minS = minS || 0;
    this.maxS = maxS || 1;
    this.minT = minT || 0;
    this.maxT = maxT || 1;

    this.baseAppearance = baseAppearance;

    this.diffSHalf = (this.maxS - this.minS) / 2;
    this.diffTHalf = (this.maxT - this.minT) / 2;
    this.centerS = this.minS + this.diffSHalf;
    this.centerT = this.minT + this.diffTHalf;

    this.teta = 2 * Math.PI / this.slices;

    this.initBuffers();
}

MyCylinderBase.prototype = Object.create(CGFobject.prototype);
MyCylinderBase.prototype.constructor = MyCylinderBase;

MyCylinderBase.prototype.display = function() {
    if (typeof this.baseAppearance !== 'undefined') this.baseAppearance.apply();
    CGFobject.prototype.display.call(this);
};

MyCylinderBase.prototype.initBuffers = function() {

    var nextSlice;
    this.vertices = [0, 0, 0];
    this.indices = [];
    this.normals = [0, 0, 1];
    this.texCoords = [0.5, 0.5];

    for (var sliceIndex = 0; sliceIndex < this.slices; ++sliceIndex) {

        // Vertices
        // Vertex 1
        this.vertices.push(
            Math.cos(sliceIndex * this.teta),
            Math.sin(sliceIndex * this.teta),
            0
        );

        this.texCoords.push(
            this.centerS + this.diffSHalf * Math.cos(sliceIndex * this.teta),
            this.centerT - this.diffTHalf * Math.sin(sliceIndex * this.teta)
        );

        // Indices
        this.indices.push(0);
        this.indices.push(sliceIndex + 1);
        if (sliceIndex == (this.slices - 1)) this.indices.push(1);
        else this.indices.push(sliceIndex + 2);

        // Normals
        this.normals.push(
            0,
            0,
            1
        );
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};

MyCylinderBase.prototype.setAppearance = function(appearance) {
    this.baseAppearance = appearance;
};
