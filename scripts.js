
function abrirDetalhesProduto(produtoId) {
  window.location.href = `produto.html?id=${produtoId}`;
}


function adicionarAoCarrinho(id, nome, preco) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const produtoExistente = carrinho.find(item => item.id === id);

  if (produtoExistente) {
      produtoExistente.quantidade += 1;
  } else {
      carrinho.push({ id: id, nome: nome, preco: preco, quantidade: 1 });
  }

  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  alert('Produto adicionado ao carrinho!');
}


function carregarDetalhesProduto() {
  const params = new URLSearchParams(window.location.search);
  const produtoId = params.get('id'); 

  
  fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(data => {
          const produto = data.find(p => p.id == produtoId); 

          if (produto) {
              const detalhesContainer = document.getElementById('produto-detalhes');
              if (detalhesContainer) {
                  detalhesContainer.innerHTML = `
                      <h2>${produto.nome}</h2>
                      <img src="${produto.imagem}" alt="${produto.nome}">
                      <p>Preço: ${produto.preco}</p>
                      <p>Descrição: ${produto.descricao}</p>
                  `;

                  
                  const addToCartButton = document.getElementById('add-to-cart');
                  if (addToCartButton) {
                      addToCartButton.addEventListener('click', function () {
                          adicionarAoCarrinho(produto.id, produto.nome, produto.preco);
                      });
                  } else {
                      console.error('Botão para adicionar ao carrinho não encontrado.');
                  }
              } else {
                  console.error('Elemento de detalhes do produto não encontrado.');
              }
          } else {
              alert('Produto não encontrado!');
          }
      })
      .catch(error => console.error('Erro ao carregar o produto:', error));
}

