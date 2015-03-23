/**
 * MyPrism
 * @constructor
 */
function MyPrism(scene, slices, stacks) {
    CGFobject.call(this, scene);

    this.slices = slices;
    this.stacks = stacks;

    this.base = new MyBase(this.scene, slices);

    this.teta = 2 * Math.PI / this.slices;
}

MyPrism.prototype = Object.create(CGFobject.prototype);
MyPrism.prototype.constructor = MyPrism;

MyPrism.prototype.display = function() {

    this.scene.pushMatrix();
        this.base.display();
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.translate(0, 0, 1);
        this.base.display();
    this.scene.popMatrix();

    //var nextSlice;
    //this.vertices = [0, 0, 0];
    //this.indices = [];
    //this.normals = [0, 0, 1];

    //for (var n = 0; n < this.slices; ++n) {
        //this.vertices.push(

};
