class SearchInput {
  constructor(container) {
    this.container = container;
    this.input = container.querySelector('input[type="search"]');
    this.button = container.querySelector("button");
    this.dropdown = container.querySelector(".search-dropdown");
    if (!this.dropdown) {
      this.dropdown = document.createElement("div");
      this.dropdown.className = "search-dropdown";
      this.container.appendChild(this.dropdown);
    }

    this.searchTimeout = null;
    this.abortController = null;

    this.setupEventListeners();
  }

  setupEventListeners() {
    this.input.addEventListener("input", (e) => this.handleInput(e));
    this.button?.addEventListener("click", () => this.handleSearch());
    this.input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        this.goToFirstResultOrSearch();
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        this.hideDropdown();
      } else {
        setTimeout(() => {
          this.handleSearch();
        }, 300);
      }
    });

    // Close when clicking outside the search container
    document.addEventListener("click", (e) => {
      if (!this.container.contains(e.target)) {
        this.hideDropdown();
      }
    });
  }

  goToFirstResultOrSearch() {
    const query = this.input.value.trim();
    if (query) window.location.href = `/search?q=${encodeURIComponent(query)}`;
  }

  handleInput(event) {
    const query = event.target.value.trim();

    if (this.searchTimeout) clearTimeout(this.searchTimeout);
    if (this.abortController) this.abortController.abort();

    if (query.length < 2) {
      this.hideDropdown();
      this.dropdown.innerHTML = "";
      return;
    }

    this.searchTimeout = setTimeout(() => this.performSearch(query), 250);
    this.showLoading();
  }

  async handleSearch() {
    const query = this.input.value.trim();
    if (!query) return;

    this.abortController = new AbortController();

    try {
      const response = await fetch(
        `/search/suggest?q=${encodeURIComponent(
          query
        )}&section_id=predictive-search`,
        { signal: this.abortController.signal }
      );
      if (!response.ok) throw new Error("Search failed");

      const htmlContent = await response.text();
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = htmlContent;
      const results = tempDiv.querySelector("#predictive-search-results");

      if (results && results.children?.length > 0) {
        this.dropdown.innerHTML = results.innerHTML;
        this.appendSearchFooter(query);
        this.showDropdown();
      } else {
        this.dropdown.innerHTML = '<div class="search-empty">Sin resultados</div>';
        this.appendSearchFooter(query);
        this.showDropdown();
      }
    } catch (error) {
      if (error.name === "AbortError") return;
      this.showError();
    }
  }

  appendSearchFooter(query) {
    const footer = document.createElement("a");
    footer.className = "predictive-search__search-for-button";
    footer.href = `/search?q=${encodeURIComponent(query)}`;
    footer.textContent = `Buscar "${query}"`;
    this.dropdown.appendChild(footer);
  }

  showLoading() {
    this.dropdown.innerHTML = '<div class="search-loading">Buscando…</div>';
    this.showDropdown();
  }

  showEmpty() {
    this.dropdown.innerHTML = '<div class="search-empty">Sin resultados</div>';
    this.showDropdown();
  }

  showError() {
    this.dropdown.innerHTML =
      '<div class="search-empty">Error de búsqueda</div>';
    this.showDropdown();
  }

  showDropdown() {
    this.dropdown.classList.add("active");
  }

  hideDropdown() {
    this.dropdown.classList.remove("active");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".search-input").forEach((container) => {
    new SearchInput(container);
  });
});

window.SearchInput = SearchInput;
