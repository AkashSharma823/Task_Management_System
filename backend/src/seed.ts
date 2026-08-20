import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './users/user.entity';
import { Task } from './tasks/task.entity';
import { Project } from './projects/project.entity';
import { Comment } from './comments/comment.entity';

const ds = new DataSource({ type: 'sqlite', database: 'data/dexter.sqlite', entities: [User, Task, Project, Comment], synchronize: true });

async function seed() {
  await ds.initialize();
  const users = ds.getRepository(User); const projects = ds.getRepository(Project); const tasks = ds.getRepository(Task); const comments = ds.getRepository(Comment);
  let guest = await users.findOne({ where: { email: 'guest@dexter.local' } });
  if (!guest) guest = await users.save(users.create({ name: 'Dexter', email: 'guest@dexter.local', title: 'Designer', role: 'guest' }));
  if ((await projects.count()) === 0) {
    await projects.save([
      projects.create({ name: 'Design Homepage', description: 'Homepage design and delivery', priority: 'high', leadId: guest.id, dueDate: '2026-09-12' }),
      projects.create({ name: 'Develop Login Feature', description: 'Authentication implementation', priority: 'low', leadId: guest.id, dueDate: '2026-09-15' }),
      projects.create({ name: 'Test Payment Gateway', description: 'Payment integration testing', priority: 'medium', leadId: null, dueDate: '2026-09-18' }),
    ]);
  }
  const p = await projects.find();
  if ((await tasks.count()) === 0) {
    const base = [
      ['Write API Documentation','todo','high','2026-07-29','Development','Research,Design,Development,Testing,Deployment'],
      ['Implement Search Function','todo','high','2026-07-29','Development','Development,Deployment'],
      ['Deploy to Production','todo','high','2026-07-29','Development','Deployment'],
      ['Code Review Completed','doing','high','2026-07-29','Development','Development,Deployment'],
      ['Design Mockups Finalized','doing','high','2026-07-29','Design','Design,Development'],
      ['Feature Testing Passed','completed','medium','2026-07-30','QA Team','Testing,Passed'],
      ['UI Design Updated','completed','medium','2026-07-31','Designer','Design,Updated'],
      ['Security Audit Scheduled','completed','urgent','2026-08-01','Security','Audit,Scheduled'],
      ['UI Review','on-hold','medium','2026-08-04','Design','Review'],
      ['Backend Integration','on-hold','low','2026-08-06','Dev Team','Development'],
      ['User Feedback','on-hold','low','2026-08-10','Product','Research'],
    ];
    for (const [title,status,priority,dueDate,team,labels] of base) {
      await tasks.save(tasks.create({ title, description: title === 'Write API Documentation' ? 'Create clear and detailed API documentation to guide developers using the inventory and sales metrics effectively.' : '', status, priority, dueDate, memberId: guest.id, reporterId: guest.id, projectId: p[0]?.id || null, labels, team, updatedText: 'Aug 2026' }));
    }
  }
  if ((await comments.count()) === 0) {
    const t = await tasks.findOne({ where: { title: 'Write API Documentation' } });
    if (t) await comments.save(comments.create({ taskId: t.id, author: 'Ankit Dutta', body: 'dsds', createdAtText: 'just now' }));
  }
  await ds.destroy();
}
seed().catch((e)=>{ console.error(e); process.exit(1); });
