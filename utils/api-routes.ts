const apiBasePath = process.env.API_BASE_PATH || '/api';

export const apiRoutes = {
  goals: `${apiBasePath}/goals`,
  imports: `${apiBasePath}/imports`,
  recurrences: `${apiBasePath}/recurrences`,
};