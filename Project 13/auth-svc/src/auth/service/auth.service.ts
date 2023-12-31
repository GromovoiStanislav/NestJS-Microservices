import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from "typeorm";
import { JwtService } from './jwt.service';
import {
  RegisterRequestDto,
  LoginRequestDto,
  ValidateRequestDto,
  FindOneRequestDto,
  FindManyRequestDto
} from "../dto/auth.dto";
import { Auth } from '../entity/auth.entity';
import { FindManyResponse, FindOneResponse, LoginResponse, RegisterResponse, ValidateResponse } from "../proto/auth.pb";

@Injectable()
export class AuthService {

  @InjectRepository(Auth)
  private readonly repository: Repository<Auth>;

  @Inject(JwtService)
  private readonly jwtService: JwtService;


  async register({ email, password }: RegisterRequestDto): Promise<RegisterResponse> {
    let auth: Auth = await this.repository.findOne({ where: { email } });
    if (auth) {
      return { status: HttpStatus.CONFLICT, error: ['E-Mail already exists'] };
    }
    auth = new Auth();
    auth.email = email;
    auth.password = this.jwtService.encodePassword(password);
    await this.repository.save(auth);
    return { status: HttpStatus.CREATED, error: null };
  }


   async login({ email, password }: LoginRequestDto): Promise<LoginResponse> {
    const auth: Auth = await this.repository.findOne({ where: { email } });
    if (!auth) {
      return { status: HttpStatus.NOT_FOUND, error: ['E-Mail not found'], token: null };
    }
    const isPasswordValid: boolean = this.jwtService.isPasswordValid(password, auth.password);
    if (!isPasswordValid) {
      return { status: HttpStatus.NOT_FOUND, error: ['Password wrong'], token: null };
    }
    const token: string = this.jwtService.generateToken(auth);
    return { token, status: HttpStatus.OK, error: null };
  }


   async validate({ token }: ValidateRequestDto): Promise<ValidateResponse> {
    const decoded: Auth = await this.jwtService.verify(token);
    if (!decoded) {
      return { status: HttpStatus.FORBIDDEN, error: ['Token is invalid'], userId: null };
    }
    const auth: Auth = await this.jwtService.validateUser(decoded);
    if (!auth) {
      return { status: HttpStatus.CONFLICT, error: ['User not found'], userId: null };
    }
    return { status: HttpStatus.OK, error: null, userId: decoded.id };
  }


  async getAll(): Promise<FindManyResponse> {
    const users: Auth[] = await this.repository.find();
    return { data: users, error: null, status: HttpStatus.OK };
  }


  async findOne({ id }: FindOneRequestDto): Promise<FindOneResponse> {
    const user: Auth = await this.repository.findOne({ where: { id } });
    if (!user) {
      return { data: null, error: ["User not found"], status: HttpStatus.NOT_FOUND };
    }
    return { data: user, error: null, status: HttpStatus.OK };
  }


  async findMany({ ids }: FindManyRequestDto): Promise<FindManyResponse> {
    const users: Auth[] = await this.repository.findBy({ id: In(ids) });
    return { data: users, error: null, status: HttpStatus.OK };
  }

}
