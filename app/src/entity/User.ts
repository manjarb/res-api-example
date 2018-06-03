import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tbl_user')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('character varying', { name: 'first_name', length: 32, nullable: false })
    firstName: string;

    @Column('character varying', { name: 'last_name', length: 32, nullable: false })
    lastName: string;

    @Column({ name: 'age', nullable: true })
    age: number;

}
