import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/entities/todo';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  createTodo(todo: Todo): Promise<Todo> {
    return this.todoRepository.save(todo);
  }

  // async createTodo(todo: Todo): Promise<any> {
  //   //  console.log('todo server objects',JSON.stringify(todo))
  //   const isTopicExist = await this.todoRepository.find({ where: todo.topic });
  //   if (isTopicExist) {
  //     console.log('exist')
  //     // return 'TOPIC EXISTS';
  //   } else {
  //     console.log('not exist')
  //     this.todoRepository.save(todo);
  //     // return 'TOPIC INSERTED';
  //   }
  // }

  allTodo(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async getTodo(id: number): Promise<Todo> {
    const isTodo = await this.todoRepository.findOne(id);
    if (!isTodo) {
      throw new NotFoundException('To do doesnot exist!!');
    } else {
      return this.todoRepository.findOne(id);
    }
  }

  async changeTodo(id: number, todo: Todo) {
    const todos = await this.todoRepository.findOne({ id });
    if (todos) {
      await this.todoRepository.update({ id }, todo);
      return await todo;
    } else {
      throw new NotFoundException('To do doesnot exist!!');
    }
  }

  async deleteTodo(id: number) {
    const todos = await this.todoRepository.findOne({ id });
    if (todos) {
      await this.todoRepository.delete(id);
    } else {
      throw new NotFoundException(
        'To do doesnot exist, it can not be deleted!!',
      );
    }
    // return this.todoRepository.delete(id);
  }
}
