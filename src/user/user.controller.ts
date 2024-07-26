import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put
} from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";

@Controller("users")
export class UserController {
  @Post()
  async create(@Body() { name, email, password }: CreateUserDTO) {
    return { name, email, password };
  }

  @Get()
  async read() {
    return { users: [] };
  }

  @Get(":id")
  async readOne(@Param("id", ParseIntPipe) id) {
    return { user: {}, id };
  }

  @Put(":id")
  async update(@Param("id", ParseIntPipe) id, @Body() body: UpdateUserDTO) {
    return {
      method: "PUT",
      body,
      id
    };
  }

  @Patch(":id")
  async updatePartial(
    @Param("id", ParseIntPipe) id,
    @Body() body: UpdatePatchUserDTO
  ) {
    return {
      method: "PATCH",
      body,
      id
    };
  }

  @Delete(":id")
  async delete(@Param("id", ParseIntPipe) id: number) {
    return { id };
  }
}
