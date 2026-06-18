const runId = Date.now();

export const apiPayloads = {
  validIncomeTransaction: {
    description: `Receita API QA ${runId}`,
    value: 1000,
    type: 'Receita',
    category: 'Salário',
    date: '2026-06-01',
  },

  validExpenseTransaction: {
    description: `Despesa API QA ${runId}`,
    value: 150,
    type: 'Despesa',
    category: 'Alimentação',
    date: '2026-06-01',
  },

  validGoal: {
    name: `Meta API QA ${runId}`,
    targetValue: 5000,
    currentValue: 0,
    deadline: '2026-12-31',
  },
};