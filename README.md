# Instruções de como utilizar a API

### Fazer cópia do repositório na sua máquina local

1. Inicie o git em uma pasta: `git init`
2. Faça um clone na sua máquina local: `git clone https://github.com/MatheusNunes133/ProjetoBancoRedis-BackEnd `

### Baixar dependências necessárias

3. No terminal utilize este comando: `npm i`

### Configurando arquivo de configurações

4. Crie um arquivo na raiz chamada de `.env`
5. Dentro do arquivo deve ser colocado as seguintes configurações:
```
PG_PORT: {Sua porta do banco PostgreSQL}
PG_USER: {Seu usuário do banco PostgreSQL}
PG_PASSWORD: {Sua senha do banco PostgreSQL}
PG_DATABASE: {Nome do banco de dados criado}
PG_HOST: {O host do banco de dados PostgreSQL}
REDIS_PORT: {A porta do banco redis}
REDIS_HOST: {O host do banco redis}
```

### Iniciando a API

6. No terminal escreva esse comando: `npm start`
7. Pronto a API já em execução
