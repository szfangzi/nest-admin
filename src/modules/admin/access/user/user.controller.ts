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
import { User as UserModel } from '@prisma/client';
import {
  PaginationRequestDto,
  PaginationResponseDto,
} from '@dtos/pagination.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { LocalGuard } from '@auth/guards/local.guard';
import { CreateUserRequestDto } from '@admin/access/user/dtos/create-user-request.dto';
import { UpdateUserRequestDto } from '@admin/access/user/dtos/update-user-request.dto';
import { UserResponseDto } from '@admin/access/user/dtos';
import { CreateUserDto } from '@admin/access/user/dtos/create-user.dto';
import { UpdateUserDto } from '@admin/access/user/dtos/update-user.dto';

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
  create(
    @Body() createUserRequestDto: CreateUserRequestDto,
  ): Promise<UserResponseDto> {
    const createUserDto = new CreateUserDto();
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
  async update(
    @Param('id') id: number,
    @Body() updateUserRequestDto: UpdateUserRequestDto,
  ) {
    const updateUserDto = new UpdateUserDto();
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.userService.remove(id);
  }
}
