import { Injectable } from '@nestjs/common';
import {RegisterDto} from "./auth.controller";
import {UserRepository} from "../user/repositories/user.repository";
import {UserEntity} from "../user/entities/user.entity";
import {UserRole} from "../../../../../libs/interfaces/src/lib/user.interface";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    ) {}

  async register({email, password, displayName}:RegisterDto) {
    const oldUser = await this.userRepository.findUser(email)
    if (oldUser) {
      throw new Error('This user was registration')
    }

    const newUserEntity = await new UserEntity({
      displayName,
      email,
      passwordHash: '',
      role: UserRole.Student
    }).setPassword(password)
    const newUser = await this.userRepository.createUser(newUserEntity)
    return {email: newUser.email}
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findUser(email)
    if (!user) {
      throw new Error('Invalid username or password')
    }

    const userEntity = new UserEntity(user)
    const isCorrectPassword = await userEntity.validatePassword(password)
    if (!isCorrectPassword) {
      throw new Error('Invalid username or password')
    }

    return {if: user._id}
  }

  async login(id: strung) {
    return {
      access_token: await this.jwtService.signAsync({id})
    }
  }
}
