# Explorador de Repositórios

Aplicação desenvolvida para o desafio técnico Front-End da Desbravador Software.

O projeto consome a API pública do GitHub para permitir a busca de usuários, visualização de informações do perfil e exploração dos seus repositórios públicos.

## Demonstração

A aplicação está disponível em:

https://desafio-front-lime-phi.vercel.app/

## Tecnologias Utilizadas

- React
- TypeScript
- Vite
- React Router DOM
- Axios
- React Hook Form
- Bootstrap 5
- Vitest

## Funcionalidades

### Busca de usuários

Permite pesquisar qualquer usuário público do GitHub através do username.

### Detalhes do usuário

Exibe:

- Avatar
- Nome
- Login
- Bio
- E-mail
- Quantidade de seguidores
- Quantidade de usuários seguidos

### Repositórios

Lista os repositórios públicos do usuário ordenados inicialmente por quantidade de estrelas em ordem decrescente.

### Ordenação

Permite alterar a ordenação dos repositórios por:

- Mais estrelas
- Menos estrelas
- Nome A-Z
- Nome Z-A
- Atualizados recentemente

### Detalhes do repositório

Exibe:

- Nome
- Descrição
- Quantidade de estrelas
- Linguagem principal
- Data da última atualização
- Link externo para o repositório no GitHub

## Estrutura do Projeto

```txt
src/
├─ components/
├─ pages/
├─ routes/
├─ services/
├─ types/
├─ utils/
├─ App.tsx
└─ main.tsx
```

## Instalação

Clone o projeto:

```bash
git clone <url-do-repositorio>
```

Acesse a pasta do projeto:

```bash
cd nome-do-projeto
```

Instale as dependências:

```bash
npm install
```

Execute o projeto em ambiente de desenvolvimento:

```bash
npm run dev
```

## Scripts Disponíveis

Executar ambiente de desenvolvimento:

```bash
npm run dev
```

Gerar build de produção:

```bash
npm run build
```

Executar lint:

```bash
npm run lint
```

Executar testes:

```bash
npm run test
```

## Testes

Foram implementados testes unitários para validar a lógica de ordenação dos repositórios.

## Melhorias Aplicadas

Além dos requisitos solicitados, foram implementadas algumas melhorias:

- Componentes reutilizáveis para feedback visual
- Tratamento de erros de requisição
- Estados de carregamento
- Layout responsivo
- Cuidados básicos de acessibilidade
- Organização modular do código
- Tipagem com TypeScript
- Deploy na Vercel

## Autor

Washington Luiz de Souza