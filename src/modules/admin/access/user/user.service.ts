import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
  PaginationRequestDto,
  PaginationResponseDto,
} from '@helpers/pagination.helper';
import { User as UserModel } from '@prisma/client';
import { HashHelper, PaginationHelper, prisma } from '@helpers/index';
import {
  CreateUserRequestDto,
  FindUserRequestDto,
  UpdateUserRequestDto,
  UserDto,
  UserModelWithRelations,
} from '@admin/access/user/dtos';
import { UserMapper } from '@admin/access/user/user.mapper';
import {
  DataExistsException,
  DataNotFoundCanNotDeletedException,
  DataNotFoundCanNotUpdatedException,
} from '@exceptions/index';

@Injectable()
export class UserService {
  constructor(public moduleRef: ModuleRef) {}

  async pagination(
    paginationRequestDto: PaginationRequestDto,
    findUserDto?: FindUserRequestDto,
  ): Promise<PaginationResponseDto<UserDto[]>> {
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

  async create(createUserRequestDto: CreateUserRequestDto): Promise<UserDto> {
    const existUser = await this.findOneByName(createUserRequestDto.name);
    if (existUser) throw new DataExistsException();
    createUserRequestDto.password = await HashHelper.encrypt(
      createUserRequestDto.password,
    );
    const roleIds = createUserRequestDto.roles.map((role) => ({
      id: role,
    }));
    return prisma.user.create({
      data: {
        ...createUserRequestDto,
        roles: {
          connect: roleIds,
        },
      },
      include: {
        roles: true,
      },
    });
  }

  async findAll(findUserDto?: FindUserRequestDto): Promise<UserDto[]> {
    return prisma.user.findMany({
      where: {
        ...findUserDto,
        deletedAt: null,
      },
      include: {
        roles: true,
      },
    });
  }

  async findOne(id: number): Promise<UserDto> {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        roles: true,
      },
    });
  }

  async findOneByName(name: string): Promise<UserModel> {
    return prisma.user.findFirst({
      where: { name },
      include: {
        roles: true,
      },
    });
  }

  async update(
    id: number,
    updateUserRequestDto: UpdateUserRequestDto,
  ): Promise<UserDto> {
    const user: UserModel = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) throw new DataNotFoundCanNotUpdatedException();
    if (updateUserRequestDto.password)
      updateUserRequestDto.password = await HashHelper.encrypt(
        updateUserRequestDto.password,
      );
    const roleIds = updateUserRequestDto.roles.map((role) => ({
      id: role,
    }));
    return prisma.user.update({
      where: { id },
      data: {
        ...updateUserRequestDto,
        roles: {
          set: roleIds,
        },
      },
      include: {
        roles: true,
      },
    });
  }

  async updateMany(ids: number[], updateUserRequestDto: UpdateUserRequestDto) {
    if (updateUserRequestDto.password)
      updateUserRequestDto.password = await HashHelper.encrypt(
        updateUserRequestDto.password,
      );
    return prisma.user.updateMany({
      where: { id: { in: ids } },
      data: updateUserRequestDto,
    });
  }

  async remove(id: number): Promise<UserDto> {
    const user: UserModel = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) throw new DataNotFoundCanNotDeletedException();
    return prisma.user.update({
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
