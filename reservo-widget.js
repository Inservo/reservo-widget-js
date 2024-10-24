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
//         showClass: "custom-css", // This will add the custom-css class
//       });
    
//       this.injectCustomStyles();
//       this.setupModuleLinks();
//     }
    
//     injectCustomStyles() {
//       const style = document.createElement("style");
//       style.textContent = `
//         /* Custom class applied when Fancybox is shown */
//         .custom-css .fancybox__container {
//           padding: 0 !important;
//           background-color: transparent;
//         }
    
//         .custom-css .fancybox__content {
//           box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
//           border-radius: 15px !important;
//           padding: 0 !important;
//         }
    
//         .custom-css .fancybox__iframe {
//           border-radius: 15px !important;
//         }
    
//         .is-close-btn {
//           display: none;
//         }
//       `;
//       document.head.appendChild(style);
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
    }

    async init() {
      await this.loadFancyBox();
      this.injectCustomStyles();
      this.setupLinks();
    }

    async loadFancyBox() {
      await new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.umd.js";
        script.onload = () => {
          // Load CSS after script
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = "https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.css";
          document.head.appendChild(link);
          resolve();
        };
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }

    injectCustomStyles() {
      const style = document.createElement('style');
      style.textContent = `
        :root {
          --fancybox-content-padding: 0 !important;
        }

        .fancybox__content {
          padding: 0 !important;
        }

        .fancybox__container:not(.is-compact) .fancybox__content {
          padding: 0 !important;
        }

        .fancybox__content > .f-button.is-close-btn {
          display: none !important;
        }
      `;
      document.head.appendChild(style);
    }

    setupLinks() {
      document.querySelectorAll('#reservo-widget, #reservation-widget').forEach(element => {
        if (element) {
          element.addEventListener('click', (e) => {
            e.preventDefault();
            
            Fancybox.show([
              {
                src: element.href,
                type: "iframe",
                preload: false,
              }
            ], {
              mainClass: `no-padding`,
              template: {
                // Remove close button from template
                closeButton: false,
              },
              // Disable animations
              animated: false,
              // Disable click to close
              click: null,
              // Disable drag to close
              dragToClose: false,
              // Remove default padding
              l10n: {
                CLOSE: "Close",
                NEXT: "Next",
                PREV: "Previous",
                MODAL: "You can close this modal content with the ESC key"
              },
              Images: {
                zoom: false,
              },
              showClass: false,
              hideClass: false,
              closeClass: false,
              // Add custom CSS class
              customClass: "no-padding",
              hideScrollbar: true,
              touch: false,
              keyboard: {
                Escape: "close",
              },
              on: {
                "init": (fancybox) => {
                  const content = fancybox.getSlide()?.contentEl;
                  if (content) {
                    content.style.setProperty('padding', '0', 'important');
                  }
                },
                "done": (fancybox) => {
                  const content = fancybox.getSlide()?.contentEl;
                  if (content) {
                    content.style.setProperty('padding', '0', 'important');
                  }
                }
              }
            });
          });
        }
      });
    }
  }

  // Initialize
  const instaBook = new InstaBookModule();
  instaBook.init().catch(console.error);
})();

