import BackView from "@app/preloader/views/back/back";
import PreloaderState from "@app/preloader/views/preloader";

export default class {
    private state: {
        active: boolean
    };

    constructor() {
        this.state = {
            active: false,
        };
    }

    get dispatcher(): BackView {
        return (<PreloaderState>app.game.states.stateHandler.active).entities.back;
    }

    /** active */
    show() {
        this.state.active = true;
        this.dispatcher.show();
    }

    hide() {
        this.state.active = false;
        this.dispatcher.hide();
    }
}