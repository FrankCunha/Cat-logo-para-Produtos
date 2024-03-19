let Produtos = [];

        class Produto {
            constructor(nome, descrição, preço) {
                this.nome = nome;
                this.descrição = descrição;
                this.preço = preço;
            }
        }

        function funcao(Função) {
            switch (Função) {
                case 'f1':
                    AdicionarProduto();
                    break;
                case 'f2':
                    BuscarPorProduto();
                    break;
                case 'f3':
                    AtualizarProduto();
                    break;
                case 'f4':
                    ListarProdutos();
                    break;
                case 'f5':
                    ExcluirProduto();
                    break;
            }
        }

        function AdicionarProduto() {
            let nome = prompt("Digite o nome de um produto: ");
            let descrição = prompt("Digite a descrição do produto: ");
            let preço = parseInt(prompt("Digite o valor do produto: "));

            let newProduto = new Produto(nome, descrição, preço);
            Produtos.push(newProduto);
            alert("Seu produto foi adicionado com sucesso!!!");
        }

        function BuscarPorProduto() {
            let BuscarPorNome = prompt("Digite o nome do produto que você está buscando: ");
            let ProdutoAchado = Produtos.find(produto => produto.nome === BuscarPorNome);

            if (ProdutoAchado) {
                alert(ProdutoAchado.nome + " - " + ProdutoAchado.descrição + " - R$ " + ProdutoAchado.preço);
            } else {
                alert("Este Produto não foi encontrado.");
            }
        }

        function AtualizarProduto() {
            let BuscarPorNome = prompt("Digite o nome do produto que você está buscando: ");
            let ProdutoAchado = Produtos.find(produto => produto.nome === BuscarPorNome);

            if (ProdutoAchado) {
                ProdutoAchado.nome = prompt("Digite o nome do produto que você deseja atualiazar: ");
                ProdutoAchado.descrição = prompt("Digite uma nova descrição para este produto: ");
                ProdutoAchado.preço = parseInt(prompt("Digite um novo valor do produto: "));

                alert("O Produto foi atualizado com sucesso!!!");
            } else {
                alert("Este produto não foi encontrado!");
            }
        }

        function ListarProdutos() {
            let Lista = "";
            Produtos.forEach(produto => {
                Lista += produto.nome + " - " + produto.descrição + " - R$ " + produto.preço + "\n";
            });
            alert(Lista);
        }

        function ExcluirProduto() {
            let BuscarPorNome = prompt("Digite o nome do produto que você está buscando: ");
            let index = Produtos.findIndex(produto => produto.nome === BuscarPorNome);

            if (index !== -1) {
                Produtos.splice(index, 1);
                alert("O Produto foi excluído com sucesso!");
            } else {
                alert("Este produto não foi excluído, pois não foi encontrado!");
            }
        }