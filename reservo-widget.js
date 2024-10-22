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
//       return new Promise((resolve, reject) => {
//         const script = document.createElement("script");
//         script.src =
//           "https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.umd.js";
//         script.onload = resolve;
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
//         .fancybox__content {
//           box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
//           border-radius: 8px;
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
      this.defaultHeight = 450;
      this.defaultWidth = 320;
      this.minWidth = 849;   // Un-commented
      this.minHeight = 649;  // Un-commented
    }

    async init() {
      await this.loadFancyBox();
      this.loadCSS();
      this.setupFancyBox();
    }

    async loadFancyBox() {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src =
          "https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.umd.js";
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }

    loadCSS() {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.css";
      document.head.appendChild(link);
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

    getReservationModuleHeight() {
      const moduleElement = document.getElementById("reservation-widget"); // Updated ID
      return moduleElement?.dataset.moduleHeight
        ? parseInt(moduleElement.dataset.moduleHeight, 10)
        : this.defaultHeight;
    }

    getReservationModuleWidth() {
      const moduleElement = document.getElementById("reservation-widget"); // Updated ID
      return moduleElement?.dataset.moduleWidth
        ? parseInt(moduleElement.dataset.moduleWidth, 10)
        : this.defaultWidth;
    }


    setupFancyBox() {
      Fancybox.bind("[data-fancybox]", {
        // FancyBox options
      });

      const style = document.createElement("style");
      style.textContent = `
        .fancybox__backdrop {
          background: rgba(0, 0, 0, 0.1) !important;
        }
        .fancybox__container {
          --fancybox-bg: transparent;
          padding: 0 !important;
          margin: 0 !important;
        }
        .fancybox__content {
          box-shadow: none;
          border-radius: 0;
          padding: 0 !important;
          margin: 0 !important;
        }
        .fancybox__viewport {
          padding: 0 !important;
        }
        .fancybox__iframe {
          padding: 0 !important;
          margin: 0 !important;
        }
        .is-close-btn {
          display: none;
        }
      `;
      document.head.appendChild(style);

      this.setupModuleLinks();
    }

    setupModuleLinks() {
      const links = {
        "#reservo-widget": {
          width: this.getModuleWidth(),
          height: this.getModuleHeight(),
        },
        "#reservation-widget": {
          width: this.getReservationModuleWidth(),
          height: this.getReservationModuleHeight(),
        },
        "#tol_menus": { width: 645, height: 500 },
        "#tol_carte": { width: 500, height: 420 },
        "#tol_newsletter": { width: 360, height: 350 },
      };

      let isOpen = false;

      Object.entries(links).forEach(([selector, dimensions]) => {
        const element = document.querySelector(selector);
        if (element) {
          element.addEventListener("click", (e) => {
            if (isOpen) {
              e.preventDefault();
              return;
            }
            if (
              window.innerWidth < this.minWidth ||
              window.innerHeight < this.minHeight
            ) {
              window.open(element.href, "_blank");
            } else {
              e.preventDefault();
              isOpen = true;
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
                  Toolbar: false,
                  touch: false,
                  padding: 0,
                  margin: 0,
                  backdrop: false,
                  trapFocus: false,
                  dragToClose: false,
                  hideScrollbar: false,
                  iframe: {
                    preload: false,
                    css: {
                      width: '100%',
                      height: '100%',
                      padding: 0,
                      margin: 0,
                    },
                    attr: {
                      scrolling: "no",
                    },
                  },
                  on: {
                    destroy: () => {
                      isOpen = false;
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
    document.addEventListener("DOMContentLoaded", initInstaBook);
  } else {
    initInstaBook();
  }
})();

