import Employee from "../models/employee";
import FerryRoute from "../models/ferryRoute";
import RouteLocation from "../models/routeLocation";
import BaseService from "./base.service";

const employeeService = new BaseService(Employee);

export const getEmployeeById = async(id:string) => {

    let query = Employee.findById(id).populate("branch").populate("route");

    const item = await query;
    
    if (!item) {
      throw new Error(`${Employee.modelName} not found`);
    }

    const routeLocations = await RouteLocation.find({ route: item.route }).populate("stop_location")
      .lean();

    return { status: 200, data: {item, locations: routeLocations} };

}

export const getEmployees = async (limit: number, page: number) => {
    return await employeeService.getAll(limit, page, "branch.company");
}

export const getAllEmployee = async () => {
    return await employeeService.getAllItems('branch');
}

export const createEmployee = async (data: any) => {
    return await employeeService.create(data);
}

export const updateEmployeeById = async (id: string, updateData: any) => {
    return await employeeService.updateById(id, updateData, "branch");
}

export const deleteEmployeeById = async(id: string) => {
    return await employeeService.deleteById(id);
}