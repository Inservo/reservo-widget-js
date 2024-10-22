// Original
// (function () {
//   class InstaBookModule {
//     constructor() {
//       this.defaultHeight = 600;
//       this.defaultWidth = 512;
//       this.minWidth = 849;
//       this.minHeight = 649;
//     }

//     async init() {
//       await this.loadFancyBox();
//       this.loadCSS();
//       this.setupFancyBox();
//     }

//     async loadFancyBox() {
//       await new Promise((resolve, reject) => {
//         const script = document.createElement("script");
//         script.src =
//           "https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.umd.js";
//         script.onload = () => {
//           // Load CSS after script loads
//           this.loadCSS();
//           resolve();
//         };
//         script.onerror = reject;
//         document.head.appendChild(script);
//       });
//     }

//     loadCSS() {
//       const link = document.createElement("link");
//       link.rel = "stylesheet";
//       link.href =
//         "https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.css";
//       document.head.appendChild(link);
//     }

//     getModuleHeight() {
//       const moduleElement = document.getElementById("reservo-widget");
//       return moduleElement?.dataset.moduleHeight
//         ? parseInt(moduleElement.dataset.moduleHeight, 10)
//         : this.defaultHeight;
//     }

//     getModuleWidth() {
//       const moduleElement = document.getElementById("reservo-widget");
//       return moduleElement?.dataset.moduleWidth
//         ? Math.max(
//             parseInt(moduleElement.dataset.moduleWidth, 10),
//             this.defaultWidth
//           )
//         : this.defaultWidth;
//     }

//     setupFancyBox() {
//       Fancybox.bind("[data-fancybox]", {
//         // FancyBox options
//       });

//       const style = document.createElement("style");
//       style.textContent = `
//         .fancybox__backdrop {
//           background: rgba(0, 0, 0, 0.1) !important;
//         }
//         .fancybox__container {
//           --fancybox-bg: transparent;
//         }
//         .fancybox__container .fancybox__carousel .fancybox__viewport .fancybox__track .fancybox__slide .fancybox__content {
//           box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
//           border-radius: 15px !important;
//           padding: 0 !important;
//         }
//         .fancybox__container .fancybox__carousel .fancybox__viewport .fancybox__track .fancybox__slide .fancybox__content .fancybox__iframe {
//           border-radius: 15px !important;
//         }
//         .is-close-btn {
//           display: none;
//         }
//       `;
//       document.head.appendChild(style);

//       this.setupModuleLinks();
//     }

//     setupModuleLinks() {
//       const links = {
//         "#reservo-widget": {
//           width: this.getModuleWidth(),
//           height: this.getModuleHeight(),
//         },
//         "#reservation-widget": {
//           width: this.getModuleWidth(),
//           height: this.getModuleHeight(),
//         },
//         "#tol_menus": { width: 645, height: 500 },
//         "#tol_carte": { width: 500, height: 420 },
//         "#tol_newsletter": { width: 360, height: 350 },
//       };

//       let isOpen = false; // Add this line

//       Object.entries(links).forEach(([selector, dimensions]) => {
//         const element = document.querySelector(selector);
//         if (element) {
//           element.addEventListener("click", (e) => {
//             if (isOpen) {
//               // Add this check
//               e.preventDefault();
//               return;
//             }
//             if (
//               window.innerWidth < this.minWidth ||
//               window.innerHeight < this.minHeight
//             ) {
//               // Don't prevent default behavior, let the link open in a new tab
//               window.open(element.href, "_blank");
//             } else {
//               e.preventDefault(); // Prevent default only for FancyBox
//               isOpen = true; // Set isOpen to true
//               Fancybox.show(
//                 [
//                   {
//                     src: element.href,
//                     type: "iframe",
//                     width: dimensions.width,
//                     height: dimensions.height,
//                   },
//                 ],
//                 {
//                   on: {
//                     destroy: () => {
//                       isOpen = false; // Reset isOpen when FancyBox is closed
//                     },
//                   },
//                 }
//               );
//             }
//           });
//         }
//       });
//     }
//   }

