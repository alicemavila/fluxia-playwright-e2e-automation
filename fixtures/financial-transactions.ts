const runId = Date.now();

export const financialTransactions = {
  income1000: {
    description: `Receita 1000 QA ${runId}`,
    value: '1000',
    category: 'Salário',
    type: 'Receita',
  },

  income500: {
    description: `Receita 500 QA ${runId}`,
    value: '500',
    category: 'Salário',
    type: 'Receita',
  },

  expense250: {
    description: `Despesa 250 QA ${runId}`,
    value: '250',
    category: 'Alimentação',
    type: 'Despesa',
  },

  expense100: {
    description: `Despesa 100 QA ${runId}`,
    value: '100',
    category: 'Alimentação',
    type: 'Despesa',
  },

  decimalIncome: {
    description: `Receita Decimal QA ${runId}`,
    value: '99.99',
    category: 'Salário',
    type: 'Receita',
  },

  decimalExpense: {
    description: `Despesa Decimal QA ${runId}`,
    value: '33.33',
    category: 'Alimentação',
    type: 'Despesa',
  },

  expenseToDelete: {
    description: `Despesa Excluir QA ${runId}`,
    value: '100',
    category: 'Alimentação',
    type: 'Despesa',
  },
};