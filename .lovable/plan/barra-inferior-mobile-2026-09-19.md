# Barra inferior mobile

## Objetivo
Adicionar uma navegação fixa e compacta no rodapé das telas mobile, preservando a navegação atual em tablet e desktop.

## Implementação
- Criar a barra com quatro ações: Início, Catálogo, Calculadora e Orçamento.
- Destacar a Calculadora com a cor laranja da marca e indicar visualmente a seção atual.
- Conectar Orçamento ao carrinho existente e exibir a quantidade atual em um badge.
- Manter o menu superior mobile somente para links secundários; remover dele Início, Catálogo e Calculadora.
- Reservar espaço inferior nas páginas mobile para a barra não cobrir conteúdo.
- Subir o botão flutuante “Fale Conosco” acima da nova barra somente no mobile.

## Validação
- Conferir navegação, estados ativos e abertura do orçamento.
- Testar rolagem e ausência de sobreposição em larguras mobile de 360, 390 e 414 px.
- Confirmar que tablet e desktop permanecem inalterados.

## Detalhes técnicos
- A barra ficará no layout global para aparecer em todas as páginas.
- O estado ativo será derivado do endereço atual.
- Serão reutilizados o contexto do carrinho, os ícones existentes e os tokens visuais do projeto.
