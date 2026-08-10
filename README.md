# 🌱 Mini Sistema de Manuseio de Plantações (Web)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6.svg?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Versão](https://img.shields.io/badge/Versão-3.5-orange)
![Status](https://img.shields.io/badge/Status-Concluído-brightgreen)

🔗 **[Demonstração](https://saulohpm.github.io/mini-sistema-plantacoes-web/index.html)**

Mini sistema web para cadastro, edição e visualização de plantações, desenvolvido com HTML, CSS e JavaScript puro (sem frameworks ou backend). Os dados são armazenados localmente no navegador via `localStorage`.

Este é o par web do [Mini Sistema de Manuseio de Plantações (CLI)](https://github.com/saulohpm/mini-sistema-plantacoes-python), mesmo domínio de negócio reimplementado como aplicação web, uma forma de praticar lógica de programação e manipulação do DOM sobre um problema já conhecido.

---

## 📷 Print de Demonstração

![Demonstração](assets/print.png)

---

## ✨ Funcionalidades

- Cadastro de plantações
- Visualização das plantações cadastradas
- Edição de dados de uma plantação
- Geração de relatórios
- Remoção de plantações individuais
- Limpeza completa dos dados armazenados
- Persistência local com `localStorage`

---

## 🛠️ Tecnologias

- HTML5
- CSS3
- JavaScript (Vanilla)
- `localStorage`

---

## 📂 Estrutura do Projeto
```bash
mini-sistema-plantacoes-web/
├── index.html
├── README.md
│
├── pages/
│ ├── cadastrar.html
│ ├── editar.html
│ ├── visualizar.html
│ ├── relatorios.html
│ └── apagar.html
│
├── js/
│ ├── main.js
│ └── utils.js
│
├── css/
│ └── style.css
│
└── assets/
└── favicon.png
```
---

## ▶️ Como Executar

**Opção 1 — Demo online:**
Acesse diretamente: https://saulohpm.github.io/mini-sistema-plantacoes-web/index.html

**Opção 2 — Localmente:**

```bash
git clone https://github.com/saulohpm/mini-sistema-plantacoes-web.git
cd mini-sistema-plantacoes-web
```

Abra o arquivo `index.html` em qualquer navegador moderno. O sistema funciona localmente e não requer servidor.

---

## 📝 Observações

- Os dados ficam salvos apenas no navegador do usuário
- A limpeza do cache do navegador remove todos os dados
- O projeto não utiliza backend nem banco de dados externo
- A arquitetura JavaScript é procedural
- Projeto desenvolvido para fins de estudo

---

## 🎯 Objetivo do Projeto

Este projeto foi desenvolvido para fins de estudo, com foco em:

- Lógica de programação em JavaScript
- Manipulação do DOM
- Estruturação básica de um sistema web usando HTML e CSS