/**
 * MyChair
 * @param {WebGLRenderingContext} scene
 * @constructor
 */
function MyChair(scene, material) {
    CGFobject.call(this, scene);
    this.material = material;
    this.cube = new MyUnitCubeQuad(this.scene);
    this.cube.initBuffers();
}

MyChair.prototype = Object.create(CGFobject.prototype);
MyChair.prototype.constructor = MyChair;

MyChair.prototype.display = function() {

    // A cadeira é feita de um só material

    if (typeof this.material !== 'undefined') this.material.apply();

    this.scene.pushMatrix();
        this.scene.translate(0, 1.25, 0);

        // Criar tampo
        this.scene.pushMatrix();
            this.scene.translate(0, 1.375, 0);
            this.scene.scale(2, 0.25, 2);
            this.cube.display();
        this.scene.popMatrix();

        // Criar pernas
        for (var i = 0; i < 4; ++i) {
            this.scene.pushMatrix();
                this.scene.rotate((Math.PI / 2) * i, 0, -1, 0);
                this.scene.translate(0.9, 0, 0.9);
                this.scene.scale(0.2, 2.5, 0.2);
                this.cube.display();
            this.scene.popMatrix();
        }

        // Criar encosto
        this.scene.pushMatrix();
            this.scene.translate(0, 2.375, 0.9375);
            this.scene.scale(2, 2, 0.125);
            this.cube.display();
        this.scene.popMatrix();
    this.scene.popMatrix();

};

