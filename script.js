
/* ========================================
   MINHA LISTA
======================================== */

function carregarMinhaLista() {
  try {
    return JSON.parse(localStorage.getItem("minhaLista")) || [];
  } catch (erro) {
    return [];
  }
}

function salvarMinhaLista(lista) {
  localStorage.setItem("minhaLista", JSON.stringify(lista));
}

function atualizarBotoesMinhaLista() {
  const lista = carregarMinhaLista();
  const botoes = document.querySelectorAll(".botao-lista");

  botoes.forEach((botao) => {
    const nomeFilme = botao.dataset.filme;
    const estaNaLista = lista.includes(nomeFilme);

    botao.textContent = estaNaLista
      ? "✓ Na Minha Lista"
      : "+ Minha Lista";

    botao.classList.toggle("adicionado", estaNaLista);
  });
}

function configurarMinhaLista() {
  const botoes = document.querySelectorAll(".botao-lista");

  botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
      const nomeFilme = botao.dataset.filme;
      let lista = carregarMinhaLista();

      if (lista.includes(nomeFilme)) {
        lista = lista.filter((filme) => filme !== nomeFilme);
      } else {
        lista.push(nomeFilme);
      }

      salvarMinhaLista(lista);
      atualizarBotoesMinhaLista();
    });
  });

  atualizarBotoesMinhaLista();
}


/* ========================================
   PESQUISA DO CATÁLOGO
======================================== */

function configurarPesquisa() {
  const campoBusca = document.getElementById("campo-busca");

  if (!campoBusca) return;

  const cards = document.querySelectorAll(".card-filme");
  const mensagemVazia = document.getElementById("mensagem-vazia");

  campoBusca.addEventListener("input", () => {
    const pesquisa = campoBusca.value.toLowerCase().trim();
    let encontrados = 0;

    cards.forEach((card) => {
      const titulo = card.dataset.titulo ||
        card.querySelector(".titulo-filme").textContent.toLowerCase();

      const corresponde = titulo.includes(pesquisa);

      card.hidden = !corresponde;

      if (corresponde) {
        encontrados++;
      }
    });

    if (mensagemVazia) {
      mensagemVazia.hidden = encontrados > 0;
    }
  });
}


/* ========================================
   DETALHES DOS FILMES E SÉRIES
======================================== */

