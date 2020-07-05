import { Controller, 
    Get, 
    Res, 
    HttpStatus, 
    Post, 
    Body, 
    Put, 
    Query, 
    NotFoundException, 
    Delete, 
    Param } from '@nestjs/common';

import { UsersService } from './service/users.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

        // register
        @Post('/register')
        async register(@Res() res, @Body() createUserDTO: CreateUserDTO) {
            const user = await this.userService.register(createUserDTO);
            return res.status(HttpStatus.OK).json({
                message: "User has registered successfully",
                user
            })
        }
}
