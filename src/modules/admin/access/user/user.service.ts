import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
  PaginationRequestDto,
  PaginationResponseDto,
} from '@dtos/pagination.dto';
import { User as UserModel } from '@prisma/client';
import { PaginationHelper, HashHelper, prisma } from '@helpers/index';
import {
  UserModelWithRelations,
  UserResponseDto,
  CreateUserDto,
  UpdateUserDto,
  UserWithAllFieldsResponseDto,
  FindUserDto,
} from '@admin/access/user/dtos';
import { UserMapper } from '@admin/access/user/user.mapper';
import {
  DataNotFoundCanNotUpdatedException,
  DataNotFoundCanNotDeletedException,
} from '@exceptions/index';

@Injectable()
export class UserService {
  constructor(public moduleRef: ModuleRef) {}

  async pagination(
    paginationRequestDto: PaginationRequestDto,
    findUserDto?: FindUserDto,
  ): Promise<PaginationResponseDto<UserResponseDto[]>> {
    const countParams = {
      where: {
        ...findUserDto,
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
      return UserMapper.toDtoWithRoles(userModel);
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

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    createUserDto.password = await HashHelper.encrypt(createUserDto.password);
    const user = await prisma.user.create({
      data: createUserDto,
      include: {
        roles: true,
      },
    });
    return UserMapper.toDtoWithRoles(user);
  }

  async findAll(findUserDto?: FindUserDto): Promise<UserModel[]> {
    return await prisma.user.findMany({
      where: {
        ...findUserDto,
        deletedAt: null,
      },
      include: {
        roles: true,
      },
    });
  }

  async findOne(id: number): Promise<UserResponseDto> {
    return prisma.user.findUnique({
      where: { id },
      include: {
        roles: true,
      },
    });
  }

  async findOneByName(name: string): Promise<UserWithAllFieldsResponseDto> {
    return prisma.user.findFirst({
      where: { name },
      include: {
        roles: true,
      },
    });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user: UserModel = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) throw new DataNotFoundCanNotUpdatedException();
    if (updateUserDto.password)
      updateUserDto.password = await HashHelper.encrypt(updateUserDto.password);
    return await prisma.user.update({
      where: { id },
      data: updateUserDto,
      include: {
        roles: true,
      },
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

  async remove(id: number): Promise<UserResponseDto> {
    const user: UserModel = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) throw new DataNotFoundCanNotDeletedException();
    return await prisma.user.update({
      where: {
        id,
      },
      include: {
        roles: true,
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
