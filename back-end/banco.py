from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, ForeignKey, Float
from sqlalchemy.orm import declarative_base, sessionmaker
from datetime import datetime, date, timedelta
from werkzeug.security import generate_password_hash, check_password_hash
import random

engine = create_engine(
    "sqlite:///study4life.db",
    echo=False,
    connect_args={"check_same_thread": False}
)

Base = declarative_base()
Session = sessionmaker(bind=engine)
session = Session()


MISSOES = [
    ("Estudar por 30 minutos", 40),
    ("Estudar por 1 hora", 60),
    ("Estudar por 2 horas", 120),
    ("Concluir 1 aula", 80),
    ("Responder um quiz", 50),
    ("Concluir 2 quizzes", 90),
    ("Acertar 10 perguntas", 100),
    ("Favoritar conteúdo", 35),
    ("Abrir área de foco", 30),
    ("Usar timer foco", 60),
    ("Entrar no site hoje", 20),
    ("Estudar Matemática", 70),
    ("Estudar Português", 70),
    ("Estudar Ciências", 70),
    ("Estudar Geografia", 70),
    ("Estudar Filosofia", 70),
    ("Estudar História", 70),
    ("Estudar Física", 70),
    ("Estudar Química", 70),
    ("Estudar Redação", 70),
    ("Estudar Biologia", 70),
    ("Estudar Línguas Estrangeiras", 70),
    ("Estudar Tecnologias", 70),
]

MAPA_EVENTOS_MISSOES = {
    "estudar_30_minutos": "Estudar por 30 minutos",
    "estudar_1_hora": "Estudar por 1 hora",
    "estudar_2_horas": "Estudar por 2 horas",
    "concluir_1_aula": "Concluir 1 aula",
    "responder_quiz": "Responder um quiz",
    "concluir_2_quizzes": "Concluir 2 quizzes",
    "acertar_10_perguntas": "Acertar 10 perguntas",
    "favoritar_conteudo": "Favoritar conteúdo",
    "abrir_foco": "Abrir área de foco",
    "usar_timer_foco": "Usar timer foco",
    "entrar_site": "Entrar no site hoje",
    "estudar_matematica": "Estudar Matemática",
    "estudar_portugues": "Estudar Português",
    "estudar_ciencias": "Estudar Ciências",
    "estudar_geografia": "Estudar Geografia",
    "estudar_filosofia": "Estudar Filosofia",
    "estudar_historia": "Estudar História",
    "estudar_fisica": "Estudar Física",
    "estudar_quimica": "Estudar Química",
    "estudar_redacao": "Estudar Redação",
    "estudar_biologia": "Estudar Biologia",
    "estudar_linguas": "Estudar Línguas Estrangeiras",
    "estudar_tecnologias": "Estudar Tecnologias",
}


class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, autoincrement=True)
    nome = Column(String(100), nullable=False)
    email = Column(String(120), nullable=False, unique=True)
    senha_hash = Column(String(255), nullable=False)
    cpf = Column(String(14), nullable=False, unique=True)
    avatar = Column(String(20), default="👨‍💻")
    criado_em = Column(DateTime, default=datetime.now)


class ProgressoUsuario(Base):
    __tablename__ = "progresso_usuario"

    id = Column(Integer, primary_key=True, autoincrement=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)

    dias_consecutivos = Column(Integer, default=0)
    ultimo_acesso = Column(DateTime)

    nivel = Column(Integer, default=0)
    xp_nivel = Column(Integer, default=0)
    xp_quiz = Column(Integer, default=0)

    horas_totais = Column(Float, default=0)
    missoes_realizadas = Column(Integer, default=0)


