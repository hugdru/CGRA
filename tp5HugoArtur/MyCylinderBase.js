/**
 * MyCylinderBase
 * @constructor
 */
function MyCylinderBase(scene, slices, baseAppearance) {
    CGFobject.call(this, scene);

    this.slices = slices;

    this.teta = 2 * Math.PI / this.slices;

    this.baseAppearance = baseAppearance;

    this.initBuffers();
}

MyCylinderBase.prototype = Object.create(CGFobject.prototype);
MyCylinderBase.prototype.constructor = MyCylinderBase;

MyCylinderBase.prototype.initBuffers = function() {

    var nextSlice;
    this.vertices = [0, 0, 0];
    this.indices = [];
    this.normals = [0, 0, 1];
    this.texCoords = [0.5, 0.5];

    if (typeof this.baseAppearance !== 'undefined') this.baseAppearance.apply();
    for (var sliceIndex = 0; sliceIndex < this.slices; ++sliceIndex) {

        // Vertices
        // Vertex 1
        this.vertices.push(
            Math.cos(sliceIndex * this.teta),
            Math.sin(sliceIndex * this.teta),
            0
        );

        this.texCoords.push(
            0.5 + 0.5 * Math.cos(sliceIndex * this.teta),
            0.5 - 0.5 * Math.sin(sliceIndex * this.teta)
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
