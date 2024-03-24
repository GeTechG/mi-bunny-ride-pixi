import States from "./states/states";
import Scale from "./scale/scale";
import Engine from "./engine/engine";

export default class Game {
    private readonly _engine: Engine;
    private readonly _scale: Scale;
    private readonly _states: States;

    constructor() {
        this._engine = new Engine();
        this._scale = new Scale();
        this._states = new States();
    }

    async init() {
        await this._engine.init();
    }

    prepareStates() {
        this._states.prepareStates();
    }

    launchGame() {
        this._states.startEntryState();
    }

    get engine(): Engine {
        return this._engine;
    }

    get states(): States {
        return this._states;
    }

    get scale(): Scale {
        return this._scale;
    }
}