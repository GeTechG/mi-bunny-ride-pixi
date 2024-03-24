import IntroStore from "./intro/intro";
import Route from "./route/route";
import CoinsStore from "@app/game/store/coins/coins";
import ButtonsStore from "@app/game/store/buttons/buttons";
import LeaderboardStore from "@app/game/store/leaderboard/leaderboard";
import GameEndStore from "@app/game/store/gameEnd/gameEnd";

export class GameStore {
    intro: IntroStore;
    route: Route;
    coins: CoinsStore;
    buttons: ButtonsStore;
    leaderboard: LeaderboardStore;
    gameEnd: GameEndStore;

    constructor() {
        this.intro = new IntroStore();
        this.route = new Route();
        this.coins = new CoinsStore();
        this.buttons = new ButtonsStore();
        this.leaderboard = new LeaderboardStore();
        this.gameEnd = new GameEndStore();
    }

    /** events */
    eventInitComponents() {
        this.intro.show();
        this.coins.show();
        this.buttons.show();
    }

    eventDisableGlobalInput() {
        app.game.engine.stage.interactiveChildren = false;
    }

    eventEnableGlobalInput() {
        app.game.engine.stage.interactiveChildren = true;
    }
}