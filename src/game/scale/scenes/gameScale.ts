import GameState from "../../states/scenes/game/game";
import IScene from "../../engine/scene-manager/iScene";

export default class GameScaling {
    private scene!: GameState;

    init(scene: IScene) {
        this.scene = (<GameState>scene);

        this.scene.setResizeCallback((width, height) => this.resizeCallback(width, height));
        this.scale();
    }

    resizeCallback(width: number, height: number) {
        app.game.scale.calculateScaleRatio(width, height);
        this.scale();
    }

    scale() {
        const { width, height, maxRatio, minRatio, scaleRatio } = app.game.scale;

        const {intro, coins, buttons, leaderboard, gameEnd } = this.scene.entities;
        intro.scale.set(Math.min(Math.min(width / 640, 1), Math.min(height / 640, 1)));
        intro.position.set(width / 2, height / 2);

        coins.scale.set(Math.min(Math.min(width / 640, 1), Math.min(height / 640, 1)));

        buttons.scale.set(Math.min(Math.min(width / 640, 1), Math.min(height / 640, 1)));
        buttons.position.set(width - buttons.width - 8, 5);

        leaderboard.scale.set(Math.min(Math.min(width / 640, 1), Math.min(height / 640, 1)));
        leaderboard.position.set(width / 2, height / 2);

        gameEnd.scale.set(Math.min(Math.min(width / 640, 1), Math.min(height / 640, 1)));
        gameEnd.position.set(width / 2, height / 2);
    }
}