import BackView from "./back/back";
import BunnyView from "./bunny/bunny";
import Scene from "../../../engine/scene-manager/scene";
import {Assets} from "pixi.js";

export interface Entities {
    back: BackView,
    bunny: BunnyView,
}

export default class PreloaderState extends Scene {
    private _entities!: Entities;

    override init() {
        this._entities = {
            back: new BackView(this),
            bunny: new BunnyView(this),
        };

        app.store.preloader.eventInitComponents();


        app.game.scale.preloaderScaling.init(this);
    }

    override async preload(): Promise<void> {
        return Assets.loadBundle('game');
    }

    override start() {
        app.game.states.startState('Game');
    }


    get entities(): Entities {
        return this._entities;
    }
}