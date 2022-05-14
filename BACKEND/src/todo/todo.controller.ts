import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { Todo } from 'src/entities/todo';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private td: TodoService) {}

  @Post('/add')
  createTodo(@Body() td: Todo) {
    return this.td.createTodo(td);
  }

  @Get('')
  allTodo(@Body() td: Todo): Promise<Todo[]> {
    return this.td.allTodo();
  }

  @Get('/:id/read')
  getTodo(@Param('id') id:number) {
      return this.td.getTodo(id);
  }

  @Put('/:id/update')
  changeTodo(@Param('id') id: number, @Body() todo: Todo) {
    return this.td.changeTodo(id, todo);
  }

  @Delete('/:id/delete')
  deleteTodo(@Param('id') id: number) {
    return this.td.deleteTodo(id);
  }
}
