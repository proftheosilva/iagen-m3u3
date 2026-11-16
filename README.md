# Módulo 3 · Unidade 3 — Data Lake, Lakehouse e Governança: Onde o Dado Mora

Página didática interativa de apoio aos alunos do **Curso de Formação em IA Generativa**.

## Sobre esta Unidade
Esta unidade apresenta onde os dados residem com segurança e qualidade: a evolução de Data Warehouse para Data Lake e **Lakehouse**, a arquitetura Medalhão (**Raw**, **Silver** e **Gold**), comparação entre **CSV, JSON e Parquet**, consultas analíticas com **DuckDB**, derivação do índice do RAG, catálogo mínimo, contrato de dados, linhagem (*lineage*) e privacidade/LGPD.

### Recursos da Aplicação
- **Simulador Visual Dinâmico**: Fluxo animado pelas camadas Medalhão (`Raw → Silver → Gold → DuckDB → Governança`).
- **Conteúdo Interativo**: Tópicos com explicações *Do Zero*, *Na Prática*, *Atenção / Risco* e *Ponto-chave*.
- **Quiz de Fixação**: 10 perguntas com feedback imediato e explicação.
- **Jogo da Memória**: Combinação de conceitos e definições da unidade.

## Stack Tecnológica
- **Next.js** (App Router com `output: "export"` para deploy estático)
- **Tailwind CSS**
- **Lucide React**

## Como executar localmente
```bash
npm install
npm run dev
```

## Publicação na Vercel
Importe o repositório no GitHub, selecione o diretório `MOD4/M3U3-WEB` como **Root Directory** e faça o deploy (sem necessidade de banco de dados ou variáveis de ambiente).

---
© 2026 **CucandoTI** — Todos os direitos reservados.
