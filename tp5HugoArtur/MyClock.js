/**
 * MyClock
 * @constructor
 */
function MyClock(scene, clockAppearance, hourHandApperance, minuteHandAppearance, secondHandAppearance) {
    CGFobject.call(this, scene);

    this.clockAppearance = clockAppearance;
    this.hourHandAppearance = hourHandApperance;
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
    this.cylinder.display();
    this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.65);
        if (typeof this.hourHandApperance !== 'undefined') this.hourHandApperance.apply();
        this.scene.pushMatrix();
            //this.scene.scale(0.035, 0.55);
            //this.scene.rotate(2, 0, 0, -1);
            this.hourHand.display();
        this.scene.popMatrix();
        //this.scene.translate(0, 0, 0.05);
        //if (typeof this.minuteHandApperance !== 'undefined') this.minuteHandApperance.apply();
        //this.scene.pushMatrix();
            //this.scene.scale(0.030, 0.7, 0);
            //this.scene.rotate(0.34906585 * 2, 0, 0, -1);
            //this.minuteHand.display();
        //this.scene.popMatrix();
        //this.scene.translate(0, 0, 0.05);
        //if (typeof this.secondHandApperance !== 'undefined') this.secondHandApperance.apply();
        //this.scene.pushMatrix();
            //this.scene.scale(0.025, 0.85, 0);
            //this.scene.rotate(0.34906585 * 3, 0, 0, -1);
            //this.secondHand.display();
        //this.scene.popMatrix();
    this.scene.popMatrix();
};
