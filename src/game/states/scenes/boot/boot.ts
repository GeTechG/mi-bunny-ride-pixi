import {Assets} from "pixi.js";
import Scene from "../../../engine/scene-manager/scene";


export default class BootState extends Scene {

    override init(): void {
        app.game.scale.init(this.app!.renderer!);
    }

    override preload(): Promise<any> {
        return Assets.loadBundle('preloader');
    }

    override start(): void {
        app.game.states.startState('Preloader');
    }
}