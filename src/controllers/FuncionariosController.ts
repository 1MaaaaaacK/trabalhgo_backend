import { Request, Response} from 'express'; 
import { getConnection, getRepository } from 'typeorm';
import FuncionariosView from '../views/Funcionarios_view';
import DependentesView from '../views/Dependentes_view'
import * as Yup from 'yup';

import Funcionario from '../models/Funcionarios';
import Dependentes from '../models/Dependentes'

export default {
  async index(request: Request, response: Response){
    const funcionarioRepository = getRepository(Funcionario);

    const funcionariosFotos = await funcionarioRepository.find({
        select: ['name', 'id', 'functions', 'departament', 'email', 'telefone', 'curtir', 'fotos']
    });
    return response.json(FuncionariosView.renderMany(funcionariosFotos));
  },

   async show(request: Request, response: Response){
    const { id } = request.params;
    const funcionarioRepository = getRepository(Funcionario);

    const funcionariosFotosId = await funcionarioRepository.findOneOrFail(id, {
      select: ['name', 'departament', 'email', 'telefone', 'curtir', 'fotos']
    });

    return response.json(FuncionariosView.render(funcionariosFotosId));
  }, 

  async delete(request: Request, response: Response){
    const { id } = request.params;
    const funcionarioRepository = getRepository(Funcionario);

    const funcionariosFotosId = await funcionarioRepository.findOneOrFail(id);

    await funcionarioRepository.delete(funcionariosFotosId)

    return response.json(FuncionariosView.render(funcionariosFotosId));
  }, 

  async alterar(request: Request, response: Response){

     const { id } = request.params;

    const funcionarioRepository = getRepository(Funcionario);

   

    const {
      name,
      functions,
      departament,
      email,
      telefone,
      curtir,
    } = request.body
    
    const requestImages = request.files as Express.Multer.File[];
    const foto = requestImages.map(image => {
      return image.filename
    }) 
    let fotos = foto[0]

    let data = {
      name,
      functions,
      departament,
      email,
      telefone,
      fotos
    }
let procura = await funcionarioRepository.findOneOrFail(id)
  if(data.name === undefined){
    data.name = procura.name
}
if(data.functions === undefined) {
  data.functions = procura.functions
}
if(data.departament === undefined) {
  data.departament = procura.departament
}
if(data.email === undefined) {
  data.email = procura.email
}
if(data.telefone === undefined) {
  data.telefone = procura.telefone
}
if(data.fotos === undefined) {
  data.fotos = procura.fotos
}

     await getConnection() 
    .createQueryBuilder()
    .update(Funcionario)
    .set({ 
      name: data.name,
      functions: data.functions,
      departament: data.departament,
      email: data.email,
      telefone: data.telefone,
      fotos: data.fotos
    })
    .where(`id = ${id}`)
    .execute();  
    
    const funcionariosFotosId = await funcionarioRepository.findOneOrFail(id);
    return response.json(FuncionariosView.render(funcionariosFotosId) ); 
  }, 

  async create(request: Request, response: Response) {
       const {
        name,
        functions,
        departament,
        email,
        telefone,
      } = request.body
      let curtir = 0
      const funcionariosRepository = getRepository(Funcionario);
 
      const requestImages = request.files as Express.Multer.File[];
      const foto = requestImages.map(image => {
        return image.filename
      }) 
      let fotos = foto[0]
      const data = {
        name,
        functions,
        departament,
        email,
        telefone,
        curtir,
        fotos
      }
 
      const schema = Yup.object().shape({
        name: Yup.string().required('Você deve preencher o campo name'),
        functions: Yup.string().required('Você deve preencher o campo functions'),
        departament: Yup.string().required('Você deve preencher o campo departament'),
        email: Yup.string().required('Você deve preencher o campo email'),
        telefone: Yup.string().required('Você deve preencher o campo telefone'),
        fotos:  Yup.string().required('Você deve preencher o campo fotos')
        
      });

      await schema.validate(data, {
        abortEarly: false
      })

      const funcionario = funcionariosRepository.create(data);
    
      await funcionariosRepository.save(funcionario);
     
      return response.status(201).json({funcionario}); 
  },

 async curtir(request: Request, response: Response) {
   const { id } = request.params

   const funcionariosRepository = getRepository(Funcionario);

   const procurar = await funcionariosRepository.findOneOrFail(id);

     procurar.curtir += 1
    
   const post = await getConnection() 
   .createQueryBuilder()
   .update(Funcionario)
   .set({ 
     curtir: procurar.curtir
   })
   .where(`id = ${id}`)
   .execute();  
   
   const funcionariosFotosId = await funcionariosRepository.findOneOrFail(id);

   return response.json(FuncionariosView.render(funcionariosFotosId) ); 
  },
  async descurtir(request: Request, response: Response) {
    const { id } = request.params
 
    const funcionariosRepository = getRepository(Funcionario);
 
    const procurar = await funcionariosRepository.findOneOrFail(id);
    
    if(procurar.curtir == 0){
      return response.json({message: 'Voce não pode descurtir mais, pois esse funcionario nao tem nenhuma curtida!'}); 

    }
      procurar.curtir -= 1
     
    const post = await getConnection() 
    .createQueryBuilder()
    .update(Funcionario)
    .set({ 
      curtir: procurar.curtir
    })
    .where(`id = ${id}`)
    .execute();  
    
    const funcionariosFotosId = await funcionariosRepository.findOneOrFail(id);
 
    return response.json(FuncionariosView.render(funcionariosFotosId) ); 
   },

   async mostrarDependentesFuncionarios(request: Request, response: Response){
    const { id } = request.params;

    const funcionariosRepository = getRepository(Dependentes);
    const dependentesFotoId = await funcionariosRepository.find({funcionario_id: id});
    

    return response.json(DependentesView.renderMany(dependentesFotoId));
  }, 
  
}


