import { InMemoryUserRepository } from '@users/infrastructure/InMemoryUserRepository'
import { getAllUsers } from '@users/application/getall/getAllUsers'
import { CreateUser } from '@users/application/create/createUser'
import { SearchUsersUseCase } from '@/modules/users/application/search/searchUsers'
import { UpdateUser } from '@users/application/update/updateUser'
import { DeleteUser } from '@users/application/delete/deleteUser'
import { DeleteManyUsers } from '@users/application/deletemany/deleteManyUsers'

// aquí eliges la implementación concreta de UserRepository
const userRepository = new InMemoryUserRepository()

// casos de uso expuestos a la capa de UI
export const getAllUsersUseCase = new getAllUsers(userRepository)
export const createUserUseCase = new CreateUser(userRepository)
export const searchUsersUseCase = new SearchUsersUseCase(userRepository);
export const deleteUserUseCase = new DeleteUser(userRepository)
export const deleteManyUsersUseCase = new DeleteManyUsers(userRepository)
export const updateUserUseCase = new UpdateUser(userRepository);
