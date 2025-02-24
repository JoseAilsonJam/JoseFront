export interface Task {
    id: string;
    title: string;
    description: string;
    completedDate: Date;
    status: 'Pendente' | 'Concluída';
  }