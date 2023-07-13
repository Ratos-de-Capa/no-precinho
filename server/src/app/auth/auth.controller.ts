import { Body, Controller, Get, HttpCode, HttpStatus, Logger, Post, Request, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SessionAccessToken, SESSION_DURATION } from './constants/session.constant';
import { Public } from './decorators/public.decorator';
import { SignInDto } from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Res() res: Response, @Body() signInDto: SignInDto) {
    const authResult = await this.authService.signIn(signInDto.login, signInDto.password);

    if (!authResult) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'Authentication failed',
      });
      return;
    }

    const { access_token } = authResult;

    this.logger.log(`User ${signInDto.login} logged in, session token: ${access_token}`);

    console.log('access_token: ', access_token);
    console.log('SESSION_DURATION: ', SESSION_DURATION);
    console.log('SessionAccessToken: ', SessionAccessToken);

    res
      .cookie(SessionAccessToken, access_token, {
        maxAge: SESSION_DURATION,
      })
      .json({
        success: true,
        message: 'Authentication ok',
      });
  }

  @Public()
  @Get('getSession')
  getProfile(@Request() req) {
    console.log('req.user: ', req.user);

    return req.user;
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async signOut(@Request() req, @Res() res: Response) {
    res.clearCookie(SessionAccessToken);

    this.logger.log(`User ${req.user.login} logged out`);

    res.json({
      success: true,
      message: 'Logout ok',
    });
  }
}
