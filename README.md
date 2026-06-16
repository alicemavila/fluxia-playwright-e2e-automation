# Fluxia Playwright E2E Automation

Automação de testes E2E, API e regressão crítica do **Fluxia App**, utilizando **Playwright + TypeScript**.

Este projeto foi estruturado com foco em boas práticas de QA, automação incremental, reutilização de código, execução em CI/CD e priorização baseada em risco.

---

## Sobre o Projeto

O **Fluxia App** é uma aplicação de gestão financeira pessoal que permite ao usuário controlar receitas, despesas, categorias, metas financeiras, recorrências, importação de extratos CSV, exportação de relatórios e acompanhamento de indicadores financeiros em dashboard.

A automação deste repositório foi planejada com base em documentação de QA em nível produção, contemplando:

* Plano de Testes;
* Casos de Teste BDD/Gherkin;
* Matriz de Rastreabilidade;
* Matriz de Riscos;
* Estratégia de Automação;
* Priorização de cenários críticos;
* Execução em pipeline CI/CD.

---

## Objetivo da Automação

O objetivo deste projeto é automatizar os principais fluxos críticos do Fluxia App, reduzindo o esforço de regressão manual e aumentando a confiabilidade das entregas.

A automação será evolutiva e baseada em risco, iniciando pelos cenários de maior impacto para o negócio.

### Principais objetivos

* Validar autenticação, sessão e logout;
* Garantir integridade dos cálculos financeiros;
* Validar criação, edição e exclusão de transações;
* Verificar atualização correta do dashboard;
* Validar permissões entre usuários Free e PRO;
* Automatizar fluxos críticos de importação CSV;
* Apoiar regressão crítica em ciclos ágeis;
* Gerar evidências automáticas de execução;
* Executar testes via GitHub Actions.

---

## Stack Utilizada

| Tecnologia                    | Uso                                    |
| ----------------------------- | -------------------------------------- |
| Playwright                    | Automação E2E Web, API e cross-browser |
| TypeScript                    | Linguagem principal dos testes         |
| Node.js                       | Ambiente de execução                   |
| dotenv                        | Gerenciamento de variáveis de ambiente |
| GitHub Actions                | Pipeline CI/CD                         |
| HTML Report                   | Relatório de execução dos testes       |
| Screenshots / Videos / Traces | Evidências automáticas em falhas       |

---

## Estratégia de Automação

A automação foi definida com base em priorização por risco.

Não é objetivo automatizar 100% dos casos de teste no primeiro ciclo. A estratégia adotada é iniciar por uma suíte pequena, estável e de alto valor, evoluindo gradualmente para uma regressão mais ampla.

### Priorização

| Prioridade | Descrição                                                         |
| ---------- | ----------------------------------------------------------------- |
| P1         | Cenários críticos para smoke e regressão essencial                |
| P2         | Cenários importantes para evolução da cobertura automatizada      |
| Parcial    | Cenários com parte automatizável e parte manual                   |
| Manual     | Cenários que dependem de validação humana, visual ou exploratória |

### Tags utilizadas

| Tag                | Significado                               |
| ------------------ | ----------------------------------------- |
| `@smoke`           | Cenários essenciais para validação rápida |
| `@automacao_p1`    | Automação prioritária                     |
| `@automacao_p2`    | Automação evolutiva                       |
| `@auth`            | Cenários de autenticação                  |
| `@dashboard`       | Cenários do dashboard financeiro          |
| `@transacoes`      | Cenários de transações                    |
| `@permissao`       | Cenários Free/PRO                         |
| `@csv`             | Cenários de importação de CSV             |
| `@api`             | Cenários de API                           |
| `@a11y`            | Cenários de acessibilidade básica         |
| `@compatibilidade` | Cenários cross-browser ou responsivos     |

---

## Cenários Prioritários

A primeira fase da automação contempla os cenários de autenticação e sessão.

| CT     | Cenário                                                  | Prioridade |
| ------ | -------------------------------------------------------- | ---------- |
| CT-009 | Login com credenciais válidas                            | P1         |
| CT-010 | Login com senha inválida                                 | P1         |
| CT-013 | Logout encerra sessão autenticada                        | P1         |
| CT-014 | Sessão expirada redireciona para login                   | P1         |
| CT-100 | Bloquear acesso direto a rota protegida sem autenticação | P1         |

