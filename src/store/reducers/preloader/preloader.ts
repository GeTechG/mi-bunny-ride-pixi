import Back from "./back/back";
import Bunny from "./bunny/bunny";

export default class Preloader {
    private back: Back;
    private bunny: Bunny;

    constructor() {
        this.back = new Back();
        this.bunny = new Bunny();
    }

    /** events */
    eventInitComponents() {
        // show
        this.back.show();
        this.bunny.show();
    }
}