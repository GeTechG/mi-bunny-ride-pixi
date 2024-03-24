import IScene from "./iScene";
import {Application, Ticker} from "pixi.js";


export default class SceneManager {

    private readonly app: Application;
    private readonly scenes: { [name: string]: IScene };
    private current: string | null;

    constructor(app: Application) {
        this.app = app;
        this.scenes = {};
        this.current = null;
        app.ticker.add(this.update, this);
        app.renderer.on('resize', (width, height) => {
            this.onResize(width, height);
        })
    }

    private update(ticker: Ticker): void {
        const active: IScene | null = this.active;
        if (active) {
            active.update(ticker.deltaMS / 1000);
        }
    }

    /**
     * Adds the scene instance to function under this manager.
     * * If the name is already taken, it won't be added.
     * @param {string} name The name you give to this scene instance.
     * @param {Scene} scene Instance of the scene you want to add.
     */
    public add(name: string, scene: IScene): void {
        // TODO: Remove from previous manager if set
        if (!name || this.contains(name)) {
            return;
        }
        this.scenes[name] = scene;
        scene.app = this.app;
        scene.scenes = this;
    }

    /**
     * Removed a scene from this manager.
     * * If this scene is currently active, it will be stopped first.
     * @param {string} name Name given to this scene instance.
     */
    public remove(name: string): boolean {
        if (!name || !this.contains(name)) {
            return false;
        }
        if (this.current === name) {
            this.stop();
        }
        const scene = this.scenes[name];
        scene.app = null;
        scene.scenes = null;
        if (scene.hasRun) {
            scene.destroy();
            scene.hasRun = false;
        }
        delete this.scenes[name];
        return true;
    }

    /**
     * Checks there is a scene with this name in this manager.
     * @param {string} name
     * @returns {boolean}
     */
    public contains(name: string): boolean {
        return name in this.scenes;
    }

    /**
     * Starts a scene and set's it to be the active scene of this manager.
     * * Stops the previous active scene first if defined.
     * @param {string} name
     */
    public start(name: string): void {
        if (!this.contains(name) || name === this.current) {
            return;
        }

        this.stop();

        // Start new
        this.current = name;
        const active = this.active;
        if (active) {
            if (!active.hasRun) {
                active.init();
                active.hasRun = true;
            }
            active.preload().then(() => {
                active.start();
            });
            this.app.stage.addChild(active);
        }
    }

    /**
     * Stops the scene and unsets it as the active scene in this manager.
     */
    public stop(): void {
        const active: IScene | null = this.active;
        if (active) {
            this.current = null;
            active.stop();
            this.app.stage.removeChild(active);
        }
    }

    /**
     * Getting the active scene in this manager.
     * @returns {Scene|null}
     */
    public get active(): IScene | null {
        return this.current ? this.scenes[this.current] : null;
    }

    /**
     * Getting the name of the active scene in this manager.
     * @returns {Scene|null}
     */
    public get activeName(): string | null {
        return this.current;
    }

    /**
     * Getting the names of all the scenes in this manager.
     * @returns {string[]}
     */
    public get sceneNames(): string[] {
        return Object.keys(this.scenes);
    }

    onResize(width: number, height: number) {
        for (const scenesKey in this.scenes) {
            this.scenes[scenesKey].onResizeCallback(width, height);
        }
    }
}
