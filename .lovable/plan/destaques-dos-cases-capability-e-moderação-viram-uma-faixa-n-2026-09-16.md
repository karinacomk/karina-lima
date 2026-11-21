# Destaques dos cases Capability e Moderação: viram uma faixa no rodapé

## Minha recomendação

**Faixa no rodapé do card** (a primeira opção). É a que resolve de vez o problema e já existe no site — o case em destaque abre com a faixa 197 / 119 / US$ 893, então os números da Moderação passam a seguir a mesma linguagem, e nada fica esticado.

O que está acontecendo hoje: as duas caixas azuis estão com altura forçada para preencher a altura do texto. O resultado medido no navegador:

```text
Case 3 Capability  ->  caixa de 181px com 60px e 80px de texto  (~100px vazios)
Case 4 Moderação   ->  caixa de 211px com 20px e 40px de texto  (~150px vazios)
```

Como o mesmo padrão aparece nos dois cards, a proposta é tratar os dois juntos — assim eles não ficam visualmente desconectados um em cima do outro.

## Como fica

```text
+--------------------------------------------------------------+
| (4) Moderação de eShop                                       |
|                                                              |
| Problema — ...                                               |
| Contexto e restrições — ...                                  |
| Decisões e trade-offs — ...                                  |
| Impacto — ...                                                |
|                                                              |
| +---------------------------+  +---------------------------+ |
| | 3                         |  | 3                         | |
| | motivos de denúncia      |  | tipos de local de infração| |
| | mapeados (DP, CALU, PI)   |  | identificados (imagem,    | |
| |                           |  | texto, vídeo)             | |
| +---------------------------+  +---------------------------+ |
+--------------------------------------------------------------+
```

- O texto do case passa a ocupar a largura toda do card (sem coluna à direita), então os parágrafos ficam mais curtos e o card inteiro mais baixo.
- A faixa fica logo abaixo do texto, em duas colunas iguais, com altura natural — sem espaço sobrando dentro.
- Mantém a cor azul atual (`bg-sky/20`, número em `skydeep`) para continuar parecendo o mesmo tipo de destaque do "19".
- No case **Capability de Marcas**, a mesma mudança com os números **45** e **19**, na mesma ordem.

## O que não muda

Nenhum texto muda. Nada de conteúdo, navegação, contato ou outras seções é tocado.

## Technical details

- `src/routes/index.tsx`: no `article` do case 3 e do case 4, remover o `grid` interno de duas colunas e deixar o bloco de parágrafos em coluna única; os destaques saem de dentro da coluna lateral e viram um `div` próprio com `mt-6 grid grid-cols-2 gap-3` logo antes do fechamento do `article`, com altura natural (sem `flex-1` / `self-stretch`).
- Verificação: medir altura dos dois cards e altura interna das caixas no navegador (Playwright, `localhost:8080`) e confirmar que nenhum destaque tem espaço vazio relevante; conferir `build-errors.log`.
- `roadmap.md`: registrar a decisão e o item de publicação pendente da confirmação.
