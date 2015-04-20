/**
 * MyClock
 * @constructor
 */
function MyClock(scene, clockAppearance, hourHandAppearance, minuteHandAppearance, secondHandAppearance) {
    CGFobject.call(this, scene);

    this.clockAppearance = clockAppearance;
    this.hourHandAppearance = hourHandAppearance;
    this.minuteHandAppearance = minuteHandAppearance;
    this.secondHandAppearance = secondHandAppearance;

    this.cylinder = new MyCylinder(this.scene, 12, 1);
    this.hourHand = new MyClockHand(this.scene);
    this.minuteHand = new MyClockHand(this.scene);
    this.secondHand = new MyClockHand(this.scene);
}

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor = MyClock;

MyClock.prototype.display = function() {
    if (typeof this.clockAppearance !== 'undefined') this.clockAppearance.apply();
    this.cylinder.display();
    this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.65);
        if (typeof this.hourHandAppearance !== 'undefined') this.hourHandAppearance.apply();
        this.scene.pushMatrix();
            this.scene.scale(0.050, 0.50, 1);
            this.hourHand.display();
        this.scene.popMatrix();
        this.scene.translate(0, 0, 0.05);
        if (typeof this.minuteHandAppearance !== 'undefined') this.minuteHandAppearance.apply();
        this.scene.pushMatrix();
            this.scene.scale(0.035, 0.65, 0);
            this.minuteHand.display();
        this.scene.popMatrix();
        this.scene.translate(0, 0, 0.05);
        if (typeof this.secondHandAppearance !== 'undefined') this.secondHandAppearance.apply();
        this.scene.pushMatrix();
            this.scene.scale(0.020, 0.85, 0);
            this.secondHand.display();
        this.scene.popMatrix();
    this.scene.popMatrix();
};