class QuizConcluido(Base):
    __tablename__ = "quizzes_concluidos"

    id = Column(Integer, primary_key=True, autoincrement=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    quiz_id = Column(String(100), nullable=False)
    xp_ganho = Column(Integer, default=0)
    estrelas = Column(Integer, default=0)
    concluido_em = Column(DateTime, default=datetime.now)


class MissaoDiaria(Base):
    __tablename__ = "missoes_diarias"

    id = Column(Integer, primary_key=True, autoincrement=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    titulo = Column(String(200), nullable=False)
    xp = Column(Integer, nullable=False)
    concluida = Column(Integer, default=0)
    data_missao = Column(DateTime, default=datetime.now)


class Conteudo(Base):
    __tablename__ = "conteudos"

    id = Column(Integer, primary_key=True, autoincrement=True)
    titulo = Column(String(150), nullable=False)
    autor = Column(String(100))
    resumo = Column(Text)
    categoria = Column(String(80))
    imagem = Column(String(255))
    link = Column(String(255))


class HistoricoConteudo(Base):
    __tablename__ = "historico_conteudos"

    id = Column(Integer, primary_key=True, autoincrement=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    conteudo_id = Column(Integer, ForeignKey("conteudos.id"), nullable=False)
    visualizado_em = Column(DateTime, default=datetime.now)


class Favorito(Base):
    __tablename__ = "favoritos"

    id = Column(Integer, primary_key=True, autoincrement=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    conteudo_id = Column(Integer, ForeignKey("conteudos.id"), nullable=False)
    favoritado_em = Column(DateTime, default=datetime.now)


class ChatHistoricoIA(Base):
    __tablename__ = "chat_historico_ia"

    id = Column(Integer, primary_key=True, autoincrement=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    pergunta = Column(Text, nullable=False)
    resposta = Column(Text, nullable=False)
    criado_em = Column(DateTime, default=datetime.now)


class ChatHistoricoAjuda(Base):
    __tablename__ = "chat_historico_ajuda"

    id = Column(Integer, primary_key=True, autoincrement=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    pergunta = Column(Text, nullable=False)
    resposta = Column(Text, nullable=False)
    criado_em = Column(DateTime, default=datetime.now)


class Ranking(Base):
    __tablename__ = "ranking"

    id = Column(Integer, primary_key=True, autoincrement=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    pontos = Column(Integer, default=0)


Base.metadata.create_all(engine)


def garantir_coluna_estrelas_quiz():
    with engine.begin() as conexao:
        colunas = conexao.exec_driver_sql(
            "PRAGMA table_info(quizzes_concluidos)"
        ).fetchall()

        nomes_colunas = [coluna[1] for coluna in colunas]

        if "estrelas" not in nomes_colunas:
            conexao.exec_driver_sql(
                "ALTER TABLE quizzes_concluidos ADD COLUMN estrelas INTEGER DEFAULT 0"
            )


garantir_coluna_estrelas_quiz()


def calcular_rank_quiz(xp_quiz):
    if xp_quiz >= 50000:
        return {
            "rank": "Lendário",
            "proximo_rank": None,
            "xp_proximo_rank": None,
            "progresso_rank": 100
        }

    ranks = [
        {"nome": "Aprendiz", "xp": 0},
        {"nome": "Explorador", "xp": 1000},
        {"nome": "Competidor", "xp": 3000},
        {"nome": "Avançado", "xp": 7000},
        {"nome": "Especialista", "xp": 12000},
        {"nome": "Mestre", "xp": 20000},
        {"nome": "Lendário", "xp": 50000},
    ]

    rank_atual = ranks[0]
    proximo_rank = ranks[1]

    for indice, rank in enumerate(ranks):
        if xp_quiz >= rank["xp"]:
            rank_atual = rank

            if indice + 1 < len(ranks):
                proximo_rank = ranks[indice + 1]
            else:
                proximo_rank = None

    if not proximo_rank:
        progresso_rank = 100
        xp_proximo_rank = None
    else:
        xp_inicio = rank_atual["xp"]
        xp_fim = proximo_rank["xp"]
        progresso_rank = int(((xp_quiz - xp_inicio) / (xp_fim - xp_inicio)) * 100)
        xp_proximo_rank = proximo_rank["xp"]

    return {
        "rank": rank_atual["nome"],
        "proximo_rank": proximo_rank["nome"] if proximo_rank else None,
        "xp_proximo_rank": xp_proximo_rank,
        "progresso_rank": progresso_rank
    }


def cadastrar_usuario(nome, email, senha, confirmar_senha, cpf):
    if senha != confirmar_senha:
        return "As senhas não coincidem."

    if session.query(Usuario).filter_by(email=email).first():
        return "Esse e-mail já está cadastrado."

    if session.query(Usuario).filter_by(cpf=cpf).first():
        return "Esse CPF já está cadastrado."

    novo_usuario = Usuario(
        nome=nome,
        email=email,
        senha_hash=generate_password_hash(senha),
        cpf=cpf,
        avatar="👨‍💻"
    )

    session.add(novo_usuario)
    session.commit()

    progresso = ProgressoUsuario(
        usuario_id=novo_usuario.id,
        dias_consecutivos=0,
        nivel=0,
        xp_nivel=0,
        xp_quiz=0,
        horas_totais=0,
        missoes_realizadas=0
    )

    ranking = Ranking(
        usuario_id=novo_usuario.id,
        pontos=0
    )

    session.add(progresso)
    session.add(ranking)
    session.commit()

    return "Usuário cadastrado com sucesso."


def login(email, senha):
    usuario = session.query(Usuario).filter_by(email=email).first()

    if not usuario:
        return None

    if check_password_hash(usuario.senha_hash, senha):
        return usuario

    return None


def registrar_acesso_usuario(usuario_id):
    progresso = session.query(ProgressoUsuario).filter_by(
        usuario_id=usuario_id
    ).first()

    if not progresso:
        return None

    hoje = date.today()

    if not progresso.ultimo_acesso:
        progresso.dias_consecutivos = 1

    else:
        ultimo_dia = progresso.ultimo_acesso.date()

        if ultimo_dia == hoje:
            concluir_missao_por_evento(usuario_id, "entrar_site")
            return progresso

        elif ultimo_dia == hoje - timedelta(days=1):
            progresso.dias_consecutivos += 1

        else:
            progresso.dias_consecutivos = 1

    progresso.ultimo_acesso = datetime.now()
    session.commit()

    concluir_missao_por_evento(usuario_id, "entrar_site")

    return progresso


def gerar_missoes_diarias(usuario_id):
    hoje = date.today()

    missoes_existentes = session.query(MissaoDiaria).filter_by(
        usuario_id=usuario_id
    ).all()

    for missao in missoes_existentes:
        if missao.data_missao.date() != hoje:
            session.delete(missao)

    session.commit()

    missoes_hoje = session.query(MissaoDiaria).filter_by(
        usuario_id=usuario_id
    ).all()

    if len(missoes_hoje) > 3:
        for missao in missoes_hoje[3:]:
            session.delete(missao)

        session.commit()
        return

    if len(missoes_hoje) == 3:
        return

    quantidade_faltando = 3 - len(missoes_hoje)

    titulos_existentes = [missao.titulo for missao in missoes_hoje]

    missoes_disponiveis = [
        missao for missao in MISSOES
        if missao[0] not in titulos_existentes
    ]

    quantidade_faltando = min(quantidade_faltando, len(missoes_disponiveis))

    if quantidade_faltando <= 0:
        return

    missoes_sorteadas = random.sample(
        missoes_disponiveis,
        quantidade_faltando
    )

    for titulo, xp in missoes_sorteadas:
        nova_missao = MissaoDiaria(
            usuario_id=usuario_id,
            titulo=titulo,
            xp=xp,
            concluida=0
        )

        session.add(nova_missao)

    session.commit()


def pegar_missoes_usuario(usuario_id):
    gerar_missoes_diarias(usuario_id)

    missoes = session.query(MissaoDiaria).filter_by(
        usuario_id=usuario_id
    ).all()

    lista = []

    for missao in missoes:
        lista.append({
            "id": missao.id,
            "titulo": missao.titulo,
            "xp": missao.xp,
            "concluida": missao.concluida
        })

    return lista


def concluir_missao(usuario_id, missao_id):
    missao = session.query(MissaoDiaria).filter_by(
        id=missao_id,
        usuario_id=usuario_id
    ).first()

    if not missao:
        return "Missão não encontrada."

    if missao.concluida == 1:
        return "Missão já concluída."

    missao.concluida = 1

    adicionar_xp_nivel(
        usuario_id,
        missao.xp,
        missao_feita=True
    )

    session.commit()

    return "Missão concluída com sucesso."


def concluir_missao_por_evento(usuario_id, evento):
    titulo_missao = MAPA_EVENTOS_MISSOES.get(evento)

    if not titulo_missao:
        return "Evento de missão não encontrado."

    gerar_missoes_diarias(usuario_id)

    missao = session.query(MissaoDiaria).filter_by(
        usuario_id=usuario_id,
        titulo=titulo_missao
    ).first()

    if not missao:
        return "Essa missão não está ativa hoje."

    if missao.concluida == 1:
        return "Missão já concluída."

    missao.concluida = 1

    adicionar_xp_nivel(
        usuario_id,
        missao.xp,
        missao_feita=True
    )

    session.commit()

    return "Missão concluída automaticamente."


def atualizar_tempo_site(usuario_id, minutos):
    progresso = session.query(ProgressoUsuario).filter_by(
        usuario_id=usuario_id
    ).first()

    if not progresso:
        return "Progresso não encontrado."

    horas = minutos / 60
    progresso.horas_totais += horas

    session.commit()

    if progresso.horas_totais >= 0.5:
        concluir_missao_por_evento(usuario_id, "estudar_30_minutos")

    if progresso.horas_totais >= 1:
        concluir_missao_por_evento(usuario_id, "estudar_1_hora")

    if progresso.horas_totais >= 2:
        concluir_missao_por_evento(usuario_id, "estudar_2_horas")

    return "Tempo atualizado com sucesso."


def adicionar_xp_quiz(usuario_id, xp_ganho, quiz_id=None, estrelas=0):
    progresso = session.query(ProgressoUsuario).filter_by(
        usuario_id=usuario_id
    ).first()

    ranking = session.query(Ranking).filter_by(
        usuario_id=usuario_id
    ).first()

    if not progresso:
        return "Progresso não encontrado."

    if not ranking:
        ranking = Ranking(
            usuario_id=usuario_id,
            pontos=progresso.xp_quiz
        )
        session.add(ranking)

    try:
        xp_ganho = int(xp_ganho)
    except:
        xp_ganho = 0

    try:
        estrelas = int(estrelas)
    except:
        estrelas = 0

    if xp_ganho < 0:
        xp_ganho = 0

    if estrelas < 0:
        estrelas = 0

    if estrelas > 3:
        estrelas = 3

    if quiz_id:
        quiz_ja_concluido = session.query(QuizConcluido).filter_by(
            usuario_id=usuario_id,
            quiz_id=quiz_id
        ).first()

        if quiz_ja_concluido:
            if estrelas > (quiz_ja_concluido.estrelas or 0):
                quiz_ja_concluido.estrelas = estrelas
                session.commit()

            return "Você já recebeu XP por esse quiz."

        novo_quiz_concluido = QuizConcluido(
            usuario_id=usuario_id,
            quiz_id=quiz_id,
            xp_ganho=xp_ganho,
            estrelas=estrelas
        )

        session.add(novo_quiz_concluido)

    progresso.xp_quiz += xp_ganho
    ranking.pontos = progresso.xp_quiz

    session.commit()

    concluir_missao_por_evento(usuario_id, "responder_quiz")

    return "XP Quiz atualizado com sucesso."


def adicionar_xp_nivel(usuario_id, xp_ganho, missao_feita=False):
    progresso = session.query(ProgressoUsuario).filter_by(
        usuario_id=usuario_id
    ).first()

    if not progresso:
        return "Progresso não encontrado."

    progresso.xp_nivel += xp_ganho
    progresso.nivel = progresso.xp_nivel // 100

    if missao_feita:
        progresso.missoes_realizadas += 1

    session.commit()

    return "XP de nível atualizado com sucesso."


def adicionar_xp(usuario_id, xp_ganho, quiz_id=None):
    return adicionar_xp_quiz(usuario_id, xp_ganho, quiz_id)


def pegar_posicao_ranking(usuario_id):
    ranking = session.query(Ranking).order_by(
        Ranking.pontos.desc()
    ).all()

    for posicao, item in enumerate(ranking, start=1):
        if item.usuario_id == usuario_id:
            return posicao

    return None


def pegar_dados_perfil(usuario_id):
    usuario = session.query(Usuario).filter_by(id=usuario_id).first()

    progresso = session.query(ProgressoUsuario).filter_by(
        usuario_id=usuario_id
    ).first()

    if not usuario or not progresso:
        return None

    posicao = pegar_posicao_ranking(usuario_id)

    missoes = pegar_missoes_usuario(usuario_id)
    missoes_concluidas_hoje = sum(
        1 for missao in missoes if missao["concluida"] == 1
    )

    dados_rank = calcular_rank_quiz(progresso.xp_quiz)

    return {
        "usuario_id": usuario.id,
        "nome": usuario.nome,
        "avatar": usuario.avatar,
        "dias_consecutivos": progresso.dias_consecutivos,
        "nivel": progresso.nivel,
        "xp_nivel": progresso.xp_nivel,
        "xp_quiz": progresso.xp_quiz,
        "rank_quiz": dados_rank["rank"],
        "horas_totais": round(progresso.horas_totais, 2),
        "missoes_realizadas": progresso.missoes_realizadas,
        "missoes_concluidas_hoje": missoes_concluidas_hoje,
        "ranking": posicao
    }


def pegar_progresso_quiz_usuario(usuario_id):
    usuario = session.query(Usuario).filter_by(id=usuario_id).first()

    progresso = session.query(ProgressoUsuario).filter_by(
        usuario_id=usuario_id
    ).first()

    if not usuario or not progresso:
        return None

    quizzes = session.query(QuizConcluido).filter_by(
        usuario_id=usuario_id
    ).all()

    estrelas_total = 0
    quizzes_concluidos = []

    for quiz in quizzes:
        estrelas = quiz.estrelas or 0
        estrelas_total += estrelas

        quizzes_concluidos.append({
            "quiz_id": quiz.quiz_id,
            "xp_ganho": quiz.xp_ganho,
            "estrelas": estrelas,
            "concluido_em": str(quiz.concluido_em)
        })

    dados_rank = calcular_rank_quiz(progresso.xp_quiz)

    return {
        "usuario_id": usuario.id,
        "nome": usuario.nome,
        "avatar": usuario.avatar,
        "xp_quiz": progresso.xp_quiz,
        "fases_concluidas": len(quizzes_concluidos),
        "estrelas": estrelas_total,
        "rank": dados_rank["rank"],
        "proximo_rank": dados_rank["proximo_rank"],
        "xp_proximo_rank": dados_rank["xp_proximo_rank"],
        "progresso_rank": dados_rank["progresso_rank"],
        "quizzes_concluidos": quizzes_concluidos
    }


def concluir_quiz_com_progresso(usuario_id, quiz_id, xp_ganho, estrelas):
    progresso = session.query(ProgressoUsuario).filter_by(
        usuario_id=usuario_id
    ).first()

    ranking = session.query(Ranking).filter_by(
        usuario_id=usuario_id
    ).first()

    if not progresso:
        return {
            "sucesso": False,
            "mensagem": "Progresso não encontrado."
        }

    if not ranking:
        ranking = Ranking(
            usuario_id=usuario_id,
            pontos=progresso.xp_quiz
        )
        session.add(ranking)

    try:
        xp_ganho = int(xp_ganho)
    except:
        xp_ganho = 0

    try:
        estrelas = int(estrelas)
    except:
        estrelas = 0

    if xp_ganho < 0:
        xp_ganho = 0

    if estrelas < 0:
        estrelas = 0

    if estrelas > 3:
        estrelas = 3

    quiz_ja_concluido = session.query(QuizConcluido).filter_by(
        usuario_id=usuario_id,
        quiz_id=quiz_id
    ).first()

    if quiz_ja_concluido:
        if estrelas > (quiz_ja_concluido.estrelas or 0):
            quiz_ja_concluido.estrelas = estrelas
            session.commit()

            return {
                "sucesso": True,
                "mensagem": "Quiz já concluído. Estrelas atualizadas.",
                "xp_adicionado": 0,
                "progresso": pegar_progresso_quiz_usuario(usuario_id)
            }

        return {
            "sucesso": True,
            "mensagem": "Você já recebeu XP por esse quiz.",
            "xp_adicionado": 0,
            "progresso": pegar_progresso_quiz_usuario(usuario_id)
        }

    novo_quiz = QuizConcluido(
        usuario_id=usuario_id,
        quiz_id=quiz_id,
        xp_ganho=xp_ganho,
        estrelas=estrelas
    )

    session.add(novo_quiz)

    progresso.xp_quiz += xp_ganho
    ranking.pontos = progresso.xp_quiz

    session.commit()

    concluir_missao_por_evento(usuario_id, "responder_quiz")

    return {
        "sucesso": True,
        "mensagem": "Quiz concluído com sucesso.",
        "xp_adicionado": xp_ganho,
        "progresso": pegar_progresso_quiz_usuario(usuario_id)
    }


def salvar_avatar(usuario_id, avatar):
    usuario = session.query(Usuario).filter_by(id=usuario_id).first()

    if not usuario:
        return "Usuário não encontrado."

    usuario.avatar = avatar
    session.commit()

    return "Avatar atualizado com sucesso."


def listar_ranking():
    resultados = (
        session.query(Usuario, ProgressoUsuario)
        .join(ProgressoUsuario, Usuario.id == ProgressoUsuario.usuario_id)
        .order_by(
            ProgressoUsuario.xp_quiz.desc(),
            ProgressoUsuario.nivel.desc(),
            ProgressoUsuario.dias_consecutivos.desc()
        )
        .all()
    )

    ranking = []

    for posicao, (usuario, progresso) in enumerate(resultados, start=1):
        dados_rank = calcular_rank_quiz(progresso.xp_quiz)

        ranking.append({
            "posicao": posicao,
            "usuario_id": usuario.id,
            "nome": usuario.nome,
            "avatar": usuario.avatar,
            "nivel": progresso.nivel,
            "rank_quiz": dados_rank["rank"],
            "xp": progresso.xp_quiz,
            "xp_quiz": progresso.xp_quiz,
            "xp_nivel": progresso.xp_nivel,
            "dias_consecutivos": progresso.dias_consecutivos
        })

    return ranking


def cadastrar_conteudo(titulo, autor, resumo, categoria, imagem, link):
    conteudo = Conteudo(
        titulo=titulo,
        autor=autor,
        resumo=resumo,
        categoria=categoria,
        imagem=imagem,
        link=link
    )

    session.add(conteudo)
    session.commit()

    return "Conteúdo cadastrado com sucesso."


def salvar_historico(usuario_id, conteudo_id):
    historico = HistoricoConteudo(
        usuario_id=usuario_id,
        conteudo_id=conteudo_id
    )

    session.add(historico)
    session.commit()

    return "Histórico salvo com sucesso."


def favoritar_conteudo(usuario_id, conteudo_id):
    favorito_existente = session.query(Favorito).filter_by(
        usuario_id=usuario_id,
        conteudo_id=conteudo_id
    ).first()

    if favorito_existente:
        return "Esse conteúdo já está nos favoritos."

    favorito = Favorito(
        usuario_id=usuario_id,
        conteudo_id=conteudo_id
    )

    session.add(favorito)
    session.commit()

    concluir_missao_por_evento(usuario_id, "favoritar_conteudo")

    return "Conteúdo favoritado com sucesso."


def salvar_chat_ia(usuario_id, pergunta, resposta):
    chat = ChatHistoricoIA(
        usuario_id=usuario_id,
        pergunta=pergunta,
        resposta=resposta
    )

    session.add(chat)
    session.commit()

    return "Chat IA salvo com sucesso."


def salvar_chat_ajuda(usuario_id, pergunta, resposta):
    chat = ChatHistoricoAjuda(
        usuario_id=usuario_id,
        pergunta=pergunta,
        resposta=resposta
    )

    session.add(chat)
    session.commit()

    return "Chat Ajuda salvo com sucesso."


def listar_chats_ia_usuario(usuario_id):
    chats = (
        session.query(ChatHistoricoIA)
        .filter_by(usuario_id=usuario_id)
        .order_by(ChatHistoricoIA.criado_em.desc())
        .all()
    )

    resultado = []

    for chat in chats:
        resultado.append({
            "id": chat.id,
            "pergunta": chat.pergunta,
            "resposta": chat.resposta,
            "criado_em": str(chat.criado_em)
        })

    return resultado


def atualizar_progresso(usuario_id, xp_ganho, horas_estudadas, missao_feita=False):
    progresso = session.query(ProgressoUsuario).filter_by(
        usuario_id=usuario_id
    ).first()

    if not progresso:
        return "Progresso não encontrado."

    progresso.xp_nivel += xp_ganho
    progresso.horas_totais += horas_estudadas

    if missao_feita:
        progresso.missoes_realizadas += 1

    progresso.nivel = progresso.xp_nivel // 100

    session.commit()

    return "Progresso atualizado com sucesso."


def adicionar_pontos_ranking(usuario_id, pontos):
    ranking = session.query(Ranking).filter_by(
        usuario_id=usuario_id
    ).first()

    progresso = session.query(ProgressoUsuario).filter_by(
        usuario_id=usuario_id
    ).first()

    if not ranking or not progresso:
        return "Ranking não encontrado."

    progresso.xp_quiz += pontos
    ranking.pontos = progresso.xp_quiz

    session.commit()

    return "Ranking atualizado com sucesso."


def deletar_usuario(email):
    usuario = session.query(Usuario).filter_by(email=email).first()

    if not usuario:
        return "Usuário não encontrado."

    session.delete(usuario)
    session.commit()

    return "Usuário deletado com sucesso."


def listar_usuarios():
    usuarios = session.query(Usuario).all()

    for usuario in usuarios:
        print(usuario.id, usuario.nome, usuario.email)


def ver_ranking():
    ranking = listar_ranking()

    for usuario in ranking:
        print(
            f"{usuario['posicao']}º lugar - "
            f"{usuario['nome']} - "
            f"{usuario['xp_quiz']} XP Quiz - "
            f"{usuario['rank_quiz']} - "
            f"Nível {usuario['nivel']} - "
            f"{usuario['dias_consecutivos']} dias"
        )