As próximas fases contemplam:

* transações;
* dashboard financeiro;
* cálculos com valores decimais;
* permissões Free/PRO;
* importação CSV;
* segurança funcional;
* API;
* compatibilidade responsiva.

---

## Estrutura do Projeto

```text
fluxia-playwright-e2e-automation/
│
├── tests/
│   ├── auth/
│   ├── dashboard/
│   ├── transactions/
│   ├── permissions/
│   ├── csv/
│   └── api/
│
├── pages/
│   ├── LoginPage.ts
│   ├── DashboardPage.ts
│   ├── TransactionsPage.ts
│   └── BasePage.ts
│
├── fixtures/
│   ├── users.ts
│   └── transactions.ts
│
├── data/
│   └── csv/
│
├── utils/
│   ├── routes.ts
│   └── test-data.ts
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── playwright.config.ts
├── tsconfig.json
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

* Node.js 20 ou superior;
* npm;
* Git;
* VSCode ou outro editor de preferência.

Para verificar as versões:

```bash
node -v
npm -v
git --version
```

---

## Como Clonar o Projeto

```bash
git clone https://github.com/alicemavila/fluxia-playwright-e2e-automation.git
```

Acesse a pasta do projeto:

```bash
cd fluxia-playwright-e2e-automation
```

---

## Instalação das Dependências

```bash
npm install
```

Instale os browsers do Playwright:

```bash
npx playwright install
```

Caso esteja em ambiente Linux ou CI/CD, utilize:

```bash
npx playwright install --with-deps
```

---

## Configuração de Variáveis de Ambiente

Este projeto utiliza variáveis de ambiente para proteger dados sensíveis.

Crie um arquivo `.env` na raiz do projeto com base no arquivo `.env.example`.

### Exemplo de `.env.example`

```env
BASE_URL=https://hml.fluxia.app

FREE_USER_EMAIL=free.user@fluxia.test
FREE_USER_PASSWORD=Fluxia@12345

PRO_USER_EMAIL=pro.user@fluxia.test
PRO_USER_PASSWORD=Fluxia@12345

INVALID_PASSWORD=SenhaErrada@123
```

### Arquivo `.env`

O arquivo `.env` deve conter os dados reais do ambiente de teste/homologação.

```env
BASE_URL=https://sua-url-de-homologacao.com

FREE_USER_EMAIL=usuario_free
FREE_USER_PASSWORD=senha_free

PRO_USER_EMAIL=usuario_pro
PRO_USER_PASSWORD=senha_pro

