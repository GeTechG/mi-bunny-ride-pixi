import GameState from "@app/game/views/game";

export interface GameEndStoreState {
    active: boolean;
    record: number;
    coins: number;
    meters: number;
}

export default class GameEndStore {
    private state: GameEndStoreState;

    constructor() {
        this.state = {
            active: false,
            record: 65,
            coins: 2,
            meters: 59
        };
    }

    get dispatcher() {
        return (<GameState>app.game.states.stateHandler.active).entities.gameEnd;
    }

    /** active */
    show() {
        this.dispatcher.setRecord(this.state.record);
        this.dispatcher.setCoins(this.state.coins);
        this.dispatcher.setMeters(this.state.meters);
        this.state.active = true;
        this.dispatcher.show();
    }

    hide() {
        this.state.active = false;
        this.dispatcher.hide();
    }

    /** events */
    eventInputDown(type: string) {
        if (type === 'close') {
            this.actionCloseGameEnd();
            this.actionOpenLeaderboard();
        }
    }

    /** actions */
    actionCloseGameEnd() {
        app.store.game.route.closeGameEnd();
    }

    actionOpenLeaderboard() {
        app.store.game.route.openLeaderboard();
    }
}