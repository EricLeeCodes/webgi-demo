import {
  ViewerApp,
  AssetManagerPlugin,
  GBufferPlugin,
  timeout,
  ProgressivePlugin,
  TonemapPlugin,
  SSRPlugin,
  SSAOPlugin,
  DiamondPlugin,
  FrameFadePlugin,
  GLTFAnimationPlugin,
  GroundPlugin,
  BloomPlugin,
  TemporalAAPlugin,
  AnisotropyPlugin,
  GammaCorrectionPlugin,
  addBasePlugins,
  ITexture,
  TweakpaneUiPlugin,
  AssetManagerBasicPopupPlugin,
  CanvasSnipperPlugin,
  IViewerPlugin,
  FileTransferPlugin,
  ThinFilmLayerPlugin,

  // Color, // Import THREE.js internals
  // Texture, // Import THREE.js internals
} from "webgi";
import "./headphones.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

async function setupViewer() {
  // Initialize the viewer
  const viewer = new ViewerApp({
    canvas: document.getElementById("webgi-canvas") as HTMLCanvasElement,
    useRgbm: false,
  });

  // Add plugins individually.
  // await viewer.addPlugin(GBufferPlugin);
  // await viewer.addPlugin(new ProgressivePlugin(32));
  // await viewer.addPlugin(new TonemapPlugin(!viewer.useRgbm));
  // await viewer.addPlugin(GammaCorrectionPlugin);
  // await viewer.addPlugin(SSRPlugin);
  // await viewer.addPlugin(SSAOPlugin);
  // await viewer.addPlugin(BloomPlugin);
  // await viewer.addPlugin(DiamondPlugin)
  // await viewer.addPlugin(FrameFadePlugin)
  // await viewer.addPlugin(GLTFAnimationPlugin)
  // await viewer.addPlugin(GroundPlugin)
  // await viewer.addPlugin(TemporalAAPlugin)
  // await viewer.addPlugin(AnisotropyPlugin)
  // and many more...

  // await viewer.addPlugin(TonemapPlugin);

  //viewer.getPlugin(TonemapPlugin)!.config!.clipBackground = true;

  // or use this to add all main ones at once.
  await addBasePlugins(viewer); // check the source: https://codepen.io/repalash/pen/JjLxGmy for the list of plugins added.

  // Add a popup(in HTML) with download progress when any asset is downloading.
  await viewer.addPlugin(AssetManagerBasicPopupPlugin);

  await viewer.addPlugin(FileTransferPlugin);

  // Add more plugins not available in base, like CanvasSnipperPlugin which has helpers to download an image of the canvas.

  const manager = await viewer.addPlugin(AssetManagerPlugin);
  const camera = viewer.scene.activeCamera;
  const position = camera.position;
  const target = camera.target;

  await viewer.addPlugin(CanvasSnipperPlugin);

  // Import and add a GLB file.
  await viewer.load("./assets/headphones.glb");

  function setupScrollAnimation() {
    const tl = gsap.timeline();

    //Second Section
    tl.to(position, {
      x: -0.1866269681,
      y: -0.1660693204,
      z: 9.9497612905,
      scrollTrigger: {
        trigger: ".second",
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
      onUpdate,
    }).to(target, {
      x: -0.0002194591,
      y: -0.0719280257,
      z: -0.0,
      scrollTrigger: {
        trigger: ".second",
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    });

    //Third Section
    tl.to(position, {
      x: -0.060667672,
      y: 9.8211465151,
      z: 0.1026351212,
      scrollTrigger: {
        trigger: ".third",
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
      onUpdate,
    }).to(target, {
      x: -0.0606677043,
      y: -0.1795496708,
      z: 0.1026251201,
      scrollTrigger: {
        trigger: ".third",
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    });

    //Fourth Section
    tl.to(position, {
      x: -0.12,
      y: -6.77,
      z: -0.19,
      scrollTrigger: {
        trigger: ".fourth",
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
      onUpdate,
    }).to(target, {
      x: -0.122,
      y: -0.18,
      z: -0.19,
      scrollTrigger: {
        trigger: ".fourth",
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    });

    //Fifth Section
    tl.to(position, {
      x: -8.7,
      y: -5.68,
      z: 0.58,
      scrollTrigger: {
        trigger: ".fifth",
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
      onUpdate,
    }).to(target, {
      x: -0.37,
      y: -0.18,
      z: 1.12,
      scrollTrigger: {
        trigger: ".fifth",
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    });

    //Sixth Section
    tl.to(position, {
      x: -8.269,
      y: 1.112,
      z: 7.129,
      scrollTrigger: {
        trigger: ".sixth",
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
      onUpdate,
    }).to(target, {
      x: -0.209,
      y: 0.0125,
      z: 1.311,
      scrollTrigger: {
        trigger: ".sixth",
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    });
  }

  setupScrollAnimation();

  //WEBGI updates
  let needsUpdate = true;

  function onUpdate() {
    needsUpdate = true;
    viewer.renderer.resetShadows();
  }

  viewer.addEventListener("preFrame", () => {
    if (needsUpdate) {
      camera.positionUpdated(true);
      camera.targetUpdated(true);
      needsUpdate = false;
    }
  });
}

setupViewer();