document.addEventListener('DOMContentLoaded', function () {
  const produtosContainer = document.getElementById('lista-produtos');
  const carrinhoContainer = document.getElementById('lista-carrinho');
  const finalizarCompraButton = document.getElementById('finalizar-compra');
  const valorTotalElement = document.getElementById('valor-total');
  const freteFixo = 20;

  function carregarCarrinho() {
      if (carrinhoContainer) {
          let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
          carrinhoContainer.innerHTML = '';
          let valorTotal = 0;

          if (carrinho.length > 0) {
              carrinho.forEach(produto => {
                  const item = document.createElement('div');
                  item.classList.add('carrinho-item');
                  item.innerHTML = `
                      <h5>${produto.nome}</h5>
                      <p><strong>${produto.preco}</strong></p>
                      <p>Quantidade: 
                          <button class="btn btn-secondary btn-sm decrementar" data-id="${produto.id}">-</button> 
                          ${produto.quantidade} 
                          <button class="btn btn-secondary btn-sm incrementar" data-id="${produto.id}">+</button>
                      </p>
                      <button class="btn btn-danger remover" data-id="${produto.id}">Remover</button>
                  `;
                  carrinhoContainer.appendChild(item);

                  const preco = parseFloat(produto.preco.replace('R$ ', '').replace(',', '.'));
                  valorTotal += preco * produto.quantidade;
              });

              
              document.querySelectorAll('.incrementar').forEach(button => {
                  button.addEventListener('click', function () {
                      alterarQuantidadeProduto(this.dataset.id, 1);
                  });
              });

              document.querySelectorAll('.decrementar').forEach(button => {
                  button.addEventListener('click', function () {
                      alterarQuantidadeProduto(this.dataset.id, -1);
                  });
              });

              
              document.querySelectorAll('.remover').forEach(button => {
                  button.addEventListener('click', function () {
                      removerProduto(this.dataset.id);
                  });
              });

              
              if (valorTotalElement) {
                  const valorTotalComFrete = valorTotal + freteFixo;
                  valorTotalElement.textContent = `Total: R$ ${valorTotalComFrete.toFixed(2).replace('.', ',')} (Frete: R$ ${freteFixo.toFixed(2).replace('.', ',')})`;
              } else {
                  console.error('Elemento valor-total não encontrado.');
              }

          } else {
              carrinhoContainer.innerHTML = `<p>Seu carrinho está vazio.</p>`;
          }
      } else {
          console.error('Elemento carrinho não encontrado.');
      }
  }

  function alterarQuantidadeProduto(produtoId, delta) {
      let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
      const produto = carrinho.find(item => item.id == produtoId);

      if (produto) {
          produto.quantidade += delta;
          if (produto.quantidade <= 0) {
              removerProduto(produtoId);
          } else {
              localStorage.setItem('carrinho', JSON.stringify(carrinho));
              carregarCarrinho();
          }
      }
  }

  function removerProduto(produtoId) {
      let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
      carrinho = carrinho.filter(item => item.id != produtoId);
      localStorage.setItem('carrinho', JSON.stringify(carrinho));
      carregarCarrinho();
  }

  if (finalizarCompraButton) {
      finalizarCompraButton.addEventListener('click', function () {
          if (valorTotalElement) {
              const valorTotal = parseFloat(valorTotalElement.textContent.replace('Total: R$ ', '').replace(',', '.').split(' (')[0]);
              const urlPagamentos = `pagamentos.html?valorTotal=${valorTotal.toFixed(2)}`;
              localStorage.removeItem('carrinho'); // Limpa o carrinho
              window.location.href = urlPagamentos;
          } else {
              console.error('Elemento valor-total não encontrado na finalização da compra.');
          }
      });
  }

  function carregarPagamento() {
      const params = new URLSearchParams(window.location.search);
      const valorTotal = parseFloat(params.get('valorTotal')) || 0;

      if (valorTotalElement) {
          valorTotalElement.textContent = `Total da Compra: R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
      } else {
          console.error('Elemento valor-total não encontrado na página de pagamento.');
      }

      const formaPagamentoForm = document.getElementById('forma-pagamento');
      if (formaPagamentoForm) {
          formaPagamentoForm.addEventListener('submit', function (event) {
              event.preventDefault();
              const formaPagamento = document.querySelector('input[name="pagamento"]:checked').value;
              alert(`Pagamento confirmado via ${formaPagamento}. Agradecemos sua compra!`);
              window.location.href = 'index.html';
          });
      } else {
          console.error('Formulário de forma de pagamento não encontrado.');
      }
  }

  function carregarProdutos() {
      fetch('http://localhost:3000/products')
          .then(response => response.json())
          .then(data => {
              if (produtosContainer) {
                  const produtos = data;
                  produtos.forEach(produto => {
                      produtosContainer.innerHTML += criarCardProduto(produto);
                  });
              } else {
                  console.error('Elemento lista-produtos não encontrado.');
              }
          })
          .catch(error => console.error('Erro ao carregar os produtos:', error));
  }

  function criarCardProduto(produto) {
      return `
          <div class="col-md-3 col-sm-6">
              <img src="${produto.imagem}" class="card-img-top" alt="${produto.nome}">
              <div class="card-body">
                  <h5 class="card-title">${produto.nome}</h5>
                  <p class="card-text">${produto.preco}</p>
                  <button class="btn btn-primary" onclick="abrirDetalhesProduto(${produto.id})">Ver Detalhes</button>
              </div>
          </div>
      `;
  }

  if (window.location.pathname.includes('produto.html')) {
      carregarDetalhesProduto();
  } else if (window.location.pathname.includes('pagamentos.html')) {
      carregarPagamento();
  } else {
      carregarProdutos();
      carregarCarrinho();
  }
});


//usuario

var btnSignin = document.querySelector("#signin");
var btnSignup = document.querySelector("#signup");

var body = document.querySelector("body");


btnSignin.addEventListener("click", function () {
 body.className = "sign-in-js"; 
});

btnSignup.addEventListener("click", function () {
  body.className = "sign-up-js";
})