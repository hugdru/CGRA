/**
 * MyChair
 * @param {WebGLRenderingContext} scene
 * @constructor
 */
function MyChair(scene,
                 materialEncosto, materialTampo, materialPernas,
                 nrDivsEncosto, nrDivsTampo, nrDivsPernas,
                 minSEncosto, maxSEncosto, minTEncosto, maxTEncosto,
                 minSTampo, maxSTampo, minTTampo, maxTTampo,
                 minSPernas, maxSPernas, minTPernas, maxTPernas) {
    CGFobject.call(this, scene);

    this.materialEncosto = materialEncosto;
    this.materialTampo = materialTampo;
    this.materialPernas = materialPernas;
    this.cubeEncosto = new MyCube(this.scene, nrDivsEncosto, minSEncosto, maxSEncosto, minTEncosto, maxTEncosto);
    this.cubeTampo = new MyCube(this.scene, nrDivsTampo, minSTampo, maxSTampo, minTTampo, maxTTampo);
    this.cubePernas = new MyCube(this.scene, nrDivsPernas, minSPernas, maxSPernas, minTPernas, maxTPernas);
}

MyChair.prototype = Object.create(CGFobject.prototype);
MyChair.prototype.constructor = MyChair;

MyChair.prototype.display = function() {

    this.scene.pushMatrix();
        this.scene.translate(0, 1.25, 0);

        // Criar encosto
        if (typeof this.materialEncosto !== 'undefined') this.materialEncosto.apply();
        this.scene.pushMatrix();
            this.scene.translate(0, 2.375 + 0.125, 0.9375);
            this.scene.scale(2, 2, 0.125);
            this.cubeEncosto.display();
        this.scene.popMatrix();

        // Criar tampo
        if (typeof this.materialTampo !== 'undefined') this.materialTampo.apply();
        this.scene.pushMatrix();
            this.scene.translate(0, 1.375, 0);
            this.scene.scale(2, 0.25, 2);
            this.cubeTampo.display();
        this.scene.popMatrix();

        // Criar pernas
        if (typeof this.materialPernas !== 'undefined') this.materialPernas.apply();
        for (var i = 0; i < 4; ++i) {
            this.scene.pushMatrix();
                this.scene.rotate((Math.PI / 2) * i, 0, -1, 0);
                this.scene.translate(0.9, 0, 0.9);
                this.scene.scale(0.2, 2.5, 0.2);
                this.cubePernas.display();
            this.scene.popMatrix();
        }

    this.scene.popMatrix();

};

