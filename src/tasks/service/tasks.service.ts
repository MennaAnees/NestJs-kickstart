import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from '../schemas/task.schema';
import { CreateTaskDTO } from '../dto/create-task.dto';


@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private taskModel: Model<Task>) { }

    async create(createTaskDto: CreateTaskDTO): Promise<Task> {
        const task = new this.taskModel(createTaskDto);
        return task.save();
    }

    async getAllTasks(): Promise<Task[]> {
        const tasks = await this.taskModel.find().exec();
        return tasks;
    }

    // Get a single task
    async getTask(taskId): Promise<Task> {
        const task = await this.taskModel.findById(taskId).exec();
        return task;
    }

    // Edit task details
    async updateTask(taskId, CreateTaskDTO: CreateTaskDTO): Promise<Task> {
        const updatedTask = await this.taskModel
            .findByIdAndUpdate(taskId, CreateTaskDTO, { new: true });
        return updatedTask;
    }
    // Delete a task
    async deleteTask(taskId): Promise<any> {
        const deletedTask = await this.taskModel.findByIdAndRemove(taskId);
        return deletedTask;
    }
}
