/**
 * MyUnitCube
 * @param {WebGLRenderingContext} scene
 * @constructor
 */
function MyUnitCube(scene) {
    CGFobject.call(this, scene);

    this.initBuffers();
}

MyUnitCube.prototype = Object.create(CGFobject.prototype);
MyUnitCube.prototype.constructor = MyUnitCube;

MyUnitCube.prototype.initBuffers = function() {
    this.vertices = [
        // vertices presentes no plano xz, y positivo
        -0.5,  0.5,  -0.5, // 0
        -0.5,   0.5,  0.5, // 1
        0.5,  0.5,   0.5, // 2
        0.5,   0.5,   -0.5, // 3
        // vertices presentes no plano xz, y negativo
        -0.5,  -0.5,  -0.5, // 4
        -0.5,   -0.5,  0.5, // 5
        0.5,  -0.5,   0.5, // 6
        0.5,   -0.5,   -0.5 // 7
    ];

    this.indices = [
        // face xz, y positivo
        0,  1,  2,
        2,  3,  0,
        // face xz, y negativo
        4,  7,  6,
        6,  5,  4,
        // face xy, z negativo
        0,  3,  7,
        7,  4,  0,
        // face xy, z positivo
        1,  5,  6,
        6,  2,  1,
        // face yz, x positivo
        2,  6,  3,
        3,  6,  7,
        // face yz, x negativo
        0,  4,  5,
        5,  1,  0
    ];

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};
