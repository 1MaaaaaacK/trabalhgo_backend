import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, OneToOne} from 'typeorm';
import Dependentes from './Dependentes'

@Entity('funcionarios')

export default class Funcionario {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    functions: string;

    @Column()
    departament: string;

    @Column()
    email: string;
    
    @Column()
    telefone: string;

    @Column()
    curtir: number;
    
    @Column()
    fotos: string;

    @OneToMany(() => Dependentes, dependente => dependente.funcionario, {
      cascade: ['insert', 'update']
    })
    @JoinColumn({name: 'funcionario_id'})
    dependente: Dependentes[];
}