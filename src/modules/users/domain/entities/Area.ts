export interface Area {
	id: string;
	name: string;
	departmentId: string;
	bossUserId?: string | null;
	creation_date?: Date;
}
