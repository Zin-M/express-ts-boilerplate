import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../helpers/error";

export default function(schema: any, joiOptions = {}) {
    return (req: Request, res: Response, next: NextFunction) => {
        const types: ("body"|"query")[] = ["body", "query"];
            let errorDetails: any[] = [];

            types.forEach((type) => {
                if (!schema[type]) {
                    return;
                }

                const result = schema[type].validate(req[type], joiOptions);
                if (
                    result.error &&
                    result.error.details &&
                    result.error.details.length > 0
                ) {
                    errorDetails = errorDetails.concat(result.error.details || []);
                }
                req[type] = result.value;
            });

            if (errorDetails.length > 0) {
                errorDetails = errorDetails.map((detail) => {
                    detail.message = detail.message.split(`"`).join(`'`);
                    return detail;
                });
                
                throw new ValidationError(errorDetails);
            }

            next();
    }
}
