import { Router } from 'express';
import multer from 'multer'

import uploadConfig from './config/upload'
import FuncionariosController from './controllers/FuncionariosController'
import DependentesController from './controllers/DependentesController'

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/funcionarios', FuncionariosController.index);
routes.get('/funcionarios/:id', FuncionariosController.show);
routes.post('/funcionarios', upload.array('fotos'), FuncionariosController.create);
routes.delete('/funcionarios/:id', FuncionariosController.delete);
routes.put('/funcionarios/:id', upload.array('fotos'), FuncionariosController.alterar);
routes.put('/funcionarios/:id/curtir', upload.array('fotos'), FuncionariosController.curtir);
routes.put('/funcionarios/:id/descurtir', upload.array('fotos'), FuncionariosController.descurtir);
routes.get('/funcionarios/:id/dependentes', FuncionariosController.mostrarDependentesFuncionarios);

routes.get('/dependentes', DependentesController.index);
routes.get('/dependentes/:id', DependentesController.show);
routes.post('/dependentes', upload.array('foto'), DependentesController.create);
routes.delete('/dependentes/:id', DependentesController.delete);
routes.put('/dependentes/:id', upload.array('fotos'), DependentesController.alterar);


export default routes;
