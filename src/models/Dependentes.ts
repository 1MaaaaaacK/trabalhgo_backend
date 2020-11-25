import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, OneToOne, ManyToOne} from 'typeorm';
import Funcionarios from './Funcionarios'

@Entity('dependentes')

export default class Dependentes {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    data_nascimento: string;

    @Column()
    grau_parentesco: string;

    @Column()
    funcionario_id: string;
    
    @Column()
    foto: string;

    @ManyToOne(() => Funcionarios, funcionario => funcionario.dependente)
    @JoinColumn({name: 'funcionario_id'})
    funcionario: Funcionarios
}