INVALID_PASSWORD=SenhaErrada@123
```

> Importante: o arquivo `.env` não deve ser versionado no GitHub.

---

## Proteção de Dados Sensíveis

O projeto foi configurado para evitar o versionamento de dados sensíveis.

O arquivo `.gitignore` deve conter:

```gitignore
node_modules/
test-results/
playwright-report/
.env
.env.local
.env.*.local
storageState.json
*.har
*.trace
```

Nunca envie para repositório público:

* senhas reais;
* tokens;
* chaves de API;
* dados financeiros reais;
* arquivos CSV reais de clientes;
* prints com dados sensíveis;
* relatórios com informações pessoais;
* cookies ou storage state com sessão autenticada.

---

## Como Executar os Testes

Executar todos os testes:

```bash
npm test
```

Executar com navegador visível:

```bash
npm run test:headed
```

Executar em modo debug:

```bash
npm run test:debug
```

Executar apenas smoke tests:

```bash
npm run test:smoke
```

Executar apenas cenários P1:

```bash
npm run test:p1
```

Executar apenas testes de autenticação:

```bash
npm run test:auth
```

Abrir relatório HTML:

```bash
npm run test:report
```

---

## Scripts Disponíveis

```json
{
  "test": "playwright test",
  "test:headed": "playwright test --headed",
  "test:debug": "playwright test --debug",
  "test:smoke": "playwright test --grep @smoke",
  "test:p1": "playwright test --grep @automacao_p1",
  "test:auth": "playwright test tests/auth",
  "test:report": "playwright show-report"
}
```

---

## Relatórios e Evidências

O Playwright gera automaticamente evidências da execução.

As evidências incluem:

* relatório HTML;
* screenshots em falhas;
* vídeos em falhas;
* traces para investigação;
* logs de execução.

Para abrir o relatório:

```bash
npx playwright show-report
```

---

## Execução em CI/CD

Este projeto está preparado para execução no GitHub Actions.

A pipeline pode ser executada automaticamente em:

* push na branch `main`;
* pull request para `main`.

Exemplo de workflow:

```yaml
name: Playwright Tests

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  playwright-tests:
    runs-on: ubuntu-latest

    env:
      BASE_URL: ${{ secrets.BASE_URL }}
      FREE_USER_EMAIL: ${{ secrets.FREE_USER_EMAIL }}
      FREE_USER_PASSWORD: ${{ secrets.FREE_USER_PASSWORD }}
      PRO_USER_EMAIL: ${{ secrets.PRO_USER_EMAIL }}
      PRO_USER_PASSWORD: ${{ secrets.PRO_USER_PASSWORD }}
      INVALID_PASSWORD: ${{ secrets.INVALID_PASSWORD }}

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Run Playwright smoke tests
        run: npm run test:smoke

      - name: Upload Playwright report
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 7
```

---

## Secrets no GitHub Actions

Como o arquivo `.env` não deve ser enviado ao repositório, as variáveis sensíveis devem ser configuradas no GitHub.

Caminho:

```text
Settings > Secrets and variables > Actions > New repository secret
```

Secrets recomendados:

```text
BASE_URL
FREE_USER_EMAIL
FREE_USER_PASSWORD
PRO_USER_EMAIL
PRO_USER_PASSWORD
INVALID_PASSWORD
```

---

## Estratégia de Mobile

A cobertura mobile deste projeto considera **mobile responsivo web/PWA**, utilizando viewports e devices simulados pelo Playwright.

Exemplos:

* iPhone SE;
* iPhone 13;
* Pixel/Galaxy;
* tablet;
* desktop.

Appium será considerado apenas caso exista aplicativo mobile nativo Android/iOS com build instalável, como APK ou IPA.

---

## Boas Práticas Aplicadas

Este projeto utiliza boas práticas de automação, como:

* Page Object Model;
* separação entre testes, páginas, fixtures e utilitários;
* uso de variáveis de ambiente;
* não versionamento de dados sensíveis;
* testes priorizados por risco;
* execução por tags;
* evidências automáticas;
* integração com CI/CD;
* reutilização de massa de dados;
* seletores orientados à acessibilidade, como `getByRole` e `getByLabel`.

---

## Roadmap da Automação

### Fase 1 — Setup e Autenticação

* Estrutura inicial do projeto;
* Configuração do Playwright;
* Configuração de variáveis de ambiente;
* Testes de login válido;
* Testes de login inválido;
* Testes de logout;
* Bloqueio de rota protegida sem autenticação.

### Fase 2 — Transações e Dashboard

* Criar receita;
* Criar despesa;
* Validar saldo;
* Validar cálculos com decimais;
* Excluir transação;
* Validar atualização do dashboard.

### Fase 3 — Permissões Free/PRO

* Bloquear acesso de usuário Free a recurso PRO;
* Validar acesso de usuário PRO;
* Testar acesso direto por URL;
* Validar autorização por API.

### Fase 4 — Importação CSV

* Upload de CSV válido;
* Bloqueio de CSV vazio;
* Bloqueio de colunas obrigatórias ausentes;
* Confirmação da importação;
* Validação contra duplicidade.

### Fase 5 — API e Segurança

* Validar status codes;
* Validar payloads;
* Validar token inválido;
* Validar token expirado;
* Validar autorização entre usuários.

### Fase 6 — Acessibilidade e Compatibilidade

* Execução cross-browser;
* Execução em viewports mobile;
* Checks básicos de acessibilidade;
* Validação de foco, labels e navegação por teclado.

---

## Status do Projeto

Projeto em desenvolvimento.

Status atual:

* Setup inicial do Playwright;
* Estrutura base definida;
* Estratégia de automação documentada;
* Cenários P1 priorizados;
* Primeira suíte de autenticação em construção.

---

## Autora

**Alice Monteiro**
QA Engineer Freelancer

GitHub: [@alicemavila](https://github.com/alicemavila)

---

## Observação

Este projeto tem finalidade de estudo, portfólio e demonstração de práticas profissionais de QA Automation.

Os dados utilizados nos testes devem ser fictícios ou pertencentes a ambiente controlado de homologação. Nenhum dado sensível ou real deve ser versionado neste repositório.
