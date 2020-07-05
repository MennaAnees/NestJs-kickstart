import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Task extends Document {

  @Prop()
  title: String

}

export const TaskSchema = SchemaFactory.createForClass(Task);