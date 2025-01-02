import J from "joi";

export const validator = {
    findAll: {
        query: J.object({
            page: J.number().optional(),
            limit: J.number().optional(),
        })
    },
    createOne: {
        body: J.object({
            name: J.string().min(3).max(255).required(),
            email:J.string().min(3).max(255).required(),
            phone: J.string().max(255).required(),
            address: J.string().max(255).required(),
        })
    },
    updateOne: {
        params: J.object({
            userId: J.string().required(),
        }),
        body: J.object({
            name: J.string().min(3).max(255).required(),
            email:J.string().min(3).max(255).required(),
            phone: J.string().max(255).required(),
            address: J.string().max(255).required(),
        })
    },
    findOne: {
        params: J.object({
            userId: J.string().required(),
        }),
    },

    deleteOne: {
        params: J.object({
            userId: J.string().required(),
        }),
    }
};

