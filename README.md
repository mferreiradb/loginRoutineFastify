<h1 align="center">Projteto de rotina de login com Fastify</h1>

<p align="center">Projeto backend para rotina de login com Fastify</p>

![Badge](https://img.shields.io/badge/Version-1.0.0-yellow?style=for-the-badge&logo=ghost)
![Badge](https://img.shields.io/badge/Typescript-^4.9.5-blue?style=for-the-badge&logo=ghost)
![Badge](https://img.shields.io/badge/Prisma-4.11.0-blue?style=for-the-badge&logo=ghost)
![Badge](https://img.shields.io/badge/Prisma_Client-^4.11.0-blue?style=for-the-badge&logo=ghost)
![Badge](https://img.shields.io/badge/Fastify-^4.14.1-lightgrey?style=for-the-badge&logo=ghost)
![Badge](https://img.shields.io/badge/JWT-^9.0.0-ff69b4?style=for-the-badge&logo=ghost)
![Badge](https://img.shields.io/badge/License-MIT-brightgreen?style=for-the-badge&logo=ghost)
![Badge](https://img.shields.io/badge/Status-In_progress-%237159c1?style=for-the-badge&logo=ghost)

<p align="center">O projeto tem o objetivo de fornecer um template para implementação de uma rotina de login utilizando <b>Fastfy</b>, <b>Prisma</b> e <b>JWT</b></p>

## Instalação de dependências

- Typescript

        npm i -D typescript
    
    - Iniciar ts.config

        ```
        npx tsc --init
        ```

- Ts Node Dev

        npm i -D ts-node-dev

- Fastify

        npm i fastify

- Prisma

        npm install prisma --save-dev

- Prisma Client

        npm install @prisma/client

- JWT

        npm i --save jsonwebtoken

*Iniciar prisma*

- Podemos iniciar o prisma sem determinar um banco de dados, de forma que virá por padão o definido na CLI
    
    npx prisma init

- Podemos iniciar o prisma com um banco de dados de nossa preferencia

    - Neste caso, estou utilizando Sqlite

        ```
        npx prisma init --datasource-provider sqlite
        ```

# Rotas da aplicação

**Usuários**

- POST /users
    - Criação de usuário
        - Obrigatório o envio dos dados `login` e `password` pelo body da aplicação
            - O campo `login` é único. Logo, não será possível realizar a criação de um usuário que já possui um login existente

- POST /users/login/
    - Realiza o login, retornando o token `JWT` para uso nas autenticações
        - Obrigatório o envio dos dados `login` e `password` pelo body da aplicação

- PATCH /users/:idUser/
    - Altera os dados do usuário
        - Obrigatório o envio de ao menos um dos dados: `login` e `password` pelo body da aplicação
            - Caso não seja passado nenhum dos dados, retorna um erro
        - Obrigatória a validação do token JWT nos headers da aplicação

- DELETE /users/:idUser/
    - Exclui o usuário informado nos parametros da rota
        - Deve ser informado no parametro da rota o `id` do usuário que deve ser excluído
        - Obrigatória a validação do token JWT nos headers da aplicação

## Features

**Usuários**

- [] Deve ser possível criar um usuário

- [] Deve ser possível realizar o Login do usuário e gerar o token JWT

- [] Deve ser possível alterar os dados do usuário

- [] Deve ser possível excluir um usuário

- [] Implementação de Hash de senha