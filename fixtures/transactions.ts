export const transactions = {
  income: {
    description: `Receita QA ${Date.now()}`,
    value: '1000',
    category: 'Salário',
    type: 'Receita',
  },

  expense: {
    description: `Despesa QA ${Date.now()}`,
    value: '150',
    category: 'Alimentação',
    type: 'Despesa',
  },

  decimalIncome: {
    description: `Receita Decimal QA ${Date.now()}`,
    value: '99.99',
    category: 'Salário',
    type: 'Receita',
  },

  decimalExpense: {
    description: `Despesa Decimal QA ${Date.now()}`,
    value: '33.33',
    category: 'Alimentação',
    type: 'Despesa',
  },

  invalidZero: {
    description: `Transacao Zero QA ${Date.now()}`,
    value: '0',
    category: 'Alimentação',
    type: 'Despesa',
  },

  invalidNegative: {
    description: `Transacao Negativa QA ${Date.now()}`,
    value: '-50',
    category: 'Alimentação',
    type: 'Despesa',
  },
};