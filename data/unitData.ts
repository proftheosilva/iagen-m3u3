import type { UnitContent } from "./types";

export const unitData: UnitContent = {
  unitNumber: "Módulo 3 · Unidade 3",
  unitTitle: "Data Lake, Lakehouse e Governança: Onde o Dado Mora",
  unitSubtitle:
    "Camadas raw, silver e gold: o repositório que sustenta o RAG, a análise e o data warehouse.",
  overview:
    "Nesta unidade você aprende a organizar os dados da empresa além de simples pastas soltas. Entenda a evolução do Data Warehouse ao Lakehouse, a arquitetura Medalhão (Raw, Silver e Gold), por que o formato Parquet e o motor DuckDB mudam a velocidade das análises, como o índice do RAG nasce como produto derivado e como aplicar governança e LGPD desde a camada Silver.",
  simulatorTitle: "Simulador da Arquitetura Medalhão (Raw → Silver → Gold)",
  simulatorSubtitle:
    "Acompanhe como um arquivo bruto ganha qualidade, proteção LGPD e vira base analítica no DuckDB e fonte confiável para o RAG.",
  simulatorSteps: [
    {
      id: "raw",
      label: "1. Camada Raw (Bruta)",
      shortDesc: "Guarda o dado exatamente como chegou.",
      detail:
        "A camada Raw é imutável: preserva os arquivos originais (PDFs, CSVs, JSONs) com data de chegada, permitindo reprocessar tudo se uma regra mudar no futuro.",
      payload: `{
  "camada": "raw",
  "arquivo": "raw/2026-11/vendas_bruto.csv",
  "regra": "NUNCA_SOBRESCREVER_ORIGINAL"
}`,
    },
    {
      id: "silver",
      label: "2. Camada Silver (Limpa)",
      shortDesc: "Padroniza, limpa e mascara dados (LGPD).",
      detail:
        "Na Silver removemos duplicatas, padronizamos datas/tipos, aplicamos máscaras em CPFs/e-mails pessoais (LGPD) e gravamos em formato colunar Parquet.",
      payload: `{
  "camada": "silver",
  "formato": "Parquet",
  "mascara_lgpd": "cpf -> ***.456.789-**",
  "duplicatas_removidas": 14
}`,
    },
    {
      id: "gold",
      label: "3. Camada Gold (Negócio)",
      shortDesc: "Pronta para painéis, decisões e RAG.",
      detail:
        "A Gold entrega tabelas agregadas confiáveis e textos curados prontos para consumo direto por dashboards e pela indexação do RAG.",
      payload: `{
  "camada": "gold",
  "visao": "gold.faturamento_mensal",
  "indice_rag_derivado": "sincronizado"
}`,
    },
    {
      id: "duckdb",
      label: "4. Consulta no DuckDB",
      shortDesc: "SQL rápido direto sobre CSV e Parquet.",
      detail:
        "O DuckDB lê arquivos Parquet particionados diretamente do disco com schemas e views SQL em milissegundos, sem precisar de servidor pesado.",
      payload: `SELECT regiao, SUM(valor) AS total
FROM read_parquet('gold/vendas/*.parquet')
GROUP BY regiao;`,
    },
    {
      id: "governanca",
      label: "5. Catálogo e Linhagem",
      shortDesc: "Registra dono, contrato e origem (Lineage).",
      detail:
        "Governança registra de onde cada coluna veio (Linhagem), quem é o dono, o contrato de tipos esperados e quem tem permissão de leitura.",
      payload: `{
  "catalogo": "ativo",
  "lineage": "raw/vendas.csv -> silver/vendas.parquet -> gold.resumo",
  "acesso": "papel_analista"
}`,
    },
  ],
  concepts: [
    {
      id: "m3u3c1",
      chapter: "Capítulo 1 & 2 · Repositórios",
      title: "Do Silo de Pastas ao Data Warehouse, Data Lake e Lakehouse",
      summary:
        "Por que uma pasta comum não basta — e como o Lakehouse une o melhor dos dois mundos.",
      fromZero:
        "Uma pasta comum vira rapidamente um 'pântano de dados' onde ninguém sabe qual versão vale. O Data Warehouse organiza tabelas rígidas e confiáveis; o Data Lake aceita qualquer arquivo (PDF, CSV, imagem) barato; o Lakehouse junta a flexibilidade do Lake com a organização, transações e SQL do Warehouse.",
      inPractice:
        "Nosso projeto usa a abordagem Lakehouse enxuta: arquivos organizados em camadas no disco + DuckDB para consultas SQL rápidas.",
      attention:
        "Sem catálogo e regras mínimas, um Data Lake vira apenas um depósito caótico de arquivos duplicados.",
      keyTakeaway:
        "Lakehouse une armazenamento flexível em arquivos abertos com confiabilidade de banco analítico.",
    },
    {
      id: "m3u3c2",
      chapter: "Capítulo 3 · Arquitetura Medalhão",
      title: "As Camadas Raw, Silver e Gold",
      summary:
        "A esteira progressiva que transforma dado bruto em informação de confiança.",
      fromZero:
        "Pense na cozinha de um restaurante: a Raw é o estoque com as caixas fechadas exatamente como chegaram do fornecedor; a Silver são os ingredientes lavados, descascados e porcionados; a Gold é o prato pronto servido na mesa.",
      inPractice:
        "Se um cálculo na Gold estiver errado, você não precisa pedir os arquivos de volta aos clientes — basta corrigir a regra e reprocessar a partir da Raw.",
      attention:
        "Nunca misture dados crus com dados tratados na mesma pasta; manter as fronteiras claras evita decisões com lixo.",
      keyTakeaway:
        "Raw preserva o histórico; Silver limpa e padroniza; Gold entrega valor pronto para o negócio.",
    },
    {
      id: "m3u3c3",
      chapter: "Capítulo 4 · Formatos",
      title: "CSV vs. JSON vs. Parquet",
      summary:
        "Por que o formato colunar Parquet acelera consultas e economiza espaço.",
      fromZero:
        "CSV e JSON guardam dados linha por linha (ótimos para humanos lerem, mas lentos e pesados em grandes volumes — além de o CSV perder tipos de dados como data ou número). O Parquet guarda por colunas, compactado e com tipos garantidos.",
      inPractice:
        "Se uma tabela tem 50 colunas e você quer somar apenas a coluna `valor`, o Parquet lê só a coluna `valor` sem abrir as outras 49 — ficando dezenas de vezes mais rápido.",
      attention:
        "CSV é ótimo para troca rápida e inspeção humana, mas na Silver e Gold prefira Parquet.",
      keyTakeaway:
        "Parquet reduz espaço em disco, preserva tipos e multiplica a velocidade de consultas analíticas.",
    },
    {
      id: "m3u3c4",
      chapter: "Capítulo 5 · DuckDB",
      title: "DuckDB: O Motor Analítico que Lê Arquivos Direto com SQL",
      summary:
        "Schemas, views e consultas analíticas sem infraestrutura complexa.",
      fromZero:
        "O DuckDB é como o 'SQLite das análises': roda dentro do seu próprio Python/terminal sem precisar instalar servidor de banco gigante, mas faz agregações em milhões de linhas em segundos.",
      inPractice:
        "Com views no DuckDB, analistas consultam pastas inteiras de arquivos CSV e Parquet usando SQL padrão de forma transparente.",
      attention:
        "DuckDB é feito para análise rápida (OLAP), não para substituir bancos transacionais com milhares de gravações simultâneas por segundo (OLTP).",
      keyTakeaway:
        "DuckDB + Parquet traz poder de Data Warehouse para qualquer máquina local ou pipeline enxuto.",
    },
    {
      id: "m3u3c5",
      chapter: "Capítulo 6 & 7 · Lakehouse e RAG",
      title: "Dois Planos: Por que o Índice do RAG é Derivado da Gold",
      summary:
        "Conectando o armazenamento confiável ao banco vetorial.",
      fromZero:
        "O índice vetorial (Chroma/LibSQL) NÃO é a fonte oficial da verdade — ele é uma visão derivada! A fonte oficial mora nas camadas do Lakehouse (Raw/Silver/Gold).",
      inPractice:
        "Quando documentos são limpos e validados até a Gold, geramos os vetores do RAG a partir dessa versão limpa. Se trocar o modelo de embedding amanhã, recriamos o índice vetorial a partir da Gold sem perder nada.",
      attention:
        "Tratar o banco vetorial como único lugar onde os dados existem torna impossível auditar ou trocar de embedding com segurança.",
      keyTakeaway:
        "O Lakehouse é a memória permanente da empresa; o índice vetorial do RAG é um produto derivado dele.",
    },
    {
      id: "m3u3c6",
      chapter: "Capítulo 8 · Governança Mínima",
      title: "Catálogo, Contrato de Dados e Linhagem (Lineage)",
      summary:
        "Respondendo: o que temos, o que significa e de onde veio.",
      fromZero:
        "Catálogo mínimo é o inventário de onde cada conjunto de dados mora e quem é o responsável. Contrato de dados define quais colunas são obrigatórias e seus formatos. Linhagem (Lineage) é a árvore genealógica que mostra o caminho do dado da Raw até a Gold.",
      inPractice:
        "Quando um painel mostra um número estranho, a Linhagem permite rastrear exatamente qual arquivo da Raw gerou aquele valor.",
      attention:
        "Governança não precisa de documentos burocráticos de 100 páginas — precisa de metadados vivos e contratos verificáveis.",
      keyTakeaway:
        "Catálogo, contrato e linhagem dão confiança para qualquer equipe usar os dados sem medo.",
    },
    {
      id: "m3u3c7",
      chapter: "Capítulo 9 · Privacidade e LGPD",
      title: "Classificar, Mascarar na Silver, Acesso por Papel e Retenção",
      summary:
        "Protegendo dados pessoais na prática dentro do Lakehouse.",
      fromZero:
        "Classificamos os dados (público, interno, sensível/pessoal). Na passagem para a Silver, mascaramos ou anonimizamos campos pessoais (como CPF, telefone, e-mail) que não precisam aparecer nas análises.",
      inPractice:
        "Aplicamos acesso por papel (nem todo mundo precisa ver a Raw completa) e regras de retenção e exclusão para cumprir pedidos de remoção previstos na LGPD.",
      attention:
        "Nunca leve dados pessoais sensíveis sem máscara para o índice público do RAG usado por toda a empresa.",
      keyTakeaway:
        "Mascarar dados pessoais na camada Silver protege toda a cadeia analítica e o RAG.",
    },
    {
      id: "m3u3c8",
      chapter: "Capítulo 10–12 · Qualidade e Próximo Passo",
      title: "Testes de Qualidade, Particionamento e Introdução ao dbt",
      summary:
        "Detectando problemas silenciosos antes da entrega e preparando a Unidade 4.",
      fromZero:
        "Testes automáticos checam se há valores nulos proibidos, IDs duplicados ou datas impossíveis (problemas que um CSV comum deixa passar quieto!). Já o particionamento divide arquivos grandes em subpastas por ano/mês para acelerar leituras.",
      inPractice:
        "Na Unidade 4, usaremos o **dbt** (Data Build Tool) junto com o DuckDB para transformar modelos SQL e rodar testes automáticos como software profissional.",
      attention:
        "Um único arquivo gigante sem particionamento torna cada leitura lenta e custosa conforme os meses passam.",
      keyTakeaway:
        "Qualidade testada + particionamento em Parquet preparam o terreno para pipelines profissionais com dbt.",
    },
  ],
  quiz: [
    {
      id: 1,
      question: "Na arquitetura Medalhão, qual é o papel principal da camada Raw?",
      options: [
        "Apagar os arquivos antigos imediatamente.",
        "Guardar os dados brutos exatamente como chegaram, de forma imutável, permitindo reprocessamentos futuros.",
        "Exibir gráficos coloridos para a diretoria.",
        "Mascarar todas as datas e números.",
      ],
      correctIndex: 1,
      explanation:
        "A camada Raw preserva a fonte original intocada para auditoria e reprocessamento caso regras de negócio mudem.",
    },
    {
      id: 2,
      question: "O que acontece na camada Silver?",
      options: [
        "Os dados são limpos, padronizados, deduplicados e recebem mascaramento LGPD.",
        "Os arquivos são convertidos em áudio.",
        "Nenhuma regra é aplicada.",
        "Os dados são publicados sem filtro na internet.",
      ],
      correctIndex: 0,
      explanation:
        "A Silver transforma o dado bruto da Raw em uma base limpa, tipada e segura.",
    },
    {
      id: 3,
      question: "Por que o formato Parquet costuma vencer o CSV nas camadas Silver e Gold?",
      options: [
        "Porque é mais fácil de abrir no Bloco de Notas.",
        "Porque armazena por colunas, é compactado, preserva tipos de dados e acelera consultas analíticas.",
        "Porque impede o uso de SQL.",
        "Porque apaga colunas automaticamente.",
      ],
      correctIndex: 1,
      explanation:
        "Leitura colunar permite consultar apenas as colunas necessárias com alta compressão e tipagem forte.",
    },
    {
      id: 4,
      question: "Qual é o papel do DuckDB nesta arquitetura?",
      options: [
        "Executar consultas SQL analíticas rápidas diretamente sobre arquivos CSV e Parquet sem servidor pesado.",
        "Substituir o navegador Google Chrome.",
        "Criar apresentações de slides.",
        "Enviar mensagens de WhatsApp.",
      ],
      correctIndex: 0,
      explanation:
        "O DuckDB traz velocidade de Data Warehouse embarcada direto sobre arquivos abertos do Lakehouse.",
    },
    {
      id: 5,
      question: "Por que dizemos que 'o índice vetorial do RAG é derivado'?",
      options: [
        "Porque ele nasce a partir dos dados curados do Lakehouse (Silver/Gold), que continua sendo a fonte oficial.",
        "Porque ele não precisa de texto nenhum.",
        "Porque é proibido atualizar os documentos.",
        "Porque funciona apenas com números primos.",
      ],
      correctIndex: 0,
      explanation:
        "Se precisarmos trocar o modelo de embedding ou o chunking, reconstruímos o índice a partir do Lakehouse.",
    },
    {
      id: 6,
      question: "O que significa 'Linhagem' (Lineage) na governança de dados?",
      options: [
        "O tamanho da fonte usada nas planilhas.",
        "O rastreamento do caminho percorrido pelo dado desde a origem (Raw) até os relatórios e modelos finais (Gold).",
        "A velocidade da internet do escritório.",
        "O número de linhas vazias de um arquivo.",
      ],
      correctIndex: 1,
      explanation:
        "Linhagem permite auditar exatamente de onde surgiu cada número ou informação usada pela empresa e pela IA.",
    },
    {
      id: 7,
      question: "Em qual camada devemos aplicar o mascaramento de dados pessoais (LGPD) antes de liberar para análises e RAG?",
      options: [
        "Na passagem para a camada Silver.",
        "Apenas depois de vazar na internet.",
        "Nunca devemos mascarar dados.",
        "Somente no título da apresentação.",
      ],
      correctIndex: 0,
      explanation:
        "Mascarar na Silver garante que Gold, painéis e RAG já recebam apenas dados protegidos conforme o papel de acesso.",
    },
    {
      id: 8,
      question: "Para que serve um 'Contrato de Dados'?",
      options: [
        "Para definir o formato esperado, colunas obrigatórias, tipos e regras de qualidade entre quem produz e quem consome o dado.",
        "Para alugar computadores por hora.",
        "Para impedir o uso de arquivos Parquet.",
        "Para apagar logs antigos.",
      ],
      correctIndex: 0,
      explanation:
        "Contratos evitam que mudanças inesperadas na origem quebrem silenciosamente relatórios e pipelines.",
    },
    {
      id: 9,
      question: "Por que particionar arquivos Parquet (por exemplo, por ano e mês)?",
      options: [
        "Para ler apenas as pastas das datas desejadas, evitando varrer anos inteiros de histórico.",
        "Para deixar o disco mais lento.",
        "Para esconder arquivos do DuckDB.",
        "Porque arquivos Parquet têm limite de 10 linhas.",
      ],
      correctIndex: 0,
      explanation:
        "O particionamento reduz drasticamente a quantidade de dados lidos em consultas filtradas por tempo ou região.",
    },
    {
      id: 10,
      question: "Qual ferramenta é introduzida ao final da Unidade 3 para gerenciar transformações SQL e testes como software?",
      options: [
        "dbt (Data Build Tool)",
        "Paint",
        "Calculadora do Windows",
        "WinRAR",
      ],
      correctIndex: 0,
      explanation:
        "Na Unidade 4, o dbt se une ao DuckDB para organizar modelos da camada Gold e rodar testes automatizados.",
    },
  ],
  memoryPairs: [
    {
      id: "m3u3m1",
      term: "Camada Raw",
      definition: "Repositório imutável dos dados brutos exatamente como chegaram.",
    },
    {
      id: "m3u3m2",
      term: "Camada Silver",
      definition: "Dados limpos, tipados, sem duplicatas e com máscaras LGPD.",
    },
    {
      id: "m3u3m3",
      term: "Camada Gold",
      definition: "Dados prontos para negócio, painéis analíticos e derivação do RAG.",
    },
    {
      id: "m3u3m4",
      term: "Formato Parquet",
      definition: "Armazenamento colunar compactado que acelera leituras analíticas.",
    },
    {
      id: "m3u3m5",
      term: "DuckDB",
      definition: "Motor SQL analítico embutido que consulta CSV e Parquet rápido.",
    },
    {
      id: "m3u3m6",
      term: "Linhagem (Lineage)",
      definition: "Rastro completo da origem do dado até sua entrega final.",
    },
  ],
};
