import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TeamMatchNotificationEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;

	@Column()
	matchUniqueId: string;

	@Column()
	sent: boolean;

	@Column("simple-array", {nullable: true})
	messageIds: string[]
}
