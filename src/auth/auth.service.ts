// import { Injectable } from '@nestjs/common';
// import { UsersService } from '../users/users.service';

// @Injectable()
// export class AuthService {
//   constructor(private usersService: UsersService) {}

//   async validateUser(email: string, pass: string): Promise<any> {
//       console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
//     const user = await this.usersService.getUser(email);
//     console.log("user in auth service", user)

//     if (user && user.password === pass) {
//       const { password, ...result } = user;
//       return result;
//     }
//     return null;
//   }
// }


import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.getUser(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}