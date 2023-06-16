import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ISession } from './interfaces/session.interface';
import { JwtService } from '@nestjs/jwt';
import { IAccessToken } from './interfaces/access-token.interface';
import { KeyManager } from '../utils/encrypt.util';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    async signIn(login: string, pass: string): Promise<IAccessToken> {
        const user = await this.usersService.findOne(login);

        if (user?.password !== KeyManager.encryptPassword(pass)) {
            throw new UnauthorizedException();
        }

        const payload: ISession = {
            sub: user.id,
            login: user.login,
            email: user.email,
            name: user.name,
            loginDate: new Date(),
            registerDate: user.createdAt
        };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
