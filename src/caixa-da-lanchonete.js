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
        valorTotal += cardapioItem.price * itemQuantity;
      } else {
        return "com carrinho vazio";
      }

      // verifica a quantidade de itens
      if (itemQuantity <= 0) {
        return "Quantidade Inválida";
      } else if (itens === "") {
        return "Item inválido";
      }
    }

    //verifica a forma de pagamento e adiciona desconto ou acrescimo
    if (formaDePagamento.toLowerCase() === "dinheiro" && valorTotal > 0) {
      valorTotal = valorTotal * 0.95;
    } else if (formaDePagamento.toLowerCase() === "debito" && valorTotal > 0) {
      valorTotal = valorTotal;
    } else if (formaDePagamento.toLowerCase() === "credito" && valorTotal > 0) {
      valorTotal = valorTotal * 1.03;
    }
    return "R$ " + valorTotal.toFixed(2).replace(".", ",");
  }
}

export { CaixaDaLanchonete };

const caixa = new CaixaDaLanchonete();

console.log(caixa.calcularValorDaCompra("debito", ["cafe,5", "salgado,1"]));
