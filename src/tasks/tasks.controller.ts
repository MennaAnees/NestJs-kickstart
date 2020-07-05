import {
    Controller,
    Get,
    Res,
    HttpStatus,
    Post,
    Body,
    Put,
    NotFoundException,
    Delete,
    Param,
    UseGuards
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) { }

    // add task
    @UseGuards(JwtAuthGuard)
    @Post('/addTask')
    async create(@Res() res, @Body() createTaskDTO: CreateTaskDTO) {
        const task = await this.taskService.create(createTaskDTO);
        return res.status(HttpStatus.OK).json({
            message: "Task added successfully",
            task
        })
    }

    // Retrieve tasks list
    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllTasks(@Res() res) {
        const tasks = await this.taskService.getAllTasks();
        return res.status(HttpStatus.OK).json(tasks);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':taskId')
    async getTask(@Res() res, @Param('taskId') taskId) {
        const task = await this.taskService.getTask(taskId);
        if (!task) throw new NotFoundException('task does not exist!');
        return res.status(HttpStatus.OK).json(task);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':taskId')
    async updateTask(@Res() res, @Param('taskId') taskId, @Body() createTaskDTO: CreateTaskDTO) {
        const task = await this.taskService.updateTask(taskId, createTaskDTO);
        if (!task) throw new NotFoundException('Task does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Task has been successfully updated',
            task
        });
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:taskId')
    async deleteCustomer(@Res() res, @Param('taskId') taskId) {
        const task = await this.taskService.deleteTask(taskId);
        if (!task) throw new NotFoundException('Task does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Task has been deleted',
            task
        })
    }
}
