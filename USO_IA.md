# Relatório de Uso de Inteligência Artificial - Anexo I

## ## Ferramentas utilizadas
- Gemini (Google)

## ## Principais usos
- **Geração de ideias e arquitetura:** Auxílio na divisão correta das pastas seguindo o padrão de arquitetura MVC (Model, View, Controller) para Node.js e Express.
- **Correção de erros:** Identificação e resolução de problemas críticos de rotas e mapeamento de caminhos decorrentes de diferenciação de maiúsculas e minúsculas (Case Sensitivity) nas pastas do sistema.
- **Revisão de código:** Validação da lógica dos controladores para garantir a persistência de dados no MySQL e a segurança das rotas através de middlewares baseados em Session.
- **Criação de dados fictícios:** Geração de scripts SQL (`seed.sql`) com massa de dados de teste coerentes (hóspedes, quartos e usuários com hash Bcrypt) para a demonstração prática.

## ## Exemplos de prompts utilizados

### Prompt 1:
*"Como estruturar um middleware de autenticação baseado em sessions com Node.js para proteger as rotas de um sistema web em MVC?"*
**Resposta/resumo:** A IA forneceu o código estruturado do middleware que valida a existência de `req.session.usuarioLogado` e redireciona para a tela de login caso o utilizador não esteja autenticado.

### Prompt 2:
*"Tenho uma pasta física chamada middLewares e um arquivo authMiddLeware.js. Como deve ficar a linha de require dentro do meu arquivo authRoutes.js para que o Node.js não dê erro de módulo não encontrado?"*
**Resposta/resumo:** A IA alertou sobre o comportamento Case Sensitive do Node.js e corrigiu a importação para `require('../middLewares/authMiddLeware')`, alinhando o código com a estrutura exata do projeto.

## ## O que foi aceito, adaptado ou recusado
- **Aceito:** A lógica de isolamento das rotas e a validação de sessão em cada endpoint do CRUD.
- **Adaptado:** Os caminhos de importação (`require`) sugeridos inicialmente pela IA foram completamente adaptados para respeitar as nomenclaturas específicas das pastas criadas localmente no ambiente de desenvolvimento (`Database/` e `middLewares/`).
- **Recusado:** Sugestões de uso de frameworks ORM complexos (como Sequelize). Optou-se por manter o uso do driver nativo `mysql2` com queries puras para demonstrar o domínio da persistência relacional básica exigida.

## ## Reflexão crítica
A Inteligência Artificial atuou como um copiloto técnico eficiente durante o desenvolvimento do Hotel Twister. Ela reduziu significativamente o tempo de depuração (debugging) ao apontar erros de importação invisíveis e automatizou a criação de códigos repetitivos (como a estrutura padrão dos controladores). No entanto, o papel do