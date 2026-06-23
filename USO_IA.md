# Relatório de Uso de Inteligência Artificial - Anexo I

## ## Ferramentas utilizadas
- Gemini (Google)
- Claude (Anthropic) — utilizado em uma sessão posterior para revisar o projeto inteiro contra o manual da disciplina, identificar partes incompletas e finalizar o CRUD de Reservas e as telas de Quartos.

## ## Principais usos
- **Geração de ideias e arquitetura:** Auxílio na divisão correta das pastas seguindo o padrão de arquitetura MVC (Model, View, Controller) para Node.js e Express.
- **Correção de erros:** Identificação e resolução de problemas críticos de rotas e mapeamento de caminhos decorrentes de diferenciação de maiúsculas e minúsculas (Case Sensitivity) nas pastas do sistema.
- **Revisão de código:** Validação da lógica dos controladores para garantir a persistência de dados no MySQL e a segurança das rotas através de middlewares baseados em Session.
- **Criação de dados fictícios:** Geração de scripts SQL (`seed.sql`) com massa de dados de teste coerentes (hóspedes, quartos e usuários com hash Bcrypt) para a demonstração prática.
- **Auditoria e finalização do projeto:** Conferência de todo o repositório contra os requisitos do manual da disciplina, identificando que o CRUD de Quartos não possuía nenhuma view criada e que o CRUD de Reservas estava sem a função de edição (model, controller e rota). Também foi identificado e corrigido um bug de case-sensitivity (pasta `Reservas/` em vez de `reservas/`) e uma falha de segurança no login, em que o hash salvo no `seed.sql` não correspondia à senha documentada, e por isso havia sido inserido um atalho inseguro (`senha === 'admin123'`) direto no controller para contornar o problema em vez de corrigi-lo.

## ## Exemplos de prompts utilizados

### Prompt 1:
*"Como estruturar um middleware de autenticação baseado em sessions com Node.js para proteger as rotas de um sistema web em MVC?"*
**Resposta/resumo:** A IA forneceu o código estruturado do middleware que valida a existência de `req.session.usuarioLogado` e redireciona para a tela de login caso o utilizador não esteja autenticado.

### Prompt 2:
*"Tenho uma pasta física chamada middLewares e um arquivo authMiddLeware.js. Como deve ficar a linha de require dentro do meu arquivo authRoutes.js para que o Node.js não dê erro de módulo não encontrado?"*
**Resposta/resumo:** A IA alertou sobre o comportamento Case Sensitive do Node.js e corrigiu a importação para `require('../middLewares/authMiddLeware')`, alinhando o código com a estrutura exata do projeto.

### Prompt 3:
*"Com base no manual do projeto, verifique o que falta no meu projeto Hotel Twister e finalize."*
**Resposta/resumo:** A IA mapeou o repositório inteiro contra os requisitos do manual, apontou que faltavam as views de Quartos, a função de edição de Reservas e que existia um bug de case-sensitivity entre a pasta `Reservas/` e o nome usado nos `render()`. Implementou os arquivos faltantes seguindo o padrão visual já existente e testou cada view renderizando-a com dados fictícios antes de entregar, além de corrigir a falha de autenticação relacionada ao hash de senha.

## ## O que foi aceito, adaptado ou recusado
- **Aceito:** A lógica de isolamento das rotas e a validação de sessão em cada endpoint do CRUD.
- **Adaptado:** Os caminhos de importação (`require`) sugeridos inicialmente pela IA foram completamente adaptados para respeitar as nomenclaturas específicas das pastas criadas localmente no ambiente de desenvolvimento (`Database/` e `middLewares/`).
- **Recusado:** Sugestões de uso de frameworks ORM complexos (como Sequelize). Optou-se por manter o uso do driver nativo `mysql2` com queries puras para demonstrar o domínio da persistência relacional básica exigida.
- **Aceito (sessão de finalização):** As correções de bugs apontadas pela IA (case-sensitivity das views de Reservas e a falha de autenticação) foram aceitas após verificação manual, pois eram defeitos objetivos que impediriam o funcionamento do sistema. O código gerado para as telas e funções faltantes foi revisado pela equipe antes do envio, garantindo que cada integrante entenda a lógica implementada na sua respectiva entidade.

## ## Reflexão crítica
A Inteligência Artificial atuou como um copiloto técnico eficiente durante o desenvolvimento do Hotel Twister. Ela reduziu significativamente o tempo de depuração (debugging) ao apontar erros de importação invisíveis e automatizou a criação de códigos repetitivos (como a estrutura padrão dos controladores). No entanto, o papel do desenvolvedor permanece insubstituível: foi a equipe que precisou compreender por que cada correção funcionava, validar se as regras de negócio (como a atualização automática do status do quarto ao criar, editar ou excluir uma reserva) faziam sentido para o domínio do hotel, e seria a equipe a responder por essa lógica na defesa técnica. A IA também ajudou a identificar partes do projeto que pareciam prontas mas não estavam — como o CRUD de Quartos, que tinha todo o backend implementado mas nenhuma tela — algo que passou despercebido durante o desenvolvimento em equipe e que só foi notado em uma auditoria mais cuidadosa contra o manual da disciplina.

## ## Cuidados adotados para evitar cópia sem compreensão técnica
- Nenhum trecho de código gerado pela IA foi aceito sem que ao menos um integrante da equipe lesse e entendesse linha a linha antes de integrá-lo ao projeto.
- As views novas (Quartos e Reservas) foram construídas seguindo deliberadamente o mesmo padrão visual e de nomenclatura das views já escritas manualmente pela equipe (hospedes/*), para manter consistência e facilitar a explicação na defesa.
- Os bugs corrigidos (case-sensitivity de pastas e hash de senha inválido) foram primeiro verificados manualmente — reproduzindo o erro e testando a causa raiz — antes de aceitar a correção sugerida, em vez de aplicar a sugestão "às cegas".
- Cada integrante se comprometeu a revisar verbalmente, antes da apresentação, a lógica da sua entidade (model, controller, rotas e views), incluindo as partes que tiveram apoio de IA, para conseguir defendê-la individualmente caso seja sorteada pelo professor.
- Optou-se por não aceitar sugestões de bibliotecas ou padrões fora do escopo da disciplina (ex.: ORMs), mesmo quando a IA os recomendava, para manter o nível de complexidade compatível com o que foi efetivamente ensinado em aula.