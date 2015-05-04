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

    this.encostoScale = {x: 2, y: 2, z: 0.125};
    this.tampoScale = {x: 2, y: 0.25, z: 2};
    this.pernasScale = {x: 0.2, y: 2.5, z: 0.2};

    this.halfEncosto = {};
    this.halfTampo = {};
    this.halfPernas = {};
    for (var property in this.encostoScale) {
        this.halfEncosto[property] = this.encostoScale[property] / 2;
        this.halfTampo[property] = this.tampoScale[property] / 2;
        this.halfPernas[property] = this.pernasScale[property] / 2;
    }
}

MyChair.prototype = Object.create(CGFobject.prototype);
MyChair.prototype.constructor = MyChair;

MyChair.prototype.display = function() {

    this.scene.pushMatrix();
        this.scene.translate(0, this.halfPernas.y, 0);

        // Criar encosto
        if (typeof this.materialEncosto !== 'undefined') this.materialEncosto.apply();
        this.scene.pushMatrix();
            this.scene.translate(
                0,
                this.halfEncosto.y + this.tampoScale.y + this.halfPernas.y,
                this.halfTampo.z - this.halfEncosto.z);
            this.scene.scale(this.encostoScale.x, this.encostoScale.y, this.encostoScale.z);
            this.cubeEncosto.display();
        this.scene.popMatrix();

        // Criar tampo
        if (typeof this.materialTampo !== 'undefined') this.materialTampo.apply();
        this.scene.pushMatrix();
            this.scene.translate(0, this.halfTampo.y + this.halfPernas.y, 0);
            this.scene.scale(this.tampoScale.x, this.tampoScale.y, this.tampoScale.z);
            this.cubeTampo.display();
        this.scene.popMatrix();

        // Criar pernas
        if (typeof this.materialPernas !== 'undefined') this.materialPernas.apply();
        var pernasLocationX = this.halfTampo.x - this.halfPernas.x;
        var pernasLocationZ = this.halfTampo.z - this.halfPernas.z;
        for (var i = 0; i < 4; ++i) {
            this.scene.pushMatrix();
                this.scene.rotate((Math.PI / 2) * i, 0, -1, 0);
                this.scene.translate(pernasLocationX, 0, pernasLocationZ);
                this.scene.scale(this.pernasScale.x, this.pernasScale.y, this.pernasScale.z);
                this.cubePernas.display();
            this.scene.popMatrix();
        }

    this.scene.popMatrix();

};

