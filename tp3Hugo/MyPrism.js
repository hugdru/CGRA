/**
 * MyPrism
 * @constructor
 */
function MyPrism(scene, slices, stacks) {
    CGFobject.call(this, scene);

    this.slices = slices;
    this.stacks = stacks;
    this.stackStep = 1/stacks;

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

    var nextSlice;
    this.vertices = [];
    this.indices = [];
    this.normals = [];

    for (var sliceIndex = 0; sliceIndex < this.slices; ++sliceIndex) {
        for (var stackIndex = 0; stackIndex < this.stacks; ++stackIndex) {
/*            this.vertices.push(*/
                //Math.cos(sliceIndex * this.teta),
                //Math.sin(sliceIndex * this.teta),
                //stac
            //);
            //// Vertex 2
            //this.vertices.push(
                //Math.cos(nextSlice * this.teta),
                //Math.sin(nextSlice * this.teta),
                //0
            /*);*/
        }
    }


};
