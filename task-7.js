const Transaction = {
  DEPOSIT: "deposit",
  WITHDRAW: "withdraw",
};
const account = {
  // Текущий баланс счета
  balance: 0,
  // История транзакций,Каждая транзакция это объект со свойствами: id, type и amount
  transactions: [],
  //  * Метод создает и возвращает объект транзакции. Принимает сумму и тип транзакции.
  createTransaction(amount, type) {
    let id = this.transactions.length + 1;
    return { id, amount, type };
  },
  //  Метод отвечающий за добавление суммы к балансу.
  //  Принимает сумму танзакции.
  //  Вызывает createTransaction для создания объекта транзакции
  //  после чего добавляет его в историю транзакций
  deposit(amount) {
    this.balance += amount;
    const currentTransaction = this.createTransaction(
      amount,
      Transaction.DEPOSIT
    );
    this.transactions.push(currentTransaction);
  },
  //  * Метод отвечающий за снятие суммы с баланса.
  //  * Принимает сумму танзакции.
  //  * Вызывает createTransaction для создания объекта транзакции
  //  * после чего добавляет его в историю транзакций.
  //  * Если amount больше чем текущий баланс, выводи сообщение
  //  * о том, что снятие такой суммы не возможно, недостаточно средств.
  withdraw(amount) {
    const currentTransaction = this.createTransaction(
      amount,
      Transaction.WITHDRAW
    );
    this.transactions.push(currentTransaction);

    if (amount <= this.balance) {
      this.balance -= amount;
      return;
    }
    return "снятие такой суммы не возможно, недостаточно средств.";
  },
  //  * Метод возвращает текущий баланс
  getBalance() {
    return this.balance;
  },
  //  * Метод ищет и возвращает объект транзации по id
  getTransactionDetails(id) {
    for (const transaction of this.transactions) {
      if (transaction.id === id) {
        return transaction;
      }
    }
  },
  //  * Метод возвращает количество средств
  //  * определенного типа транзакции из всей истории транзакций
  getTransactionTotal(type) {
    let totalSumOfTransaction = 0;
    for (let i = 0; i < this.transactions.length; i++) {
      if (this.transactions[i].type === type) {
        totalSumOfTransaction += this.transactions[i].amount;
      }
    }
    return totalSumOfTransaction;
  },
};

account.deposit(1000);
account.deposit(500);
account.deposit(700);
account.withdraw(150);
account.withdraw(80);
account.withdraw(30);
console.table(account.transactions);

console.log(`Текущий баланс: ${account.getBalance()}`);
console.log(account.getTransactionDetails(3));
console.log(account.getTransactionDetails(4));
console.log(`Сумма снятий: ${[account.getTransactionTotal("withdraw")]}`);
console.log(`Сумма депозитов: ${[account.getTransactionTotal("deposit")]}`);
