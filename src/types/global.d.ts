import { Request } from "express";
import * as express from "express";
import { Express } from "express-serve-static-core";
import { AccessTokenPayload } from "src/helpers/jwt";
import { PaginationParams } from "./general";
import OfficeUser from "./schema/office-user/OfficeUser";

declare global {
    namespace Express {
        export interface Request {
            auth: {
                user: OfficeUser|null,
                jwtPayload: AccessTokenPayload | null
            },
            pagination: PaginationParams|undefined,
            filePath: string|undefined
        }
    }
}