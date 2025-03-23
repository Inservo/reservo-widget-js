(function () {
  class InstaBookModule {
    constructor() {
      this.defaultHeight = 700;
      this.defaultWidth = 432;
      this.maxHeight = 700;
      this.minWidth = 432;
    }

    async init() {
      await this.loadFancyBox();
      this.loadCSS();
      this.setupFancyBox();
    }

    async loadFancyBox() {
      await new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src =
          "https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.umd.js";
        script.onload = () => {
          // Load CSS after script loads
          this.loadCSS();
          resolve();
        };
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

    setupFancyBox() {
      Fancybox.bind("[data-fancybox]", {
        showClass: "custom-css", // This will add the custom-css class
        hideScrollbar: false,
      });

      this.injectCustomStyles();
      this.setupModuleLinks();

      window.addEventListener("message", (event) => {
        if (event.data?.type === "CLOSE_FANCYBOX" && window.Fancybox) {
          window.Fancybox.close();
        }
      });
    }

    injectCustomStyles() {
      const style = document.createElement("style");
      style.textContent = `
        /* Custom class applied when Fancybox is shown */

        .fancybox__container {
          background-color: transparent !important;
          padding: 0 !important;
          border-radius: 15px !important;
          z-index: 9999 !important;
        }

        .fancybox__content {
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
          border-radius: 15px !important;

          position: fixed;
          right: 16px;
          bottom: 16px;
          background: transparent !important;

          padding: 0 !important;
        }

        .fancybox__backdrop {
          display: none !important;
          background: none !important;
        }

        body.fancybox-active {
          overflow: auto !important;
        }

        /* Mobile responsive styles */
        @media screen and (max-width: 768px) {
          .fancybox__content {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100% !important;
            height: 100% !important;
            max-width: 100% !important;
            max-height: 100% !important;
            transform: none !important;
            margin: 0 !important;
          }
        }

        .is-close-btn {
          display: none;
        }
      `;
      document.head.appendChild(style);
    }

    setupModuleLinks() {
      const links = {
        "#reservo-widget": {
          width: this.getModuleWidth(),
          height: this.getModuleHeight(),
        },
        "#tol_menus": { width: 645, height: 500 },
        "#tol_carte": { width: 500, height: 420 },
        "#tol_newsletter": { width: 360, height: 350 },
      };

      let isOpen = false;

      Object.entries(links).forEach(([selector, dimensions]) => {
        const element = document.querySelector(selector);
        if (Fancybox.getInstance()) {
          e.preventDefault();
          return;
        }
        if (element) {
          element.addEventListener("click", (e) => {
            if (isOpen) {
              // Add this check
              e.preventDefault();
              return;
            } else {
              e.preventDefault(); // Prevent default only for FancyBox
              isOpen = true; // Set isOpen to true
              element.classList.add("no-shadow");
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
                  animationEffect: "slide",
                  animationDuration: 200,
                  hideScrollbar: false,
                  on: {
                    destroy: () => {
                      isOpen = false; // Reset isOpen when FancyBox is closed
                      element.classList.remove("no-shadow");
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
    const instaBook = new InstaBookModule();
    instaBook.init().catch(console.error);
  }

  // Run initialization when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initInstaBook);
  } else {
    initInstaBook();
  }
})();
