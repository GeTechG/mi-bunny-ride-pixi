import GameState from "@app/game/views/game";


export interface CoinsStoreState {
    active: boolean;
    coins: number;
}

export default class CoinsStore {
    private state: CoinsStoreState;

    constructor() {
        this.state = {
            active: false,
            coins: 100
        };
    }

    get dispatcher() {
        return (<GameState>app.game.states.stateHandler.active).entities.coins;
    }

    /** active */
    show() {
        this.dispatcher.setCoins(this.state.coins);
        this.state.active = true;
        this.dispatcher.show();
    }

    hide() {
        this.state.active = false;
        this.dispatcher.hide();
    }
}