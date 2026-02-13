// ============================
// Variáveis Globais
// ============================
let plantacoes = carregarDados("plantacoes");

const meses = [
  "Janeiro", "Fevereiro", "Março", "Abril",
  "Maio", "Junho", "Julho", "Agosto",
  "Setembro", "Outubro", "Novembro", "Dezembro"
];

// ============================
// Funções de Cadastro
// ============================
function cadastrar() {
  const nome = document.getElementById('nome').value;
  const semente = document.getElementById('semente').value;
  const diaPlantacao = document.getElementById('dia_plantacao').value;
  const diaColheita = document.getElementById('dia_colheita').value;

  if (!nome || !semente || !diaPlantacao || !diaColheita) {
    alert("Preencha todos os campos!");
    return;
  }

  if (!validarFormatoData(diaPlantacao) || !validarFormatoData(diaColheita)) {
    alert("Data inválida! Use o formato dd/mm/aaaa");
    return;
  }

  const dataPlantacao = converterData(diaPlantacao);
  const dataColheita = converterData(diaColheita);

  if (!validarOrdemDatas(dataPlantacao, dataColheita)) {
    alert("Data inválida! Dia de Plantação posterior ao de Colheita");
    return;
  }

  const plantacao = {nome: nome, semente: semente, diaPlantacao: diaPlantacao, diaColheita: diaColheita};

  plantacoes.push(plantacao);
  salvarDados("plantacoes", plantacoes);

  alert("Plantação cadastrada com sucesso!");
  window.location.href = "../index.html";
}


// ============================
// Funções de Visualização
// ============================
function visualizar() {
  const res = document.getElementById("resultado");

  if (plantacoes.length === 0) {
    res.innerHTML = "<h2>NÃO HÁ CADASTRO DE PLANTAÇÕES</h2>";
    return;
  }

  res.innerHTML = "<p>Plantações Cadastradas:</p>";

  plantacoes.forEach((p, i) => {
    res.innerHTML += `
      <input type="radio" id="plantacao_${i}" name="plantacoes" value="${i}">
      <label for="plantacao_${i}">${p.nome}</label><br>`;
  });

  res.innerHTML += `<button type="button" onclick="analisar()">Visualizar</button>`;
}


function analisar() {
  const res = document.getElementById("resultado");

  const index = obterIndexSelecionado("plantacoes");

  if (index === -1) {
    alert("Selecione uma das opções!");
    return;
  }

  const p = plantacoes[index];

  const hoje = new Date();
  const colheita = converterData(p.diaColheita);
  const diffDias = diferencaEmDias(hoje, colheita);

  const textoDias = diffDias >= 0
    ? `<p>Faltam ${diffDias} dias para a colheita!</p>`
    : `<p>Se passaram ${-diffDias} dias da colheita!</p>`;

  res.innerHTML = `
    <h2>Plantação: ${p.nome}</h2>
    <p>Semente: ${p.semente}</p>
    <p>Data de Plantio: ${p.diaPlantacao}</p>
    <p>Data de Colheita: ${p.diaColheita}</p>
    ${textoDias}`;
}


// ============================
// Funções de Edição
// ============================
function editar() {
  const res = document.getElementById("resultado");

  if (plantacoes.length === 0) {
    res.innerHTML = "<h2>NÃO HÁ CADASTRO DE PLANTAÇÕES</h2>";
    return;
  }

  res.innerHTML = "<p>Escolha uma plantação para editar:</p>";

  plantacoes.forEach((p, i) => {
    res.innerHTML += `
      <input type="radio" id="plantacao_${i}" name="plantacoes" value="${i}">
      <label for="plantacao_${i}">${p.nome}</label><br>`;
  });

  res.innerHTML += `<button onclick="edicao()">Editar</button>`;
}


function edicao() {
  const res = document.getElementById("resultado");
  const res2 = document.getElementById("resultado2");

  const index = obterIndexSelecionado("plantacoes");

  if (index === -1) {
    alert("Selecione uma das opções!");
    return;
  }

  const p = plantacoes[index];

  res.innerHTML = "";
  res2.innerHTML = `
    <h2>Editando ${p.nome}</h2>
    <p>Nome: <input type="text" id="novo_nome" value="${p.nome}"></p>
    <p>Semente: <input type="text" id="nova_semente" value="${p.semente}"></p>
    <p>Dia Plantio: <input type="text" id="novo_dia_plantacao" value="${p.diaPlantacao}"></p>
    <p>Dia Colheita: <input type="text" id="novo_dia_colheita" value="${p.diaColheita}"></p>
    <button onclick="confirmarEdicao(${index})">Confirmar Edição</button>`;
}


