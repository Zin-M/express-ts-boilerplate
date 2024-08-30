import Employee from "../models/employee";
import FerryRoute from "../models/ferryRoute";
import Location from "../models/location";
import RouteLocation from "../models/routeLocation";
import BaseService from "./base.service";

const employeeService = new BaseService(Employee);

export const getEmployeeById = async(id:string) => {

    let employee = await Employee.findById(id).select('name emp_no route')
                        .populate({
                            path: 'branch',
                            select: 'name',
                            populate: {
                                path: 'company',
                                select: 'name'
                            }
                        })
                        .populate({
                            path: 'ferry_destination',
                            select: 'name address'
                        })
                        .populate({
                            path: 'route',
                            select: 'name'
                        })
                        .lean();
    if (!employee) {
      throw new Error(`${Employee.modelName} not found`);
    }

    let location_ids = (await RouteLocation.find({ route: employee.route }).sort({ sr_no: 1 })).map(doc => doc.stop_location);
    let locations = await Location.find({_id: {$in: location_ids}}).select('name address latitude longitude').lean();

    return { 
        status: 200,
        data: {...employee, locations: locations}
     };

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