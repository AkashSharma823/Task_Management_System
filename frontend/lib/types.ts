export type TaskStatus = 'backlog' | 'todo' | 'doing' | 'completed' | 'on-hold';
export type Priority = 'none' | 'urgent' | 'high' | 'medium' | 'low';
export type Task = {
  id: string; title: string; description: string; status: TaskStatus; priority: Priority; memberId?: string|null;
  reporterId?: string|null; dueDate?: string|null; projectId?: string|null; labels: string; team: string; updatedText?: string;
};
export type Project = { id: string; name: string; description: string; priority: Priority; leadId?: string|null; dueDate?: string|null };
export type User = { id: string; name: string; email: string; title: string; role: string; avatarUrl?: string|null };
export type Comment = { id: string; taskId: string; author: string; body: string; createdAtText: string };
