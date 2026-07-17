from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB

# =========================
# DADOS DE TREINAMENTO
# =========================

perguntas = [

    # SENHA
    "esqueci minha senha",
    "como recuperar minha senha",
    "não lembro minha senha",
    "perdi minha senha",
    "trocar senha",
    "alterar senha",
    "quero mudar minha senha",
    "minha senha não funciona",
    "recuperação de senha",
    "não consigo acessar por causa da senha",

    # LOGIN
    "não consigo entrar",
    "erro no login",
    "problema para acessar",
    "não consigo fazer login",
    "login não funciona",
    "meu acesso não entra",
    "não consigo acessar minha conta",
    "erro ao entrar na conta",
    "a plataforma não deixa eu logar",
    "não consigo iniciar sessão",

    # NÍVEL
    "como subir de nivel",
    "como aumentar meu nivel",
    "ganhar nivel",
    "como funciona o nivel",
    "nivel da conta",
    "por que meu nivel não aumenta",
    "como evoluir de nivel",
    "meu nivel está parado",
    "explicação sobre nivel",
    "nível do perfil",

    # XP
    "como ganhar xp",
    "como conseguir xp",
    "ganho experiencia como",
    "aumentar xp",
    "como evoluir",
    "quais atividades dão xp",
    "xp não aumentou",
    "como ganhar pontos",
    "como conseguir experiencia",
    "pontuação de xp",

    # QUIZ
    "como fazer quiz",
    "onde estão os quizzes",
    "como responder quiz",
    "não encontro os quizzes",
    "quiz do sistema",
    "onde faço as perguntas",
    "como participar dos quizzes",
    "quiz vale xp",
    "como acessar o quiz",
    "não aparece quiz para mim",

    # MISSÕES
    "como funcionam as missoes",
    "onde vejo minhas missoes",
    "como concluir uma missao",
    "missao diaria",
    "ganhar recompensa",
    "minhas missoes não aparecem",
    "como ganhar recompensa das missoes",
    "missao não concluiu",
    "onde fica a lista de missoes",
    "como completar tarefa diaria",

    # RANKING
    "como funciona o ranking",
    "como subir no ranking",
    "pontuacao ranking",
    "classificacao dos usuarios",
    "posicao no ranking",
    "por que meu ranking não subiu",
    "como aparecer no ranking",
    "ranking de alunos",
    "posição dos estudantes",
    "tabela de classificação",

    # PERFIL
    "como alterar avatar",
    "trocar avatar",
    "editar perfil",
    "mudar foto",
    "alterar dados da conta",
    "como personalizar meu perfil",
    "mudar imagem do perfil",
    "editar minha conta",
    "alterar informações pessoais",
    "onde vejo meu perfil",

    # TEMPO DE ESTUDO
    "como registrar horas",
    "tempo estudado",
    "horas de estudo",
    "contador de estudo",
    "registrar tempo",
    "tempo de estudo não aparece",
    "como contar meu tempo estudando",
    "meu tempo não foi salvo",
    "como funciona o cronometro",
    "histórico de tempo estudado",

    # BIBLIOTECA
    "onde fica a biblioteca",
    "como acessar biblioteca",
    "não encontro os conteúdos",
    "onde vejo os materiais",
    "como abrir uma aula",
    "biblioteca de estudos",
    "conteúdos disponíveis",
    "materiais de estudo",
    "como favoritar conteúdo",
    "onde vejo meus favoritos",

    # FOCO / POMODORO
    "como usar o foco",
    "como funciona o pomodoro",
    "timer de estudo",
    "cronometro foco",
    "modo foco",
    "como iniciar o timer",
    "pausar pomodoro",
    "zerar cronometro",
    "foco vale xp",
    "temporizador de estudo",

    # CADASTRO
    "como criar conta",
    "como fazer cadastro",
    "não consigo me cadastrar",
    "erro no cadastro",
    "criar usuário",
    "fazer nova conta",
    "cadastro de aluno",
    "cadastro de professor",
    "problema ao cadastrar",
    "não recebi cadastro",

    # BUGS / ERROS
    "encontrei um erro",
    "o site está com bug",
    "algo não funciona",
    "página travando",
    "botão não funciona",
    "erro no sistema",
    "o site está lento",
    "a página não carrega",
    "problema técnico",
    "quero reportar um bug"
]

