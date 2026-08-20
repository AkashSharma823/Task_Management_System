import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}

  findById(id: string) { return this.repo.findOne({ where: { id } }); }
  findByEmail(email: string) { return this.repo.findOne({ where: { email } }); }

  async getOrCreateGuest() {
    const email = 'guest@dexter.local';
    let user = await this.findByEmail(email);
    if (!user) {
      user = await this.repo.save(this.repo.create({ name: 'Dexter', email, title: 'Designer', role: 'guest', googleId: null, avatarUrl: null }));
    }
    return user;
  }

  async getOrCreateGoogleUser(input: { googleId: string; email: string; name: string; avatarUrl: string | null }) {
    let user = await this.repo.findOne({ where: { googleId: input.googleId } });

    if (!user) {
      user = await this.findByEmail(input.email);
    }

    if (!user) {
      user = this.repo.create({
        name: input.name,
        email: input.email,
        title: 'Member',
        role: 'member',
        googleId: input.googleId,
        avatarUrl: input.avatarUrl,
      });
    } else {
      user.googleId = input.googleId;
      user.name = input.name || user.name;
      user.avatarUrl = input.avatarUrl || user.avatarUrl;
    }

    return this.repo.save(user);
  }
}
