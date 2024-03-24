import {Container, Sprite, Texture} from "pixi.js";

export interface ButtonOptions {
    active: Texture,
    hover: Texture,
    pressed: Texture,
    x: number, y: number,
    parent: Container,
    onClick: (button: Button) => void,
    context?: any,
    anchor?: number | { x: number, y: number }
}

export default class Button extends Sprite {
    active: Texture;
    hover: Texture;
    pressed: Texture;

    constructor(options: ButtonOptions) {
        super(options.active);
        this.active = options.active;
        this.hover = options.hover;
        this.pressed = options.pressed;

        this.x = options.x;
        this.y = options.y;
        if (options.anchor) {
            if (typeof options.anchor === 'object') {
                this.anchor.set(options.anchor.x, options.anchor.y);
            } else {
                this.anchor.set(options.anchor);
            }
        }
        options.parent.addChild(this);

        this.interactive = true;
        this.eventMode = 'static';

        this.on('pointerup', () => options.onClick.bind(options.context)(this));

        this.on('pointerover', () => this.texture = this.hover);
        this.on('pointerout', () => this.texture = this.active);
        this.on('pointerdown', () => this.texture = this.pressed);
        this.on('pointerup', () => this.texture = this.hover);

    }
}