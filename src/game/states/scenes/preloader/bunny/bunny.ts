import {Container} from "pixi.js";
import {sprite} from "@app/helpers/objects";
import {gsap} from "gsap";

export default class BunnyView extends Container {
    constructor(parent: Container) {
        super();
        parent.addChild(this);

        this._init();
    }

    _init() {
        const bunny = sprite({
            x: 0,
            y: -20,
            bundle: 'preloader',
            key: 'bunny',
            group: this,
            anchor: {x: 0.5, y: 0.5},
            scale: 0.5
        });
        const tweenObj = {sx: bunny.scale.x * 1.05, sy: bunny.scale.y * 0.95, angle: bunny.angle - 10};
        const timeline = gsap.timeline();
        timeline
            .to(tweenObj, {
                sx: bunny.scale.x * 0.95,
                sy: bunny.scale.y * 1.05,
                angle: bunny.angle + 10,
                duration: 1,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut',
                onUpdate: () => {
                    bunny.scale.set(tweenObj.sx, tweenObj.sy);
                    bunny.angle = tweenObj.angle;
                }
            })
            .to(bunny, {
                y: 20,
                duration: 1,
                delay: 0.2,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut'
            }, 0)
            .play();
        this.visible = false;
    }

    show() {
        this.visible = true;
    }

    hide() {
        this.visible = false;
    }
}