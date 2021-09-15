import { Test } from '@nestjs/testing';
//import { Repository } from 'typeorm';
//import { getRepositoryToken } from '@nestjs/typeorm';
import { UserCreateDto } from "../../../shared/dtos/user-create.dto";
import { UserCreatedDto } from "../../../shared/dtos/user-created.dto";
import { CreateUserUseCase } from "../../../use-cases/create-user.usecase";
import { UserRepository } from '../../../core/repositories/user.repository';

import { UsersCacheMemoryRepository } from '../../../data/cache-memory/users-cache-memory.repository';

describe('GetUserCase', () => {
    let service: CreateUserUseCase;
    beforeAll(async () => {
        const app = await Test.createTestingModule({
            providers: [
                {
                    provide: UserRepository,
                    useClass: UsersCacheMemoryRepository
                },
                CreateUserUseCase
            ],
        }).compile();

        service = app.get<CreateUserUseCase>(CreateUserUseCase);
    });

    describe('createdUser', () => {
        it('should create user', async () => {
            const user: UserCreateDto = {
                email: "joao@teste.com",
                password: "123456",
                name: "Joao Nascimento"
            };

            const userCreated: any = {
                name: "Joao Nascimento"
            }
            let save = await service.execute(user);
            expect(save).toBeTruthy();
        });
    });
});