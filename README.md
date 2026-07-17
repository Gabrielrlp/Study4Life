<div align="center">

<img src="public/Study_4Life-removebg-preview.png" alt="Study 4Life" width="180"/>

# 📚 Study 4Life

**Plataforma de estudos gamificada para estudantes do Ensino Médio**

[![Python](https://img.shields.io/badge/Python-3.x-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-3.1-000000?logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-2.0-D71F00)](https://www.sqlalchemy.org/)
[![Gemini API](https://img.shields.io/badge/Google%20Gemini-IA-4285F4?logo=google&logoColor=white)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/Licença-MIT-yellow.svg)](LICENSE)

[Acessar o site](https://study-4life.onrender.com) · [Reportar bug](../../issues) · [Sugerir feature](../../issues)

</div>

## 📖 Sobre o projeto

**Study 4Life** é uma plataforma web de estudos para estudantes, com conteúdo organizado por matéria, sistema de quizzes, missões diárias, ranking entre alunos e um assistente de IA (StudyChat.IA) para tirar dúvidas. A ideia é unir conteúdo de qualidade com elementos de gamificação — XP, níveis, missões e ranking — para manter o aluno engajado nos estudos.

O projeto também conta com uma central de ajuda própria, com um modelo de Machine Learning (Naive Bayes) treinado para responder dúvidas frequentes sobre o uso da plataforma.

## ✨ Funcionalidades

### 🎓 Para o aluno
- Cadastro e login de aluno e de professor
- Catálogo de conteúdo organizado por matéria: Matemática, Português, Biologia, Química, Física, Geografia, História, Filosofia, Redação, Línguas, Tecnologia, Ciências e Outros
- Banco de perguntas e quizzes por matéria, com XP por acerto
- Sistema de **XP e Níveis**
- **Missões diárias**, concluídas manualmente ou automaticamente por eventos (ex: estudar 30 minutos, concluir um quiz, favoritar conteúdo)
- **Ranking** geral entre os alunos
- Perfil personalizável com avatar
- **Modo Foco** com cronômetro de estudo (play/pause/reset)
- Contador de tempo total estudado
- Histórico de conteúdos acessados, favoritos e concluídos
- **StudyChat.IA** — assistente de estudos com IA (Google Gemini)
- Central de Ajuda com chatbot próprio (Machine Learning) para dúvidas sobre a plataforma

### 👨‍🏫 Para o professor
- Cadastro e login próprios
- Termos de uso específicos para professores

## 🛠️ Tecnologias utilizadas

**Back-end**
- [Python 3](https://www.python.org/)
- [Flask](https://flask.palletsprojects.com/) — servidor web e API REST
- [Flask-CORS](https://flask-cors.readthedocs.io/) — controle de CORS
- [SQLAlchemy](https://www.sqlalchemy.org/) — ORM
- [SQLite](https://www.sqlite.org/) — banco de dados
- [scikit-learn](https://scikit-learn.org/) — classificador Naive Bayes da Central de Ajuda
- [google-genai](https://ai.google.dev/) — integração com a IA Gemini (StudyChat.IA)
- [python-dotenv](https://pypi.org/project/python-dotenv/) — variáveis de ambiente
- [Werkzeug](https://werkzeug.palletsprojects.com/) — hash de senha

**Front-end**
- HTML5, CSS3 e JavaScript puro (vanilla)
- Fetch API para comunicação com o back-end

**Deploy**
- [Railway](https://railway.app/)

## 📂 Estrutura do projeto

```
Study 4Life/
├── back-end/
│   ├── app.py                 # Rotas da API e arquivos estáticos do front-end
│   ├── banco.py                # Modelos (SQLAlchemy) e regras de negócio
│   ├── machine_learning.py     # Classificador da Central de Ajuda
│   ├── requirements.txt        # Dependências Python
│   └── study4life.db           # Banco de dados SQLite
│
└── public/                     # Front-end (servido pelo Flask)
    ├── index.html
    ├── indexHome.html
    ├── indexLogaluno.html / indexLogProf.html
    ├── cadastro-aluno.html / cadastro-prof.html
    ├── indexQuiz.html / quiz*.html         # Quizzes por matéria
    ├── indexCatalogo*.html                 # Catálogo por matéria
    ├── indexPerguntas*.html                # Banco de perguntas por matéria
    ├── indexPerfil.html / indexRanking.html
    ├── indexFoco.html / indexFavoritos.html / indexHistorico.html / indexConcluidos.html
    ├── indexChatIA.html / indexSuporte.html
    ├── script*.js / style*.css
    └── assets (imagens, ícones, fontes)
```

## 🚀 Como rodar localmente

### Pré-requisitos
- Python 3.10+ instalado
- Uma chave de API do [Google Gemini](https://ai.google.dev/)

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/study4life.git
cd "Study 4Life"

# 2. Crie e ative um ambiente virtual
python -m venv venv
venv\Scripts\activate      # Windows
source venv/bin/activate   # Linux/Mac

# 3. Instale as dependências
pip install -r back-end/requirements.txt

# 4. Configure as variáveis de ambiente
# Crie um arquivo .env dentro de back-end/ com:
# GEMINI_API_KEY=sua_chave_aqui

# 5. Rode o servidor
cd back-end
python app.py
```

A aplicação sobe em `http://127.0.0.1:5000` — o Flask serve tanto a API quanto as páginas do front-end a partir dessa mesma porta.

## 🔑 Variáveis de ambiente

| Variável         | Descrição                                  |
|------------------|---------------------------------------------|
| `GEMINI_API_KEY` | Chave de API do Google Gemini (StudyChat.IA)|
| `PORT`           | Porta do servidor (definida automaticamente em produção pelo Railway) |

## 🌐 Deploy

O projeto está hospedado no **Railway** como um único serviço Flask, que serve tanto a API quanto os arquivos estáticos do front-end (pasta `public/`) — evitando problemas de CORS entre domínios diferentes.

🔗 **Acesse:** [study-4life-production-c3a4.up.railway.app](https://study-4life-production-c3a4.up.railway.app)

## 📡 Principais rotas da API

| Método | Rota                          | Descrição                                  |
|--------|--------------------------------|---------------------------------------------|
| POST   | `/cadastro`                    | Cadastra um novo aluno                      |
| POST   | `/login`                       | Autentica um aluno                          |
| GET    | `/perfil/<usuario_id>`         | Retorna os dados de perfil do aluno         |
| POST   | `/tempo`                       | Atualiza o tempo total de estudo            |
| POST   | `/quiz/xp`                     | Concede XP por quiz respondido              |
| GET    | `/missoes/<usuario_id>`        | Lista as missões diárias do aluno           |
| POST   | `/missoes/concluir`            | Conclui uma missão manualmente              |
| POST   | `/missao/evento`               | Conclui uma missão automaticamente por evento |
| POST   | `/avatar`                      | Atualiza o avatar do aluno                  |
| GET    | `/ranking`                     | Retorna o ranking geral de alunos           |
| POST   | `/ajuda`                       | Envia pergunta para a Central de Ajuda (ML) |
| POST   | `/chat-ia`                     | Envia pergunta para o StudyChat.IA (Gemini) |
| GET    | `/historico-chat-ia/<usuario_id>` | Histórico de conversas com o StudyChat.IA |

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/minha-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona minha feature'`)
4. Faça push para a branch (`git push origin feature/minha-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

Desenvolvido por:

- **Matheus D'Ávila** — [@matheusavila.dev](https://github.com/matheusavila-dev)
- **Gabriel Rodrigues** — [@dev.gabrielrodrigues](https://github.com/dev-gabrielrodrigues)