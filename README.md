# Gerador de Currículo em PDF

Aplicação full-stack que gera currículos em PDF a partir de um formulário web. O usuário preenche seus dados e faz o download do currículo formatado instantaneamente.

## Tecnologias

- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Node.js + Express + TypeScript
- **PDF**: pdfkit

## Pré-requisitos

- Node.js 18+
- npm

## Instalação

Clone o repositório e instale as dependências de cada parte:

```bash
git clone https://github.com/seu-usuario/gera-curriculo.git
cd gera-curriculo
```

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

## Como rodar

Abra dois terminais a partir da raiz do projeto.

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
```
O servidor sobe em `http://localhost:3001`.

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```
A aplicação abre em `http://localhost:5173`.

## Uso

1. Acesse `http://localhost:5173`
2. Preencha o formulário com seus dados
3. Clique em **Gerar Currículo**
4. O PDF é gerado e baixado automaticamente

## Endpoint da API

```
POST /api/generate-resume
Content-Type: application/json
```

Retorna um arquivo PDF para download.
