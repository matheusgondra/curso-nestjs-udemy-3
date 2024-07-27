import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseInterceptors
} from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UserService } from "./user.service";
import { LogInterceptor } from "src/interceptors/log.interceptor";

@UseInterceptors(LogInterceptor)
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() dto: CreateUserDTO) {
    return await this.userService.create(dto);
  }

  @Get()
  async read() {
    const users = await this.userService.list();
    return { users };
  }

  @Get(":id")
  async readOne(@Param("id", ParseIntPipe) id: number) {
    return await this.userService.show(id);
  }

  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateUserDTO
  ) {
    return await this.userService.update(id, body);
  }

  @Patch(":id")
  async updatePartial(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdatePatchUserDTO
  ) {
    return await this.userService.updatePartial(id, body);
  }

  @Delete(":id")
  async delete(@Param("id", ParseIntPipe) id: number) {
    return await this.userService.delete(id);
  }
}
