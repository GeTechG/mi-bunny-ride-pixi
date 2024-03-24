import {Assets, Container, Sprite, Text} from "pixi.js";
import {button, sprite, text} from "@app/helpers/objects";
import ButtonsStore from "@app/game/store/buttons/buttons";
import Button from "@app/helpers/button";

export default class ButtonsView extends Container {
    private _store: ButtonsStore;

    private soundButton!: Button;

    constructor(parent: Container) {
        super();
        parent.addChild(this);

        this._store = app.store.game.buttons;

        this._init();
    }

    _init() {
        const plateContainer = new Container({parent: this, scale: {x: 0.665, y: 0.665}});
        const fullscreenBtn = button({
            bundle: 'game',
            active: 'btnFullscreenActive',
            hover: 'btnFullscreenHover',
            pressed: 'btnFullscreenPress',
            x: 0, y: 0, parent: plateContainer,
            onClick: this._inputDownHandler,
            context: this,
            args: 'fullscreen'
        });
        this.soundButton = button({
            bundle: 'game',
            active: 'btnSoundOnActive',
            hover: 'btnSoundOnHover',
            pressed: 'btnSoundOnPress',
            x: fullscreenBtn.x + fullscreenBtn.width + 15, y: 0, parent: plateContainer,
            onClick: this._inputDownHandler,
            context: this,
            args: 'sound'
        });
        const pauseBtn = button({
            bundle: 'game',
            active: 'btnPauseActive',
            hover: 'btnPauseHover',
            pressed: 'btnPausePress',
            x: this.soundButton.x + this.soundButton.width + 15, y: 0, parent: plateContainer,
            onClick: this._inputDownHandler,
            context: this,
            args: 'pause'
        });

        // view
        this.visible = false;
    }

    _inputDownHandler(sprite: Sprite, type: string) {
        this._store.eventInputDown(type);
    }

    show() {
        this.visible = true;
    }

    hide() {
        this.visible = false;
    }

    setSoundOn(soundOn: boolean) {
        this.soundButton.active = Assets.get(`game/btnSound${soundOn ? 'On' : 'Off'}Active`)
        this.soundButton.hover = Assets.get(`game/btnSound${soundOn ? 'On' : 'Off'}Hover`)
        this.soundButton.pressed = Assets.get(`game/btnSound${soundOn ? 'On' : 'Off'}Press`)
    }
}