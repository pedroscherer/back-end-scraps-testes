import {
    Entity,
    BaseEntity,
    BeforeInsert,
    BeforeUpdate,
    Column,
    OneToMany,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { ScrapEntity } from './scrap.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    uid!: string;

    @Column()
    username!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    @OneToMany(() => ScrapEntity, scrap => scrap.user)
    scraps?: ScrapEntity[];

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
