# Corrigir o corte de perfil para telhado de 1 água

## O que será ajustado
- Manter o desenho de 2 águas sem alterações.
- No modo de 1 água, desenhar a viga superior inclinada paralelamente à água do telhado.
- Fazer os pilares terminarem em alturas diferentes, encostando na viga sob a cobertura: lado alto maior e lado baixo menor.
- Prolongar o beiral na mesma reta inclinada, sem degraus ou folgas.
- Adicionar cotas laterais identificando o lado alto e o lado baixo e uma cota do desnível calculado pela largura em planta × inclinação.
- Preservar todos os valores, fórmulas e campos da calculadora.

## Validação
- Gerar um cálculo de teste em 1 água e conferir visualmente o corte na tela e no relatório compartilhado com o PDF.
- Confirmar que a estrutura acompanha a face inferior do telhado sem espaços.
- Repetir a conferência em 2 águas para garantir que o desenho anterior permaneceu igual.

## Detalhes técnicos
- A correção ficará concentrada no gerador SVG já reutilizado pela visualização e pelo PDF.
- A geometria de 1 água usará a mesma função linear da face inferior da cobertura para posicionar a viga e o topo de cada pilar.
