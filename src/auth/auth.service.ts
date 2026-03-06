import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginUserDTO } from './dto/login-user.dto';
import { User } from 'src/users/user.entity';
import { LoginResponseDTO } from './dto/login-response.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginUserDTO: LoginUserDTO): Promise<LoginResponseDTO> {
    const user: User | null = await this.userService.findUserByEmail(
      loginUserDTO.email,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    if (user.password !== loginUserDTO.password) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.email };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: '',
      expiresIn: '',
    };
  }
}
