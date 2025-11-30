import { InMemoryUserRepository } from '@users/infrastructure/InMemoryUserRepository'
import { getAllUsers } from '@/modules/users/application/users/getall/getAllUsers'
import { CreateUser } from '@users/application/users/create/createUser'
import { SearchUsersUseCase } from '@/modules/users/application/users/search/searchUsers'
import { UpdateUser } from '@/modules/users/application/users/update/updateUser'
import { DeleteUser } from '@/modules/users/application/users/delete/deleteUser'
import { DeleteManyUsers } from '@/modules/users/application/users/deletemany/deleteManyUsers'

// aquí eliges la implementación concreta de UserRepository
const userRepository = new InMemoryUserRepository()

// casos de uso expuestos a la capa de UI
export const getAllUsersUseCase = new getAllUsers(userRepository)
export const createUserUseCase = new CreateUser(userRepository)
export const searchUsersUseCase = new SearchUsersUseCase(userRepository);
export const deleteUserUseCase = new DeleteUser(userRepository)
export const deleteManyUsersUseCase = new DeleteManyUsers(userRepository)
export const updateUserUseCase = new UpdateUser(userRepository);
