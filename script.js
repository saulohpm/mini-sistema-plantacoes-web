// Cria uma variável composta vazia ou puxa dados salvos
let plantacoes = JSON.parse(localStorage.getItem("plantacoes")) || [];


function cadastrar() {

  let nome = window.document.getElementById('nome');
  let semente = window.document.getElementById('semente');
  let dia_plantacao = window.document.getElementById('dia_plantacao');
  let dia_colheita = window.document.getElementById('dia_colheita');

  let plantacao = [
    nome.value, semente.value, dia_plantacao.value, dia_colheita.value
  ];

  let j = plantacao.length;
  let logico = false
  for (let i = 0; i <= j - 1; i++) {

    if (plantacao[i] === "") {
      logico = true
    };

  };

  if (logico === false){

    plantacoes.push(plantacao);
    localStorage.setItem("plantacoes", JSON.stringify(plantacoes)); // Salva no navegador
    alert("Plantação cadastrada com sucesso!");

  } else {
    alert("Preencha todos os campos!")
  }



};


function visualizar() {
  let res = document.getElementById("resultado");
  res.innerHTML = "";

  for (let p of plantacoes) {
    res.innerHTML +=
      "Nome: " + p[0] +
      " | Semente: " + p[1] +
      " | Plantio: " + p[2] +
      " | Colheita: " + p[3] +
      "<br>";
  };
};


function editar() {
  let res = document.getElementById("resultado");
  res.innerHTML = "";

  for (let p of plantacoes) {
    res.innerHTML +=
    `<input type="radio" id="${p[0]}">
    <label for="${p[0]}">${p[0]}</label><br>`
  };
};


function edicao() {

  let res2 = document.getElementById("resultado2");

  let radioSelecionado = false;

  for (let i = 0; i < plantacoes.length; i++) {
    let p = plantacoes[i];
    const radio = document.getElementById(p[0]);

    if (radio && radio.checked) {
      radioSelecionado = true;
      res2.innerHTML = "";

      res2.innerHTML = `<p>Você selecionou ${p[0]}</p>` +
        `<p>Nome novo da plantação: <input type="text" id="novo_nome" value="${p[0]}"></p>` +
        `<p>Semente Utilizada: <input type="text" id="nova_semente" value="${p[1]}"></p>` +
        `<p>Dia de plantação (dd/mm/aaaa): <input type="text" id="novo_dia_plantacao" value="${p[2]}"></p>` +
        `<p>Dia de colheita (dd/mm/aaaa): <input type="text" id="novo_dia_colheita" value="${p[3]}"></p>` +
        `<button onclick="confirmarEdicao(${i})">Confirmar Edição</button>`;

      break;
    }
  }

  if (!radioSelecionado) {
    alert("Selecione uma das opções!");
  }
}


function confirmarEdicao(index) {
  // Pega os valores novos dos inputs
  let novo_nome = document.getElementById("novo_nome").value;
  let nova_semente = document.getElementById("nova_semente").value;
  let novo_dia_plantacao = document.getElementById("novo_dia_plantacao").value;
  let novo_dia_colheita = document.getElementById("novo_dia_colheita").value;

  // Atualiza a plantação no array
  plantacoes[index] = [novo_nome, nova_semente, novo_dia_plantacao, novo_dia_colheita];

  // Salva no localStorage
  localStorage.setItem("plantacoes", JSON.stringify(plantacoes));

  alert("Plantação editada com sucesso!");
  document.getElementById("resultado2").innerHTML = "";
  visualizar(); // atualiza a lista na tela
}


function limpar() {

  localStorage.removeItem("plantacoes");
  plantacoes = [];
  document.getElementById("resultado").innerHTML = "";
  alert("Dados apagados com sucesso!");

};