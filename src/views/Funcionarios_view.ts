import Funcionario from '../models/Funcionarios'

export default {
  render(funcionario: Funcionario) {
    return {
    id: funcionario.id,
    name: funcionario.name,
    functions: funcionario.functions,
    departament: funcionario.departament,
    email: funcionario.email,
    telefone: funcionario.telefone,
    curtir: funcionario.curtir,
    fotos: `http://localhost:3333/uploads/${funcionario.fotos}`
    };
  },

  renderMany(funcionarios: Funcionario[]) {
    return funcionarios.map(funcionarios => this.render(funcionarios));
  }

}