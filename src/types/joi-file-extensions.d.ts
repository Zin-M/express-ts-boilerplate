declare module 'joi-file-extensions' {
    import { AnySchema, StringSchema } from 'joi';

    interface FileExtensionSchema extends StringSchema {
        fileExtension(ext: string | string[]): this;
    }

    export default function joiFileExt(joi: typeof import("joi")): {
        string(): FileExtensionSchema;
    };
}
