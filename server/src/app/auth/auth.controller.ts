import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Request,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
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
    }

    const { access_token } = authResult;

    res.cookie(SessionAccessToken, access_token, {
      maxAge: SESSION_DURATION,
      httpOnly: true,
    });

    //TODO - log user login event
    this.logger.log(`User ${signInDto.login} logged in`);

    res.json({
      success: true,
      message: 'Authentication ok',
    });
  }

  @Get('getSession')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async signOut(@Request() req, @Res() res: Response) {
    res.clearCookie(SessionAccessToken);

    //TODO - log user logout event
    this.logger.log(`User ${req.user.login} logged out`);

    res.json({
      success: true,
      message: 'Logout ok',
    });
  }
}
