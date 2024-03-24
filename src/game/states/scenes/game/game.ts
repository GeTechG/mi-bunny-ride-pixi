import IntroView from "./intro/intro";
import Scene from "@app/game/engine/scene-manager/scene";
import CoinsView from "@app/game/views/coins/coins";
import ButtonsView from "@app/game/views/buttons/buttons";
import LeaderboardView from "@app/game/views/leaderboard/leaderboard";
import GameEndView from "@app/game/views/gameEnd/gameEnd";

interface Entities {
    intro: IntroView
    leaderboard: LeaderboardView
    gameEnd: GameEndView
    coins: CoinsView
    buttons: ButtonsView
}

export default class GameState extends Scene {
    private _entities!: Entities;

    override start() {
        app.store.game.eventDisableGlobalInput();
        this._entities = {
            intro: new IntroView(this),
            leaderboard: new LeaderboardView(this),
            gameEnd: new GameEndView(this),
            buttons: new ButtonsView(this),
            coins: new CoinsView(this),
        };

        app.store.game.eventInitComponents();
        app.store.game.eventEnableGlobalInput();

        app.game.scale.gameScaling.init(this);
    }

    get entities(): Entities {
        return this._entities;
    }
}