//   // Initialize the module
//   function initInstaBook() {
//     const pixelRatio = window.devicePixelRatio || 1;
//     if (window.innerWidth / pixelRatio > 641) {
//       const instaBook = new InstaBookModule();
//       instaBook.init().catch(console.error);
//     }
//   }

//   // Run initialization when DOM is ready
//   if (document.readyState === "loading") {
//     document.addEventListener("DOMContentLoaded", initInstaBook);
//   } else {
//     initInstaBook();
//   }
// })();

(function () {
  class InstaBookModule {
    constructor() {
      this.defaultHeight = 600;
      this.defaultWidth = 512;
      this.minWidth = 849;
      this.minHeight = 649;
      this.isOpen = false; // Moved isOpen here to maintain state
    }

    async init() {
      await this.loadFancyBox();
      await this.loadCSS();
      this.setupFancyBox();
    }

    async loadFancyBox() {
      await new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src =
          "https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.umd.js";
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }

    loadCSS() {
      return new Promise((resolve, reject) => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href =
          "https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.css";
        link.onload = resolve;
        link.onerror = reject;
        document.head.appendChild(link);
      });
    }

    getModuleHeight() {
      const moduleElement = document.getElementById("reservo-widget");
      return moduleElement?.dataset.moduleHeight
        ? parseInt(moduleElement.dataset.moduleHeight, 10)
        : this.defaultHeight;
    }

    getModuleWidth() {
      const moduleElement = document.getElementById("reservo-widget");
      return moduleElement?.dataset.moduleWidth
        ? Math.max(
            parseInt(moduleElement.dataset.moduleWidth, 10),
            this.defaultWidth
          )
        : this.defaultWidth;
    }

    setupFancyBox() {
      Fancybox.bind("[data-fancybox]", {
        // You can set default options here if needed
      });
      // No need to inject custom styles here anymore
      this.setupModuleLinks();
    }

    setupModuleLinks() {
      const links = {
        "#reservo-widget": {
          width: this.getModuleWidth(),
          height: this.getModuleHeight(),
        },
        "#reservation-widget": {
          width: this.getModuleWidth(),
          height: this.getModuleHeight(),
        },
        "#tol_menus": { width: 645, height: 500 },
        "#tol_carte": { width: 500, height: 420 },
        "#tol_newsletter": { width: 360, height: 350 },
      };

      Object.entries(links).forEach(([selector, dimensions]) => {
        const element = document.querySelector(selector);
        if (element) {
          element.addEventListener("click", (e) => {
            if (this.isOpen) {
              if (
                window.innerWidth < this.minWidth ||
                window.innerHeight < this.minHeight
              ) {
                // Allow the link to open in a new tab
                return;
              } else {
                // Prevent opening another Fancybox
                e.preventDefault();
                return;
              }
            }
            if (
              window.innerWidth < this.minWidth ||
              window.innerHeight < this.minHeight
            ) {
              // Let the link open in a new tab
              this.isOpen = true;
              window.open(element.href, "_blank");
              // Optionally reset isOpen when window regains focus
              window.addEventListener(
                "focus",
                () => {
                  this.isOpen = false;
                },
                { once: true }
              );
            } else {
              e.preventDefault();
              this.isOpen = true;
              Fancybox.show(
                [
                  {
                    src: element.href,
                    type: "iframe",
                    width: dimensions.width,
                    height: dimensions.height,
                  },
                ],
                {
                  style: {
                    "--fancybox-bg": "rgba(0, 0, 0, 0.1)",
                    "--fancybox-content-bg": "transparent",
                    "--fancybox-content-shadow": "0 0 15px rgba(0, 0, 0, 0.1)",
                    "--fancybox-content-radius": "15px",
                    "padding": "0",
                  },
                  closeButton: false,
                  // Other options...
                  on: {
                    destroy: () => {
                      this.isOpen = false;
                    },
                  },
                }
              );
            }
          });
        }
      });
    }
  }

  // Initialize the module
  function initInstaBook() {
    const pixelRatio = window.devicePixelRatio || 1;
    if (window.innerWidth / pixelRatio > 641) {
      const instaBook = new InstaBookModule();
      instaBook.init().catch(console.error);
    }
  }

  // Run initialization when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", i


