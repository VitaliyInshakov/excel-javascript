import { $ } from "@core/dom";

export class Router {
    constructor(selector, routes = {}) {
        if (!selector) {
            throw new Error("Selector is not provided in Router class");
        }

        this.$placeholder = $(selector);
        this.routes = routes;
        this.changePageHandler = this.changePageHandler.bind(this);

        this.init();
    }

    init() {
        window.addEventListener("hashchange", this.changePageHandler);
    }

    changePageHandler() {
        const Page = this.routes.dashboard;
        const page = new Page();
        this.$placeholder.append(page.getRoot());

        page.afterRender();
    }

    destroy() {
        window.removeEventListener("hashchange", this.changePageHandler);
    }
}
