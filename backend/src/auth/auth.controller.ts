import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleLoginDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('guest')
  guest() {
    return this.auth.guest();
  }

  @Post('google')
  google(@Body() body: GoogleLoginDto) {
    return this.auth.google(body.credential);
  }
}
