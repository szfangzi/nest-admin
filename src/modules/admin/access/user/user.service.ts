import { Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { PrismaService } from '@modules/common/services/prisma.service';
import {
  PaginationRequestDto,
  PaginationResponseDto,
} from '@dtos/pagination.dto';
import { User as UserModel } from '@prisma/client';
import { PaginationHelper } from '@helpers/pagination.helper';
import {
  UserModelWithRelations,
  UserResponseDto,
} from '@admin/access/user/dtos';
import { UserMapper } from '@admin/access/user/user.mapper';
import { DataNotFoundCanNotDeleteException } from '@exceptions/data-not-found-can-not-delete.exception';

@Injectable()
export class UserService implements OnModuleInit {
  public prismaService: PrismaService;
  constructor(public moduleRef: ModuleRef) {}

  onModuleInit() {
    this.prismaService = this.moduleRef.get(PrismaService);
  }

  async pagination(
    paginationRequestDto: PaginationRequestDto,
  ): Promise<PaginationResponseDto<UserResponseDto[]>> {
    const countParams = {
      where: {
        deletedAt: null,
      },
    };
    const totalRecords = await this.prismaService.user.count(countParams);
    const { skip, take, current, pageSize, totalPages, hasNext } =
      PaginationHelper.query(paginationRequestDto, totalRecords);
    const whereParams = Object.assign({ skip, take }, countParams, {
      include: {
        roles: true,
      },
    });
    const modelResults = await this.prismaService.user.findMany(whereParams);
    const results = modelResults.map((userModel) => {
      return UserMapper.toDtoWithRelations(userModel);
    });
    return {
      current,
      pageSize,
      totalPages,
      totalRecords,
      hasNext,
      results,
    };
  }

  async create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(): Promise<UserModel[]> {
    return await this.prismaService.user.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        roles: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  async findOneByName(name: string) {
    return this.prismaService.user.findFirst({ where: { name } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    const user: UserModel = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!user) throw new DataNotFoundCanNotDeleteException();
    return await this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }

  async findUserWithRelations(id: number): Promise<UserModelWithRelations> {
    return await this.prismaService.user.findUnique({
      where: { id },
      include: {
        roles: {
          select: {
            id: true,
            name: true,
            permissions: {
              select: {
                id: true,
                type: true,
                menu: true,
                operation: true,
                element: true,
              },
            },
          },
        },
      },
    });
  }
}
