import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {


  todos: Todo[] = [];  //index read
  form!: FormGroup; //create
  id!: number; //update
  todo!: Todo; //update
  updateForm!: FormGroup; //update
  @ViewChild('topic')
  topic!: ElementRef;
  @ViewChild('topic_id')
  topic_id!: ElementRef;

  
  constructor(
    public todoservice: TodoService, //create
    public tdservice:TodoService,//update
    private route: ActivatedRoute, //update
    private rout:Router,//update
    private router: Router, //create
    private td: TodoService, //index read
  ) { }

  ngOnInit(): void {
    this.td.getAll().subscribe((data: Todo[]) => {
      this.todos = data;
      console.log(this.todos);
    }) //index read

    this.form = new FormGroup({
      topic: new FormControl('', [Validators.required]),
    }) //create
    // this.id = this.route.snapshot.params['id'];
    // this.tdservice.find(this.id).subscribe((data: Todo)=>{
    //   this.todo = data;
    // })//update
    this.updateForm = new FormGroup({
      topic: new FormControl('', [Validators.required]),
      topic_id: new FormControl('', [Validators.required]),
    }) //update
    // console.log(this.updateForm.value)
  }

  get f() {
    return this.form.controls;
  } //create

  get g() {
    return this.updateForm.controls;
  }

  submit() {
    console.log(this.form.value);
    this.todoservice.create(this.form.value).subscribe((res: any) => {
      console.log('todo created successfully!');
      //  this.router.navigateByUrl('todo/index');
    })
    // this.form.reset();
  }
  
  reloadCurrentPage() {
    window.location.reload();
   }
   
  update() {
    // this.tdservice.update(this.id, this.form.value).subscribe((res:any) => {
    //   this.rout.navigateByUrl('todo/index');
    // })
    console.log(this.updateForm.value);
  }
  setValue(id: number, topic: string){
    this.topic.nativeElement.value = topic;
    this.topic_id.nativeElement.value = id;

  }

  deletePost(id: number) {
    this.td.delete(id).subscribe(res => {
      this.todos = this.todos.filter(item => item.id !== id);
      console.log('Post deleted successfully!');
    })
  } //index delete


    // submit(){ 
  //   console.log('test ------',this.form.value);
  //   this.todoservice.create(this.form.value).subscribe((res: any) => {
  //        console.log('todo created successfully!',res);
  //       //  this.router.navigateByUrl('todo/index');
  //   })
  // } //create

  // submit(){ 
  //   console.log('test ------',this.form.value);
  //   this.todoservice.create(this.form.value).subscribe((res: any) => {
  //        console.log('todo created successfully!',res);
  //       //  this.router.navigateByUrl('todo/index');
  //   })
  // } //create

  // get g(){
  //   return this.tds.controls;
  // }
}
