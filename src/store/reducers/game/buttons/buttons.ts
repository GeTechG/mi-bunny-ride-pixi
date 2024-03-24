import GameState from "@app/game/views/game";


export interface ButtonsStoreState {
    active: boolean;
    soundOn: boolean;
    fullscreen: boolean;
}

export default class ButtonsStore {
    private state: ButtonsStoreState;

    constructor() {
        this.state = {
            active: false,
            soundOn: true,
            fullscreen: false
        };
    }

    get dispatcher() {
        return (<GameState>app.game.states.stateHandler.active).entities.buttons;
    }

    /** events */
    public eventInputDown(type: string) {
        if (type === 'sound') {
            this.state.soundOn = !this.state.soundOn;
            this.dispatcher.setSoundOn(this.state.soundOn);
        } else if (type === 'fullscreen') {
            this.state.fullscreen = !this.state.fullscreen;
            if (this.state.fullscreen) {
                if(app.game.engine.canvas.requestFullscreen) {
                    app.game.engine.canvas.requestFullscreen();
                }
            } else {
                document.exitFullscreen();
            }
        }
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