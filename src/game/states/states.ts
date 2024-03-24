import BootState from "./scenes/boot/boot";
import PreloaderState from "./scenes/preloader/preloader";
import SceneManager from "../engine/scene-manager/sceneManager";
import IScene from "../engine/scene-manager/iScene";
import GameState from "./scenes/game/game";

export default class States {
    private _stateHandler!: SceneManager;

    _addState(name: string, state: IScene) {
        this._stateHandler.add(name, state);
    }

    prepareStates() {
        this._stateHandler = app.game.engine.stateManager;

        this._addState('Boot', new BootState());
        this._addState('Preloader', new PreloaderState());
        this._addState('Game', new GameState());
    }

    restartState() {
        if (this._stateHandler.activeName != null) {
            this._stateHandler.start(this._stateHandler.activeName);
        }
    }

    startEntryState() {
        this.startState('Boot');
    }

    startState(name: string) {
        this._stateHandler.start(name);
    }

    get stateHandler(): SceneManager {
        return this._stateHandler;
    }
}