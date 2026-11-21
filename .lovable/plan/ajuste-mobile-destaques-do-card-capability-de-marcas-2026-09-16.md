# Ajuste mobile: destaques do card Capability de Marcas

## Problema
No celular, os dois destaques do card **Capability de Marcas** ("45 dias" e "19 marcas") ficam lado a lado em duas colunas estreitas — o texto fica espremido e comprido demais. A grade usa `grid-cols-2` em todas as larguras.

## Mudança
- Na faixa de destaques do card (linha ~384 de `src/routes/index.tsx`), trocar `grid-cols-2` por `grid-cols-1 sm:grid-cols-2`.
- Resultado: no celular, os dois cartões ficam **empilhados** (um embaixo do outro, largura total); em telas maiores, continuam **lado a lado** como estão.

## Detalhes técnicos
- Único arquivo: `src/routes/index.tsx`, linha ~384 — uma classe CSS.
- Nenhum outro card afetado (Moderação usa faixa única; MeliRun e destaque usam `md:grid-cols-2`, que já empilha no celular).
- Verificação: build + screenshot em viewport mobile (~390px) confirmando os destaques empilhados.
- Publicar em https://karina-lima.lovable.app após a confirmação visual.
