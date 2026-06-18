export const users = {
  free: {
    email: process.env.FREE_USER_EMAIL || '',
    password: process.env.FREE_USER_PASSWORD || '',
  },

  pro: {
    email: process.env.PRO_USER_EMAIL || '',
    password: process.env.PRO_USER_PASSWORD || '',
  },

  financial: {
    email: process.env.FINANCIAL_USER_EMAIL || process.env.PRO_USER_EMAIL || '',
    password: process.env.FINANCIAL_USER_PASSWORD || process.env.PRO_USER_PASSWORD || '',
  },

  csv: {
    email: process.env.CSV_USER_EMAIL || process.env.PRO_USER_EMAIL || '',
    password: process.env.CSV_USER_PASSWORD || process.env.PRO_USER_PASSWORD || '',
  },

  invalid: {
    email: process.env.PRO_USER_EMAIL || '',
    password: process.env.INVALID_PASSWORD || 'SenhaErrada@123',
  },
};