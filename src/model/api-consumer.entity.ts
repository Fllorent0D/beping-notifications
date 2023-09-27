import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ApiConsumerEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	app: string;

	@Column()
	password: string;
}
