# Correção de responsividade mobile

## Objetivo
Garantir que o cabeçalho e o conteúdo do site permaneçam inteiros e sem rolagem horizontal entre 375 e 430 px, inclusive com a busca aberta e em edição.

## Implementação
- Reestruturar a linha mobile do cabeçalho como uma grade de duas áreas: logo flexível e grupo fixo de ações.
- Permitir que a marca reduza proporcionalmente no espaço disponível, mantendo busca, carrinho e menu sempre visíveis e com área de toque estável.
- Limitar a busca expandida à largura interna da tela, com campo e resultados capazes de encolher sem criar largura extra.
- Corrigir apenas os pontos de largura encontrados na varredura da Home, catálogo, calculadora e rodapé, preservando aparência e comportamento atuais.
- Manter a proteção global contra rolagem horizontal como segurança adicional, sem usá-la para esconder conteúdo importante.

## Validação
- Testar a Home em 375, 390, 414 e 430 px.
- Abrir a busca, focar o campo, digitar um produto e verificar cabeçalho, resultados e largura total.
- Conferir carrossel, catálogo, calculadora e rodapé em tela pequena, medindo se algum elemento ultrapassa a largura visível.
- Confirmar que tablet e desktop continuam inalterados.

## Detalhes técnicos
- Usar `grid-cols-[minmax(0,1fr)_auto]`, `min-w-0` e `shrink-0` no cabeçalho mobile.
- Aplicar limites de largura somente abaixo do breakpoint desktop, reutilizando os tokens e componentes existentes.
