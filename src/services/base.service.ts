import { PrismaClient } from "@prisma/client";
import * as console from "node:console";

class BaseService<T> {
  private prisma: PrismaClient;
  private readonly model: keyof PrismaClient;

  constructor(prisma: PrismaClient, model: keyof PrismaClient) {
    this.prisma = prisma;
    this.model = model;
  }

  private getModelDelegate(): any {
    return this.prisma[this.model] as any;
  }

  async getById(col:string,id: string) {
    const delegate = this.getModelDelegate();
    const item = await delegate.findUnique({
      where: { [col]:String(id),status:"ACTIVE" },
    });
    if (!item) {
      throw new Error(`${String(this.model)} not found`);
    }
    return item;
  }

  async getAll(limit: number | null = 10, page: number | null = 1) {
    const delegate = this.getModelDelegate();

    if (limit === null || page === null) {
      return await delegate.findMany({where:{status:"ACTIVE"}});
    }

    const skip = (page - 1) * limit;

    return await delegate.findMany({
      skip,
      take: limit,
      where:{status:"ACTIVE"}
    });
  }

  async getAllItems() {
    const delegate = this.getModelDelegate();
    const items = await delegate.findMany({where:{status:"ACTIVE"}});
    if (items.length === 0) {
      throw new Error(`No ${this.model.toString()}s found`);
    }
    return items;
  }

  async create(data: T) {
    const delegate = this.getModelDelegate();
    return await delegate.create({ data });
  }

  async updateById(col:string,id: string, updateData: Partial<T>) {
    const delegate = this.getModelDelegate();
    const updatedItem = await delegate.update({
      where: { [col]:id,status:"ACTIVE" },
      data: updateData,
    });
    if (!updatedItem) {
      throw new Error(`${String(this.model)} not found`);
    }
    return updatedItem;
  }

  async deleteById(col:string,id: string) {
    const delegate = this.getModelDelegate();
    const deletedItem = await delegate.update({
      where: { [col]:id,status:"ACTIVE" },
      data: { status: "INACTIVE",deleted_at: new Date()},
    });
    if (!deletedItem) {
      throw new Error(`${String(this.model)} not found`);
    }
    return deletedItem;
  }
}

export default BaseService;
