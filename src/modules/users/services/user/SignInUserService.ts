import { injectable, inject } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUserRepository';

import { ISignInUserDTO } from '@modules/users/dtos/IUserDTO';

import { sign } from 'jsonwebtoken';

import bcrypt from 'bcryptjs';

import AppError from '@shared/errors/AppError';

interface IResponse {
  auth: boolean;
  token: any;
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute(
    credentials: ISignInUserDTO
  ): Promise<IResponse | undefined> {
    const { email, password } = credentials;
    const user = await this.userRepository.isEmailRegistered(email);

    if (!user) throw new AppError('Email or password is incorrect!');

    const isPasswordMatched = bcrypt.compareSync(password, user.password);

    if (!isPasswordMatched)
      throw new AppError('Email or password is incorrect!');

    const token = sign(
      { id: user.user_id, role: user.user_type },
      `${process.env.JWT_SECRET}`,
      {
        expiresIn: 86400
      }
    );

    return { auth: true, token };
  }
}
