import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MatchNotification {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;

	@Column()
	matchUniqueId: number;

	@CreateDateColumn({ type: 'timestamptz', nullable: false })
	matchUpdateTime: Date;

	@Column()
	isForfait: boolean;

	@Column()
	sent: boolean;

	@Column("simple-array", {nullable: true})
	messageIds: string[]
}
