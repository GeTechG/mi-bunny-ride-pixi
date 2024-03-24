import {Application} from "pixi.js";
import SceneManager from "./scene-manager/sceneManager";

export default class Engine extends Application {
    private _stateManager!: SceneManager

    override async init() {
        const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
        await super.init({
            canvas: canvas,
            resizeTo: document.getElementById('gamePlace') as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            roundPixels: true,
            autoDensity: true,
        });
        this._stateManager = new SceneManager(this);
    }


    get stateManager(): SceneManager {
        return this._stateManager;
    }
}