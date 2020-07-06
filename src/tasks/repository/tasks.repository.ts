import { Injectable } from '@nestjs/common';
import { Task } from '../schemas/task.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TaskRepository {

    constructor(@InjectModel('Task') private taskModel: Model<Task>) {
    }

    async findAll(): Promise<Task[]> {
        return this.taskModel.find().exec();
    }

    async findOne(taskId): Promise<Task> {
        return this.taskModel.findById(taskId).exec();
    }

    async create(data): Promise<Task> {
        return this.taskModel.create(data);
    }

    async update(taskId, updatedData): Promise<Task> {
        return this.taskModel.findByIdAndUpdate(taskId, updatedData, { new: true });
    }

    async delete(taskId): Promise<Task> {
        return this.taskModel.findByIdAndRemove(taskId);
    }
}