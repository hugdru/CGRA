/**
 * MyPlane
 * @constructor
 */
function MyPlane(scene, slices, stacks) {
    CGFobject.call(this, scene);

    this.slices = slices;
    this.stacks = stacks;

    this.teta = 2 * Math.PI / this.slices;
    this.tetaPlusHalf = 1.5 * this.teta;
    this.stackStep = 1 / stacks;

    this.initBuffers();
}

MyPlane.prototype = Object.create(CGFobject.prototype);
MyPlane.prototype.constructor = MyPlane;

MyPlane.prototype.initBuffers = function() {

    var stackAcc = 0;
    this.vertices = [0, 0, 0];
    this.indices = [];
    this.normals = [0, 0, 1];

    var vertex1x = Math.cos(faceIndex * this.teta);
    var vertex1y = Math.sin(faceIndex * this.teta);

    var vertex2x = Math.cos(nextFace * this.teta);
    var vertex2y = Math.sin(nextFace * this.teta);

    for (var stackIndex = 0; stackIndex < this.stacks; ++stackIndex) {

            // Vertices
            // Vertex 1
            this.vertices.push(
                vertex1x,
                vertex1y,
                stackAcc
            );
            // Vertex 2
            this.vertices.push(
                vertex2x,
                vertex2y,
                stackAcc
            );
            // Vertex 3
            this.vertices.push(
                vertex1x,
                vertex1y,
                stackAcc + this.stackStep;
            );
            // Vertex 4
            this.vertices.push(
                vertex2x,
                vertex2y,
                stackAcc + this.stackStep;
            );

            // Indices
            this.indices.push(
                stackIndex,
                3 * stackIndex + 1,
                stackIndex + 2
            );

            this.indices.push(
                stackIndex + 2,
                stackIndex + 3,
                stackIndex
            );

            // Normals
            this.normals.push(
                Math.cos(faceIndex * this.tetaPlusHalf),
                Math.sin(faceIndex * this.tetaPlusHalf),
                0,
                Math.cos(faceIndex * this.tetaPlusHalf),
                Math.sin(faceIndex * this.tetaPlusHalf),
                0
            );
        stackAcc += stackAcc;
    }


    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};


