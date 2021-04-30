import { TodoService } from './../../services/todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from './../../models/todo';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  todo: Todo = {
    titulo: '',
    descricao: '',
    dataParaFinalizar: new Date(),
    finalizado: false
  }

  constructor(private router: Router, private service: TodoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.todo.id = this.route.snapshot.paramMap.get("id")!;
    this.findById();
  }

  findById(): void {
    this.service.fingById(this.todo.id).subscribe((resposta) => {
      this.todo = resposta;
    })
  }

  update(): void {
    this.service.update(this.todo).subscribe((resposta) => {
      this.service.message("Informações atualizadas com sucesso!");
      this.router.navigate(['']);
    }, erro => {
      this.service.message("ERRO ao atualizar TODO");
      this.router.navigate(['']);
    })
  }

  cancel(): void {
    this.router.navigate([''])
  }

  formataData(): void {
    let data = new Date(this.todo.dataParaFinalizar)
    this.todo.dataParaFinalizar = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
  }

}
