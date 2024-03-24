import PreloaderState from "@app/preloader/views/preloader";
import BunnyView from "@app/preloader/views/bunny/bunny";

export default class {
    private state: {
        active: boolean
    };

    constructor() {
        this.state = {
            active: false,
        };
    }

    get dispatcher(): BunnyView {
        return (<PreloaderState>app.game.states.stateHandler.active).entities.bunny;
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