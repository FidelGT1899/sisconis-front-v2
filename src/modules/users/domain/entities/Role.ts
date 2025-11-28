export interface Role {
	id: string;
	name: string;
	lvl_hierarchical: number;
	config: boolean;
	creation_date?: Date;
}