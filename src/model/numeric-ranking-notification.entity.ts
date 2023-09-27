import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class NumericRankingNotificationEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;

	@Column()
	playerUniqueIndex: number;

	@Column()
	sent: boolean;

	@Column("simple-array", {nullable: true})
	messageIds: string[]
}
