import {Container, DEG_TO_RAD, Sprite, Text} from "pixi.js";
import {button, sprite, text} from "@app/helpers/objects";
import LeaderboardStore, {Place} from "@app/game/store/leaderboard/leaderboard";
import { gsap } from "gsap";

function getPlaceColor(place: number) {
    switch (place) {
        case 0:
            return '#c16001';
        case 1:
            return '#215db0';
        case 2:
            return '#8b1b01';
        default:
            return '#343434';
    }
}

export default class LeaderboardView extends Container {
    private _store: LeaderboardStore;

    private category!: Text;

    private placesContainer!: Container;

    private tweenLeaderboard?: gsap.core.Tween;

    constructor(parent: Container) {
        super();
        parent.addChild(this);

        this._store = app.store.game.leaderboard;

        this._init();
    }

    _init() {
        const plateContainer = new Container({parent: this, scale: {x: 0.665, y: 0.665}});
        const infoPlateBig = sprite({x: 0, y: 0, bundle: 'game', key: 'infoPlateBig', group: plateContainer, anchor: {x: 0.5, y: 0.5}});

        const header = sprite({x: 0, y: infoPlateBig.y + infoPlateBig.bounds.minY + 10,
            bundle: 'game', key: 'headerInfoPlate', group: plateContainer, anchor: {x: 0.5, y: 0}});
        text({x: header.x, y: header.y + header.height / 2 - 10, output: 'Таблица рекордов:',
            group: plateContainer, anchor: {x: 0.5, y: 0.5}, size: 60, color: '#003d71', align: 'center', lineSpacing: 90})

        this.category = text({x: header.x, y: header.y + header.bounds.maxY + 50,
            output: '0', group: plateContainer, anchor: {x: 0.5, y: 0.5}, size: 64, color: '#ff6801', align: 'center', lineSpacing: 70,
            shadow: {color: '#000000', blur: 0, distance: 7, angle: 90 * DEG_TO_RAD, alpha: 0.5}});
        const pastButton = button({
            bundle: 'game',
            active: 'arrowBtnActive',
            hover: 'arrowBtnHover',
            pressed: 'arrowBtnPress',
            x: -280, y: this.category.y, anchor: 0.5,
            parent: plateContainer,
            onClick: this._inputDownHandler,
            context: this,
            args: 'past'
        });
        pastButton.width *= -1;

        const nextButton = button({
            bundle: 'game',
            active: 'arrowBtnActive',
            hover: 'arrowBtnHover',
            pressed: 'arrowBtnPress',
            x: 270, y: this.category.y, anchor: 0.5,
            parent: plateContainer,
            onClick: this._inputDownHandler,
            context: this,
            args: 'next'
        });

        this.placesContainer = new Container({parent: plateContainer, x: 0, y: this.category.y + 75});

        button({
            bundle: 'game',
            active: 'okButtonActive',
            hover: 'okButtonHover',
            pressed: 'okButtonPress',
            x: 0, y: 360, anchor: 0.5,
            parent: plateContainer,
            onClick: this._inputDownHandler,
            context: this,
            args: 'close'
        });

        // view
        this.visible = false;
    }

    public setCategory(category: string) {
        this.category.text = category;
    }

    public generatePlaces(places: Place[]) {
        this.placesContainer.removeChildren();
        for (let i = 0; i < 10; i++) {
            const name = places[i]?.name || '-';
            const scores = places[i]?.score.toString() || '-';
            if (i < 3) {
                const placeContainer = new Container({parent: this.placesContainer, x: -350, y: i * 80});
                const place = sprite({x: 0, y: 0, bundle: 'game', key: 'place_' + (i + 1), group: placeContainer, anchor: {x: 0, y: 0.5}});
                text({x: 80, y: 0, output: name, group: placeContainer, anchor: {x: 0, y: 0.5}, size: 42, color: getPlaceColor(i), align: 'center', lineSpacing: 70});

                const scorePlate = sprite({x: place.width + 103, y: 0, bundle: 'game', key: 'highleaderScoresPlate', group: placeContainer, anchor: {x: 0.5, y: 0.5}});
                text({x: scorePlate.x, y: scorePlate.y, output: scores, group: placeContainer, anchor: {x: 0.5, y: 0.5}, size: 42, color: getPlaceColor(i), align: 'center', lineSpacing: 70});
            } else {
                const placeContainer = new Container({parent: this.placesContainer, x: -275, y: 90 + i * 46});
                text({x: -35, y: 0, output: (i + 1).toString(), group: placeContainer, anchor: {x: 0.5, y: 0.5}, size: 36, color: "#ffffff", align: 'center', lineSpacing: 70});
                const place = sprite({x: 0, y: 0, bundle: 'game', key: 'midleaderNamePlate', group: placeContainer, anchor: {x: 0, y: 0.5}});
                text({x: place.x + 10, y: place.y, output: name, group: placeContainer, anchor: {x: 0, y: 0.5}, size: 36, color: getPlaceColor(i), align: 'center', lineSpacing: 70});

                const scorePlate = sprite({x: place.x + place.width + 103, y: place.y, bundle: 'game', key: 'midleaderScoresPlate', group: placeContainer, anchor: {x: 0.5, y: 0.5}});
                text({x: scorePlate.x, y: scorePlate.y, output: scores, group: placeContainer, anchor: {x: 0.5, y: 0.5}, size: 36, color: getPlaceColor(i), align: 'center', lineSpacing: 70});
            }
        }
    }

    public async animatePlaces() {
        if (this.tweenLeaderboard) {
            this.tweenLeaderboard.kill();
        }
        this.placesContainer.children.forEach((child) => {
            child.visible = false;
        });
        const tweenValue = {value: 0};
        this.tweenLeaderboard = gsap.to(tweenValue, {
            value: this.placesContainer.children.length - 1,
            ease: 'none',
            duration: 1,
            onUpdate: () => {
                this.placesContainer.children[Math.floor(tweenValue.value)].visible = true;
            }
        }).play();
        this.tweenLeaderboard.then(() => {
            this.tweenLeaderboard = undefined;
        });
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