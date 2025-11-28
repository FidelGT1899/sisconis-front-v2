import type { User } from "@users/domain/entities/User";

export interface UserRepository {
  save(user: User): Promise<void>;
  get(id: string): Promise<User | null>;
  getAll(): Promise<User[]>;
  search(term: string): Promise<User[]>;
  delete: (id: string) => Promise<void>
  deleteMany: (ids: string[]) => Promise<void>
}