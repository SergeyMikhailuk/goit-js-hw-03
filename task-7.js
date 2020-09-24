const Transaction = {
  DEPOSIT: "deposit",
  WITHDRAW: "withdraw",
};
const account = {
  balance: 0,
  transactions: [],
  createTransaction(amount, type) {
    let id = this.transactions.length + 1;
    return { id, amount, type };
  },
  deposit(amount) {
    this.balance += amount;
    const currentTransaction = this.createTransaction(
      amount,
      Transaction.DEPOSIT
    );
    this.transactions.push(currentTransaction);
  },
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
  getBalance() {
    return this.balance;
  },
  getTransactionDetails(id) {
    for (const transaction of this.transactions) {
      if (transaction.id === id) {
        return transaction;
      }
    }
  },
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
