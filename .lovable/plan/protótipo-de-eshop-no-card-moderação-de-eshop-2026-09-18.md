# Protótipo de eShop no card "Moderação de eShop"

## O que muda

O card 4 ganha a prova visual do discovery: uma **miniatura** do protótipo dentro do card e, ao clicar, um **visualizador em tela cheia** com a imagem inteira (que é bem alta: 876x1907) para rolar e ler.

Nenhum texto existente é alterado — só entra o bloco do protótipo, abaixo da faixa amarela que já fecha o card.

```text
┌─ 4  Moderação de eShop ────────────────────────────┐
│ Problema / Contexto / Decisões / Impacto           │
│ (faixa) O discovery que assumi foi citado...       │
│                                                    │
│ ┌───────────────┐                                  │
│ │  miniatura    │  recorte do topo do protótipo    │
│ │  (clicável)   │  com fade na base + "ampliar"    │
│ └───────────────┘                                  │
│ [ Ver protótipo — tela de moderação  ↗ ]           │
└────────────────────────────────────────────────────┘
```

## Como fica na prática

- **Miniatura**: caixa de altura fixa (~256px no desktop, ~200px no celular), cantos arredondados no padrão do site, mostrando o topo do wireframe. A base tem um degradê suave que some no fundo do card, sinalizando que continua. Um rótulo discreto "Ampliar" aparece no rodapé da miniatura.
- **Visualizador**: ao clicar (na miniatura ou no botão), abre uma camada escura em tela cheia com a imagem no tamanho legível, com rolagem vertical. Fecha no **Esc**, no clique fora da imagem ou no botão **×** no canto. Enquanto aberta, a página de trás para de rolar.
- **Botão**: "Ver protótipo — tela de moderação", no mesmo estilo escuro e sólido dos outros botões de protótipo do site (Assistente, MeliRun), com a seta ↗.
- **Celular**: miniatura em largura total, botão logo abaixo; o visualizador ocupa a tela toda e a imagem pode ser rolada com o dedo.

## Detalhes técnicos

- **Imagem**: sobe para o CDN de assets com `lovable-assets create --file "/mnt/user-uploads/protótipo-eshop.png" --filename prototipo-eshop.png`, gravando o ponteiro em `src/assets/prototipo-eshop.png.asset.json` (nome sem acento, URL estável). O binário não fica no repositório.
- **`src/routes/index.tsx`**:
  - Componente `PrototypeLightbox` no mesmo arquivo: estado `open` local, `role="dialog"` + `aria-modal`, fundo `bg-ink/70` clicável para fechar, `fixed inset-0 z-[100]`, imagem dentro de `max-h-[85vh] overflow-y-auto` com `max-w-3xl`, botão de fechar com foco automático, listener de `keydown` (Esc) e trava de rolagem do `body` enquanto aberto.
  - Só renderiza quando aberto (aberto por clique), então não há divergência entre servidor e navegador.
  - Bloco da miniatura: `<button>` acessível envolvendo `<img>` com `object-cover object-top` + degradê, e o botão-âncora abaixo. Texto alternativo descrevendo o wireframe (tela de caso de moderação com as seções da página de loja e as tags aplicáveis).
- **Sem alterações** em `src/styles.css`, nos outros cards, no Toolkit ou no rodapé.

## Verificação

- Build limpo em `/tmp/observability/build-errors.log`.
- Playwright em desktop (1280px) e celular (390px): screenshot do card fechado, clique no botão → screenshot do visualizador aberto com a imagem legível, `Esc` → fechado, sem erros de console.

## Observação

O wireframe traz nomes de marca reais (Natura, Mercado Livre) e nomes de usuário fictícios ("Anakin", "Darth Vader") — dados de exemplo, sem informação pessoal real. Vou publicar como está; se preferir, dá para recortar ou borrar alguma parte antes.
