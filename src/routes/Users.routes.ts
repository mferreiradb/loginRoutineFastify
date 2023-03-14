import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import Users from '../@types/Users';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

const secret = '89y123231bhj123123y789123bj123h89132b123h789';

const prisma = new PrismaClient();

export default async function UsersRoutes(app: FastifyInstance) {

	app.get('/', async (req, res) => {
		const result = await prisma.users.findMany();
        
		return res.send(result);
	});

	app.post('/', async (req, res) => {
		const {login, password} = req.body as Users;
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);

		const user = await prisma.users.findFirst({
			where: {
				login
			}
		});

		if (user) {
			return res.status(400).send({err: 'Nome de usuário já em uso'});
		}
        
		const newUser = await prisma.users.create({
			data: {
				login,
				password: hash
			}
		});
		return res.status(201).send({msg: `Usuário ${newUser.login} criado com sucesso`});
	});

	app.post('/login', async (req, res) => {
		const {login, password} = req.body as Users;

		const user = await prisma.users.findFirst({
			where: {
				login
			}
		});

		if (!user) {
			return res.status(404).send({err: 'Usuário não encontrado'});
		}

		const correctUser = bcrypt.compareSync(password, user.password);

		if (!correctUser) {
			return res.status(400).send({err: 'Senha incorreta'});
		}

		try {
			const token = jwt.sign({id: user.id, login: user.login}, secret, {expiresIn: '12h'});
			return res.send({token});
		} catch(err) {
			return res.status(400).send({msg: 'Falha interna', err});
		}
	});

	app.put('/:id', async (req, res) => {
		const {id} = req.params as Users;
		const {login, password} = req.body as Users;
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);
        
		const user = await prisma.users.findFirst({
			where: {
				id: id
			}
		});
        

		if (!user) {
			return res.status(404).send({err: 'Usuário não encontrado'});
		}

		try {
			const newData = await prisma.users.update({
				data: {
					login: login,
					password: hash
				},
				where: {
					id: id
				}
			});
			return res.status(201).send({msg: `Usuário [${newData.login}] alterado com sucesso`});
		} catch(err) {
			return res.status(400).send({err: 'Erro interno!', error: err});
		}
	});

	app.delete('/:id', async (req, res) => {
		const {id} = req.params as Users;

		const user = await prisma.users.findFirst({
			where: {
				id: id
			}
		});

		if (!user) {
			return res.status(404).send({err: 'Usuário não encontrado'});
		}

		await prisma.users.delete({
			where: {
				id: id
			}
		});

		return res.status(200).send({msg: `Usuário [${user.login}] excluído com sucesso`});
	});
}