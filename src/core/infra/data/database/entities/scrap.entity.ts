import {
    Entity,
    BaseEntity,
    BeforeInsert,
    BeforeUpdate,
    Column,
    JoinColumn,
    ManyToOne,
    UpdateDateColumn,
    CreateDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { UserEntity } from './user.entity';

@Entity({ name: 'scraps' })
export class ScrapEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    uid!: string;

    @Column()
    title!: string;

    @Column()
    description?: string;

    @Column({ name: 'user_uid' })
    userUID!: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    @ManyToOne(() => UserEntity, user => user.scraps)
    @JoinColumn({ name: 'user_uid', referencedColumnName: 'uid' })
    user?: UserEntity;

    @BeforeInsert()
    private beforeInsert() {
        this.uid = uuid();
        this.createdAt = new Date(Date.now());
        this.updatedAt = new Date(Date.now());
    }

    @BeforeUpdate()
    private beforeUpdate() {
        this.updatedAt = new Date(Date.now());
    }
}
