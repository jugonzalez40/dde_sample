class BigMenu extends HTMLElement {
  constructor() {
    super();
    this.bindEvents();
  }

  bindEvents() {
    // Add mouseenter event listener
    this.addEventListener("mouseenter", (event) => {
      const { id } = event.target;
      const panel = document.querySelector(`#${id}__panel`);
      if (panel) {
        panel.style.opacity = "1";
        panel.style.visibility = "visible";
      }

    });

    // Add mouseleave event listener
    this.addEventListener("mouseleave", (event) => {
        const { id } = event.target;
        const panel = document.querySelector(`#${id}__panel`);
        if (panel) {
          panel.style.opacity = "0";
          panel.style.visibility = "hidden";
        }
    });
  }
}

// Register the custom element
customElements.define("big-menu", BigMenu);
