import { Comment, Project, Task, User } from './types';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
export const tokenKey = 'dexter_access_token';
export const userKey = 'dexter_user';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem(tokenKey) : null;
  const headers = new Headers(init?.headers);
  headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);
  const res = await fetch(`${API_URL}${path}`, { ...init, headers, cache: 'no-store' });
  if (!res.ok) throw new Error((await res.text()) || `Request failed with ${res.status}`);
  return res.json();
}

export async function guestLogin() { return request<{accessToken:string; user:User}>('/auth/guest', { method:'POST' }); }
export async function googleLogin(credential:string) { return request<{accessToken:string; user:User}>('/auth/google', { method:'POST', body:JSON.stringify({ credential }) }); }
export const getTasks = (query='') => request<Task[]>(`/tasks${query ? `?${query}` : ''}`);
export const getTask = (id:string) => request<Task>(`/tasks/${id}`);
export const createTask = (body:Partial<Task>) => request<Task>('/tasks', { method:'POST', body:JSON.stringify(body) });
export const updateTask = (id:string, body:Partial<Task>) => request<Task>(`/tasks/${id}`, { method:'PATCH', body:JSON.stringify(body) });
export const deleteTask = (id:string) => request<{success:boolean}>(`/tasks/${id}`, { method:'DELETE' });
export const getProjects = () => request<Project[]>('/projects');
export const getProject = (id:string) => request<Project>(`/projects/${id}`);
export const createProject = (body:Partial<Project>) => request<Project>('/projects', { method:'POST', body:JSON.stringify(body) });
export const updateProject = (id:string, body:Partial<Project>) => request<Project>(`/projects/${id}`, { method:'PATCH', body:JSON.stringify(body) });
export const getComments = (taskId:string) => request<Comment[]>(`/tasks/${taskId}/comments`);
export const createComment = (taskId:string, body:string) => request<Comment>(`/tasks/${taskId}/comments`, { method:'POST', body:JSON.stringify({body}) });
