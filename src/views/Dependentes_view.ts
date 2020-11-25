import Dependentes from '../models/Dependentes'

export default {
  render(dependente: Dependentes) {
    return {
    id: dependente.id,
    name: dependente.name,
    data_nascimento: dependente.data_nascimento,
    grau_parentesco: dependente.grau_parentesco,
    funcionario_id: dependente.funcionario_id,
    foto: `http://localhost:3333/uploads/${dependente.foto}`
    };
  },

  renderMany(dependentes: Dependentes[]) {
    return dependentes.map(dependentes => this.render(dependentes));
  }

}