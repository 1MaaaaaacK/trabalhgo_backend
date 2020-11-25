import { Request, Response} from 'express'; 
import { getConnection, getRepository } from 'typeorm';
import DependentesView from '../views/Dependentes_view';
import * as Yup from 'yup';

import Dependentes from '../models/Dependentes';

export default {
  async index(request: Request, response: Response){
    const dependentesRepository = getRepository(Dependentes);

    const dependenteFoto = await dependentesRepository.find({
        select: ['name', 'id', 'grau_parentesco', 'funcionario_id', 'foto', 'data_nascimento']
    });
    return response.json(DependentesView.renderMany(dependenteFoto));
  },

   async show(request: Request, response: Response){
    const { id } = request.params;
    const dependenteRepository = getRepository(Dependentes);

    const dependentesFotoId = await dependenteRepository.findOneOrFail(id, {
      select: ['name', 'id', 'grau_parentesco', 'funcionario_id', 'foto', 'data_nascimento']
        });

    return response.json(DependentesView.render(dependentesFotoId));
  }, 
  async delete(request: Request, response: Response){
    const { id } = request.params;
    const dependenteRepository = getRepository(Dependentes);

    const dependentesFotoId = await dependenteRepository.findOneOrFail(id);

    await dependenteRepository.delete(dependentesFotoId)

    return response.json(DependentesView.render(dependentesFotoId));
  }, 

  async create(request: Request, response: Response) {
      const {
        name,
        grau_parentesco,
        funcionario_id,
        data_nascimento,
      } = request.body
      const dependentesRepository = getRepository(Dependentes);
 
      const requestImages = request.files as Express.Multer.File[];
      const fotos = requestImages.map(image => {
        return image.filename
      }) 
      let foto = fotos[0]
      const data = {
        name,
        grau_parentesco,
        data_nascimento,
        funcionario_id,
        foto
      }
      const schema = Yup.object().shape({
        name: Yup.string().required('Voce deve preencher o campo name'),
        grau_parentesco: Yup.string().matches(/(enteado|enteada|esposo|esposa|filho|filha|)/, {message: 'Voce escolheu o grau de parentesco errado!'}).required('Voce deve preencher o campo grau_parentesco'),
        data_nascimento: Yup.string().required('Voce deve preencher o campo data_nascimento'),
        funcionario_id: Yup.number().required('Voce deve preencher o campo funcionario_id'),
        foto:  Yup.string().required('Voce deve preencher o campo foto')
        
      });

      await schema.validate(data, {
        abortEarly: false
      })
 
     

       const dependente = dependentesRepository.create(data);
    
      await dependentesRepository.save(dependente);
     
      return response.status(201).json({Dependentes}); 
  },
  async alterar(request: Request, response: Response){

    const { id } = request.params;

   const dependentesRepository = getRepository(Dependentes);

  

   const {
     name,
     data_nascimento,
     grau_parentesco,
     funcionario_id
   } = request.body
   
   const requestImages = request.files as Express.Multer.File[];
   const foto = requestImages.map(image => {
     return image.filename
   }) 
   let fotos = foto[0]

   let data = {
     name,
     data_nascimento,
     grau_parentesco,
     funcionario_id,
     fotos
   }
let procura = await dependentesRepository.findOneOrFail(id)
 if(data.name == undefined){
   data.name = procura.name
}
if(data.data_nascimento == undefined) {
 data.data_nascimento = procura.data_nascimento
}
if(data.grau_parentesco == undefined) {
 data.grau_parentesco = procura.grau_parentesco
}
if(data.funcionario_id == undefined) {
 data.funcionario_id = procura.funcionario_id
}
if(data.fotos == undefined) {
 data.fotos = procura.foto
}

    const post = await getConnection() 
   .createQueryBuilder()
   .update(Dependentes)
   .set({ 
     name: data.name,
     data_nascimento: data.data_nascimento,
     grau_parentesco: data.grau_parentesco,
     funcionario_id: data.funcionario_id,
     foto: data.fotos
   })
   .where(`id = ${id}`)
   .execute();  
   
   const dependentesFotosId = await dependentesRepository.findOneOrFail(id);
   return response.json(DependentesView.render(dependentesFotosId) ); 
 }, 
  

};
