import { PrismaClient } from "@prisma/client";

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

  async getById(id: string) {
    const delegate = this.getModelDelegate();
    const item = await delegate.findMany({
      where: { id },
    });
    if (!item) {
      throw new Error(`${String(this.model)} not found`);
    }
    return item;
  }

  async getAll(limit: number = 10, page: number = 1) {
    const delegate = this.getModelDelegate();
    const skip = (page - 1) * limit;

    return await delegate.findMany({
      skip,
      take: limit,
    });
  }

  async getAllItems() {
    const delegate = this.getModelDelegate();
    const items = await delegate.findMany();
    if (items.length === 0) {
      throw new Error(`No ${this.model.toString()}s found`);
    }
    return items;
  }

  async create(data: T) {
    const delegate = this.getModelDelegate();
    return await delegate.create({ data });
  }

  async updateById(id: string, updateData: Partial<T>) {
    const delegate = this.getModelDelegate();
    const updatedItem = await delegate.update({
      where: { id },
      data: updateData,
    });
    if (!updatedItem) {
      throw new Error(`${String(this.model)} not found`);
    }
    return updatedItem;
  }

  async deleteById(id: string) {
    const delegate = this.getModelDelegate();
    const deletedItem = await delegate.update({
      where: { id },
      data: { status: "inactive" },
    });
    if (!deletedItem) {
      throw new Error(`${String(this.model)} not found`);
    }
    return deletedItem;
  }
}

export default BaseService;
