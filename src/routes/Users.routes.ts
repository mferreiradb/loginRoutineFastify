import { PrismaClient } from "@prisma/client";
import { FastifyInstance } from "fastify";
import Users from "../@types/Users";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs'

const secret = '89y123231bhj123123y789123bj123h89132b123h789'

const prisma = new PrismaClient()

export default async function UsersRoutes(app: FastifyInstance) {
    app.post('/', async (req, res) => {
        const {login, password} = req.body as Users;
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const user = await prisma.users.findFirst({
            where: {
                login
            }
        })

        if (user) {
            return res.status(400).send({err: 'Nome de usuário já em uso'})
        }
        
        const newUser = await prisma.users.create({
            data: {
                login,
                password: hash
            }
        })
        return res.status(201).send({msg: `Usuário ${newUser.login} criado com sucesso`})
    })

    app.post('/login', async (req, res) => {
        const {login, password} = req.body as Users;

        const user = await prisma.users.findFirst({
            where: {
                login
            }
        })

        if (!user) {
            return res.status(400).send({err: 'Usuário não encontrado'})
        }

        const correctUser = bcrypt.compareSync(password, user.password)

        if (!correctUser) {
            return res.status(400).send({err: 'Senha incorreta'})
        }

        try {
            const token = jwt.sign({id: user.id, login: user.login}, secret, {expiresIn: '12h'})
            return res.send({token})
        } catch(err) {
            return res.status(400).send({msg: 'Falha interna', err})
        }
    })
}