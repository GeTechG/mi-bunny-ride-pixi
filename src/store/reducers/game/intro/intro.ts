import GameState from "@app/game/views/game";


export interface IntroStoreState {
    active: boolean;
    record: number;
    userName: string;
}

export default class IntroStore {
    private state: IntroStoreState;

    constructor() {
        this.state = {
            active: false,
            record: 0,
            userName: 'Guest_4880'
        };
    }

    get dispatcher() {
        return (<GameState>app.game.states.stateHandler.active).entities.intro;
    }

    /** active */
    show() {
        this.dispatcher.setRecord(this.state.record);
        this.dispatcher.setUserName(this.state.userName)
        this.state.active = true;
        this.dispatcher.show();
    }

    hide() {
        this.state.active = false;
        this.dispatcher.hide();
    }

    /** events */
    eventInputDown(type: string) {
        if (type === 'play') {
            this.actionCloseIntro();
            this.actionOpenGameEnd();
        } else if (type === 'login') {
            // ...
        } else if (type === 'leaderboard') {
            this.actionCloseIntro();
            this.actionOpenLeaderboard();
        }
    }

    /** actions */
    actionCloseIntro() {
        app.store.game.route.closeIntro();
    }

    actionOpenLeaderboard() {
        app.store.game.route.openLeaderboard();
    }

    actionOpenGameEnd() {
        app.store.game.route.openGameEnd();
    }
}