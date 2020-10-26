import { Router } from "@core/router";
import { DashboardPage } from "@/pages/DashboardPage";
import { ExcelPage } from "@/pages/ExcelPage";
import "./styles/index.scss";

new Router("#app", {
    dashboard: DashboardPage,
    excel: ExcelPage,
});
