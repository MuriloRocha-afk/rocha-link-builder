# Otimizar todas as mídias locais

## Objetivo
Reduzir significativamente os ~250 MB em `public/assets/` sem alterar nenhum caminho usado pelo site e sem perda visual perceptível.

## Implementação
- Criar uma cópia temporária de segurança fora do projeto durante o processamento.
- Recompactar fotos JPEG/JFIF com codificação progressiva, metadados removidos e qualidade visual alta; limitar apenas imagens excessivamente grandes à resolução útil para web.
- Otimizar PNG/WebP/AVIF preservando transparência e formato original, sem converter extensões nem quebrar URLs.
- Recompactar os vídeos MP4 em H.264/AAC compatível com Safari, Android, Chrome e Vercel, mantendo resolução e adicionando carregamento rápido (`faststart`).
- Só substituir um arquivo quando a versão otimizada for menor e passar na validação.

## Validação
- Confirmar que os 428 caminhos originais continuam presentes.
- Validar abertura de todas as imagens e integridade de todos os vídeos.
- Comparar dimensões, duração, transparência e redução total.
- Conferir compilação e páginas representativas no celular e desktop, incluindo galerias, guias e vídeos.
