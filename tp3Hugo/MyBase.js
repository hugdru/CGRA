/**
 * MyBase
 * @constructor
 */
function MyBase(scene, slices) {
    CGFobject.call(this, scene);

    this.slices = slices;

    this.teta = 2 * Math.PI / this.slices;
    this.tetaPlusHalf = 1.5 * this.teta;

    this.initBuffers();
}

MyBase.prototype = Object.create(CGFobject.prototype);
MyBase.prototype.constructor = MyBase;

MyBase.prototype.initBuffers = function() {

    var nextSlice;
    this.vertices = [0, 0, 0];
    this.indices = [];
    this.normals = [0, 0, 1];
    for (var sliceIndex = 0; sliceIndex < this.slices; ++sliceIndex) {
        nextSlice = sliceIndex + 1;

        // Vertices
        // Vertex 1
        this.vertices.push(
            Math.cos(sliceIndex * this.teta),
            Math.sin(sliceIndex * this.teta),
            0
        );
        // Vertex 2
        this.vertices.push(
            Math.cos(nextSlice * this.teta),
            Math.sin(nextSlice * this.teta),
            0
        );

        // Indices
        this.indices.push(0);
        this.indices.push(2 * sliceIndex + 1);
        if (sliceIndex == (this.slices - 1)) this.indices.push(1);
        else this.indices.push(2 * sliceIndex + 2);

        // Normals
        this.normals.push(
            Math.cos(sliceIndex * this.tetaPlusHalf),
            Math.sin(sliceIndex * this.tetaPlusHalf),
            0,
            Math.cos(sliceIndex * this.tetaPlusHalf),
            Math.sin(sliceIndex * this.tetaPlusHalf),
            0
        );
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};

