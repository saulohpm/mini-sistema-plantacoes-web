// Cria uma variável composta vazia ou puxa dados salvos
let plantacoes = JSON.parse(localStorage.getItem("plantacoes")) || [];

function cadastrar() {

  let nome = window.document.getElementById('nome');
  let semente = window.document.getElementById('semente');
  let dia_plantacao = window.document.getElementById('dia_plantacao');
  let dia_colheita = window.document.getElementById('dia_colheita');

  let plantacao = [nome.value, semente.value, dia_plantacao.value, dia_colheita.value];

  let j = plantacao.length;
  let logico = false;
  let formatoData = /^\d{2}\/\d{2}\/\d{4}$/;

  for (let i = 0; i <= j - 1; i++) {

    if (plantacao[i] === "") {
      logico = true
    };

  };

  const diaPlantacao = new Date(dia_plantacao.value.split("/").reverse().join("-"));
  const diaColheita = new Date(dia_colheita.value.split("/").reverse().join("-"));

  if (logico !== false) {
    alert("Preencha todos os campos!");

  } else if (!formatoData.test(dia_plantacao.value) || !formatoData.test(dia_colheita.value)) {
    alert("Data Inválida! Use o formato dd/mm/aaaa");

  } else if (diaPlantacao >= diaColheita) {
    alert("Data Inválida! Dia de Plantação posterior ao de Colheita");

  } else {
      plantacoes.push(plantacao);
      localStorage.setItem("plantacoes", JSON.stringify(plantacoes)); // Salva no navegador
      alert("Plantação cadastrada com sucesso!");
      window.location.href = "../index.html";
  }
}


function visualizar() {
  let res = document.getElementById("resultado");

  if (plantacoes.length === 0) {
    res.innerHTML = "<h2>NÃO HÁ CADASTRO DE PLANTAÇÕES</h2>"

  } else {
    res.innerHTML = "<p>Plantações Cadastradas:</p>";

    for (let p of plantacoes) {
      res.innerHTML +=
      `<input type="radio" id="${p[0]}" name="plantacoes">
      <label for="${p[0]}">${p[0]}</label><br>`
    };

    res.innerHTML += `<button type="button" id="edicao" onclick="analisar()">Visualizar</button>`
  }
}


function analisar() {
  let res = document.getElementById("resultado");
  let radioSelecionado = false;

  for (let i = 0; i < plantacoes.length; i++) {
    let p = plantacoes[i];
    const radio = document.getElementById(p[0]);

    if (radio && radio.checked) {
      radioSelecionado = true;

      // Calcula diferença de dias com base na plantação selecionada
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      let diaColheita = new Date(p[3].split("/").reverse().join("-"));
      diaColheita.setHours(0, 0, 0, 0)
      let diffDias = (diaColheita - hoje) / (1000 * 60* 60 * 24);

      if (diffDias >= 0) {
        calculotexto = "<p>Faltam " + diffDias + " dias para a colheita!</p>"
      } else {
        calculotexto = "<p>Se passaram " + diffDias * -1 + " dias da colheita!</p>"
      }

      res.innerHTML = "<h2>Plantação: " + p[0] + "</h2>" +
                      "<p>Semente: " + p[1] + "</p>" +
                      "<p>Data de Plantio: " + p[2] + "</p>" +
                      "<p>Data de Colheita: " + p[3] + "</p>" +
                      calculotexto +
                      "<br>";

      break;
    }
  }
  if (!radioSelecionado) {
    alert("Selecione uma das opções!");
  }
}


function editar() {
  let res = document.getElementById("resultado");

  if (plantacoes.length === 0) {
    res.innerHTML = "<h2>NÃO HÁ CADASTRO DE PLANTAÇÕES</h2>"
  } else {
    res.innerHTML = "<p>Escola uma plantação para editar:</p>";

    for (let p of plantacoes) {
      res.innerHTML +=
      `<input type="radio" id="${p[0]}", name="plantacoes">
      <label for="${p[0]}">${p[0]}</label><br>`
    }

    res.innerHTML += 
    `<button type="button" id="edicao" onclick="edicao()">Editar</button>`;
  }
}


