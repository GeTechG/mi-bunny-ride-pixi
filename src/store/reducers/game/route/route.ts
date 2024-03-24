export default class Route {
    constructor() {

    }

    openIntro() {
        app.store.game.intro.show();
    }

    closeIntro() {
        app.store.game.intro.hide();
    }

    openLeaderboard() {
        app.store.game.leaderboard.show();
    }

    closeLeaderboard() {
        app.store.game.leaderboard.hide();
    }

    openGameEnd() {
        app.store.game.gameEnd.show();
    }

    closeGameEnd() {
        app.store.game.gameEnd.hide();
    }
}