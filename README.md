# Lactalis Food Service × 75LAB · Proposta de parceria

Apresentação HTML da proposta da 75LAB para estruturar o **Food Service da Lactalis Brasil**: estratégia por canal, ferramentas comerciais, feiras, eventos e ativações, contratados como projetos modulares. O piloto Bidfood aparece como exemplo prático. Base: *Planejamento estratégico revisado* (20/10/2026), reunião de 16/09/2026 e retorno do Comercial de 20/10/2026.

- **Apresentação:** https://projetos.75lab.com.br/lactalis-food-service-parceria/
- Apresentadora: Vanessa Morelli, Diretora Comercial 75LAB

## Roteiro: capa + 5 telas

| Tela | Takeaway |
|---|---|
| 00 · Capa | Trailer de abertura (hotéis, hospitais, restaurantes, padarias, confeitarias, distribuidores, feiras) e a ideia central: *cada ambiente pede uma resposta própria*. |
| 01 · O desafio atual | O Food Service está em construção; o desafio é conectar direção, ferramentas e presença. Sinais do briefing → três frentes → pergunta que orienta a parceria, mais a escala do mercado (ABIA/Wise Sales). |
| 02 · Como a 75LAB pode apoiar | Da estratégia à execução, ao lado do time Lactalis: ciclo Estruturar → Equipar → Ativar → Evoluir, com o resultado esperado de cada frente e os papéis de cada parte. |
| 03 · Oportunidades por canal | Cada ambiente pede uma proposta própria; cases reais do portfólio 75LAB por canal (acordeão interativo), e feiras e eventos como pontos de contato. |
| 04 · Projetos possíveis | Projetos modulares, cada um deixando ativos para o próximo; o piloto Bidfood SP como exemplo prático, com janela de até 90 dias. |
| 05 · Contratação e próximos passos | Começar por uma prioridade e construir continuidade: o que cada proposta define, os 4 próximos passos, o critério de sucesso, o encerramento e os contatos. |

**Material de apoio (oculto, A1–A14):** mercado, concorrência (matriz de recursos), jornada do canal (shopper B2B), tendências, kit comercial em vista explodida 3D, feiras e eventos 2026/27, piloto Bidfood, cronograma, Plano de Rastreamento 75LAB (One Shot × On Timing), fluxo do sinal à decisão, indicadores, benefícios conectados, 75LAB e cases, contatos institucionais. O material de apoio só abre pelos botões "↗" das telas ou pelo menu `M`. Para voltar à tela de origem, use `Esc` ou o botão "Voltar à apresentação".

## Navegação

`→` `↓` `PageDown` `espaço` avançam e `←` `↑` `PageUp` voltam. Também funcionam a roda do mouse, o deslizar no tablet e as setas e a barra de progresso no canto inferior direito. `Home`/`End`, `M` capítulos, `N` notas da apresentadora, `F` tela cheia, `C` alterna o cursor da apresentação com o do sistema, `Esc` volta. Deep link: `#s3`, `#a9`.

O trailer de abertura roda uma vez por sessão do navegador; qualquer tecla ou clique pula. Até 820 px de largura (e em tablet em retrato) a apresentação vira rolagem vertical, com o material de apoio no botão do fim da página. Para testar o modo apresentação numa janela estreita, use `?desktop`. Com `prefers-reduced-motion`, as animações viram transições curtas.

## Arquitetura

HTML, CSS e JavaScript puros, sem build e sem dependências (as fontes vêm do Google Fonts). Palco 16:9 de 1600 × 900 que escala para caber na janela; a órbita (o swoosh do logo Lactalis) atravessa todas as telas e muda de posição a cada uma.

```
index.html              todas as telas (roteiro + material de apoio) e notas da apresentadora
assets/css/deck.css     sistema visual, telas, celular e movimento reduzido
assets/js/deck.js       ícones SVG animados, navegação e transições, trailer, contadores,
                        lightbox, acordeão de canais, kit 3D, matriz de concorrência,
                        cursor, partículas de fundo, modo celular
assets/img/brand/       logos Lactalis Brasil e 75LAB
assets/img/cases/       pranchas do portfólio 75LAB (75lab.com.br/cases)
assets/img/scenes/      fotos de ambiente (Unsplash License)
assets/img/og.jpg       imagem de compartilhamento
serve.ps1               servidor estático local (powershell -File serve.ps1 -Port 8771)
```

Identidade: azul Lactalis `#004B85`, swoosh `#5BC5F2` e fundo `#F0F4F8`, os mesmos do site lactalis.com.br, além de Poppins, a fonte do site. A camada 75LAB de execução e dados usa o lima `#C0EE4E`. Os acentos editoriais usam Instrument Serif, e os rótulos, IBM Plex Mono.

## Fontes

- Lactalis Brasil: lactalis.com.br e lactalis.com.br/quem-somos (consulta em 20/10/2026)
- Mercado: ABIA e Wise Sales, *ID Food Service* (abia.org.br, set/2026); ABIA OnePage 2026 (mar/2026); Giro News, 19/11/2025 e 16/10/2025; ABERC via Jornal do Brás, 27/07/2026
- Tendências: Abrasel via Giro News (19/03/2026 e 21/09/2026); Barômetro Ticket, Mercado & Consumo (26/03/2025); DGABC (29/08/2026)
- Concorrência: nestleprofessional.com.br; Mercado & Consumo (18/08/2024) e Jornal do Brás (15/09/2026) sobre a UFS; polenghi.com.br/profissional; scala.com.br; Giro News sobre a Vigor Profissional (2018, 2020 e 23/01/2026); tirolez.com.br/produtos/profissional; piracanjuba.com.br/produtos/food-service. As posições da matriz são leitura qualitativa da 75LAB; "não identificado" não significa que o recurso não exista.
- Bidfood: bidfood.com.br/quem-somos, mybidfood.com.br, Globalscope (2021)
- Eventos: fispalfoodservice.com.br, equipotel.com.br, abhi.org.uk (Hospitalar 2027), Giro News 03/06/2026 (APAS Show), Folha PE 23/09/2026 (Mesa SP)
- 75LAB: 75lab.com.br (credenciais e cases, consulta em 20/10/2026)

## Créditos das fotos (Unsplash License)

- chef-manteiga.jpg: Juan Manuel Núñez Méndez, unsplash.com/photos/_CaLXVUfD8g
- hotel-cafe-da-manha.jpg: Claudia Viloria, unsplash.com/photos/WIJPPnoVrDs
- confeitaria.jpg: Createasea, unsplash.com/photos/SdiL5SVw3lA
- restaurante-cozinha.jpg: Fabrizio Magoni, unsplash.com/photos/boaDpmC-_Xo
- hospital-refeicao.jpg: Qearl Hu, unsplash.com/photos/0aQuUvhlvvk
- feira-evento.jpg: Filip Rankovic Grobgaard, unsplash.com/photos/5RrhjP0bgd4

## Pendências

- Autorização para mostrar à Lactalis os cases de 3 Corações, Seara, Alltak e Abras.
- Hospitais e alimentação institucional: não há case publicado de comunicação técnica, e o card mostra "formato a desenvolver".
- Endereço da 75LAB: `[a preencher]` em A14.
- Combinações do kit por público (A5) e o funil do piloto (A7) são ilustrativos; mix, claims e fichas técnicas dependem de validação da Lactalis.
- Regras de compartilhamento de dados com o distribuidor (1ª compra e recompra) a acordar no escopo.
- Sem modelo 3D, não há experiência de AR; a vista explodida do kit é uma ilustração em CSS 3D.
