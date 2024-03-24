import {Container} from "pixi.js";
import {sprite} from "@app/helpers/objects";

export default class BackView extends Container {
    constructor(parent: Container) {
        super();
        parent.addChild(this);

        this._init();
    }

    _init() {
        sprite({x: 0, y: 0, bundle: 'preloader', key: 'bgPreloader', group: this, scale: 1});
        this.visible = false;
    }

    show() {
        this.visible = true;
    }

    hide() {
        this.visible = false;
    }
}