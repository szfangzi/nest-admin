import { Injectable, OnModuleInit } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
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
import { DataNotFoundCanNotUpdatedException } from '@exceptions/data-not-found-can-not-updated.exception';
import { HashHelper } from '@helpers/hash.helper';
import { DataNotFoundCanNotDeletedException } from '@exceptions/data-not-found-can-not-deleted.exception';
import { FindUserWhereInterface } from '@admin/access/user/dtos/find-user-where.interface';
import prisma from '@helpers/prisma.helper';

@Injectable()
export class UserService {
  constructor(public moduleRef: ModuleRef) {}

  async pagination(
    paginationRequestDto: PaginationRequestDto,
    findUserWhere?: FindUserWhereInterface,
  ): Promise<PaginationResponseDto<UserResponseDto[]>> {
    const countParams = {
      where: {
        ...findUserWhere,
        deletedAt: null,
      },
    };
    const totalRecords = await prisma.user.count(countParams);
    const { skip, take, current, pageSize, totalPages, hasNext } =
      PaginationHelper.query(paginationRequestDto, totalRecords);
    const whereParams = Object.assign({ skip, take }, countParams, {
      include: {
        roles: true,
      },
    });
    const modelResults = await prisma.user.findMany(whereParams);
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
    createUserDto.password = await HashHelper.encrypt(createUserDto.password);
    return await prisma.user.create({
      data: createUserDto,
    });
  }

  // async findAll(): Promise<UserModel[]> {
  //   return await prisma.user.findMany({
  //     where: {
  //       deletedAt: null,
  //     },
  //     include: {
  //       roles: true,
  //     },
  //   });
  // }

  async findAll(findUserWhere?: FindUserWhereInterface): Promise<UserModel[]> {
    return await prisma.user.findMany({
      where: {
        ...findUserWhere,
        deletedAt: null,
      },
      include: {
        roles: true,
      },
    });
  }

  async findOne(id: number) {
    return prisma.user.findUnique({ where: { id } });
  }

  async findOneByName(name: string) {
    return prisma.user.findFirst({ where: { name } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user: UserModel = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) throw new DataNotFoundCanNotUpdatedException();
    if (updateUserDto.password)
      updateUserDto.password = await HashHelper.encrypt(updateUserDto.password);
    return await prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async updateMany(ids: number[], updateUserDto: UpdateUserDto) {
    if (updateUserDto.password)
      updateUserDto.password = await HashHelper.encrypt(updateUserDto.password);
    return await prisma.user.updateMany({
      where: { id: { in: ids } },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    const user: UserModel = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) throw new DataNotFoundCanNotDeletedException();
    return await prisma.user.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async removeMany(ids: number[]) {
    return await prisma.user.updateMany({
      where: {
        id: { in: ids },
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async findUserWithRelations(id: number): Promise<UserModelWithRelations> {
    return await prisma.user.findUnique({
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
