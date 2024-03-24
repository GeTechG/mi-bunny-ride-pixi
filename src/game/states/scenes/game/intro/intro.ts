import {Container, DEG_TO_RAD, Sprite, Text} from "pixi.js";
import IntroStore from "@app/game/store/intro/intro";
import {button, sprite, text} from "@app/helpers/objects";

export default class IntroView extends Container {
    private _store: IntroStore;

    private record!: Text;
    private userName!: Text;

    constructor(parent: Container) {
        super();
        parent.addChild(this);

        this._store = app.store.game.intro;

        this._init();
    }

    _init() {
        const plateContainer = new Container({parent: this, scale: {x: 0.665, y: 0.665}});
        const infoPlateBig = sprite({x: 0, y: 0, bundle: 'game', key: 'infoPlateBig', group: plateContainer, anchor: {x: 0.5, y: 0.5}});

        const header = sprite({x: 0, y: infoPlateBig.y + infoPlateBig.bounds.minY + 10,
            bundle: 'game', key: 'headerInfoPlate', group: plateContainer, anchor: {x: 0.5, y: 0}});
        text({x: header.x, y: header.y + header.height / 2 - 10, output: 'Твои рекорды:',
            group: plateContainer, anchor: {x: 0.5, y: 0.5}, size: 60, color: '#003d71', align: 'center', lineSpacing: 90})

        this.record = text({x: header.x, y: header.y + header.bounds.maxY + 80,
            output: '0', group: plateContainer, anchor: {x: 0.5, y: 0.5}, size: 64, color: '#00fd17', align: 'center', lineSpacing: 70,
            shadow: {color: '#000000', blur: 0, distance: 7, angle: 90 * DEG_TO_RAD, alpha: 0.5}});

        const loginButton = button({
            bundle: 'game',
            active: 'loginButtonActive',
            hover: 'loginButtonHover',
            pressed: 'loginButtonPress',
            x: this.record.x, y: this.record.y + this.record.bounds.maxY + 170, anchor: 0.5,
            parent: plateContainer,
            onClick: this._inputDownHandler,
            context: this,
            args: 'login'
        });

        const userNameBar = sprite({x: loginButton.x, y: loginButton.y + loginButton.height / 2 + 20, bundle: 'game', key: 'userNameBar', group: plateContainer, anchor: {x: 0.5, y: 0}});
        this.userName = text({x: userNameBar.x - userNameBar.width / 2 + 35, y: userNameBar.y + userNameBar.height / 2, output: 'Имя', group: plateContainer, anchor: {x: 0, y: 0.5}, size: 48, color: '#ffffff', align: 'center', lineSpacing: 70});

        const buttonsContainer = new Container({parent: plateContainer, x: 0, y: userNameBar.y + userNameBar.height + 150});
        const leaderboardButton = button({
            bundle: 'game',
            active: 'leaderboardButtonActive',
            hover: 'leaderboardButtonHover',
            pressed: 'leaderboardButtonPress',
            x: 0, y: 0, anchor: {x: 0, y: 0.5},
            parent: buttonsContainer,
            onClick: this._inputDownHandler,
            context: this,
            args: 'leaderboard'
        });
        const playButton = button({
            bundle: 'game',
            active: 'playButtonActive',
            hover: 'playButtonHover',
            pressed: 'playButtonPress',
            x: leaderboardButton.x + leaderboardButton.width, y: 0, anchor: {x: 0, y: 0.5},
            parent: buttonsContainer,
            onClick: this._inputDownHandler,
            context: this,
            args: 'play'
        });
        buttonsContainer.x = -buttonsContainer.width / 2;

        // view
        this.visible = false;
    }

    public setRecord(value: number) {
        this.record.text = `Рекорд:\n${value}`
    }

    public setUserName(value: string) {
        this.userName.text = value;
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
}