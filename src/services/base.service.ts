import { Model, Document } from "mongoose";

class BaseService<T extends Document> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async getById(id: string, populateFields?: string | string[]) {
    let query = this.model.findById(id);
    if (populateFields) {
      query = query.populate(populateFields);
    }
    const item = await query;
    if (!item) {
      throw new Error(`${this.model.modelName} not found`);
    }
    return { status: 200, data: item };
  }

  async getAll(
    limit: number = 10,
    page: number = 1,
    populateFields?: string | string[]
  ) {
    limit = Math.max(limit, 1);
    page = Math.max(page, 1);

    const offset = (page - 1) * limit;
    let query = this.model.find().skip(offset).limit(limit);
    if (populateFields) {
      query = query.populate(populateFields);
    }
    const items = await query;
    const totalCount = await this.model.countDocuments({ status: "active" });

    return {
      status: 200,
      totalResults: items.length,
      totalCount,
      page,
      data:
        items.length > 0
          ? items
          : `No ${this.model.modelName.toLowerCase()}s found`,
    };
  }

  async getAllItems(populateFields?: string | string[]) {
    let query = this.model.find();
    if (populateFields) {
      query = query.populate(populateFields);
    }
    const items = await query;
    if (items.length > 0) {
      return { status: 200, data: items };
    }
    throw new Error(`No ${this.model.modelName.toLowerCase()}s found`);
  }

  async create(data: T) {
    const newItem = new this.model(data);
    await newItem.save();
    return { status: 201, message: "Created successfully", data: newItem };
  }

  async updateById(
    id: string,
    updateData: Partial<T>,
    populateFields?: string | string[]
  ) {
    let query = this.model.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (populateFields) {
      query = query.populate(populateFields);
    }
    const updatedItem = await query;
    if (!updatedItem) {
      throw new Error(`${this.model.modelName} not found`);
    }
    return { status: 200, message: "Updated successfully", data: updatedItem };
  }

  async deleteById(id: string) {
    const updatedItem = await this.model.findByIdAndUpdate(
      id,
      { status: "inactive" },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedItem) {
      throw new Error(`${this.model.modelName} not found`);
    }
    return {
      status: 200,
      message: `${this.model.modelName} successfully deleted`,
      data: updatedItem,
    };
  }
}

export default BaseService;
