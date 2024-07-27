import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  UseInterceptors
} from "@nestjs/common";
import { ParamId } from "src/decorators/param-id-decorator";
import { LogInterceptor } from "src/interceptors/log.interceptor";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { UserService } from "./user.service";

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
  async readOne(@ParamId() id: number) {
    return await this.userService.show(id);
  }

  @Put(":id")
  async update(@ParamId() id: number, @Body() body: UpdateUserDTO) {
    return await this.userService.update(id, body);
  }

  @Patch(":id")
  async updatePartial(@ParamId() id: number, @Body() body: UpdatePatchUserDTO) {
    return await this.userService.updatePartial(id, body);
  }

  @Delete(":id")
  async delete(@ParamId() id: number) {
    return await this.userService.delete(id);
  }
}
