import Core from "./core/core";

// @ts-ignore
window.app = {};

document.addEventListener('DOMContentLoaded', () => {
    window.app.core = new Core();
    window.app.core.initRootModules().then();
});