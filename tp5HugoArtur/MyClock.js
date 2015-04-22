/**
 * MyClock
 * @constructor
 */
function MyClock(scene, clockAppearance, hourHandAppearance, minuteHandAppearance, secondHandAppearance, firstBaseAppearance, secondBaseAppearance, lateralFacesAppearance) {
    CGFobject.call(this, scene);

    this.clockAppearance = clockAppearance;
    this.hourHandAppearance = hourHandAppearance;
    this.minuteHandAppearance = minuteHandAppearance;
    this.secondHandAppearance = secondHandAppearance;

    this.cylinder = new MyCylinder(this.scene, 12, 1, firstBaseAppearance, secondBaseAppearance, lateralFacesAppearance);
    this.hourHand = new MyClockHand(this.scene);
    this.minuteHand = new MyClockHand(this.scene);
    this.secondHand = new MyClockHand(this.scene);
    this.degToRad = Math.PI / 180;
}

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor = MyClock;

MyClock.prototype.display = function() {

    if (typeof this.clockAppearance !== 'undefined') this.clockAppearance.apply();
    this.cylinder.display();
    this.scene.pushMatrix();
        if (typeof this.hourHandAppearance !== 'undefined') this.hourHandAppearance.apply();
        this.scene.pushMatrix();
            this.scene.translate(0, 0, 0.51);
            this.scene.scale(0.050, 0.50, 1);
            this.hourHand.display();
        this.scene.popMatrix();
        if (typeof this.minuteHandAppearance !== 'undefined') this.minuteHandAppearance.apply();
        this.scene.pushMatrix();
            this.scene.translate(0, 0, 0.53);
            this.scene.scale(0.035, 0.80, 0);
            this.minuteHand.display();
        this.scene.popMatrix();
        if (typeof this.secondHandAppearance !== 'undefined') this.secondHandAppearance.apply();
        this.scene.pushMatrix();
            this.scene.translate(0, 0, 0.55);
            this.scene.scale(0.010, 0.85, 0);
            this.secondHand.display();
        this.scene.popMatrix();
    this.scene.popMatrix();
};
