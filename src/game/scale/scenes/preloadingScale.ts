import IScene from "../../engine/scene-manager/iScene";
import PreloaderState from "@app/preloader/views/preloader";


export default class PreloaderScaling {
    scene!: PreloaderState;

    init(scene: IScene) {
        this.scene = (<PreloaderState>scene);

        this.scene.setResizeCallback((width, height) => this.resizeCallback(width, height));
        this.scale();
    }

    resizeCallback(width: number, height: number) {
        app.game.scale.calculateScaleRatio(width, height);
        this.scale();
    }

    scale() {
        const { width, height, maxRatio, scaleRatio } = app.game.scale;

        const { back, bunny } = this.scene.entities;

        back.scale.set(maxRatio);
        back.x = Math.round(width / 2) - back.width / 2;
        back.y = Math.round(height / 2) - back.height / 2;

        bunny.scale.set(scaleRatio);
        bunny.x = Math.round(width / 2);
        bunny.y = Math.round(height / 2);
    }
}