# Graceful Shutdown - Express.js
Repositório de apoio para post do meu blog, sobre graceful shutdown. A ideia é mostrar como configurar o graceful shutdown em uma aplicação utilizando Express.js e Sequelize em uma estrutura um pouco mais complexa.

<br>

### **Como iniciar a aplicação:**
Primeiro vá até o arquivo `src/datasource.js` e altere os valores na variável `connectionInfos` para os dados de acesso do seu banco de dados. Depois disso execute um dos comandos abaixo:

```
npm start
yarn start
```

### **Como testar:**

Inicie a aplicação, e simule a seguinte situação:
- descubra o PID do processo atual utilizando o comando
```
netstat -lp | grep :3000
```
- envie uma requisição para a API
- logo em seguida, envie um sinal de terminação de processo para a API utilizando o comando kill passando o PID obtido no primeiro passo
```
kill <PID>
```

Fazendo isso, você verá o processo em ação.


> Espero ter te ajudado. Se sim, deixe uma star no repositório!