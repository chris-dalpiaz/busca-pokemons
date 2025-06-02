let listaPokemons = [];

function percorrerListaPokemons(){
    for (pokemon of listaPokemons) {
        carregarPokemonsNaTela(pokemon.frontDefault, pokemon.frontShiny, pokemon.nome,
            pokemon.id, pokemon.experienciaBase, pokemon.altura, pokemon.peso);
    }
}

function buscarPokemon() {
    console.log("buscando pokemon");

    const inputNome = document.getElementById('nome_pokemon');
    const nomePokemon = inputNome.value;

    fetch('https://pokeapi.co/api/v2/pokemon/' + nomePokemon)
        .then((resposta) => {
            return resposta.json();
        })
        .then((json) => {
            //alterando peso e altura para metro e kg
            let alturaPokemon = json.height/10;
            let pesoPokemon = json.weight/10;

            for (pokemon of listaPokemons) {
                if(pokemon.nome == nomePokemon){
                    alert("Esse pokémon já foi listado!");
                    return;
                }
            }

            carregarPokemonsNaTela(json.sprites.front_default, json.sprites.front_shiny, json.name,
                json.id, json.base_experience, alturaPokemon, pesoPokemon);

            const novoPokemon = {
                frontDefault: json.sprites.front_default,
                frontShiny: json.sprites.front_shiny,
                nome: json.name,
                id: json.id,
                experienciaBase: json.base_experience,
                altura: alturaPokemon,
                peso: pesoPokemon
            }

            document.getElementById('botao_salvar').onclick = function () {
                limparDadosNaTela();
                listaPokemons.push(novoPokemon);
                salvarPokemon();
                percorrerListaPokemons();
            }

            document.getElementById('botao_cancelar').onclick = function () {
                limparDadosNaTela();
                percorrerListaPokemons();
            }
        });
}

function salvarPokemon() {
    // Converte a lista de contatos para formato JSON e salva no localStorage
    localStorage.setItem('listaPokemons', JSON.stringify(listaPokemons));
}

function carregarPokemons() {

    // Recupera a lista do localStorage, se existir
    const armazenamento = localStorage.getItem('listaPokemons');

    // Condição para 'listaContatos' : Se 'armazenamento' conter dados,
    // 'listaContatos' será igual ao JSON.parse(armazenamento), convertendo os dados para um array de objetos,
    // caso contrário, 'listaContatos' será igual a um array vazio ([])
    listaPokemons = armazenamento ? JSON.parse(armazenamento) : [];

    // Percorre a lista de contatos e os exibe na tabela
    percorrerListaPokemons();
}

function limparDadosNaTela() {
    const tableBody = document.getElementById('tabela_pokemons');
    tableBody.innerHTML =
        `<tr>
        <th>Comum</th>
        <th>Shiny</th>
        <th>Nome</th>
        <th>Pokédex ID</th>
        <th>Experiência Base</th>
        <th>Altura (Metros)</th>
        <th>Peso (Kg)</th>
    </tr>`
}

function carregarPokemonsNaTela(comum, shiny, nome, id, experienciaBase, altura, peso) {
    //criando a nova linha
    const novaLinha = document.createElement('tr');

    //criando a tag <img> para vincular a coluna
    const imagemDefault = document.createElement('img');
    const imagemShiny = document.createElement('img');


    //criando colunas
    const colunaDefault = document.createElement('td');
    const colunaShiny = document.createElement('td');
    const colunaNome = document.createElement('td');
    const colunaId = document.createElement('td');
    const colunaExperiencia = document.createElement('td');
    const colunaAltura = document.createElement('td');
    const colunaPeso = document.createElement('td');

    //vinculando dados
    //definindo o link da imagem do pokemon
    imagemDefault.src = comum;
    imagemShiny.src = shiny;

    colunaNome.innerText = nome;
    colunaId.innerText = id;
    colunaExperiencia.innerText = experienciaBase;
    colunaAltura.innerText = altura;
    colunaPeso.innerText = peso;

    // adiciona as imagens dentro das colunas
    colunaDefault.appendChild(imagemDefault);
    colunaShiny.appendChild(imagemShiny);


    //adicionando colunas a nova linha
    novaLinha.appendChild(colunaDefault);
    novaLinha.appendChild(colunaShiny);
    novaLinha.appendChild(colunaNome);
    novaLinha.appendChild(colunaId);
    novaLinha.appendChild(colunaExperiencia);
    novaLinha.appendChild(colunaAltura);
    novaLinha.appendChild(colunaPeso);

    //puxando a tabela
    const tabelaPokemons = document.getElementById('tabela_pokemons');

    //vinculando a nova linha com a tabela
    tabelaPokemons.appendChild(novaLinha);
}

function carregarEventos() {
    carregarPokemons();
    const botaoBuscar = document.getElementById('buscar_pokemon');

    botaoBuscar.addEventListener('click', buscarPokemon);
}

window.addEventListener('load', carregarEventos);