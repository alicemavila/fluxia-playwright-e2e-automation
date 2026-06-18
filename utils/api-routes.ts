const apiBasePath = process.env.API_BASE_PATH || '/api';

export const apiRoutes = {
  login: `${apiBasePath}/login`,
  logout: `${apiBasePath}/logout`,

  dashboard: `${apiBasePath}/dashboard`,

  transactions: `${apiBasePath}/transactions`,
  transactionById: (id: string) => `${apiBasePath}/transactions/${id}`,

  goals: `${apiBasePath}/goals`,
  goalById: (id: string) => `${apiBasePath}/goals/${id}`,

  imports: `${apiBasePath}/imports`,
  recurrences: `${apiBasePath}/recurrences`,
};