function carregarDetalhesFilme() {
  const elementoTitulo = document.getElementById("titulo-filme");

  // Se não estiver na página de detalhes, encerra a função.
  if (!elementoTitulo) return;

  const filmes = {
    "seven": {
      titulo: "Seven",
      imagem: "imagens/filme1.jpg",
      tipo: "Filme",
      informacoes: "1995 | 2h 7min | Crime / Mistério / Thriller",
      sinopse: "Dois detetives investigam uma sequência de assassinatos inspirados nos sete pecados capitais. Enquanto procuram o responsável, eles se deparam com um criminoso que parece estar sempre um passo à frente.",
      criacao: "David Fincher",
      elenco: "Brad Pitt, Morgan Freeman e Gwyneth Paltrow",
      generos: "Crime, mistério e suspense",
      imdb: "https://www.imdb.com/pt/title/tt0114369/"
    },

    "cidade-de-deus": {
      titulo: "Cidade de Deus",
      imagem: "imagens/filme2.jpg",
      tipo: "Filme",
      informacoes: "2002 | 2h 10min | Drama / Policial",
      sinopse: "Na Cidade de Deus, comunidade do Rio de Janeiro, Buscapé tenta seguir seu sonho de se tornar fotógrafo enquanto acompanha o crescimento da violência e do tráfico de drogas ao seu redor.",
      criacao: "Fernando Meirelles e Kátia Lund",
      elenco: "Alexandre Rodrigues, Leandro Firmino e Alice Braga",
      generos: "Drama e policial",
      imdb: "https://www.imdb.com/pt/title/tt0317248/"
    },

    "breaking-bad": {
      titulo: "Breaking Bad",
      imagem: "imagens/filme3.jpg",
      tipo: "Série de televisão",
      informacoes: "2008 – 2013 | 5 temporadas | Drama / Crime / Suspense",
      sinopse: "Walter White é um professor de química que recebe um diagnóstico de câncer e passa a enfrentar dificuldades financeiras. Ao lado de um antigo aluno, Jesse Pinkman, ele começa a produzir metanfetamina para garantir o futuro de sua família.",
      criacao: "Vince Gilligan",
      elenco: "Bryan Cranston, Aaron Paul e Anna Gunn",
      generos: "Drama, crime e suspense",
      imdb: "https://www.imdb.com/pt/title/tt0903747/"
    }
  };

  const parametros = new URLSearchParams(window.location.search);
  const nomeFilme = parametros.get("filme") || "breaking-bad";

  const filme = filmes[nomeFilme];

  if (!filme) {
    document.title = "Título não encontrado | LisoFLix";
    elementoTitulo.textContent = "Título não encontrado";

    document.getElementById("sinopse-filme").textContent =
      "Não encontramos esse título. Volte ao catálogo e escolha outro filme ou série.";

    document.getElementById("imagem-filme").hidden = true;
    document.getElementById("tipo-filme").hidden = true;
    document.getElementById("informacoes-filme").hidden = true;
    document.querySelector(".dados-serie").hidden = true;
    document.getElementById("link-imdb").hidden = true;

    return;
  }

  document.title = filme.titulo + " | LisoFLix";

  document.getElementById("imagem-filme").src = filme.imagem;
  document.getElementById("imagem-filme").alt = "Pôster de " + filme.titulo;
  document.getElementById("tipo-filme").textContent = filme.tipo;
  document.getElementById("titulo-filme").textContent = filme.titulo;
  document.getElementById("informacoes-filme").textContent = filme.informacoes;
  document.getElementById("sinopse-filme").textContent = filme.sinopse;
  document.getElementById("criacao-filme").textContent = filme.criacao;
  document.getElementById("elenco-filme").textContent = filme.elenco;
  document.getElementById("generos-filme").textContent = filme.generos;
  document.getElementById("link-imdb").href = filme.imdb;
}


/* ========================================
   FORMULÁRIO DE SUPORTE - WHATSAPP
======================================== */

function enviarWhatsApp(event) {
  event.preventDefault();

  const campoNome = document.getElementById("nome");
  const campoEmail = document.getElementById("email");
  const campoAssunto = document.getElementById("assunto");
  const campoMensagem = document.getElementById("mensagem");
  const aviso = document.getElementById("mensagem-formulario");

  const nome = campoNome.value.trim();
  const email = campoEmail.value.trim();
  const assunto = campoAssunto.value;
  const mensagem = campoMensagem.value.trim();

  const assuntos = {
    duvida: "Dúvida",
    sugestao: "Sugestão",
    problema: "Problema no site",
    outro: "Outro"
  };

  const telefone = "5581989188011";

  const textoFinal =
    `Olá! Meu nome é ${nome}.\n` +
    `E-mail: ${email}\n` +
    `Assunto: ${assuntos[assunto] || assunto}\n` +
    `Mensagem: ${mensagem}`;

  const textoCodificado = encodeURIComponent(textoFinal);
  const urlWhatsApp = `https://wa.me/${telefone}?text=${textoCodificado}`;

  if (aviso) {
    aviso.textContent = "Abrindo o WhatsApp para enviar sua mensagem...";
  }

  window.open(urlWhatsApp, "_blank");
}

function configurarFormulario() {
  const formulario = document.getElementById("formulario-contato");

  if (!formulario) return;

  formulario.addEventListener("submit", enviarWhatsApp);
}


/* ========================================
   INICIALIZAÇÃO
======================================== */

document.addEventListener("DOMContentLoaded", () => {
  configurarMinhaLista();
  configurarPesquisa();
  carregarDetalhesFilme();
  configurarFormulario();
});