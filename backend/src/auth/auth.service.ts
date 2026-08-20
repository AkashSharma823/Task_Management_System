import { Injectable, ServiceUnavailableException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  private readonly googleClient = new OAuth2Client();

  constructor(private readonly users: UsersService, private readonly jwt: JwtService) {}

  async guest() {
    const user = await this.users.getOrCreateGuest();
    return this.issueToken(user);
  }

  async google(credential: string) {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    if (!clientId) {
      throw new ServiceUnavailableException(
        'Google login is not configured. Set GOOGLE_CLIENT_ID in backend/.env.',
      );
    }

    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken: credential,
        audience: clientId,
      });
      const payload = ticket.getPayload();

      if (!payload?.sub || !payload.email || payload.email_verified !== true) {
        throw new UnauthorizedException('Google account could not be verified.');
      }

      const user = await this.users.getOrCreateGoogleUser({
        googleId: payload.sub,
        email: payload.email,
        name: payload.name || payload.email.split('@')[0],
        avatarUrl: payload.picture || null,
      });

      return this.issueToken(user);
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      throw new UnauthorizedException('Invalid or expired Google credential.');
    }
  }

  private async issueToken(user: any) {
    const accessToken = await this.jwt.signAsync({ sub: user.id, email: user.email, role: user.role });
    return { accessToken, user };
  }
}
