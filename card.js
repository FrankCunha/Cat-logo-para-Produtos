class Card extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      const title = this.getAttribute('title');
      const price = this.getAttribute('price');
      const img1 = this.getAttribute('img1');
      const img2 = this.getAttribute('img2');
      const div = document.createElement("div");

      div.innerHTML = `
           <div class="col-md-3 col-sm-6">
                  <div class="product-grid2">
                      <div class="product-image2">
                          <a href="#">
                              <img class="pic-1" src="${img1}">
                              <img class="pic-2" src="${img2}">
                          </a>
                          <ul class="social">
                              <li><a href="#" data-tip="Olhar Produto"><i class="fa fa-eye"></i></a></li>
                              <li><a href="#" data-tip="Add a lista"><i class="fa fa-shopping-bag"></i></a></li>
                              <li><a href="#" data-tip="Add ao carrinho"><i class="fa fa-shopping-cart"></i></a></li>
                          </ul>
                          <a class="add-to-cart" href="carrinho.html">Ir para o Carrinho</a>
                      </div>
                      <div class="product-content">
                          <h3 class="title"><a href="#">"${title}</a></h3>
                          <span class="price">${price}</span>
                      </div>
                  </div>
              </div>
      `;
      this.appendChild(div);
    }
  }
customElements.define("card-novo", Card);