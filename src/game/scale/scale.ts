import PreloaderScaling from "./scenes/preloadingScale";
import {Renderer} from "pixi.js";
import GameScaling from "./scenes/gameScale";

export default class Scale {
    originalWidth: number = 1280;
    originalHeight: number = 640;

    renderer!: Renderer;
    devicePixelRatio!: number;
    width!: number;
    height!: number;
    widthDPR!: number;
    heightDPR!: number;
    maxRatio!: number;
    minRatio!: number;
    aspectRatio!: number;
    scaleRatio!: number;
    orientation!: 'landscape' | 'portrait';
    sat!: number;
    maxWidth!: number;
    maxHeight!: number;
    interval: NodeJS.Timeout | null = null;

    preloaderScaling: PreloaderScaling;
    gameScaling: GameScaling;

    constructor() {
        this.preloaderScaling = new PreloaderScaling();
        this.gameScaling = new GameScaling();
    }

    public init(render: Renderer) {
        this.renderer = render;
        this.calculateScaleRatio(this.renderer.width, this.renderer.height);
    }

    public calculateScaleRatio(width: number, height: number) {
        this.devicePixelRatio = this.renderer.resolution;

        // width
        this.widthDPR = width;

        // height
        this.heightDPR = height;

        this.width = this.widthDPR < this.heightDPR ? Math.min(this.widthDPR, this.heightDPR) : Math.max(this.widthDPR, this.heightDPR);
        this.height = this.widthDPR < this.heightDPR ? Math.max(this.widthDPR, this.heightDPR) : Math.min(this.widthDPR, this.heightDPR);
        this.maxRatio = Math.max(this.width / this.originalWidth, this.height / this.originalHeight);
        this.minRatio = Math.min(this.width / this.originalWidth, this.height / this.originalHeight);
        this.aspectRatio = this.height / this.width;
        this.scaleRatio = this.minRatio;

        const previousOrientation = this.orientation;
        this.orientation = this.width < this.height ? 'portrait' : 'landscape';
        if (previousOrientation && previousOrientation !== this.orientation) {
            this.calculateScaleRatio(this.renderer.width, this.renderer.height);
            setTimeout(() => this.calculateScaleRatio(this.renderer.width, this.renderer.height), 500);
            setTimeout(() => this.calculateScaleRatio(this.renderer.width, this.renderer.height), 1000);
        }

        this.maxWidth = !this.maxWidth ? this.width : this.maxWidth;
        this.maxHeight = !this.maxHeight ? this.height : this.maxHeight;
        if (this.maxWidth < this.width || this.maxHeight < this.height) {
            this.maxWidth = this.width;
            this.maxHeight = this.height;
        }
    }
}
