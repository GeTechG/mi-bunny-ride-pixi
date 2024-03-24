import Game from "../game/game";
import {Assets} from "pixi.js";
import Store from "../store/store";

export default class Core {
    constructor() {
        if (![].at) { Array.prototype.at = function (pos) { return this.slice(pos, pos + 1)[0]; }; }
    }

    async initRootModules() {
        app.game = new Game();
        app.store = new Store();

        await this.launchApp();
    }

    async launchApp() {
        // game
        await app.game.init();
        await Assets.init({
            manifest: 'manifest.json',
            bundleIdentifier: {
                connector: '/',
            }
        });
        app.game.prepareStates();
        app.game.launchGame();
    }
}