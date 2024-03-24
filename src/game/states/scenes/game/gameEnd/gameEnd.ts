import {Container, DEG_TO_RAD, Sprite, Text} from "pixi.js";
import {button, sprite, text} from "@app/helpers/objects";
import GameEndStore from "@app/game/store/gameEnd/gameEnd";
import {gsap} from "gsap";

export default class GameEndView extends Container {
    private _store: GameEndStore;

    private record!: Text;
    private coins!: Text;
    private meters!: Text;

    constructor(parent: Container) {
        super();
        parent.addChild(this);

        this._store = app.store.game.gameEnd;

        this._init();
    }

    _init() {
        const plateContainer = new Container({parent: this, scale: {x: 0.665, y: 0.665}});

        const rays = sprite({x: 0, y: 0, bundle: 'game', key: 'rays', group: plateContainer, anchor: {x: 0.5, y: 0.5}});
        gsap.to(rays, {angle: 360, duration: 10, repeat: -1, ease: 'none'});

        const starsContainer = new Container({parent: plateContainer});
        starsContainer.x = -20;
        for (let i = 0; i < 16; i++) {
            const step = 360 / 16;
            if ((i * step > 60) && (i * step < 150)) {
                continue;
            }
            if ((i * step > 230) && (i * step < 320)) {
                continue;
            }
            const star = sprite({x: Math.cos((i * step - 12) * DEG_TO_RAD) * 600, y: Math.sin((i * step - 12) * DEG_TO_RAD) * 600, bundle: 'game', key: 'star', group: starsContainer, anchor: {x: 0.5, y: 0.5}});
            if (i % 4 === 0) {
                star.scale.set(1.4);
                gsap.fromTo(star, {angle: -20}, {angle: 20, duration: 3, repeat: -1, yoyo: true, ease: 'none'});
            } else if (i % 4 === 1) {
                star.scale.set(0.7);
                star.x = Math.cos((i * step - 12) * DEG_TO_RAD) * 580;
                star.y = Math.sin((i * step - 12) * DEG_TO_RAD) * 580;
                gsap.fromTo(star, {angle: 5}, {angle: -5, duration: 3, repeat: -1, yoyo: true, ease: 'none'});
            } else {
                gsap.fromTo(star, {angle: -20}, {angle: 20, duration: 3, repeat: -1, yoyo: true, ease: 'none'});
            }
        }

        const infoPlateBig = sprite({x: 0, y: 0, bundle: 'game', key: 'infoPlateBig', group: plateContainer, anchor: {x: 0.5, y: 0.5}});

        const header = sprite({x: 0, y: infoPlateBig.y + infoPlateBig.bounds.minY + 10,
            bundle: 'game', key: 'headerInfoPlate', group: plateContainer, anchor: {x: 0.5, y: 0}});
        text({x: header.x, y: header.y + header.height / 2 - 5, output: 'Новый рекорд:',
            group: plateContainer, anchor: {x: 0.5, y: 0.5}, size: 64, color: '#003d71', align: 'center', lineSpacing: 90})

        this.record = text({x: header.x, y: header.y + header.bounds.maxY + 107,
            output: '0', group: plateContainer, anchor: {x: 0.5, y: 0.5}, size: 180, color: '#00cc00', align: 'center', lineSpacing: 70,
            shadow: {color: '#000000', blur: 0, distance: 7, angle: 90 * DEG_TO_RAD, alpha: 0.5}});

        const coinsIcon = sprite({x: -227, y: this.record.y + this.record.height / 2 + 77, bundle: 'game', key: 'collectCoinIcon', group: plateContainer, anchor: {x: 0.5, y: 0.5}});
        this.coins = text({x: coinsIcon.x + coinsIcon.width / 2 + 217, y: coinsIcon.y + 17, output: '0', group: plateContainer, anchor: {x: 0.5, y: 0.5}, size: 102, color: '#f4ad25', align: 'center', lineSpacing: 70,
            shadow: {color: '#000000', blur: 0, distance: 7, angle: 90 * DEG_TO_RAD, alpha: 0.35}});

        const scoresIcon = sprite({x: -235, y: coinsIcon.y + coinsIcon.height + 89, bundle: 'game', key: 'collectDistanceIcon', group: plateContainer, anchor: {x: 0.5, y: 0.5}});
        this.meters = text({x: scoresIcon.x + scoresIcon.width / 2 + 240, y: scoresIcon.y + 11, output: '0', group: plateContainer, anchor: {x: 0.5, y: 0.5}, size: 102, color: '#9ac6ff', align: 'center', lineSpacing: 70,
            shadow: {color: '#000000', blur: 0, distance: 7, angle: 90 * DEG_TO_RAD, alpha: 0.35}});

        button({
            bundle: 'game',
            active: 'okButtonActive',
            hover: 'okButtonHover',
            pressed: 'okButtonPress',
            x: 0, y: 365, anchor: 0.5,
            parent: plateContainer,
            onClick: this._inputDownHandler,
            context: this,
            args: 'close'
        });

        // view
        this.visible = false;
    }

    public setRecord(value: number) {
        this.record.text = value.toString();
    }

    public setCoins(value: number) {
        this.coins.text = value.toString();
    }

    public setMeters(value: number) {
        this.meters.text = `${value} м`;
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