function confirmarEdicao(index) {
  const novo_nome = document.getElementById("novo_nome").value;
  const nova_semente = document.getElementById("nova_semente").value;
  const novo_dia_plantacao = document.getElementById("novo_dia_plantacao").value;
  const novo_dia_colheita = document.getElementById("novo_dia_colheita").value;

  if (!novo_nome || !nova_semente || !novo_dia_plantacao || !novo_dia_colheita) {
    alert("Preencha todos os campos!");
    return;
  }

  if (!validarFormatoData(novo_dia_plantacao) || !validarFormatoData(novo_dia_colheita)) {
    alert("Data inválida! Use o formato dd/mm/aaaa");
    return;
  }

  const dataPlantacao = converterData(novo_dia_plantacao);
  const dataColheita = converterData(novo_dia_colheita);

  if (!validarOrdemDatas(dataPlantacao, dataColheita)) {
    alert("Data inválida! Dia de Plantação posterior ao de Colheita");
    return;
  }

  plantacoes[index] = {nome: novo_nome, semente: nova_semente, diaPlantacao: novo_dia_plantacao, diaColheita: novo_dia_colheita};

  salvarDados("plantacoes", plantacoes);

  alert("Plantação editada com sucesso!");
  window.location.href = "../index.html";
}


// ============================
// Funções de Resumo e Status
// ============================
function resumoMensal() {
  const res = document.getElementById("resultado");
  const mesAtual = meses[new Date().getMonth()];

  res.innerHTML = `
    <hr><h2>Resumo de Colheita Mensal</h2><hr>
    <p>Total de Plantações Cadastradas: ${plantacoes.length}</p>
    <p>Colheitas para o mês de ${mesAtual}: </p>`;

  let temColheita = 0;

plantacoes.forEach(p => {
  const diaColheita = converterData(p.diaColheita);
  const mesColheita = meses[diaColheita.getMonth()];

  if (mesColheita === mesAtual) {
    res.innerHTML += `
      <br><p>- ${p.nome}</p>
      <p>Semente: ${p.semente}</p>
      <p>Colheita: ${p.diaColheita}</p>`;
    temColheita++;
  }
});

  if (temColheita === 0)
    res.innerHTML += `<h4>NÃO HÁ COLHEITAS PARA ESTE MÊS!</h4>`;
}


function statusColheita() {
  const res = document.getElementById("resultado");
  const hoje = new Date();

  const concluidas = [];
  const emAndamento = [];
  const agendadas = [];

  plantacoes.forEach(p => {
    const diaPlantacao = converterData(p.diaPlantacao);
    const diaColheita = converterData(p.diaColheita);

    if (diaColheita <= hoje) concluidas.push(p);
    else if (diaPlantacao <= hoje && hoje < diaColheita) emAndamento.push(p);
    else agendadas.push(p);
  });

  res.innerHTML = `
    <hr><h2>Status das Colheitas</h2><hr>
    <p>🟢 Concluídas (${concluidas.length})</p>
    ${concluidas.map(p => `<p>- ${p.nome} | Colheita: ${p.diaColheita}</p>`).join("")}

    <p>🟡 Em Andamento (${emAndamento.length})</p>
    ${emAndamento.map(p => `<p>- ${p.nome} | Colheita: ${p.diaColheita}</p>`).join("")}

    <p>🔵 Plantios Agendados (${agendadas.length})</p>
    ${agendadas.map(p => `<p>- ${p.nome} | Colheita: ${p.diaColheita}</p>`).join("")}`;
}


function analiseColheitas() {
  const res = document.getElementById("resultado");
  const hoje = new Date();
  let contador = 0;

  res.innerHTML = `
    <hr><h2>Análise de Colheitas</h2><hr>
    <p>| Próximas Colheitas (em 7 dias) |</p>`;

  plantacoes.forEach(p => {
    const diaColheita = converterData(p.diaColheita);
    const diferenca = Math.floor((diaColheita - hoje) / (1000 * 60 * 60 * 24));

    if (diferenca >= 0 && diferenca <= 7) {
      res.innerHTML += `<p>- ${p.nome} | Colheita em ${diferenca} dias</p>`;
      contador++;
    }
  });

  if (contador === 0)
    res.innerHTML += `<p>NÃO HÁ COLHEITAS PELOS PRÓXIMOS 7 DIAS!</p>`;
}


// ============================
// Funções de Exclusão
// ============================
function apagar() {
  const res = document.getElementById("resultado");

  if (plantacoes.length === 0) {
    res.innerHTML = "<h2>NÃO HÁ CADASTRO DE PLANTAÇÕES</h2>";
    return;
  }

  res.innerHTML = "<p>Escolha uma plantação para apagar:</p>";

  plantacoes.forEach((p, i) => {
    res.innerHTML += `
      <input type="radio" id="plantacao_${i}" name="plantacoes" value="${i}">
      <label for="plantacao_${i}">${p.nome}</label><br>`;
  });

  res.innerHTML += `<button onclick="confirmarApagar()">Apagar</button>`;
}


function confirmarApagar() {
  const index = obterIndexSelecionado("plantacoes");

  if (index === -1) {
    alert("Selecione uma das opções!");
    return;
  }

  const p = plantacoes[index];

  plantacoes.splice(index, 1);
  salvarDados("plantacoes", plantacoes);

  alert(`${p.nome} deletada com sucesso!`);
  window.location.href = "../index.html";
}


function limpar() {
  if (confirm("Tem certeza que quer apagar os dados?")) {
    localStorage.removeItem("plantacoes");
    plantacoes = [];
    document.getElementById("resultado").innerHTML = "";
    alert("Dados apagados com sucesso!");
  } else {
    alert("Ação cancelada.");
  }
}