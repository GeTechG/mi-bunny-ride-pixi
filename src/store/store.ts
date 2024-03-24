import Preloader from "./reducers/preloader/preloader";
import {GameStore} from "./reducers/game/game";

export default class Store {
    public preloader: Preloader;
    public game: GameStore;

    constructor() {
        this.preloader = new Preloader();
        this.game = new GameStore();
    }
}