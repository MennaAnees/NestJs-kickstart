import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './service/tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './schemas/task.schema';
import { AuthMiddleware } from '../mid/auth.middleware';
import { TaskRepository } from './repository/tasks.repository';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }])
  ],
  controllers: [TasksController],
  providers: [TasksService, TaskRepository],
  exports: [TasksService]

})
export class TasksModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('tasks');
  }
}
