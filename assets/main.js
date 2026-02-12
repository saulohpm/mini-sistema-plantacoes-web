// ============================
// Variáveis Globais
// ============================
let plantacoes = JSON.parse(localStorage.getItem("plantacoes")) || [];
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

  const plantacao = [nome, semente, diaPlantacao, diaColheita];
  const formatoData = /^\d{2}\/\d{2}\/\d{4}$/;

  if (plantacao.includes("")) {
    alert("Preencha todos os campos!");
    return;
  }

  if (!formatoData.test(diaPlantacao) || !formatoData.test(diaColheita)) {
    alert("Data inválida! Use o formato dd/mm/aaaa");
    return;
  }

  const dataPlantacao = new Date(diaPlantacao.split("/").reverse().join("-"));
  const dataColheita = new Date(diaColheita.split("/").reverse().join("-"));

  if (dataPlantacao >= dataColheita) {
    alert("Data inválida! Dia de Plantação posterior ao de Colheita");
    return;
  }

  plantacoes.push(plantacao);
  localStorage.setItem("plantacoes", JSON.stringify(plantacoes));
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

  plantacoes.forEach(p => {
    res.innerHTML += `
      <input type="radio" id="${p[0]}" name="plantacoes">
      <label for="${p[0]}">${p[0]}</label><br>`;
  });

  res.innerHTML += `<button type="button" onclick="analisar()">Visualizar</button>`;
}

function analisar() {
  const res = document.getElementById("resultado");
  let radioSelecionado = false;

  for (let i = 0; i < plantacoes.length; i++) {
    const p = plantacoes[i];
    const radio = document.getElementById(p[0]);

    if (radio && radio.checked) {
      radioSelecionado = true;

      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);

      const diaColheita = new Date(p[3].split("/").reverse().join("-"));
      diaColheita.setHours(0, 0, 0, 0);

      const diffDias = Math.round((diaColheita - hoje) / (1000 * 60 * 60 * 24));
      const textoDias = diffDias >= 0
        ? `<p>Faltam ${diffDias} dias para a colheita!</p>`
        : `<p>Se passaram ${-diffDias} dias da colheita!</p>`;

      res.innerHTML = `
        <h2>Plantação: ${p[0]}</h2>
        <p>Semente: ${p[1]}</p>
        <p>Data de Plantio: ${p[2]}</p>
        <p>Data de Colheita: ${p[3]}</p>
        ${textoDias}<br>`;
      break;
    }
  }

  if (!radioSelecionado) alert("Selecione uma das opções!");
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

  plantacoes.forEach(p => {
    res.innerHTML += `
      <input type="radio" id="${p[0]}" name="plantacoes">
      <label for="${p[0]}">${p[0]}</label><br>`;
  });

  res.innerHTML += `<button onclick="edicao()">Editar</button>`;
}

function edicao() {
  const res = document.getElementById("resultado");
  const res2 = document.getElementById("resultado2");
  let radioSelecionado = false;

  for (let i = 0; i < plantacoes.length; i++) {
    const p = plantacoes[i];
    const radio = document.getElementById(p[0]);

    if (radio && radio.checked) {
      radioSelecionado = true;
      res.innerHTML = "";
      res2.innerHTML = `
        <h2>Editando ${p[0]}</h2>
        <p>Nome: <input type="text" id="novo_nome" value="${p[0]}"></p>
        <p>Semente: <input type="text" id="nova_semente" value="${p[1]}"></p>
        <p>Dia Plantio: <input type="text" id="novo_dia_plantacao" value="${p[2]}"></p>
        <p>Dia Colheita: <input type="text" id="novo_dia_colheita" value="${p[3]}"></p>
        <button onclick="confirmarEdicao(${i})">Confirmar Edição</button>`;
      break;
    }
  }

  if (!radioSelecionado) alert("Selecione uma das opções!");
}

