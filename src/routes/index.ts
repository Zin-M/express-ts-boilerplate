import { Application } from "express";
import companyRoutes from "./company.routes";
import branchRoutes from "./branch.routes";
// import officeTimeRoutes from "./officeTime.routes";
import employeeRoutes from "./employee.routes";
import driverRoutes from "./driver.routes";
import ferryRouteRoutes from "./ferryRoute.routes";
import locationRoutes from "./location.routes";
import carRoutes from "./car.routes";
import authRoutes from "./auth.routes";
import mobileRoutes from "./mobile.routes";

export default class Routes {
  constructor(app: Application) {
    app.use(`/api/auth`, authRoutes);
    app.use(`/api/mobile`, mobileRoutes);
    app.use(`/api/company`, companyRoutes);
    app.use(`/api/branch`, branchRoutes);
    // app.use(`/api/office-time`, officeTimeRoutes);
    app.use(`/api/employee`, employeeRoutes);
    app.use(`/api/car`, carRoutes);
    app.use(`/api/ferry-route`, ferryRouteRoutes);
    app.use(`/api/location`, locationRoutes);
    app.use(`/api/driver`, driverRoutes);
  }
}
