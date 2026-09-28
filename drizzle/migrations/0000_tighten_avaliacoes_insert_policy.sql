DROP POLICY "qualquer um pode avaliar" ON public.avaliacoes;

CREATE POLICY "qualquer um pode avaliar"
ON public.avaliacoes
FOR INSERT
TO anon, authenticated
WITH CHECK (
  nota BETWEEN 1 AND 5
  AND (comentario IS NULL OR char_length(comentario) <= 1000)
  AND origem IN ('carrinho')
);