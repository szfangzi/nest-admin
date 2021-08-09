import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
// import { CreateUserDto } from './dtos/create-user.dtos';
// import { UpdateUserDto } from './dtos/update-user.dtos';
// import {
//   ActionResponseDto,
//   RESPONSE_CODE,
// } from '../../../../dtos/response.dtos';
import { User as UserModel } from '@prisma/client';
import {
  PaginationRequestDto,
  PaginationDto,
  PaginationResponseDto,
} from '../../../../dtos/pagination.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { LocalGuard } from '@auth/guards/local.guard';
import { CreateUserDto } from '@admin/access/user/dtos/create-user.dto';
import { UpdateUserDto } from '@admin/access/user/dtos/update-user.dto';
import { UserResponseDto } from '@admin/access/user/dtos';
// import { DataExistsException } from '../../exceptions';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async pagination(
    @Query() paginationRequestDto: PaginationRequestDto,
  ): Promise<PaginationResponseDto<UserResponseDto[]>> {
    return await this.userService.pagination(paginationRequestDto);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('query/all')
  async findAll(): Promise<UserModel[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.userService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.userService.remove(id);
  }
}
