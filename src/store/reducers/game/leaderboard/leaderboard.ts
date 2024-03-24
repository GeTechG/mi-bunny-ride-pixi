import GameState from "@app/game/views/game";

const categories = ["Все время", "Месяц", "Неделя"];

export interface Place {
    name: string;
    score: number;

}

const places: Place[][] = [
    [
        {name: 'Pavel', score: 100},
        {name: 'Ivan', score: 90},
        {name: 'Dmitry', score: 80},
        {name: 'Vladimir', score: 70},
        {name: 'Sergey', score: 60},
        {name: 'Alexey', score: 50},
        {name: 'Mikhail', score: 40},
        {name: 'Andrey', score: 30},
        {name: 'Nikolay', score: 20},
        {name: 'Roman', score: 10}
    ]
]

export interface LeaderboardStoreState {
    active: boolean;
    category: number;
}

export default class LeaderboardStore {
    private state: LeaderboardStoreState;

    constructor() {
        this.state = {
            active: false,
            category: 0
        };
    }

    get dispatcher() {
        return (<GameState>app.game.states.stateHandler.active).entities.leaderboard;
    }

    /** active */
    show() {
        this.state.category = 0;
        this.dispatcher.setCategory(categories[this.state.category]);
        this.dispatcher.generatePlaces(places[this.state.category] || []);
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
            this.actionCloseLeaderboard();
            this.actionOpenIntro();
        } else if (type === 'next') {
            this.state.category = (this.state.category + 1) % categories.length;
            this.dispatcher.setCategory(categories[this.state.category]);
            this.dispatcher.generatePlaces(places[this.state.category] || []);
            this.dispatcher.animatePlaces().then();
        } else if (type === 'past') {
            this.state.category = (this.state.category - 1 + categories.length) % categories.length;
            this.dispatcher.setCategory(categories[this.state.category]);
            this.dispatcher.generatePlaces(places[this.state.category] || []);
            this.dispatcher.animatePlaces().then();
        }
    }

    /** actions */
    actionCloseLeaderboard() {
        app.store.game.route.closeLeaderboard();
    }

    actionOpenIntro() {
        app.store.game.route.openIntro();
    }
}