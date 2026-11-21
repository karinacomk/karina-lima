# Protótipos: Marcas, Retrospectiva e ajuste de botão

## 1. Botão do Assistente de Investigação de Fraude

Trocar o texto do botão de "Ver protótipo (feito por mim)" para **"Ver protótipo"**. Nada mais muda nesse card.

## 2. Capability de Marcas — protótipo anexado

O card ganha o mesmo tratamento que o de Moderação de eShop, que já funciona bem:

- Uma prévia clicável da imagem do protótipo (recorte do topo, com selo "Ampliar").
- Um botão escuro **"Ver protótipo — telas de marcas"**.
- Ao clicar, a imagem abre em tela cheia, com rolagem, fechando no Esc, no × ou clicando fora.

Como a imagem é larga e cheia de detalhe (dois blocos: telas de criação/configuração e fluxos de aplicar/remover marca), na tela cheia ela aparece grande o bastante para dar zoom com os dedos no celular.

## 3. Retrospectiva do Representante — apresentação anexada

A apresentação tem 11 slides em formato 16:9. Em vez de um PDF para baixar (ruim no celular), os slides viram imagens exibidas dentro do card:

- Prévia do primeiro slide, clicável, com selo "Ver apresentação · 11 slides".
- Botão escuro **"Ver apresentação (11 slides)"**.
- Ao abrir, uma visualização em tela cheia com navegação entre slides: setas, teclado (← →), indicador "3 / 11" e deslize horizontal no celular.

## 4. Mobile

- Prévias com altura reduzida no celular e imagem sem corte lateral.
- Botões em largura total quando não couberem lado a lado.
- Tela cheia com área de toque grande para fechar e navegar, sem rolagem da página por trás.

Verificação ao vivo em 390px e em desktop antes de concluir.

## Detalhes técnicos

- `lovable-assets create` para `protótipo-marks.png` e para os 11 slides renderizados do PDF (`pdftoppm`, JPEG ~1600px de largura), gerando ponteiros `.asset.json` em `src/assets/`.
- Generalizar o `PrototypeLightbox` existente em `src/routes/index.tsx` para aceitar uma lista de imagens (índice atual, setas, teclado, swipe) mantendo o uso atual de imagem única.
- Estado separado por card (`marksOpen`, `deckOpen`, `prototypeOpen`).
- Nenhum texto existente dos cards é alterado.