classes = [

    *["senha"] * 10,
    *["login"] * 10,
    *["nivel"] * 10,
    *["xp"] * 10,
    *["quiz"] * 10,
    *["missao"] * 10,
    *["ranking"] * 10,
    *["perfil"] * 10,
    *["tempo"] * 10,
    *["biblioteca"] * 10,
    *["foco"] * 10,
    *["cadastro"] * 10,
    *["bug"] * 10
]

# =========================
# TREINAMENTO
# =========================

vectorizer = CountVectorizer()

X = vectorizer.fit_transform(perguntas)

modelo = MultinomialNB()

modelo.fit(X, classes)

# =========================
# RESPOSTAS
# =========================

respostas = {

    "senha":
        "Para recuperar sua senha, acesse a tela de login e clique em 'Esqueci minha senha'. Depois, siga as instruções para criar uma nova senha. Caso ainda não consiga acessar, verifique se o e-mail digitado está correto.",

    "login":
        "Verifique se o e-mail e a senha foram digitados corretamente. Se o erro continuar, tente redefinir sua senha pela opção 'Esqueci minha senha'. Também confira se sua conta já foi cadastrada na plataforma.",

    "nivel":
        "Seu nível aumenta conforme você acumula XP dentro da plataforma. Para evoluir mais rápido, conclua missões, responda quizzes, utilize o modo foco e mantenha uma rotina constante de estudos.",

    "xp":
        "Você ganha XP ao realizar atividades dentro do Study4Life, como concluir missões, responder quizzes, estudar pelos conteúdos da biblioteca e usar o modo foco. Quanto mais você participa, mais rápido evolui.",

    "quiz":
        "Os quizzes ficam disponíveis nas áreas de estudo da plataforma. Ao responder os quizzes, você pode testar seus conhecimentos e ganhar XP para evoluir seu perfil.",

    "missao":
        "As missões são tarefas que ajudam você a manter uma rotina de estudos. Elas podem envolver estudar por um tempo específico, responder quizzes, acessar conteúdos ou usar o modo foco. Ao concluir uma missão, você recebe XP.",

    "ranking":
        "O ranking mostra a classificação dos usuários com base no XP acumulado. Para subir no ranking, participe das atividades da plataforma, conclua missões e mantenha uma boa frequência de estudos.",

    "perfil":
        "No perfil, você pode acompanhar seu nível, XP, tempo de estudo e personalizar seu avatar. Essa área mostra seu progresso dentro do Study4Life.",

    "tempo":
        "O tempo de estudo é registrado enquanto você utiliza os recursos da plataforma, principalmente o modo foco e as áreas de aprendizado. Caso o tempo não apareça, tente atualizar a página ou iniciar uma nova sessão de estudo.",

    "biblioteca":
        "A biblioteca reúne os conteúdos de estudo disponíveis na plataforma. Por lá, você pode acessar materiais, abrir aulas, visualizar conteúdos recentes e favoritar os materiais que quiser revisar depois.",

    "foco":
        "O modo foco funciona como um temporizador de estudos no estilo Pomodoro. Você pode iniciar, pausar ou zerar o cronômetro para organizar melhor seu tempo e manter a concentração.",

    "cadastro":
        "Para criar uma conta, acesse a página de cadastro e preencha suas informações corretamente. Verifique se o e-mail está válido e se todos os campos obrigatórios foram preenchidos.",

    "bug":
        "Sentimos muito pelo problema. Tente atualizar a página ou acessar novamente em alguns instantes. Se o erro continuar, entre em contato com o suporte informando o que aconteceu e em qual página o problema ocorreu."
}

# =========================
# FUNÇÃO PRINCIPAL
# =========================

def responder_pergunta(pergunta):

    try:
        pergunta_vetorizada = vectorizer.transform([pergunta])

        probabilidades = modelo.predict_proba(pergunta_vetorizada)[0]
        maior_probabilidade = max(probabilidades)

        categoria = modelo.predict(pergunta_vetorizada)[0]

        if maior_probabilidade < 0.25:
            return "Não consegui entender totalmente sua dúvida. Tente escrever de outra forma ou escolha uma das opções de ajuda disponíveis no suporte."

        return respostas.get(
            categoria,
            "Não encontrei uma resposta específica para essa dúvida."
        )

    except Exception:
        return "Ocorreu um erro ao processar sua pergunta. Tente novamente em alguns instantes."