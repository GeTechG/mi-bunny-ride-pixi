import {Container, Sprite, Text} from "pixi.js";
import CoinsStore from "@app/game/store/coins/coins";
import {sprite, text} from "@app/helpers/objects";

export default class CoinsView extends Container {
    private _store: CoinsStore;

    private coins!: Text;

    constructor(parent: Container) {
        super();
        parent.addChild(this);

        this._store = app.store.game.coins;

        this._init();
    }

    _init() {
        const plateContainer = new Container({parent: this, scale: {x: 0.665, y: 0.665}});
        const plate = sprite({x: 85, y: 30, bundle: 'game', key: 'coinScorePlate', group: plateContainer});
        sprite({x: plate.x - 70, y: plate.y - 17, bundle: 'game', key: 'collectCoinIcon', group: plateContainer});
        this.coins = text({x: plate.x + plate.width / 2, y: plate.y + plate.height / 2, output: '0', group: plateContainer, size: 54, color: '#ffffff', align: 'center', lineSpacing: 50, anchor: 0.5});

        // view
        this.visible = false;
    }

    public setCoins(value: number) {
        this.coins.text = value.toString();
    }

    show() {
        this.visible = true;
    }

    hide() {
        this.visible = false;
    }
}