function edicao() {
  let res = document.getElementById("resultado");
  let res2 = document.getElementById("resultado2");

  let radioSelecionado = false;

  for (let i = 0; i < plantacoes.length; i++) {
    let p = plantacoes[i];
    const radio = document.getElementById(p[0]);

    if (radio && radio.checked) {
      radioSelecionado = true;
      res.innerHTML = "";
      res2.innerHTML = "";

      res2.innerHTML = `<h2>Editando ${p[0]}</h2>` +
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
  window.location.href = "../index.html";
}


function resumomensal() {
  let res = document.getElementById("resultado");

  const meses = [
  "Janeiro", "Fevereiro", "Março", "Abril",
  "Maio", "Junho", "Julho", "Agosto",
  "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const mesAtual = meses[new Date().getMonth()];

  res.innerHTML = `<hr><h2>Resumo de Colheita Mensal</h2><hr>
                    <p>Total de Plantações Cadastradas: ${plantacoes.length}</p>
                    <p>Colheitas para o mês de ${mesAtual}: </p>`;

  let temcolheita = 0;

  for (let p of plantacoes) {
    let dia_colheita = new Date(p[3].split("/").reverse().join("-"));
    let mes_colheita = meses[dia_colheita.getMonth()];
    
    if (mes_colheita === mesAtual){
      res.innerHTML += `<br><p>- ${p[0]}</p>
                        <p>Semente: ${p[1]}</p>
                        <p>Colheita: ${p[3]}</p>`;
      temcolheita += 1;
    }
  }

  if (temcolheita === 0) {
    res.innerHTML += `<h4>NÃO HÁ COLHEITAS PARA ESTE MÊS!</h4>`;
  }
}


function statuscolheita() {
  let res = document.getElementById("resultado");

  let concluidas = []
  let emandamento = []
  let agendadas = []

  let hoje = new Date()

  res.innerHTML = `<hr><h2>Resumo de Colheita Mensal</h2><hr>`

  for (let p of plantacoes) {
    let dia_plantacao = new Date(p[2].split("/").reverse().join("-"));
    let dia_colheita = new Date(p[3].split("/").reverse().join("-"));

    if (dia_colheita <= hoje) {
      concluidas.push(p)
    } else if (dia_plantacao <= hoje && hoje < dia_colheita) {
      emandamento.push(p)
    } else {
      agendadas.push(p)
    }
  }

  res.innerHTML += `<p>🟢 Concluidas (${concluidas.length})</p>`
  for (let p of concluidas) {
    res.innerHTML += `<p>- ${p[0]} | Colheita: ${p[1]}</p>`
  }

  res.innerHTML += `<p>🟡 Em Andamento (${concluidas.length})</p>`
  for (let p of concluidas) {
    res.innerHTML += `<p>- ${p[0]} | Colheita: ${p[1]}</p>`
  }

  res.innerHTML += `<p>🔵 Plantios Agendados (${concluidas.length})</p>`
  for (let p of concluidas) {
    res.innerHTML += `<p>- ${p[0]} | Colheita: ${p[1]}</p>`
  }
}


function analisecolheitas() {
  let res = document.getElementById("resultado");

  res.innerHTML = `<hr><h2>Análise de Colheitas</h2><hr>
                   <p>| Próximas Colheidas (Em 7 Dias) |</p>`

  let hoje = new Date()
  let contador = 0

  for (let p of plantacoes) {
    let dia_colheita = new Date(p[3].split("/").reverse().join("-"));
    let diferenca = (dia_colheita - hoje) / (1000 * 60 * 60 * 24);

    if (0 <= diferenca && diferenca <= 7) {
      res.innerHTML += `<p>- ${p[0]} | Colheita em ${diferenca} dias</p>`
      contador += 1
    }
  }

  if (contador === 0) {
    res.innerHTML += `<p>NÃO HÁ COLHEITAS PELOS PRÓXIMOS 7 DIAS!</p>`
  }

}


function apagar() {
  let res = document.getElementById("resultado");

  if (plantacoes.length === 0) {
    res.innerHTML = "<h2>NÃO HÁ CADASTRO DE PLANTAÇÕES</h2>"
  } else {
    res.innerHTML = "<p>Escola uma plantação para apagar:</p>";

    for (let p of plantacoes) {
      res.innerHTML +=
      `<input type="radio" id="${p[0]}", name="plantacoes">
      <label for="${p[0]}">${p[0]}</label><br>`
    }

    res.innerHTML +=
    `<button type="button" id="edicao" onclick="confirmarApagar()">Apagar</button>`;
  }
}


function confirmarApagar() {
  let radioSelecionado = false;

  for (let i = 0; i < plantacoes.length; i++) {
    let p = plantacoes[i];
    const radio = document.getElementById(p[0]);

    if (radio && radio.checked) {
      radioSelecionado = true;

      // guarda antes de remover
      let letraRemovida = plantacoes[i];

      // remove
      plantacoes = plantacoes.filter(letra => letra !== letraRemovida);

      // salva
      localStorage.setItem("plantacoes", JSON.stringify(plantacoes));

      alert(`${letraRemovida[0]} deletada com sucesso!`);
      window.location.href = "../index.html";
      break;
    }
  }

  if (!radioSelecionado) {
    alert("Selecione uma das opções!");
  }
}


function limpar() {
  let resposta = confirm("Tem certeza que quer apagar os dados?");

  if (resposta) {
    // Usuário clicou OK
    localStorage.removeItem("plantacoes");
    plantacoes = [];
    document.getElementById("resultado").innerHTML = "";
    alert("Dados apagados com sucesso!");
  } else {
    // Usuário clicou Cancelar
    alert("Ação cancelada.");
  }
}