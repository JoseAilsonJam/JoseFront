import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [FormsModule],  // ✅ Importação necessária
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  searchId: string = '';
  displayedColumns: string[] = ['id', 'title', 'actions'];

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks(): void {
    this.taskService.getAllTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  searchTask(): void {
    if (!this.searchId) return;

    this.taskService.getTask(this.searchId).subscribe(
      (task) => this.tasks = [task],
      () => this.tasks = []
    );
  }

  editTask(id: string): void {
    this.router.navigate(['/tasks/edit', id]);
  }

  deleteTask(id: string): void {
    if (confirm('Tem certeza que deseja deletar esta tarefa?')) {
      this.taskService.deleteTask(id).subscribe(() => this.getAllTasks());
    }
  }
}
