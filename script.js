const tabuleiro = document.getElementById('tabuleiro');
const pecas = {
  peao: 'peao',
  bispo: 'bispo'
};

let casaSelecionada = null;

function criarTabuleiro() {
  for (let linha = 0; linha < 8; linha++) {
    for (let coluna = 0; coluna < 8; coluna++) {
      const casa = document.createElement('div');
      casa.classList.add('casa');
      casa.classList.add((linha + coluna) % 2 === 0 ? 'clara' : 'escura');
      casa.dataset.linha = linha;
      casa.dataset.coluna = coluna;
      tabuleiro.appendChild(casa);
    }
  }

  // Coloca apenas 1 peão e 1 bispo em posições iniciais
  const casas = document.querySelectorAll('.casa');
  const casaPeao = [...casas].find(c => c.dataset.linha == 6 && c.dataset.coluna == 3);
  const casaBispo = [...casas].find(c => c.dataset.linha == 7 && c.dataset.coluna == 2);
  if (casaPeao) casaPeao.textContent = pecas.peao;
  if (casaBispo) casaBispo.textContent = pecas.bispo;
}

function movimentoValidoBispo(deLinha, deColuna, paraLinha, paraColuna) {
  return Math.abs(deLinha - paraLinha) === Math.abs(deColuna - paraColuna);
}

function movimentoValidoPeao(deLinha, deColuna, paraLinha, paraColuna) {
  return deColuna === paraColuna && deLinha - 1 === paraLinha;
}

tabuleiro.addEventListener('click', (e) => {
  const casa = e.target;
  if (!casa.classList.contains('casa')) return;

  if (casaSelecionada) {
    const peca = casaSelecionada.textContent;
    const deLinha = parseInt(casaSelecionada.dataset.linha);
    const deColuna = parseInt(casaSelecionada.dataset.coluna);
    const paraLinha = parseInt(casa.dataset.linha);
    const paraColuna = parseInt(casa.dataset.coluna);

    let movimentoValido = false;

    if (peca === pecas.peao) {
      movimentoValido = movimentoValidoPeao(deLinha, deColuna, paraLinha, paraColuna);
    } else if (peca === pecas.bispo) {
      movimentoValido = movimentoValidoBispo(deLinha, deColuna, paraLinha, paraColuna);
    }

    if (movimentoValido && casa.textContent === '') {
      casa.textContent = peca;
      casaSelecionada.textContent = '';
    }

    casaSelecionada.classList.remove('selecionada');
    casaSelecionada = null;
  } else if (casa.textContent !== '') {
    casaSelecionada = casa;
    casaSelecionada.classList.add('selecionada');
  }
});

criarTabuleiro();