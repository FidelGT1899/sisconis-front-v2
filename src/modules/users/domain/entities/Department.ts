export interface Department {
    id: string;
    name: string;
    boss_user_id?: string | null;
    creation_date?: Date;
}
