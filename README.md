Esse é um projeto com o desafio de criar um highlight, ou seja, um contorno no cubo da cena. Quando o usuário clicar o contorno tem que ser adicionado assim como acontece no Cinema 4D ou Unreal, para mostrar que o usuário selecionou aquele objeto.

Para iniciar o projeto abra o terminal. Você pode usar o PowerShell ou o Bash mas recomendo que use o Bash.

Copie e cole os comandos:


git clone https://github.com/HildLuger/desafio-vitor.git

Isso vai clonar o repositório e baixar o projeto na sua máquina.

Entre na pasta do projeto com o comando:

cd threejs-project

Verifique a hierarquia das pastas. Se não houver uma pasta chamada node modules, instale usando o comando:

npm install


Rode o projeto usando:

npm run dev


Procure o arquivo main.js, aqui que será seu trabalho. Use qualquer ferramenta disponível como chat gpt, stack overflow, fóruns, documentações. Qualquer solução é válida. Não quero nem olhar seu código, quero ver só o resultado, se consegue criar uma seleção para a mesh 3D quando for clicada, mostrando isso através de um contorno.

Conseguindo o resultado você vai parar o npm run dev  no terminal usando o comando "control + c"


Use o seguinte comando para preparar os arquivos:

git add .

Esse ponto no final (depois de um espaço) significa que você está adicionando todos os arquivos do projeto.

Uso o seguinte comando para criar seu commit com a descrição

git commit -m "descrição do commit, o que foi alterado, etc"

Finalize com:

git push origin main


Parabéns, você criou sua primeira Pull Request (ou PR). Quando digo que terminei uma task foi porque entreguei uma PR. É assim que entregamos as modificações no ambiente de trabalho. Você vai precisar ter uma conta no GitHub pra isso.
