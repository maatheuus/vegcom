import {
  BookOpenIcon,
  BooksIcon,
  ChurchIcon,
  DeviceMobileIcon,
  ForkKnifeIcon,
  GlobeIcon,
  LeafIcon,
  MegaphoneIcon,
  MusicNoteIcon,
  StorefrontIcon,
  SunHorizonIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react";
import type { Curiosity } from "../page/CuriositiesPage";

export const didYouKnowPhrases = [
  "O veganismo negro é um movimento de resistência que conecta justiça social, saúde e espiritualidade, inspirado em práticas africanas ancestrais.",
  "Dick Gregory, ícone dos direitos civis, tornou-se vegetariano em 1965 aplicando a filosofia de não-violência de Martin Luther King Jr. à sua alimentação.",
  "Afro-americanos são a população que mais cresce no veganismo nos EUA, resgatando tradições alimentares baseadas em plantas de seus ancestrais africanos.",
];

export const historyTimeline = [
  {
    year: "Séc. XIII–XIX",
    region: "Etiópia",
    title: "Jejum vegan etíope",
    description:
      "A Igreja Ortodoxa Etíope prescreve abstinência total de produtos animais por até 252 dias no ano. Essa tradição, mantida por milhões de africanos negros, é uma das práticas veganas coletivas mais antigas e contínuas do mundo.",
    category: "african",
    icon: ChurchIcon,
    // Church: representa diretamente a instituição religiosa responsável pela prática
    source: {
      label: "Wikipedia — Ethiopian Orthodox fasting",
      url: "https://en.wikipedia.org/wiki/Fasting_and_abstinence_in_the_Ethiopian_Orthodox_Tewahedo_Church",
    },
  },
  {
    year: "Séc. XIX–XX",
    region: "África Ocidental",
    title: "Dieta pré-colonial plant-based",
    description:
      "A dieta tradicional da África Ocidental era majoritariamente baseada em vegetais — inhame, feijão-fradinho, batata-doce, folhas verdes. A carne era condimento, não prato principal. O colonialismo impôs a dieta europeia, distorcendo essa herança.",
    category: "african",
    icon: LeafIcon,
    // Leaf: representa as raízes vegetais e a conexão com a terra
    source: {
      label: "NEHA Magazine — Race and the Roots of Veganism",
      url: "http://www.nehamag.com/savor/race-and-roots-black-veganism/",
    },
  },
  {
    year: "Anos 1930",
    region: "Jamaica",
    title: "Ital: a dieta Rastafari",
    description:
      "O movimento Rastafari, nascido na Jamaica como resistência ao colonialismo britânico, desenvolve o conceito de Ital — alimentação natural, orgânica e sem carne. Comer Ital é um ato espiritual e político de descolonização do corpo.",
    category: "diaspora",
    icon: SunHorizonIcon,
    // SunHorizon: simboliza o horizonte africano e a espiritualidade afrocêntrica Rastafari
    source: {
      label: "Wikipedia — Ital (Rastafari)",
      url: "https://en.wikipedia.org/wiki/Ital",
    },
  },
  {
    year: "1950s",
    region: "Chicago, EUA",
    title: "Alvenia Fulton abre o primeiro café vegetariano negro",
    description:
      "A médica naturopata Alvenia Fulton inaugurou o primeiro café vegetariano no South Side de Chicago. Ela foi mentora de Dick Gregory e pioneira invisibilizada da saúde plant-based na comunidade negra norte-americana.",
    category: "activist",
    icon: StorefrontIcon,
    // Storefront: representa literalmente o café/loja que ela abriu
    source: {
      label: "Atlas Obscura — The Legacy of Dick Gregory's Vegetarian Cookbook",
      url: "https://www.atlasobscura.com/articles/dick-gregory-cookbook",
    },
  },
  {
    year: "1962",
    region: "EUA",
    title: "Elijah Muhammad conecta alimentação e libertação",
    description:
      "O líder da Nação do Islã publica 'How to Eat to Live', conectando dieta vegetariana à saúde e à luta contra a opressão racial. Muhammad dizia que a 'soul food' era comida de escravizados e incentivava a comunidade a abandoná-la.",
    category: "diaspora",
    icon: BookOpenIcon,
    // BookOpen: referência direta ao livro publicado, marco do evento
    source: {
      label: "Wikipedia — How to Eat to Live",
      url: "https://en.wikipedia.org/wiki/How_to_Eat_to_Live",
    },
  },
  {
    year: "1965",
    region: "EUA",
    title: "Dick Gregory: ativismo pelos direitos civis e veganismo",
    description:
      "O ativista Dick Gregory adota o vegetarianismo durante sua militância ao lado de Martin Luther King Jr., conectando a não-violência do movimento à recusa em matar animais. Em 1967, torna-se vegan frutariano — décadas à frente do seu tempo.",
    category: "activist",
    icon: MegaphoneIcon,
    // Megaphone: representa o ativismo público e os discursos nos protestos civis
    source: {
      label: "Animals 24-7 — Dick Gregory, 50 years a vegan activist",
      url: "https://www.animals24-7.org/2017/08/25/dick-gregory-50-years-a-vegan-activist-dies-at-84/",
    },
  },
  {
    year: "1969",
    region: "Israel / Global",
    title: "African Hebrew Israelites: comunidade vegan negra global",
    description:
      "O grupo fundado por Ben Ammi Carter estabelece uma comunidade 100% vegan em Dimona, Israel, por razões espirituais e de saúde. Desde então, exportam sua filosofia para a diáspora africana ao redor do mundo.",
    category: "diaspora",
    icon: GlobeIcon,
    // Globe: reflete o alcance global do grupo e o conceito de diáspora africana
    source: {
      label: "Wikipedia — African Hebrew Israelites of Jerusalem",
      url: "https://en.wikipedia.org/wiki/African_Hebrew_Israelites_of_Jerusalem",
    },
  },
  {
    year: "1990",
    region: "Nova York, EUA",
    title: "KRS-One e o hip-hop plant-based",
    description:
      "O rapper KRS-One lança 'Beef' no álbum Edutainment — uma crítica direta à indústria da carne e ao seu impacto na saúde negra. A música influenciou toda uma geração de artistas e ativistas do hip-hop a questionar o que colocam no prato.",
    category: "cultural",
    icon: MusicNoteIcon,
    // MusicNote: representa o hip-hop como veículo cultural e político
    source: {
      label: "Wikipedia — Edutainment (album)",
      url: "https://en.wikipedia.org/wiki/Edutainment_(album)",
    },
  },
  {
    year: "2009",
    region: "EUA",
    title: "Sistah Vegan — a academia negra encontra o veganismo",
    description:
      "A pesquisadora A. Breeze Harper organiza a antologia 'Sistah Vegan', reunindo vozes de mulheres negras veganas. O livro inaugura o campo acadêmico do veganismo negro interseccional, conectando alimentação a racismo sistêmico e justiça ambiental.",
    category: "literary",
    icon: BooksIcon,
    // Books: referência à antologia acadêmica e ao campo literário que ela inaugura
    source: {
      label: "Lantern Books — Sistah Vegan",
      url: "https://www.lanternpm.org/book/sistah-vegan/",
    },
  },
  {
    year: "2014",
    region: "EUA",
    title: "Afro-Vegan: Bryant Terry reinventa a culinária negra",
    description:
      "O chef e ativista Bryant Terry publica 'Afro-Vegan', ressignificando a culinária afro-americana com ingredientes plant-based. O livro se torna símbolo cultural — as palavras 'Afro' e 'Vegan' juntas na capa foram uma disrupção da narrativa branca do veganismo mainstream.",
    category: "literary",
    icon: ForkKnifeIcon,
    // ForkKnife: representa a culinária e a transformação do prato como ato político
    source: {
      label: "Ten Speed Press — Afro-Vegan",
      url: "https://www.penguinrandomhouse.com/books/220690/afro-vegan-by-bryant-terry/",
    },
  },
  {
    year: "2015",
    region: "EUA / Global",
    title: "Black Vegans Rock",
    description:
      "A ativista Aph Ko cria o projeto Black Vegans Rock, cansada do estereótipo de que veganos são brancos. Dois anos depois, Aph e sua irmã Syl Ko cunham o termo 'veganismo negro' como disciplina filosófica autônoma.",
    category: "activist",
    icon: UsersThreeIcon,
    // UsersThree: representa o movimento coletivo e a comunidade que o projeto construiu
    source: {
      label:
        "Aph Ko — Aphro-ism: Essays on Pop Culture, Feminism, and Black Veganism",
      url: "https://www.lanternpm.org/book/aphro-ism/",
    },
  },
  {
    year: "2020–hoje",
    region: "Global",
    title: "Tabitha Brown e a virada digital",
    description:
      "A influenciadora Tabitha Brown conquista milhões de seguidores no TikTok compartilhando receitas veganas acessíveis. Sua abordagem — acolhedora e enraizada na cultura negra do Sul dos EUA — democratiza o veganismo e prova que ele pode ser profundamente afro.",
    category: "digital",
    icon: DeviceMobileIcon,
    // DeviceMobile: representa o TikTok e a era das redes sociais como plataforma de ativismo alimentar
    source: {
      label: "The Guardian — Tabitha Brown: the vegan who became America's mom",
      url: "https://www.theguardian.com/food/2021/jun/05/tabitha-brown-vegan-tiktok-celebrity",
    },
  },
];

export const fastFacts = [
  {
    value: "~79M",
    label: "veganos no mundo",
    source: {
      label: "World Population Review — Vegan Statistics",
      url: "https://worldpopulationreview.com/country-rankings/vegan-countries",
    },
  },
  {
    value: "1944",
    label: "ano da fundação da Vegan Society",
    source: {
      label: "The Vegan Society — History",
      url: "https://www.vegansociety.com/about-us/history",
    },
  },
  {
    value: "10%+",
    label: "crescimento anual do mercado plant-based",
    source: {
      label: "Market Research — Plant-Based Food CAGR",
      url: "https://www.marketresearchfuture.com/reports/plant-based-food-market-6526",
    },
  },
  {
    value: "73%",
    label: "redução na pegada de carbono com dieta vegana",
    source: {
      label: "University of Oxford — Vegan diet carbon footprint study",
      url: "https://www.ox.ac.uk/news/2023-07-20-vegan-diet-cuts-your-carbon-footprint-quarter-major-new-study-finds",
    },
  },
];

export const defaultCuriosities: Curiosity[] = [
  {
    id: "1",
    category: "estatística",
    title: "Afro-americanos são 3x mais propensos ao veganismo",
    description:
      "Pesquisas mostram que aproximadamente 8% dos afro-americanos são vegetarianos ou veganos, comparado a 3,4% da população geral dos EUA. As mulheres negras lideram esse movimento de transformação alimentar. Este fenômeno desafia completamente o estereótipo de que o veganismo é um movimento predominantemente branco e de classe média.",
    year: "2015-2024",
    highlight: "8% vs 3,4%",
    source: "Pew Research Center",
  },
  {
    id: "2",
    category: "história",
    title: "George Washington Carver: O pioneiro esquecido",
    description:
      "Nascido antes da abolição da escravatura (1865), Carver foi sequestrado quando bebê e vendido como escravo. Após ser resgatado, tornou-se professor no Instituto Tuskegee e desenvolveu mais de 300 produtos à base de amendoim e 118 produtos de batata-doce. Ele defendia uma alimentação centrada em vegetais como forma de independência alimentar para comunidades negras, ensinando agricultura sustentável e autossuficiência.",
    year: "1896-1943",
    highlight: "Pai da agricultura sustentável",
  },
  {
    id: "3",
    category: "cultura",
    title: "Movimento Rastafari e a dieta Ital",
    description:
      'Desde os anos 1930 na Jamaica, o movimento Rastafari desenvolveu a dieta "Ital" (derivada de "vital"), completamente baseada em plantas, sem sal, produtos químicos ou alimentos processados. Esta filosofia alimentar considera o corpo um templo e a comida uma medicina espiritual. A dieta Ital influenciou profundamente o veganismo negro moderno e se espalhou globalmente através da música reggae e da cultura caribenha.',
    year: "1930s",
    highlight: "Comida como espiritualidade",
  },
  {
    id: "4",
    category: "personalidade",
    title: "Dick Gregory: 50 anos de ativismo vegano",
    description:
      'O comediante e ativista dos direitos civis tornou-se vegetariano em 1965 e vegano crudívoro em 1967, após um ataque cardíaco. Gregory conectou a não-violência do movimento pelos direitos civis à compaixão pelos animais, dizendo: "A filosofia da não-violência que aprendi no movimento dos direitos civis deveria se estender a todas as criaturas vivas." Ele viveu até os 84 anos, atribuindo sua longevidade à dieta plant-based.',
    year: "1965-2017",
    highlight: "50+ anos de ativismo",
  },
  {
    id: "5",
    category: "cultura",
    title: "Hip-Hop abraça o veganismo em massa",
    description:
      '8 de 10 membros do Wu-Tang Clan são veganos ou vegetarianos. Em 2016, "saúde e bem-estar" foi oficialmente adicionado como o 10º elemento do Hip-Hop. Jay-Z e Beyoncé oferecem ingressos grátis para shows a fãs que adotem o veganismo. Cardi B lançou uma linha de moda vegana, Jaden Smith criou um food truck vegano para pessoas em situação de rua, e artistas como A$AP Rocky incluem mensagens veganas em suas músicas.',
    year: "2016-presente",
    highlight: "Wu-Tang: 80% vegano",
  },
  {
    id: "6",
    category: "personalidade",
    title: "Família King e o legado de não-violência",
    description:
      'Coretta Scott King adotou o veganismo em 1995, inspirada por seu filho Dexter. Martin Luther King Jr. também era vegetariano e comparava a opressão humana à exploração animal: "Injustiça em qualquer lugar é uma ameaça à justiça em todo lugar." Dexter King disse: "Se você é contra violência e a favor da paz, você tem que estar do lado dos animais também." A família King vê o veganismo como extensão natural da filosofia de não-violência.',
    year: "1987-2006",
    highlight: "Legado de compaixão",
  },
  {
    id: "7",
    category: "história",
    title: "Soul Vegetarian: A maior rede vegana do mundo",
    description:
      'Fundada em 1983 pelos Hebrew Israelites Africanos de Jerusalém, a Soul Vegetarian chegou a ser a maior cadeia de restaurantes veganos do mundo, com 14 locais espalhados pelos EUA, África e Israel. Eles provaram que comida vegana pode ser autêntica soul food, servindo pratos como "hambúrguer de girassol" e "sorvete de coco" décadas antes do boom vegano atual. O movimento começou em 1969 quando o grupo adotou o veganismo por razões espirituais.',
    year: "1983-presente",
    highlight: "14 restaurantes globais",
  },
  {
    id: "8",
    category: "saúde",
    title: "Combatendo disparidades de saúde sistêmicas",
    description:
      'Comunidades negras sofrem desproporcionalmente de diabetes (2x mais), hipertensão (40% dos adultos) e doenças cardíacas. O veganismo negro surge como resistência ao "complexo industrial da carne" e aos "food deserts" (áreas sem acesso a alimentos frescos). É uma forma de recuperar a soberania alimentar e reconectar com dietas ancestrais africanas, que eram naturalmente ricas em plantas antes da colonização e escravidão.',
    year: "Atual",
    highlight: "Alimentação como medicina",
  },
  {
    id: "9",
    category: "história",
    title: "Alvenia Fulton: Pioneira em Chicago",
    description:
      'Nos anos 1950, Alvenia Fulton abriu o primeiro estabelecimento vegetariano no South Side de Chicago, o "Fultonia Health Food Center". Ela foi mentora de Dick Gregory e tratou celebridades como Redd Foxx com jejuns de suco. Fulton escreveu vários livros sobre alimentação natural e foi uma das primeiras a conectar saúde holística com libertação negra, décadas antes do movimento wellness mainstream.',
    year: "1950s-1999",
    highlight: "Mãe do wellness negro",
  },
  {
    id: "10",
    category: "personalidade",
    title: "Angela Davis: Veganismo como justiça interseccional",
    description:
      'A ativista, filósofa e ex-Pantera Negra conecta a exploração animal com a opressão de grupos marginalizados. Davis argumenta: "Acho que há uma conexão entre a forma como tratamos animais e a forma como tratamos pessoas que estão na base da pirâmide social." Ela vê o veganismo como parte integral da luta abolicionista moderna, conectando prisões, escravidão e matadouros como sistemas interligados de opressão.',
    year: "Presente",
    highlight: "Justiça para todos",
  },
  {
    id: "11",
    category: "estatística",
    title: "10 Milhões de Mulheres Negras Veganas",
    description:
      'O movimento "10 Million Black Vegan Women", iniciado por Tracye McQuirter em 2020, alcançou mais de 12.000 mulheres negras em apenas 21 dias. Participantes relataram redução de pressão arterial, perda de peso, mais energia e clareza mental. O movimento continua crescendo, com o objetivo de alcançar 10 milhões de mulheres até 2030, tornando-se o maior movimento vegano liderado por negros da história.',
    year: "2020-presente",
    highlight: "12.000 em 21 dias",
  },
  {
    id: "12",
    category: "cultura",
    title: "Igreja Adventista e 130 anos de vegetarianismo",
    description:
      "A Universidade Oakwood no Alabama, uma instituição historicamente negra adventista, promove o vegetarianismo desde 1896. A Igreja Adventista do Sétimo Dia foi uma das primeiras denominações cristãs a aceitar membros afro-americanos como iguais e promover dieta plant-based como parte da fé. Estudos mostram que adventistas negros vivem em média 7-10 anos mais que a população geral.",
    year: "1890s-presente",
    highlight: "130+ anos de tradição",
  },
  {
    id: "13",
    category: "história",
    title: "Elijah Muhammad e a transformação alimentar",
    description:
      'O líder da Nação do Islã publicou "How to Eat to Live" em 1962, conectando alimentação à saúde mental e espiritual. Ele escreveu: "Somos, por natureza, pessoas que comem vegetais e frutas" e rejeitou a soul food tradicional como "comida de escravo". Muhammad proibiu carne de porco e incentivou jejuns, influenciando milhões de muçulmanos negros a adotarem dietas mais saudáveis. Malcolm X também seguiu estas práticas alimentares.',
    year: "1962-1975",
    highlight: "Alimentação como libertação",
  },
  {
    id: "14",
    category: "cultura",
    title: "Slutty Vegan: Revolucionando o fast-food",
    description:
      'Pinky Cole começou vendendo hambúrgueres veganos pelo Instagram de seu apartamento em 2018. Hoje, o Slutty Vegan tem filas de horas em Atlanta, com celebridades como Snoop Dogg e Usher como clientes regulares. Cole diz: "Meu público-alvo são comedores de carne. Veganos já fizeram a escolha consciente." A empresa vale mais de $100 milhões e planeja expansão nacional, provando que veganismo negro é um negócio lucrativo.',
    year: "2018-presente",
    highlight: "De Instagram a império",
  },
  {
    id: "15",
    category: "história",
    title: "Alimentação ancestral africana era plant-based",
    description:
      'Antes da colonização e escravidão, dietas da África Ocidental eram naturalmente ricas em grãos, vegetais, frutas e legumes. O consumo pesado de carne foi imposto durante a escravidão, quando escravizados recebiam apenas os "restos" dos animais. Pratos como quiabo, inhame, feijão-fradinho e folhas verdes são originalmente africanos e naturalmente veganos. O movimento vegano negro atual é visto como um retorno às raízes ancestrais, não uma tendência nova.',
    year: "Pré-colonial",
    highlight: "Retorno às origens",
  },
  {
    id: "16",
    category: "religião",
    title: "Igreja Ortodoxa Etíope: 208 dias veganos por ano",
    description:
      "A Igreja Ortodoxa Etíope pratica jejum vegano por mais da metade do ano - exatos 208 dias. Durante os períodos de jejum, os fiéis não consomem nenhum produto animal e comem apenas uma refeição após às 15h. Isso faz com que a culinária etíope tenha uma das maiores variedades de pratos veganos do mundo, com centenas de receitas tradicionais à base de plantas desenvolvidas ao longo de séculos.",
    year: "Séc. IV-presente",
    highlight: "208 dias veganos/ano",
    source: "Igreja Ortodoxa Etíope",
  },
  {
    id: "17",
    category: "cultura",
    title: "Misir Wot: O curry etíope que conquistou o mundo",
    description:
      "O misir wot, um ensopado picante de lentilhas vermelhas da Etiópia, tornou-se um dos pratos veganos mais populares globalmente. Servido tradicionalmente com injera (pão fermentado sem glúten), este prato é preparado com uma mistura complexa de especiarias chamada berbere. A receita foi desenvolvida durante os períodos de jejum religioso e hoje é encontrada em restaurantes veganos de Nova York a Londres, levando os sabores da África Oriental para o mundo.",
    year: "Tradicional-presente",
    highlight: "Sabor global etíope",
  },
  {
    id: "18",
    category: "estatística",
    title: "África do Sul: Movimento vegano negro emergente",
    description:
      "O grupo 'Black Vegans of South Africa' cresceu de 50 para mais de 3.000 membros em apenas 2 anos. A organização oferece um espaço seguro para veganos negros sul-africanos discutirem questões raciais no movimento vegano, que historicamente era dominado por brancos no país. O movimento ganhou força durante a pandemia, com workshops online sobre culinária vegana africana tradicional e ativismo alimentar.",
    year: "2020-presente",
    highlight: "6000% crescimento em 2 anos",
    source: "Black Vegans of South Africa",
  },
  {
    id: "19",
    category: "história",
    title: "Quilombos brasileiros e alimentação ancestral",
    description:
      "Os quilombos no Brasil desenvolveram sistemas alimentares baseados em plantas nativas e conhecimento botânico africano. Comunidades como Quilombo de Kalunga em Goiás mantêm tradições de mais de 300 anos, cultivando mandioca, pequi, buriti e centenas de plantas medicinais. Estudos mostram que estas comunidades tinham dietas 70% baseadas em plantas, muito antes do termo 'vegano' existir, usando conhecimento ancestral para sobreviver e prosperar.",
    year: "1600s-presente",
    highlight: "300+ anos de tradição",
  },
  {
    id: "20",
    category: "personalidade",
    title: "Dr. A. Breeze Harper: Academia negra vegana",
    description:
      "Doutora em Alimentação e Sociedade pela UC Davis, A. Breeze Harper fundou o 'Sistah Vegan Project' em 2007, o primeiro projeto acadêmico focado na interseção entre raça, gênero e veganismo. Seu livro 'Sistah Vegan' documentou as experiências de mulheres negras veganas, criando um campo de estudo inteiramente novo. Harper conecta o veganismo negro ao feminismo interseccional e à justiça alimentar, influenciando uma geração de acadêmicas negras veganas.",
    year: "2007-presente",
    highlight: "Pioneira acadêmica",
  },
  {
    id: "21",
    category: "cultura",
    title: "Candomblé e alimentação sagrada vegetal",
    description:
      "Várias tradições do Candomblé brasileiro incluem rituais com comidas sagradas exclusivamente vegetais. Orixás como Oxóssi são homenageados com pratos veganos tradicionais como acarajé feito sem camarão, vatapá vegetal e ebós (oferendas) à base de frutas, grãos e verduras. Mae Stella de Oxóssi, falecida em 2018, promovia a alimentação natural em terreiros, conectando espiritualidade afro-brasileira com práticas alimentares conscientes.",
    year: "Séc. XVI-presente",
    highlight: "Espiritualidade vegetal",
  },
  {
    id: "22",
    category: "estatística",
    title: "Nigéria: Potência vegetal da África Ocidental",
    description:
      "A Nigéria produz 70% do inhame mundial e tem mais de 200 variedades de vegetais nativos. Pratos tradicionais nigerianos como egusi (feito com sementes de melão), okra stew e jollof rice com vegetais são naturalmente veganos quando preparados tradicionalmente. O país tem a maior diversidade de leguminosas da África, com mais de 30 espécies nativas. Jovens nigerianos urbanos estão redescobbrindo essas tradições através do movimento #NaijaVegan.",
    year: "Presente",
    highlight: "70% do inhame mundial",
    source: "FAO",
  },
  {
    id: "23",
    category: "personalidade",
    title: "Tabitha Brown: De Wendy's ao veganismo viral",
    description:
      "A atriz Tabitha Brown viralizou no TikTok em 2020 com reviews de comida vegana, acumulando mais de 5 milhões de seguidores. Ela conta que se curou de depressão, enxaquecas crônicas e dor nas articulações após adotar o veganismo em 2017. Brown lançou sua própria linha de temperos veganos no Walmart e escreveu um livro de receitas, tornando-se uma das influenciadoras veganas negras mais poderosas do mundo, com alcance de milhões de pessoas.",
    year: "2020-presente",
    highlight: "5 milhões de seguidores",
  },
  {
    id: "24",
    category: "cultura",
    title: "Caribe: Tradição vegana além do Ital",
    description:
      "Além da dieta Ital rastafari, o Caribe tem séculos de tradições vegetais. Em Trinidad e Tobago, o 'doubles' (pão com curry de grão-de-bico) é street food vegana tradicional. Em Barbados, pratos como 'cou-cou' (polenta com quiabo) e 'flying fish' vegetal são populares. Cuba desenvolveu uma rica tradição de medicina herbária afro-cubana, onde plantas são tanto alimento quanto remédio, influenciando o movimento vegano caribenho moderno.",
    year: "Séc. XVII-presente",
    highlight: "Diversidade caribenha",
  },
  {
    id: "25",
    title: "Bryant Terry: Chef revolução vegana negra",
    category: "personalidade",
    description:
      "O chef e autor Bryant Terry transformou a soul food em alta gastronomia vegana com seus 6 livros de culinária premiados. Seu restaurante virtual 'The Cook Up' durante a pandemia serviu milhares de refeições veganas gratuitas para comunidades negras. Terry é chef residente no Museum of the African Diaspora em San Francisco e foi nomeado uma das 100 pessoas mais influentes pela revista Time, elevando a culinária vegana negra ao status de arte culinária séria.",
    year: "2006-presente",
    highlight: "6 livros premiados",
  },
  {
    id: "26",
    category: "história",
    title: "Booker T. Washington e agricultura sustentável",
    description:
      "Booker T. Washington, fundador do Instituto Tuskegee, promoveu agricultura orgânica e dietas ricas em vegetais como forma de independência econômica negra. Em 1896, ele estabeleceu programas que ensinavam famílias negras rurais a cultivar hortas domésticas e preservar alimentos sem produtos químicos. Washington escreveu: 'O homem que pode produzir sua própria comida é verdadeiramente livre.' Suas ideias influenciaram gerações de agricultores negros e o movimento de soberania alimentar atual.",
    year: "1896-1915",
    highlight: "Soberania alimentar negra",
  },
  {
    id: "27",
    category: "saúde",
    title: "Ghana: Medicina tradicional e plantas",
    description:
      "Ghana possui mais de 3.000 espécies de plantas medicinais catalogadas, muitas usadas tanto como alimento quanto medicina. O Centro de Pesquisa de Plantas Medicinais de Gana documenta que 80% da população ainda usa medicina herbária tradicional. Pratos como 'kontomire stew' (folhas de mandioca) e 'abom' (folhas verdes misturadas) são considerados tanto nutrição quanto medicina preventiva, mostrando como comunidades africanas integraram saúde e alimentação vegetal por milênios.",
    year: "Tradicional-presente",
    highlight: "3.000 espécies medicinais",
    source: "Centro de Pesquisa Ghana",
  },
  {
    id: "28",
    category: "estatística",
    title: "Reino Unido: Veganismo negro triplica",
    description:
      "Entre 2016-2021, o número de veganos negros no Reino Unido triplicou, saltando de 1,2% para 3,7% da população negra britânica. A organização 'Black Vegans Rock' cresceu de 500 para mais de 15.000 membros, organizando eventos, workshops culinários e ativismo. Pesquisas mostram que 65% dos novos veganos negros britânicos citam saúde como motivação principal, seguido por questões éticas (42%) e ambientais (38%).",
    year: "2016-2021",
    highlight: "Crescimento de 300%",
    source: "Black Vegans Rock UK",
  },
  {
    id: "29",
    category: "cultura",
    title: "Senegal: Thieboudienne vegano ancestral",
    description:
      "O prato nacional senegalês thieboudienne (arroz com peixe) tem versões vegetarianas tradicionais chamadas 'thiebou yapp' que datam de séculos. Durante a estação seca, quando pescadores migravam, comunidades preparavam versões com feijão-fradinho, quiabo, berinjela e folhas de baobá. O chef Pierre Thiam está revivendo essas receitas esquecidas, mostrando que a culinária vegana africana é ancestral, não moderna. Ele opera restaurantes em Nova York servindo autêntica comida senegalesa vegana.",
    year: "Tradicional-presente",
    highlight: "Tradição milenar",
  },
  {
    id: "30",
    category: "personalidade",
    title: "Kimberly Snyder: Nutrição holística negra",
    description:
      "A nutricionista Kimberly Snyder, autora de 4 best-sellers do New York Times, revolucionou o wellness vegano ao conectar alimentação plant-based com saúde mental e espiritualidade. Seus 'Glowing Green Smoothies' se tornaram virais entre celebridades negras como Kerry Washington e Alicia Keys. Snyder fundou a Solluna, empresa de suplementos veganos que doa 1% dos lucros para organizações de justiça alimentar em comunidades negras, combinando negócios conscientes com ativismo nutricional.",
    year: "2011-presente",
    highlight: "4 best-sellers NY Times",
  },
  {
    id: "bv1",
    category: "história",
    title: "Dick Gregory: Pioneiro do Veganismo nos Direitos Civis",
    description:
      "O comediante e ativista Dick Gregory tornou-se vegetariano em 1965, inspirado pela filosofia de não-violência de Martin Luther King Jr. Ele defendeu o veganismo por quase 50 anos, conectando libertação negra, saúde e direitos dos animais.",
    year: "1965",
    highlight: "Ativista por 50 anos",
    source: "Dick Gregory's Natural Diet for Folks Who Eat (1974)",
  },
  {
    id: "bv2",
    category: "cultura",
    title: "Rastafari e a Dieta Ital",
    description:
      "O movimento Rastafari desenvolveu a dieta Ital na Jamaica nos anos 1930, uma alimentação baseada em plantas que rejeita alimentos processados. Esta prática inspirou o movimento moderno de veganismo negro como forma de resistência cultural.",
    year: "1930",
    highlight: "Origem na Jamaica",
    source: "Black Veganism Movement Studies",
  },
  {
    id: "bv3",
    category: "estatística",
    title: "Afro-Americanos Lideram Crescimento Vegano",
    description:
      "Segundo o Pew Research, afro-americanos são a população que mais cresce em números de veganos nos Estados Unidos, apesar de ainda haver grande disparidade na representação em mídia vegana mainstream.",
    highlight: "População que mais cresce",
    source: "Pew Research Center",
  },
  {
    id: "bv4",
    category: "personalidade",
    title: "Angela Davis: Veganismo e Justiça Social",
    description:
      "A renomada ativista e acadêmica Angela Davis conecta suas escolhas alimentares veganas à resistência contra opressão sistêmica. Ela defende que rejeitar a indústria da carne desafia o status quo e promove um sistema alimentar mais equitativo.",
    highlight: "Ativista e acadêmica",
    source: "Psychology Today (2024)",
  },
  {
    id: "bv5",
    category: "história",
    title: "Raízes Africanas da Alimentação Baseada em Plantas",
    description:
      "As tradições alimentares afro-americanas têm raízes históricas nas dietas ricas em fibras dos ancestrais africanos. O veganismo negro resgata essa herança ancestral que foi perdida durante séculos de colonização.",
    highlight: "Tradição ancestral",
    source: "African American Foodways Studies",
  },
  {
    id: "bv6",
    category: "personalidade",
    title: "Tracye McQuirter: Heroína da Nutrição Vegana",
    description:
      "Considerada 'Food Hero' pela revista Vegetarian Times, Tracye McQuirter é líder em nutrição baseada em plantas e saúde de mulheres negras. Ela ajudou milhares de pessoas a adotarem o veganismo, inspirada por Dick Gregory em 1986.",
    highlight: "Food Hero",
    source: "Vegetarian Times Magazine",
  },
  {
    id: "bv7",
    category: "cultura",
    title: "Israelitas Hebreus Africanos e Alimentação Vegana",
    description:
      "O grupo Israelitas Hebreus Africanos, inspirado por Marcus Garvey, adota uma dieta baseada em plantas livre de aditivos e químicos como forma de desafiar influências ocidentais opressivas desde os anos 1950.",
    year: "1950",
    highlight: "Resistência cultural",
    source: "Saveur Magazine (2022)",
  },
  {
    id: "bv8",
    category: "história",
    title: "Líderes Negros Apagados do Movimento Animal",
    description:
      "Frederick Rivers Barnwell, John Lemon e Richard Carroll foram líderes negros reconhecidos no movimento humanitário animal do início do século XX, mas foram sistematicamente apagados da história 'oficial' do movimento devido à segregação.",
    highlight: "História apagada",
    source: "Civil Eats (2021)",
  },
  {
    id: "bv9",
    category: "saúde",
    title: "Veganismo como Ferramenta de Saúde Comunitária",
    description:
      "A Dra. Alvenia Fulton, naturopata, abriu um dos primeiros centros de saúde natural nos anos 1950, promovendo alimentação baseada em plantas como solução para disparidades de saúde na comunidade negra americana.",
    year: "1950",
    highlight: "Pioneira da naturopatia",
    source: "NEHA Magazine",
  },
  {
    id: "bv10",
    category: "cultura",
    title: "Veganismo Negro: Ato de Resistência",
    description:
      "Muitos veganos negros veem suas escolhas alimentares como resistência contra exploração sistêmica. Ao rejeitar o complexo industrial da carne, desafiam estruturas de poder e defendem um sistema alimentar mais justo e sustentável.",
    highlight: "Resistência ativa",
    source: "Psychology Today (2024)",
  },
  {
    id: "bv11",
    category: "história",
    title: "Veganismo e Movimento pelos Direitos Civis",
    description:
      "O vegetarianismo tem fortes conexões com o ativismo social negro. Dick Gregory escreveu que a 'filosofia de não-violência aprendida com Dr. King foi responsável pela mudança na minha dieta', conectando justiça racial e animal.",
    year: "1960",
    highlight: "Não-violência",
    source: "Dick Gregory's Political Primer (1972)",
  },
  {
    id: "bv12",
    category: "cultura",
    title: "Harlem: Centro do Veganismo Negro Moderno",
    description:
      "O Harlem em Nova York tornou-se um centro vibrante de restaurantes e iniciativas veganas lideradas por empreendedores negros, mantendo viva a tradição radical de alimentação baseada em plantas na cultura afro-americana.",
    highlight: "Hub cultural",
    source: "Saveur Magazine (2022)",
  },
  {
    id: "31",
    category: "personalidade",
    title: "Queen Afua: 40 Anos Transformando Saúde Feminina Negra",
    description:
      "Queen Afua (Helen Odel Robinson) fundou centros de bem-estar em 6 estados americanos e nas Ilhas Virgens desde os anos 1990. Seu livro 'Sacred Woman' está impresso há mais de 20 anos e inspirou celebridades como Eric Adams (prefeito de NYC), Erykah Badu, Stevie Wonder e Nipsey Hussle. Ela promoveu o veganismo cru e a cura holística quando isso ainda era considerado radical, ajudando mais de 10.000 clientes. Seu filho, Super Nova Slom (Legacy Torain), continua o legado familiar como chef vegano de segunda geração.",
    year: "1995-presente",
    highlight: "Inspirou prefeito de NYC",
    source: "Wikipedia, ESSENCE Festival 2025",
  },

  {
    id: "32",
    category: "personalidade",
    title: "Rosa Parks: 40 Anos de Vegetarianismo Silencioso",
    description:
      "A 'mãe do movimento pelos direitos civis' foi vegetariana por mais de 40 anos, uma parte pouco conhecida de sua história. Parks adotou a alimentação vegetariana por razões de saúde e ética, dizendo: 'Por mais de quarenta anos, fui vegetariana. Crescendo, minha família tinha pouco dinheiro - tive problemas de saúde cedo na vida por causa da má nutrição. Comer saudável é uma prioridade para mim.' Ela praticava yoga e via a alimentação plant-based como extensão natural de sua luta pela justiça.",
    year: "1965-2005",
    highlight: "40+ anos vegetariana",
    source: "PETA, Rosa Parks Museum",
  },

  {
    id: "33",
    category: "história",
    title: "MOVE: O Movimento Vegano Que Filadélfia Bombardeou",
    description:
      "A organização MOVE, fundada em 1972 por John Africa, era uma comuna anarco-primitivista, anti-racista e vegana revolucionária. Membros comiam apenas alimentos crus (frutas, vegetais, nozes), rejeitavam tecnologia e medicina moderna, e defendiam direitos dos animais. Em 13 de maio de 1985, a polícia de Filadélfia bombardeou a sede do MOVE, matando 11 pessoas (incluindo 5 crianças) e destruindo 65 casas. Foi a primeira vez que uma cidade americana se bombardeou. Nenhum oficial foi criminalmente acusado. A organização continua ativa defendendo que 'toda vida é sagrada'.",
    year: "1972-presente",
    highlight: "Bombardeados em 1985",
    source: "Wikipedia, PBS NewsHour 2025",
  },

  {
    id: "34",
    category: "cultura",
    title: "KRS-One: Hip-Hop Contra a Indústria da Carne desde 1990",
    description:
      "O lendário rapper KRS-One lançou 'Beef' em 1990, possivelmente a primeira música de rap dedicada inteiramente aos males da indústria da carne. Letras proféticas incluem: 'É a droga número 1 nas ruas', '21 drogas diferentes são bombeadas' e 'Quanta pressão alta você ganha com pés de porco'. A música influenciou toda uma geração de rappers a pensarem sobre veganismo e 'carne na dieta escrava'. KRS-One fundou o Templo do Hip-Hop, reconhecido pela ONU por seu trabalho em não-violência e bem-estar.",
    year: "1990",
    highlight: "1ª música rap vegana",
    source: "Washington Post 1990, Medium 2019",
  },

  {
    id: "35",
    category: "personalidade",
    title: "Dr. Sebi: Herbalista Hondurenho Que Virou Lenda",
    description:
      "Alfredo Darrington Bowman (Dr. Sebi), herbalista hondurenho, promoveu dieta alcalina vegana por mais de 40 anos, alegando curar AIDS, diabetes, câncer e outras doenças. Teve clientes como Michael Jackson, Lisa 'Left Eye' Lopes, John Travolta e Nipsey Hussle. Fundou o Instituto de Pesquisa USHA em Honduras nos anos 1980. Apesar da controvérsia médica, ganhou caso na Suprema Corte em 1993 acusado de praticar medicina sem licença. Morreu em 2016 sob custódia policial em Honduras aos 82 anos. Seu legado inspira milhões através do movimento de alimentação alcalina.",
    year: "1980s-2016",
    highlight: "Ganhou na Suprema Corte",
    source: "Wikipedia, Blavity, McGill University",
  },

  {
    id: "36",
    category: "personalidade",
    title: "Erykah Badu: Rainha do Neo-Soul Vegana",
    description:
      "Erykah Badu tornou-se vegetariana em 1989 e vegana em 1997, nunca mais olhando para trás. Ela apareceu no documentário 'Holistic Wellness for the Hip-Hop Generation' com Common, defendendo abordagens holísticas para a saúde. Badu trabalha continuamente com Queen Afua e Super Nova Slom para espalhar o movimento vegano negro. Em 2008, disse à VegNews: '[O que animais de fazenda] suportam é terrível... pessoas negras, pessoas pobres - nós realmente não fomos apresentados às injustiças por trás do que comemos... Comida vegana é soul food em sua forma mais verdadeira.'",
    year: "1989-presente",
    highlight: "Soul food verdadeiro",
    source: "VegNews 2008, Civil Eats 2019",
  },

  {
    id: "37",
    category: "história",
    title: "Dexter Scott King: Legado Vegano da Família King",
    description:
      "Dexter Scott King, filho de Martin Luther King Jr. e presidente do Centro King para Mudança Social Não-Violenta, é vegano desde os anos 1980. Foi introduzido ao veganismo por Dick Gregory. Dexter declarou: 'Se você é contra violência e a favor da paz, você tem que estar do lado dos animais também.' Ele vê o veganismo como extensão natural da filosofia de não-violência de seu pai, conectando justiça racial e animal. Martin Luther King Jr. era vegetariano e comparava opressão humana à exploração animal.",
    year: "1980s-2015",
    highlight: "Legado King vegano",
    source: "Striving with Systems 2015",
  },

  {
    id: "38",
    category: "personalidade",
    title: "Aph Ko e Syl Ko: Irmãs que Teorizaram o Veganismo Negro",
    description:
      "As irmãs Aph Ko e Syl Ko cunharam o termo 'Black Veganism' e criaram a primeira estrutura teórica interseccional conectando especismo e racismo. Seu livro 'Aphro-ism: Essays on Pop Culture, Feminism, and Black Veganism from Two Sisters' (2017) tornou-se texto fundamental. Syl Ko argumenta que 'veganismo negro é uma ética animal gerada dentro de um compromisso anti-racista.' Em 2021, o Instituto de Estudos Críticos de Animais chamou o veganismo negro de 'disciplina emergente'. Seu trabalho revolucionou como entendemos justiça animal através da lente racial.",
    year: "2017-presente",
    highlight: "Criaram a teoria",
    source: "Wikipedia, Healthline 2022",
  },

  {
    id: "39",
    category: "estatística",
    title: "8% dos Afro-Americanos São Veganos ou Vegetarianos",
    description:
      "Pesquisa de 2015 do Pew Research Center revelou que aproximadamente 8% dos afro-americanos são vegetarianos ou veganos, comparado a apenas 3,4% da população geral dos EUA - mais que o dobro! Afro-americanos são a demografia que mais cresce no veganismo americano. Apesar disso, até 2018, só na terceira página do Shutterstock aparecia uma pessoa de cor ao buscar 'pessoa vegana', demonstrando a invisibilidade do veganismo negro na mídia mainstream.",
    year: "2015",
    highlight: "8% vs 3,4%",
    source: "Pew Research Center, Wikipedia",
  },

  {
    id: "40",
    category: "cultura",
    title: "Hip-Hop Abraça Veganismo: De KRS-One a Jay-Z",
    description:
      "A música 'Beef' de KRS-One (1990) foi pioneira, mas o hip-hop explodiu em veganismo nos anos 2010. Jay-Z e Beyoncé ofereceram ingressos grátis para shows a fãs que adotassem o veganismo. Cardi B lançou linha de moda vegana. Jaden Smith criou food truck vegano 'I Love You Restaurant' servindo refeições grátis para pessoas em situação de rua. A$AP Rocky, Lizzo, Waka Flocka Flame, e Will.i.am (#vegang) são publicamente veganos. Em 2016, 'saúde e bem-estar' foi oficialmente adicionado como o 10º elemento do Hip-Hop.",
    year: "2016-presente",
    highlight: "10º elemento do Hip-Hop",
    source: "Medium 2019, Local Palate 2023",
  },

  {
    id: "41",
    category: "cultura",
    title: "Omowale Adewale e o Black VegFest de Nova York",
    description:
      "Omowale Adewale fundou o Black VegFest anual no Weeksville Heritage Center no Brooklyn. O evento celebra a rica história do veganismo negro em NYC com workshops de saúde comunitária, demonstrações de culinária, painéis educacionais e práticas de bem-estar. Adewale argumenta: 'Há uma história de veganismo negro nos EUA, mas o recente aumento é parcialmente porque você adora se ver representado. Essa é uma das principais razões pelas quais a comunidade negra realmente se galvanizou em torno da ideia vegana.'",
    year: "2018-presente",
    highlight: "Festival anual Brooklyn",
    source: "Civil Eats 2019, Wikipedia",
  },

  {
    id: "42",
    category: "personalidade",
    title: "Nipsey Hussle: Documentário Sobre Dr. Sebi",
    description:
      "Antes de sua morte trágica em 2019, o rapper Nipsey Hussle estava produzindo um documentário sobre Dr. Sebi e suas práticas de cura holística. Nipsey falou abertamente sobre as filosofias de vida saudável do herbalista e sua intenção de completar o filme apesar de potenciais reações negativas e conspirações em torno da morte misteriosa de Dr. Sebi. Nipsey disse: 'Se eles me matarem por este documentário, é melhor vocês reagirem.' Sua viúva Lauren London continua apoiando o trabalho de Queen Afua.",
    year: "2018-2019",
    highlight: "Documentário inacabado",
    source: "Blavity 2019",
  },

  {
    id: "43",
    category: "personalidade",
    title: "Russell Simmons: Magnata do Hip-Hop Vegano",
    description:
      "O cofundador da Def Jam Records, Russell Simmons, é um dos veganos mais vocais e felizes de Hollywood. Ele promove ativamente o veganismo através de suas redes sociais e eventos públicos. Simmons trabalhou com os Beastie Boys (também veganos) e foi instrumental em fazer o veganismo ser 'cool' no mundo do hip-hop. Ele conecta o veganismo ao ativismo social, influenciando uma nova geração de artistas e empresários negros a adotarem o estilo de vida plant-based.",
    year: "2000s-presente",
    highlight: "Mogul vegano vocal",
    source: "PETA, Medium 2019",
  },

  {
    id: "44",
    category: "personalidade",
    title: "Supa Nova Slom: Segunda Geração Vegana",
    description:
      "Supa Nova Slom (Legacy Torain), filho de Queen Afua, é chef vegano plant-based, empresário e advogado do bem-estar. Aos 43 anos em 2025, ele é literalmente o 'experimento' de 43 anos de sua mãe com vida alcalina, clorofila, comida crua e veganismo. Cresceu nos anos 80 quando o veganismo não era cultura popular. Lançou o livro 'The Remedy: The Five-Week Power Plan', linha de suplementos 'Supa Mega Greens' e documentário 'Holistic Wellness for the Hip Hop Generation'. Nome significa 'Brilhando com o brilho de cem milhões de estrelas'.",
    year: "1982-presente",
    highlight: "43 anos vegano desde bebê",
    source: "ESSENCE Festival 2025, Striving with Systems",
  },

  {
    id: "45",
    category: "história",
    title: "Carol J. Adams: Aliada Branca do Veganismo Negro",
    description:
      "Em 2017, a autora feminista e ativista animal Carol J. Adams (famosa por 'The Sexual Politics of Meat') declarou: 'Agora é a hora de ouvirmos e abraçarmos o veganismo negro.' Adams descreveu o veganismo negro como uma 'lente de raça e animalidade' através da qual o veganismo poderia ser entendido como um movimento radical de justiça social. Seu reconhecimento da interseccionalidade entre opressões ajudou a validar o veganismo negro no movimento vegano mainstream predominantemente branco.",
    year: "2017",
    highlight: "Validação acadêmica",
    source: "Wikipedia Black Veganism",
  },

  {
    id: "46",
    category: "personalidade",
    title: "Styles P: Do Bad Boy ao Juice Bar",
    description:
      "O rapper Styles P (ex-Bad Boy Records) transformou-se em empresário vegano após mudar sua própria vida através da alimentação plant-based. Fundou 'Juices for Life', rede de juice bars levando opções saudáveis para comunidades urbanas carentes. Sua missão é trazer estilo de vida baseado em plantas para áreas tradicionalmente excluídas de opções saudáveis. Lançou produtos 'Love is Love' e tornou-se colaborador da VeganSmart. Representa a transformação de gangsta rap para ativismo de saúde comunitária.",
    year: "2010s-presente",
    highlight: "Juice bars comunitários",
    source: "VeganSmart 2017",
  },

  {
    id: "47",
    category: "cultura",
    title: "Thug Kitchen: A Apropriação Cultural Desmascarada",
    description:
      "O popular blog de culinária vegana 'Thug Kitchen', com estilo de escrita 'emprestado da cultura afro-americana', gerou deals de livros e milhões de seguidores. Em 2015, foi revelado que os autores eram um casal branco, Michelle Davis e Matt Holloway. Múltiplos críticos descreveram como equivalente a blackface digital. A palavra 'thug' é historicamente racializada para descrever homens negros como criminosos. O caso exemplificou como pessoas brancas lucram com cultura negra enquanto abafam vozes veganas negras autênticas.",
    year: "2015",
    highlight: "Apropriação desmascarada",
    source: "Wikipedia, Vice",
  },

  {
    id: "48",
    category: "personalidade",
    title: "Mike Africa Jr.: Sobrevivente e Ativista MOVE",
    description:
      "Mike Africa Jr. nasceu na prisão de Filadélfia em 1978, 5 semanas depois de seus pais (Debbie e Mike Africa Sr.) serem presos em confronto com a polícia. Seus pais foram sentenciados a 30-100 anos por terceiro grau de homicídio, apesar de inocentes. Ele tinha 6 anos quando a polícia bombardeou o MOVE em 1985. Seus pais foram libertados em 2018 após 40 anos. Hoje, Mike é Diretor de Legado do MOVE, continuando a defender que 'toda vida é sagrada' e trabalhando por justiça ambiental, vegetal e animal, mantendo viva a filosofia de alimentação crua e vida natural de John Africa.",
    year: "1978-presente",
    highlight: "Nasceu na prisão",
    source: "Atmos Magazine 2021, PBS 2025",
  },

  {
    id: "49",
    category: "religião",
    title: "Nação do Islã: Dieta Vegetariana Prescrita",
    description:
      "A Nação do Islã sempre prescreveu dieta vegetariana como parte de sua prática religiosa. Elijah Muhammad publicou 'How to Eat to Live' em 1962, conectando alimentação à saúde mental e espiritual, escrevendo: 'Somos, por natureza, pessoas que comem vegetais e frutas.' Ele rejeitou soul food tradicional como 'comida de escravo', proibiu carne de porco e incentivou jejuns, influenciando milhões de muçulmanos negros a adotarem dietas mais saudáveis. Malcolm X seguiu estas práticas alimentares durante sua vida.",
    year: "1962-presente",
    highlight: "Prescrição religiosa",
    source: "Civil Eats 2019",
  },

  {
    id: "50",
    category: "personalidade",
    title: "Amirah Mercer: Historiadora do Veganismo Negro",
    description:
      "Educadora de bem-estar Amirah Mercer escreveu o influente ensaio 'A Homecoming' para o Eater, destacando a longa história de dietas baseadas em plantas na diáspora negra, frequentemente apagada pela indústria do wellness. Mercer documentou que nos anos 1980, o veganismo havia 'se estabelecido firmemente em bolsões de celebridades e ativistas' entre pessoas negras nos EUA. Ela descreve escolher o veganismo como 'revogar meu próprio cartão negro' e um ato de protesto contra exclusão por políticas governamentais de saúde e alimentação.",
    year: "2019",
    highlight: "Ensaio 'A Homecoming'",
    source: "Eater, NYU Sustainablog",
  },
];
