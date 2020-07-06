import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from '../schemas/task.schema';
import { CreateTaskDTO } from '../dto/create-task.dto';
import { TaskRepository } from '../repository/tasks.repository';


@Injectable()
export class TasksService {
    constructor(@InjectModel('Task') private taskModel: Model<Task>, private taskDB: TaskRepository) { }

    async create(createTaskDto: CreateTaskDTO): Promise<Task> {
        const task = await this.taskDB.create(createTaskDto);
        return task;
    }

    async getAllTasks(): Promise<Task[]> {
        const tasks = await this.taskDB.findAll();
        return tasks;
    }

    // Get a single task
    async getTask(taskId): Promise<Task> {
        const task = await this.taskDB.findOne(taskId);
        return task;
    }

    // Edit task details
    async updateTask(taskId, CreateTaskDTO: CreateTaskDTO): Promise<Task> {
        const updatedTask = await this.taskDB.update(taskId, CreateTaskDTO)
        return updatedTask;
    }
    // Delete a task
    async deleteTask(taskId): Promise<any> {
        const deletedTask = await this.taskDB.delete(taskId)
        return deletedTask;
    }
}
