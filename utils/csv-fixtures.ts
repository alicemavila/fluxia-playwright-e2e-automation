import fs from 'fs';
import path from 'path';

type CsvTransaction = {
  data: string;
  descricao: string;
  valor: string;
  tipo: 'Receita' | 'Despesa';
  categoria: string;
};

function ensureCsvOutputDir() {
  const outputDir = path.join(process.cwd(), 'test-results', 'csv-data');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  return outputDir;
}

export function createCsvFile(fileName: string, rows: CsvTransaction[]) {
  const outputDir = ensureCsvOutputDir();
  const filePath = path.join(outputDir, fileName);

  const header = 'data,descricao,valor,tipo,categoria';

  const content = [
    header,
    ...rows.map((row) =>
      [
        row.data,
        row.descricao,
        row.valor,
        row.tipo,
        row.categoria,
      ].join(',')
    ),
  ].join('\n');

  fs.writeFileSync(filePath, content, 'utf-8');

  return filePath;
}

export function createValidSmallCsv() {
  const runId = Date.now();

  const rows: CsvTransaction[] = [
    {
      data: '2026-06-01',
      descricao: `Receita CSV QA ${runId}`,
      valor: '500.00',
      tipo: 'Receita',
      categoria: 'Salário',
    },
    {
      data: '2026-06-02',
      descricao: `Despesa CSV QA ${runId}`,
      valor: '120.00',
      tipo: 'Despesa',
      categoria: 'Alimentação',
    },
  ];

  return {
    filePath: createCsvFile(`csv-valido-${runId}.csv`, rows),
    rows,
    expectedIncome: 500,
    expectedExpense: 120,
    expectedBalance: 380,
  };
}

export function createValidFullCsv() {
  const runId = Date.now();

  const rows: CsvTransaction[] = [
    {
      data: '2026-06-01',
      descricao: `Receita 1 CSV QA ${runId}`,
      valor: '500.00',
      tipo: 'Receita',
      categoria: 'Salário',
    },
    {
      data: '2026-06-02',
      descricao: `Receita 2 CSV QA ${runId}`,
      valor: '200.00',
      tipo: 'Receita',
      categoria: 'Salário',
    },
    {
      data: '2026-06-03',
      descricao: `Receita 3 CSV QA ${runId}`,
      valor: '100.00',
      tipo: 'Receita',
      categoria: 'Salário',
    },
    {
      data: '2026-06-04',
      descricao: `Despesa 1 CSV QA ${runId}`,
      valor: '120.00',
      tipo: 'Despesa',
      categoria: 'Alimentação',
    },
    {
      data: '2026-06-05',
      descricao: `Despesa 2 CSV QA ${runId}`,
      valor: '80.00',
      tipo: 'Despesa',
      categoria: 'Transporte',
    },
  ];

  return {
    filePath: createCsvFile(`csv-completo-${runId}.csv`, rows),
    rows,
    expectedIncome: 800,
    expectedExpense: 200,
    expectedBalance: 600,
  };
}