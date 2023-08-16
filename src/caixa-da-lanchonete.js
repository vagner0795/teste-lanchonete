class CaixaDaLanchonete {
  //cardapio
  cardapio = [
    { name: "Cafe", price: 3 },
    { name: "Chantily", price: 1.5 },
    { name: "Suco Natural", price: 6.5 },
    { name: "Sanduiche", price: 6.5 },
    { name: "Queijo", price: 2 },
    { name: "Salgado", price: 7.25 },
    { name: "Combo1", price: 9.5 },
  ];

  // função que calcula o preço do cardapio
  calcularValorDaCompra(formaDePagamento, itens) {
    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    let valorTotal = 0; // variavel que armazena valor total
    let temItemPrincipal = false;
    let comprouCafe = false;
    let comprouSanduiche = false;
    let comprouChantily = false;
    let comprouQueijo = false;

    for (let i = 0; i < itens.length; i++) {
      const item = itens[i];
      const itemInfo = item.split(","); // separa uma string em 2 variaveis
      const itemName = itemInfo[0].trim(); // remove espaços no texto da string
      const itemQuantity = parseInt(itemInfo[1], 10); // converte seu primeiro argumento para uma string, analisa, e retorna um inteiro ou NaN .

      // converte o texto para letra minúcula
      const cardapioItem = this.cardapio.find(
        (menuItem) => menuItem.name.toLowerCase() === itemName.toLowerCase()
      );

      // verifica se possui item no carrinho de compras, se sim faz o calculo se não retorna que o carrinho está vazio
      if (cardapioItem) {
        //verifica a quantidade de itens
        if (itemQuantity <= 0) {
          return "Quantidade inválida!";
        }

        valorTotal += cardapioItem.price * itemQuantity;
      } else {
        return "Não há itens no carrinho de compra!";
      }
      //verifica se comprou os itens extras sem o item principal
      if (itemName === "cafe") {
        comprouCafe = true;
      } else if (itemName === "sanduiche") {
        comprouSanduiche = true;
      } else if (itemName === "chantily") {
        comprouChantily = true;
      } else if (itemName === "queijo") {
        comprouQueijo = true;
      }
      if (comprouChantily && !comprouCafe) {
        return "Item extra não pode ser pedido sem o principal";
      }

      if (comprouQueijo && !comprouSanduiche) {
        return "Item extra não pode ser pedido sem o principal";
      }
    }

    // verifica se a forma do pagamento é valida
    if (
      formaDePagamento.toLowerCase() === "dinheiro" ||
      formaDePagamento.toLowerCase() === "debito" ||
      formaDePagamento.toLowerCase() === "credito"
    ) {
      //verifica a forma de pagamento e adiciona desconto ou acrescimo
      if (formaDePagamento.toLowerCase() === "dinheiro" && valorTotal > 0) {
        valorTotal = valorTotal * 0.95;
      } else if (
        formaDePagamento.toLowerCase() === "debito" &&
        valorTotal > 0
      ) {
        valorTotal = valorTotal;
      } else if (
        formaDePagamento.toLowerCase() === "credito" &&
        valorTotal > 0
      ) {
        valorTotal = valorTotal * 1.03;
      }
    } else {
      return "Forma de pagamento inválida!";
    }

    return "R$ " + valorTotal.toFixed(2).replace(".", ",");
  }
}

export { CaixaDaLanchonete };

const caixa = new CaixaDaLanchonete();

console.log(caixa.calcularValorDaCompra("dinheiro", ["pizza, 1"]));