function confirmarEdicao(index) {
  const novo_nome = document.getElementById("novo_nome").value;
  const nova_semente = document.getElementById("nova_semente").value;
  const novo_dia_plantacao = document.getElementById("novo_dia_plantacao").value;
  const novo_dia_colheita = document.getElementById("novo_dia_colheita").value;

  const formatoData = /^\d{2}\/\d{2}\/\d{4}$/;

  if (!novo_nome || !nova_semente || !novo_dia_plantacao || !novo_dia_colheita) {
    alert("Preencha todos os campos!");
    return;
  }

  if (!formatoData.test(novo_dia_plantacao) || !formatoData.test(novo_dia_colheita)) {
    alert("Data inválida! Use o formato dd/mm/aaaa");
    return;
  }

  const dataPlantacao = new Date(novo_dia_plantacao.split("/").reverse().join("-"));
  const dataColheita = new Date(novo_dia_colheita.split("/").reverse().join("-"));

  if (dataPlantacao >= dataColheita) {
    alert("Data inválida! Dia de Plantação posterior ao de Colheita");
    return;
  }

  plantacoes[index] = [novo_nome, nova_semente, novo_dia_plantacao, novo_dia_colheita];

  localStorage.setItem("plantacoes", JSON.stringify(plantacoes));

  alert("Plantação editada com sucesso!");
  document.getElementById("resultado2").innerHTML = "";
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
    const diaColheita = new Date(p[3].split("/").reverse().join("-"));
    const mesColheita = meses[diaColheita.getMonth()];

    if (mesColheita === mesAtual) {
      res.innerHTML += `
        <br><p>- ${p[0]}</p>
        <p>Semente: ${p[1]}</p>
        <p>Colheita: ${p[3]}</p>`;
      temColheita++;
    }
  });

  if (temColheita === 0) res.innerHTML += `<h4>NÃO HÁ COLHEITAS PARA ESTE MÊS!</h4>`;
}

function statusColheita() {
  const res = document.getElementById("resultado");
  const hoje = new Date();

  const concluidas = [];
  const emAndamento = [];
  const agendadas = [];

  plantacoes.forEach(p => {
    const diaPlantacao = new Date(p[2].split("/").reverse().join("-"));
    const diaColheita = new Date(p[3].split("/").reverse().join("-"));

    if (diaColheita <= hoje) concluidas.push(p);
    else if (diaPlantacao <= hoje && hoje < diaColheita) emAndamento.push(p);
    else agendadas.push(p);
  });

  res.innerHTML = `
    <hr><h2>Status das Colheitas</h2><hr>
    <p>🟢 Concluídas (${concluidas.length})</p>
    ${concluidas.map(p => `<p>- ${p[0]} | Colheita: ${p[3]}</p>`).join("")}

    <p>🟡 Em Andamento (${emAndamento.length})</p>
    ${emAndamento.map(p => `<p>- ${p[0]} | Colheita: ${p[3]}</p>`).join("")}

    <p>🔵 Plantios Agendados (${agendadas.length})</p>
    ${agendadas.map(p => `<p>- ${p[0]} | Colheita: ${p[3]}</p>`).join("")}
  `;
}

function analiseColheitas() {
  const res = document.getElementById("resultado");
  const hoje = new Date();
  let contador = 0;

  res.innerHTML = `
    <hr><h2>Análise de Colheitas</h2><hr>
    <p>| Próximas Colheitas (em 7 dias) |</p>`;

  plantacoes.forEach(p => {
    const diaColheita = new Date(p[3].split("/").reverse().join("-"));
    const diferenca = Math.round((diaColheita - hoje) / (1000 * 60 * 60 * 24));

    if (diferenca >= 0 && diferenca <= 7) {
      res.innerHTML += `<p>- ${p[0]} | Colheita em ${diferenca} dias</p>`;
      contador++;
    }
  });

  if (contador === 0) res.innerHTML += `<p>NÃO HÁ COLHEITAS PELOS PRÓXIMOS 7 DIAS!</p>`;
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

  plantacoes.forEach(p => {
    res.innerHTML += `
      <input type="radio" id="${p[0]}" name="plantacoes">
      <label for="${p[0]}">${p[0]}</label><br>`;
  });

  res.innerHTML += `<button onclick="confirmarApagar()">Apagar</button>`;
}

function confirmarApagar() {
  let radioSelecionado = false;

  for (let i = 0; i < plantacoes.length; i++) {
    const p = plantacoes[i];
    const radio = document.getElementById(p[0]);

    if (radio && radio.checked) {
      radioSelecionado = true;

      plantacoes.splice(i, 1);
      localStorage.setItem("plantacoes", JSON.stringify(plantacoes));

      alert(`${p[0]} deletada com sucesso!`);
      window.location.href = "../index.html";
      break;
    }
  }

  if (!radioSelecionado) alert("Selecione uma das opções!");
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
