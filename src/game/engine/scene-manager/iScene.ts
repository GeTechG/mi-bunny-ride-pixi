import {Application, Container} from "pixi.js";
import SceneManager from "./sceneManager";

export default interface IScene extends Container {
    app: Application|null;
    scenes: SceneManager|null;
    hasRun: boolean;
    onResizeCallback: (width: number, height: number) => void;
    init(): void;
    preload(): Promise<any>;
    destroy(): void;
    start(): void;
    stop(): void;
    update(delta: number): void;
    setResizeCallback(callback: (width: number, height: number) => void): void;
}
