import {Assets, Container, Sprite, Text, TextDropShadow, TextStyle, TextStyleAlign, Texture} from "pixi.js";
import Button from "@app/helpers/button";

interface SpriteOptions {
    x: number;
    y: number;
    bundle: string;
    key: string;
    group: Container;
    anchor?: number | { x: number, y: number };
    inputEnabled?: boolean;
    angle?: number;
    visible?: boolean;
    scale?: number | { x: number, y: number };
}

export function sprite(options: SpriteOptions): Sprite {
    const sprite = new Sprite(Texture.from(`${options.bundle}/${options.key}`));
    sprite.x = options.x;
    sprite.y = options.y;
    options.group.addChild(sprite);

    if (options.anchor) {
        if (typeof options.anchor === 'object') {
            sprite.anchor.set(options.anchor.x, options.anchor.y);
        } else {
            sprite.anchor.set(options.anchor);
        }
    }

    if (options.inputEnabled) {
        sprite.interactive = true;
        sprite.eventMode = 'static';
    }

    if (options.angle) sprite.angle = options.angle;

    sprite.visible = options.visible ?? true;

    if (typeof options.scale === 'object') {
        sprite.scale.set(options.scale.x, options.scale.y);
    } else if (typeof options.scale === 'number') {
        sprite.scale.set(options.scale);
    }

    return sprite;
}

interface TextOptions {
    x: number;
    y: number;
    output: string;
    group?: Container;
    anchor?: number | { x: number, y: number };
    inputEnabled?: boolean;
    size?: number;
    color?: string;
    align?: TextStyleAlign;
    wordWrap?: boolean;
    wordWrapWidth?: number;
    lineSpacing?: number;
    stroke?: string;
    strokeThickness?: number;
    angle?: number;
    shadow?: TextDropShadow;
    visible?: boolean;
}

export function text(options: TextOptions): Text {
    const style = new TextStyle();

    style.fontSize = options.size ?? 26;
    style.fill = options.color ?? "#ffffff";
    style.align = options.align ?? "left";
    style.fontFamily = "zubiloBlack";

    if (options.shadow) style.dropShadow = options.shadow;

    if (options.wordWrap) style.wordWrap = true;

    if (options.wordWrapWidth) style.wordWrapWidth = options.wordWrapWidth;

    if (options.stroke) {
        style.stroke = {
            color: options.stroke ?? "#000000",
            width: options.strokeThickness ?? 0
        }
    }

    if (options.lineSpacing) style.lineHeight = options.lineSpacing;

    const newText = new Text({
        x: options.x,
        y: options.y,
        text: options.output,
        style: style,
    });
    options.group?.addChild(newText);

    if (options.anchor) {
        if (typeof options.anchor === 'object') {
            newText.anchor.set(options.anchor.x, options.anchor.y);
        } else {
            newText.anchor.set(options.anchor);
        }
    }

    if (options.inputEnabled) {
        newText.interactive = true;
        newText.eventMode = 'static';
    }

    if (options.angle) newText.angle = options.angle;

    if (options.visible === false) newText.visible = false;

    return newText;
}

interface ButtonOptions {
    bundle: string,
    active: string,
    hover: string,
    pressed: string,
    x: number,
    y: number,
    parent: Container,
    onClick: (self: Button, args?: any) => void,
    context: any,
    args?: any,
    anchor?: number | { x: number, y: number }
}

export function button(options: ButtonOptions): Button {
    return new Button({
        active: Assets.get(`${options.bundle}/${options.active}`),
        hover: Assets.get(`${options.bundle}/${options.hover}`),
        pressed: Assets.get(`${options.bundle}/${options.pressed}`),
        x: options.x,
        y: options.y,
        parent: options.parent,
        onClick: (button) => options.onClick.bind(options.context)(button, options.args),
        anchor: options.anchor,
    });
}