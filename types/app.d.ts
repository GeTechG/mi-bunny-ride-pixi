interface Window {
    app: {
        core: import("../src/core/core").default;
        game: import("../src/game/game").default;
        store: import("../src/store/store").default;
    };
}

declare let app: Window["app"]