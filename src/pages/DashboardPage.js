import { Page } from "@core/router/Page";
import { $ } from "@core/dom";

export class DashboardPage extends Page {
    getRoot() {
        return $.create("div", "db").html(`
            <div class="db__header">
                <h1>Excel Dashboard</h1>
            </div>
            <div class="db__new">
                <div class="db__view">
                    <a href="" class="db__create"> New<br/>table</a>
                </div>
            </div>
            <div class="db__table db__view">
                <div class="db__list-header">
                    <span>Name</span>
                    <span>Last open</span>
                </div>
                <ul class="db__list">
                    <li class="db__record">
                        <a href="#">Table 1</a>
                        <strong>25.09.2020</strong>
                    </li>
                    <li class="db__record">
                        <a href="#">Table 2</a>
                        <strong>25.09.2020</strong>
                    </li>
                </ul>
            </div>
        `);
    }
}
