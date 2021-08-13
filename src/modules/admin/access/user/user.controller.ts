import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  PaginationRequestDto,
  PaginationResponseDto,
} from '@helpers/pagination.helper';
import {
  CreateUserRequestDto,
  UpdateUserRequestDto,
  UserDto,
} from '@admin/access/user/dtos';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async pagination(
    @Query() paginationRequestDto: PaginationRequestDto,
  ): Promise<PaginationResponseDto<UserDto[]>> {
    return await this.userService.pagination(paginationRequestDto);
  }

  @Post()
  create(@Body() createUserRequestDto: CreateUserRequestDto): Promise<UserDto> {
    return this.userService.create(createUserRequestDto);
  }

  @Get('query/all')
  async findAll(): Promise<UserDto[]> {
    return await this.userService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return new UserDto(await this.userService.findOne(id));
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserRequestDto: UpdateUserRequestDto,
  ) {
    return await this.userService.update(id, updateUserRequestDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.userService.remove(id);
  }
}
