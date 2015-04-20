/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyQuad(scene, minS, maxS, minT, maxT) {
    CGFobject.call(this, scene);
    this.minS = minS;
    this.minT = minT;
    this.maxS = maxS;
    this.maxT = maxT;
    this.initBuffers();
};

MyQuad.prototype = Object.create(CGFobject.prototype);
MyQuad.prototype.constructor = MyQuad;

MyQuad.prototype.initBuffers = function() {
    this.vertices = [
        0.5, 0.5, 0,
        0.5, -0.5, 0, -0.5, -0.5, 0, -0.5, 0.5, 0
    ];

    this.indices = [
        2, 1, 0,
        3, 2, 0
    ];

    this.texCoords = [
        this.maxS, this.minT,
        this.maxS, this.maxT,
        this.minS, this.maxT,
        this.minS, this.minT
    ];

    this.primitiveType = this.scene.gl.TRIANGLES;

    this.normals = [
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1
    ];

    this.initGLBuffers();
};
