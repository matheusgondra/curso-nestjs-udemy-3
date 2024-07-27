import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create({ email, name, password }: CreateUserDTO) {
    return await this.prismaService.user.create({
      data: {
        email,
        name,
        password
      },
      select: {
        id: true,
        email: true,
        name: true
      }
    });
  }

  async list() {
    return await this.prismaService.user.findMany({
      select: {
        id: true,
        email: true,
        name: true
      }
    });
  }

  async show(id: number) {
    return await this.prismaService.user.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        email: true,
        name: true
      }
    });
  }

  async update(id: number, { name, birthAt, email, password }: UpdateUserDTO) {
    await this.exists(id);

    return await this.prismaService.user.update({
      where: {
        id
      },
      data: {
        name,
        email,
        password,
        birthAt: birthAt ? new Date(birthAt) : undefined
      },
      select: {
        id: true,
        email: true,
        name: true
      }
    });
  }

  async updatePartial(id: number, data: UpdatePatchUserDTO) {
    await this.exists(id);

    return await this.prismaService.user.update({
      where: {
        id
      },
      data: {
        ...data,
        birthAt: data.birthAt ? new Date(data.birthAt) : undefined
      },
      select: {
        id: true,
        email: true,
        name: true
      }
    });
  }

  async delete(id: number) {
    await this.exists(id);

    return await this.prismaService.user.delete({
      where: {
        id
      }
    });
  }

  async exists(id: number) {
    const register = await this.prismaService.user.findUnique({
      where: {
        id
      }
    });
    if (!register) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
