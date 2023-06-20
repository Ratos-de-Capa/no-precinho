import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, Res, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/auth.dto';
import { Public } from './decorators/public.decorator';
import { Response } from 'express';
import { SESSION_DURATION, SessionAccessToken } from './constants/session.constant';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Res() res: Response, @Body() signInDto: SignInDto) {
        const authResult = await this.authService.signIn(signInDto.login, signInDto.password);

        if(!authResult) {
            throw new UnauthorizedException();
        }

        const { access_token } = authResult;

        res.cookie(SessionAccessToken, access_token, {
            maxAge: SESSION_DURATION,
            httpOnly: true,
        });

        //TODO - log user login event

        res.json({
            success: true,
            message: 'Authentication ok'
        });
    }

    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('logout')
    async signOut(@Res() res: Response) {
        res.clearCookie(SessionAccessToken);

        //TODO - log user logout event

        res.json({
            success: true,
            message: 'Logout ok'
        });
    }
}
