export type Article = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  content: { heading?: string; body: string }[];
  keywords: string[];
  ctaProduct?: { href: string; label: string };
};

export const conseils: Article[] = [
  {
    slug: "choisir-filet-bridon",
    title: "Comment choisir son filet de bridon : guide complet",
    description: "Cuir ou synthétique, Full ou Cob, classique ou anatomique — tout ce qu'il faut savoir pour choisir le bon filet de bridon pour votre cheval, quelle que soit votre discipline.",
    date: "2026-04-01",
    readTime: "5 min",
    category: "Conseils",
    keywords: [
      "choisir filet de bridon",
      "filet bridon cuir cheval",
      "bridon anatomique ou classique",
      "taille filet Full Cob cheval",
      "filet équitation débutant",
      "bridon cuir pleine fleur",
      "choisir bridon équitation",
      "filet cheval discipline",
    ],
    ctaProduct: { href: "/boutique", label: "Voir tous les bridons" },
    content: [
      {
        body: "Choisir un filet de bridon ne s'improvise pas. Entre les matières, les tailles, les formes anatomiques et les styles de monte, les critères sont nombreux. Ce guide vous accompagne pas à pas.",
      },
      {
        heading: "Cuir ou synthétique ?",
        body: "Le cuir pleine fleur reste la référence en équitation. Plus durable, plus souple avec le temps, respectueux de la peau du cheval — il s'entretient et se bonifie à l'usage. Les matières synthétiques sont plus accessibles mais vieillissent moins bien et offrent moins de confort à long terme.",
      },
      {
        heading: "Full ou Cob : quelle taille choisir ?",
        body: "Choisissez la taille selon la morphologie de votre cheval. La taille Full convient généralement aux chevaux de taille standard à grande. La taille Cob est recommandée pour les poneys D, petits chevaux ou chevaux à tête plus fine. En cas d'hésitation, la taille Full reste le choix le plus courant.",
      },
      {
        heading: "Filet classique ou anatomique ?",
        body: "Un filet classique convient à la grande majorité des chevaux. Un filet anatomique, avec sa têtière incurvée et sa muserolle rembourrée, est particulièrement recommandé pour les chevaux sensibles au niveau de la nuque ou du chanfrein. Il favorise la décontraction, réduit les tensions et améliore la précision des aides. Si votre cheval résiste ou semble inconfortable avec un filet classique, le choix anatomique vaut largement la peine d'être envisagé.",
      },
    ],
  },
  {
    slug: "entretien-cuir-equestre",
    title: "Entretien du cuir : les gestes essentiels",
    description: "Comment nettoyer, nourrir et conserver votre filet en cuir pour qu'il dure des années. Savon glycériné, graisse nourrissante, séchage — les bons gestes pas à pas.",
    date: "2026-04-05",
    readTime: "4 min",
    category: "Conseils",
    keywords: [
      "entretien cuir équestre",
      "nettoyer bridon cuir",
      "graisser filet cheval",
      "savon glycériné cuir cheval",
      "huile cuir équipement équestre",
      "conserver filet bridon cuir",
      "entretien selle bridon cuir",
      "comment entretenir cuir cheval",
    ],
    content: [
      {
        body: "Un cuir de qualité se reconnaît aussi à sa capacité à durer. Avec un entretien régulier, votre filet conserve sa souplesse, sa tenue et son élégance au fil du temps. Le cuir est une matière vivante. Il évolue, se patine, s'assouplit et réagit à l'humidité, à la chaleur, à la sueur et à l'usage. Pour préserver ses qualités naturelles, quelques gestes simples suffisent.",
      },
      {
        heading: "Avant la première utilisation",
        body: "Avant d'utiliser votre filet pour la première fois, nous vous conseillons de nourrir légèrement le cuir avec un produit adapté : baume, graisse fine ou huile spécifique pour cuir. Appliquez une petite quantité à l'aide d'un chiffon doux, laissez pénétrer, puis essuyez l'excédent. Ce premier soin permet d'assouplir le cuir et de le préparer à l'usage.",
      },
      {
        heading: "Après chaque séance",
        body: "Après utilisation, retirez les traces de sueur, de poussière et de salive avec un chiffon légèrement humide. Ne laissez pas le cuir sécher avec des résidus dessus : à long terme, cela peut le fragiliser, le marquer ou favoriser l'apparition de craquelures.",
      },
      {
        heading: "Entretien régulier",
        body: "Une fois par semaine, ou plus souvent selon l'intensité d'utilisation, démontez votre filet et nettoyez chaque pièce avec un savon glycériné ou un savon spécial cuir. Laissez sécher naturellement, à température ambiante, loin d'une source directe de chaleur ou du soleil. Une fois le cuir propre et sec, appliquez une fine couche de baume ou de graisse nourrissante pour conserver sa souplesse.",
      },
      {
        heading: "Nourrir sans excès",
        body: "Un cuir doit être nourri, mais jamais saturé. Les huiles peuvent être utilisées ponctuellement sur un cuir sec ou neuf, mais toujours avec modération. Une application excessive peut détendre le cuir, modifier sa tenue ou foncer sa couleur. Pour l'entretien courant, privilégiez un soin léger, appliqué régulièrement en fine couche.",
      },
      {
        heading: "Conservation",
        body: "Rangez votre filet dans un endroit sec, tempéré et aéré. Évitez les lieux humides, les sacs fermés trop longtemps ou les fortes variations de température. Un porte-bridon adapté permet de conserver la forme du filet et d'éviter les plis inutiles.",
      },
      {
        body: "Bien entretenu, un filet en cuir ne se remplace pas vite. Il vous accompagne, se patine et gagne en caractère avec le temps.",
      },
    ],
  },
  {
    slug: "filet-anatomique-bienfaits",
    title: "Filet anatomique : pourquoi le confort change tout",
    description: "Têtière incurvée, muserolle rembourrée, nuque soulagée — pourquoi le filet anatomique change vraiment quelque chose pour votre cheval et comment choisir le bon modèle.",
    date: "2026-04-10",
    readTime: "6 min",
    category: "Conseils",
    keywords: [
      "filet anatomique cheval",
      "bridon anatomique bienfaits",
      "têtière anatomique incurvée",
      "muserolle rembourrée cheval",
      "pression nuque cheval équipement",
      "bien-être cheval filet",
      "bridon anatomique ou classique",
      "filet anatomique équitation",
      "confort cheval travail bridé",
    ],
    ctaProduct: { href: "/boutique/signature", label: "Découvrir le Signature" },
    content: [
      {
        body: "De plus en plus utilisé par les cavaliers professionnels comme amateurs, le filet anatomique répond à une exigence simple : mieux respecter la morphologie du cheval pendant le travail. Contrairement à un filet classique, il ne se contente pas de maintenir le mors en place. Il cherche à limiter les points de pression, améliorer le confort et permettre au cheval de se déplacer avec plus de liberté. Chez Elekka, nous pensons qu'un bon filet doit se faire oublier. Il doit accompagner le cheval, jamais le gêner.",
      },
      {
        heading: "Une tête sensible, des zones à respecter",
        body: "La tête du cheval est une zone particulièrement sensible. La nuque, les oreilles, le chanfrein, les tempes, les barres et la mâchoire concentrent de nombreuses terminaisons nerveuses. Un filet mal ajusté, trop serré ou mal conçu peut créer des pressions inutiles. À long terme, ces tensions peuvent gêner le cheval dans son attitude, sa décontraction et sa disponibilité au travail. Le rôle d'un filet anatomique est donc simple : mieux répartir les pressions et libérer les zones sensibles.",
      },
      {
        heading: "Une têtière pensée pour soulager la nuque",
        body: "Sur un filet classique, la têtière est souvent droite et repose directement derrière les oreilles. Sur un filet anatomique, la têtière est travaillée pour mieux épouser la forme de la tête. Elle libère davantage la base des oreilles et répartit la pression de manière plus équilibrée sur la nuque. Ce détail peut sembler discret, mais il change beaucoup dans le ressenti du cheval. Une nuque moins contrainte favorise une meilleure décontraction, une attitude plus naturelle et un contact plus stable.",
      },
      {
        heading: "Une muserolle conçue pour plus de confort",
        body: "La muserolle repose sur le chanfrein, une zone directement exposée à la pression. Sur les modèles Elekka, le rembourrage permet d'amortir le contact et de mieux répartir la pression. L'objectif n'est pas de bloquer, mais d'accompagner. Une muserolle bien pensée doit rester stable, confortable et précise, sans créer de points durs inutiles.",
      },
      {
        heading: "Moins de contraintes, plus de sensations",
        body: "Un cheval confortable est souvent un cheval plus disponible. Lorsqu'il n'est pas gêné par son équipement, il peut mieux se concentrer sur le travail, le contact et les demandes du cavalier. La mâchoire se relâche plus facilement, la nuque devient plus mobile, et la communication peut devenir plus fine. Le filet anatomique ne remplace pas le travail du cavalier. Mais il permet de partir sur une base plus juste.",
      },
      {
        heading: "Conclusion",
        body: "Un filet anatomique n'est pas seulement une question de forme. C'est une manière de penser l'équipement autrement. Respecter la morphologie du cheval. Limiter les pressions inutiles. Améliorer le confort sans perdre en précision. Chez Elekka, chaque détail est pensé dans cette logique : créer un matériel discret, confortable et durable, au service du cheval comme du cavalier.",
      },
    ],
  },
  {
    slug: "programme-parrainage",
    title: "Parrainez un ami et gagnez tous les deux",
    description: "Partagez votre lien Elekka, votre ami reçoit -20% sur sa première commande, vous gagnez -30€ sur votre prochain filet. Simple, automatique, sans limite.",
    date: "2026-04-20",
    readTime: "2 min",
    category: "Bons plans",
    keywords: [
      "parrainage équestre Elekka",
      "code parrainage filet cheval",
      "réduction filet bridon",
      "programme parrainage équitation",
      "bons plans cavalier",
      "réduction première commande équestre",
    ],
    content: [
      {
        body: "Chez Elekka, nous croyons que la meilleure publicité vient des cavaliers eux-mêmes. C'est pourquoi nous avons mis en place un programme de parrainage simple et avantageux pour vous et vos amis.",
      },
      {
        heading: "Comment ça marche ?",
        body: "Chaque client Elekka dispose d'un lien de parrainage unique, accessible depuis son tableau de bord. Partagez-le à un ami cavalier. S'il commande via ce lien, il bénéficie automatiquement de -20% sur sa première commande — sans code à saisir.",
      },
      {
        heading: "Et vous dans tout ça ?",
        body: "Dès que votre filleul a validé sa commande, vous recevez par email un code de -30€ sur votre prochain filet Elekka. Pas de limite : chaque ami qui commande via votre lien génère une nouvelle récompense.",
      },
      {
        heading: "Comment obtenir votre lien ?",
        body: "Connectez-vous à votre compte Elekka et cliquez sur l'onglet 'Parrainage' dans le menu de votre tableau de bord. Votre lien personnel y est affiché avec un bouton pour le copier en un clic.",
      },
    ],
  },
  {
    slug: "mesurer-tete-cheval-taille-filet",
    title: "Full ou Cob : comment mesurer la tête de son cheval",
    description: "Guide pratique pour mesurer le tour de tête de son cheval avec un mètre souple et choisir sans erreur entre les tailles Full et Cob pour son filet de bridon.",
    date: "2026-04-15",
    readTime: "3 min",
    category: "Conseils",
    keywords: [
      "mesurer tête cheval filet",
      "taille bridon Full ou Cob",
      "tour de tête cheval mesure",
      "guide taille filet équitation",
      "Full Cob quelle taille choisir",
      "taille bridon cheval poney",
      "mesurer chanfrein cheval",
    ],
    ctaProduct: { href: "/boutique", label: "Voir tous les bridons" },
    content: [
      {
        body: "Le choix entre Full et Cob est souvent source d'hésitation. Voici comment procéder méthodiquement pour ne pas se tromper.",
      },
      {
        heading: "Le matériel nécessaire",
        body: "Vous aurez besoin d'un mètre souple de couture (ou d'une ficelle que vous mesurerez ensuite). Placez-vous du côté gauche de votre cheval, dans un endroit calme.",
      },
      {
        heading: "Les mesures à prendre",
        body: "Mesurez la longueur du chanfrein (de la base des oreilles au bout du nez), le tour de tête au niveau du chanfrein, et la largeur entre les deux joues. Ces trois mesures vous donnent une image précise de la morphologie de la tête de votre cheval.",
      },
      {
        heading: "Full ou Cob ?",
        body: "Choisissez la taille selon la morphologie de votre cheval. La taille Full convient généralement aux chevaux de taille standard à grande. La taille Cob est recommandée pour les poneys D, petits chevaux ou chevaux à tête plus fine. En cas d'hésitation, la taille Full reste le choix le plus courant.",
      },
      {
        heading: "En cas de doute",
        body: "N'hésitez pas à nous contacter à elekka.sellier@gmail.com avec les mensurations de votre cheval et sa race. Nous vous confirmons la taille recommandée sous 48 heures.",
      },
    ],
  },
  {
    slug: "ajuster-filet-bridon-cheval",
    title: "Comment bien ajuster son filet sur le cheval : guide pas à pas",
    description: "Un filet mal ajusté crée des tensions et nuit au contact. Voici comment vérifier et corriger le réglage de chaque pièce de votre bridon, étape par étape.",
    date: "2026-05-01",
    readTime: "6 min",
    category: "Conseils",
    keywords: [
      "ajuster filet bridon cheval",
      "réglage bridon équitation",
      "muserolle trop serrée cheval",
      "têtière réglage nuque",
      "filet bien ajusté",
      "comment mettre un bridon cheval",
      "réglage mors filet équitation",
    ],
    content: [
      {
        body: "Un filet bien choisi peut devenir inconfortable s'il est mal ajusté. À l'inverse, un bridon simple bien réglé peut transformer le travail d'un cheval. L'ajustement est une étape que beaucoup de cavaliers sous-estiment — souvent parce qu'il n'y a pas de règle universelle, mais des principes clairs qui s'appliquent à tous les modèles.",
      },
      {
        heading: "La têtière : libérer la nuque sans laisser glisser",
        body: "La têtière doit se positionner juste derrière les oreilles sans les écraser. Vous devez pouvoir glisser deux doigts à plat entre la têtière et la nuque du cheval. Si c'est trop serré, la pression sur les oreilles et la nuque peut perturber le cheval pendant le travail. Si c'est trop lâche, le filet descend et perd sa stabilité. Sur les modèles anatomiques comme le Signature ou le Fusion, la courbure de la têtière libère naturellement la zone des oreilles — ce qui permet souvent de conserver un ajustement plus précis sans contraindre.",
      },
      {
        heading: "La muserolle : position et pression",
        body: "La muserolle doit se positionner environ deux travers de doigt au-dessus de la pointe du chanfrein. Trop haute, elle appuie sur l'os. Trop basse, elle interfère avec la respiration. La fermeture doit permettre de glisser un à deux doigts entre la muserolle et la tête du cheval. Une muserolle trop serrée bloque la mâchoire et crée des tensions qui remontent dans tout le corps. Sur les muserolles rembourrées (Signature, Fusion), la surface de contact est plus large — ce qui permet un réglage légèrement plus ferme sans créer de point de pression localisé.",
      },
      {
        heading: "Le frontal : sans tension latérale",
        body: "Le frontal doit longer le front du cheval sans tirer vers le haut ni vers les oreilles. S'il est trop court, il crée une tension sur les montants et déplace la têtière vers l'avant. S'il est trop long, il pend et nuit à l'esthétique du filet. Un bon frontal reste en place naturellement, sans exercer de pression latérale.",
      },
      {
        heading: "Les rênes : longueur et attache",
        body: "Les rênes sont attachées aux anneaux du mors, de part et d'autre. La longueur doit permettre un contact doux avec une main légèrement en avant, sans que le cavalier soit obligé de se pencher en arrière pour obtenir du contact. En main libre (au repos), les rênes doivent former une légère courbe — ni tendues ni pendantes au sol.",
      },
      {
        heading: "Vérifier l'ensemble après le travail",
        body: "Après chaque séance, prenez le réflexe de vérifier si quelque chose a bougé. Les boucles de règlage peuvent se desserrer progressivement, surtout sur un cuir neuf. Un filet bien entretenu et régulièrement contrôlé reste stable beaucoup plus longtemps. Si votre cheval montre des signes d'inconfort (agitation, résistances inhabituelles, frottement de la tête), commencez toujours par vérifier l'ajustement du filet avant d'envisager d'autres causes.",
      },
    ],
  },
  {
    slug: "entretenir-filet-hiver",
    title: "Entretenir son filet en cuir l'hiver : les précautions essentielles",
    description: "Le froid, l'humidité et les changements de température fragilisent le cuir. Voici comment adapter son entretien en hiver pour protéger son filet et le garder souple.",
    date: "2026-05-03",
    readTime: "4 min",
    category: "Conseils",
    keywords: [
      "entretenir cuir hiver équitation",
      "filet bridon hiver humidité",
      "protéger cuir froid",
      "cuir rigide hiver cheval",
      "entretien équipement équestre saison",
      "graisse cuir hiver cheval",
    ],
    content: [
      {
        body: "L'hiver est la saison où le cuir souffre le plus. Les variations de température, l'humidité des écuries, la boue et les séances de travail dans le froid créent des conditions que le cuir supporte difficilement sans un entretien adapté. Quelques ajustements simples permettent de traverser l'hiver sans abîmer son équipement.",
      },
      {
        heading: "Le froid rigidifie, l'humidité fragilise",
        body: "Par temps froid, le cuir perd naturellement de sa souplesse. Il devient plus rigide, moins confortable pour le cheval et plus susceptible de se craqueler si on l'utilise sans l'avoir réchauffé. À l'inverse, une humidité excessive — due à la transpiration, à la pluie ou à une conservation dans un endroit mal aéré — fragilise les fibres et favorise les moisissures. L'ennemi du cuir, c'est souvent l'alternance : chaud/froid, sec/humide en cycles rapides.",
      },
      {
        heading: "Avant la séance : réchauffer le cuir",
        body: "Par grand froid, évitez d'utiliser votre filet directement sorti d'un endroit froid. Laissez-le quelques minutes dans un espace tempéré — la sellerie chauffée ou simplement entre vos mains — avant de le mettre sur le cheval. Un cuir froid et rigide applique des pressions moins régulières et moins confortables sur les zones de contact.",
      },
      {
        heading: "Après la séance : sécher avant de ranger",
        body: "C'est le geste le plus important en hiver. Après une séance humide, essuyez soigneusement chaque partie du filet avec un chiffon propre et sec. Laissez sécher à l'air libre, à température ambiante, loin d'une source de chaleur directe (radiateur, poêle). Le séchage forcé craquelle le cuir. Une fois sec, appliquez un baume nourrissant léger pour redonner au cuir la souplesse perdue.",
      },
      {
        heading: "Adapter la fréquence d'entretien",
        body: "En hiver, la fréquence d'entretien doit augmenter. Si en été un nettoyage hebdomadaire suffit, l'hiver demande souvent un soin après chaque séance ou tous les deux jours. Ce n'est pas une contrainte : c'est un investissement. Un filet bien entretenu dure des années de plus et se revend — ou se transmet — dans un état remarquable.",
      },
      {
        heading: "Où ranger son filet en hiver",
        body: "Rangez votre filet dans une sellerie tempérée, aérée et à l'abri des chocs thermiques. Évitez les sacs plastiques fermés qui piègent l'humidité. Un porte-bridon simple, dans un endroit sec, reste la meilleure solution. Si votre sellerie n'est pas chauffée, un nettoyage et un soin léger avant rangement prolongé sont fortement recommandés.",
      },
    ],
  },
  {
    slug: "choisir-renes-equitation",
    title: "Comment choisir ses rênes d'équitation : cuir, grip, longueur",
    description: "Rênes en cuir lisse, grip caoutchouc, tissu ou synthétique : quelles différences concrètes ? Comment choisir ses rênes selon sa discipline et son niveau.",
    date: "2026-05-05",
    readTime: "5 min",
    category: "Conseils",
    keywords: [
      "choisir rênes équitation",
      "rênes cuir ou synthétique cheval",
      "rênes grip caoutchouc équitation",
      "rênes lisse ou grip",
      "rênes tissu équitation",
      "quel type de rênes cheval",
      "rênes dressage saut obstacles",
    ],
    ctaProduct: { href: "/boutique/renes-1", label: "Voir les rênes Elekka" },
    content: [
      {
        body: "Les rênes sont le lien direct entre le cavalier et la bouche du cheval. Un mauvais choix peut nuire à la qualité du contact, fatiguer les mains et perturber le cheval. Pourtant, le marché propose tellement de variantes que le choix devient rapidement confus. Voici les critères qui comptent vraiment.",
      },
      {
        heading: "Le matériau : cuir, synthétique ou tissu",
        body: "Le cuir pleine fleur reste le matériau de référence pour qui cherche confort et durée de vie. Il s'assouplit à l'usage, développe une patine personnelle et offre un contact avec le mors qui évolue dans le bon sens. Le synthétique est plus facile à entretenir mais vieillit moins bien — il peut durcir ou se craqueler après quelques saisons. Le tissu (ou cord) est très utilisé en compétition car il sèche vite et offre un grip naturel sans caoutchouc.",
      },
      {
        heading: "Avec ou sans grip : une question de sensation",
        body: "Les rênes avec grip caoutchouc intégré facilitent la prise en main, surtout par temps humide ou en transpiration. Elles sont recommandées pour les cavaliers en apprentissage, les disciplines sportives intenses ou les séances par mauvais temps. Les rênes lisses en cuir offrent une sensation plus directe et plus fine. Elles demandent une main plus éduquée mais permettent une nuance dans le contact que le grip ne permet pas toujours. Ce n'est pas une question de niveau : certains cavaliers confirmés préfèrent le grip pour des raisons de confort, d'autres restent fidèles au lisse pour la qualité de contact.",
      },
      {
        heading: "La longueur : adapter à sa monture",
        body: "Une rêne trop courte oblige le cavalier à se rapprocher de la bouche en permanence. Une rêne trop longue pend et nuit à la réactivité du contact. En standard, une rêne de 145 à 150 cm convient à la majorité des situations. Pour les très grands chevaux ou les disciplines de dressage à la française avec longues rênes, des modèles allongés existent.",
      },
      {
        heading: "L'entretien : le critère qui départage",
        body: "Une rêne en cuir bien entretenue dure 5 à 10 ans. Une rêne synthétique négligée peut se dégrader en 2 saisons. Si vous êtes prêt à consacrer 5 minutes d'entretien par semaine à vos rênes — nettoyage + baume léger — le cuir est un meilleur investissement sur la durée. Sinon, un bon synthétique de qualité reste acceptable.",
      },
    ],
  },
  {
    slug: "licol-cuir-vs-synthetique",
    title: "Licol en cuir ou synthétique : lequel choisir pour son cheval ?",
    description: "Confort, durabilité, entretien, prix — comparaison honnête entre licol en cuir et licol synthétique pour vous aider à choisir le bon équipement au quotidien.",
    date: "2026-05-07",
    readTime: "4 min",
    category: "Conseils",
    keywords: [
      "licol cuir ou synthétique cheval",
      "meilleur licol cheval",
      "licol cuir pleine fleur",
      "licol confortable cheval",
      "choisir licol équitation",
      "licol durable cheval",
      "licol poney adulte",
    ],
    ctaProduct: { href: "/boutique/licol-1", label: "Voir le Licol Horizon" },
    content: [
      {
        body: "Le licol est souvent le premier équipement qu'un propriétaire achète — et l'un des plus utilisés, puisqu'il sert au quotidien : au pré, au box, pour le pansage, le transport, l'attache. Pourtant, peu de cavaliers prennent le temps de bien le choisir. Cuir ou synthétique : le débat est simple si on pose les bonnes questions.",
      },
      {
        heading: "Ce que le synthétique offre vraiment",
        body: "Le licol synthétique est léger, résistant à l'humidité, facile à nettoyer et peu coûteux. Pour un cheval au pré par tous les temps, ou pour un usage intensif dans des conditions difficiles, c'est une solution pragmatique. La majorité des licols de travail quotidien sont en synthétique, et ils font correctement leur rôle. Le défaut principal : la tenue dans le temps est variable. Les pièces plastiques peuvent se fragiliser, les zones de friction s'user rapidement, et le matériau n'évolue pas — il ne s'adapte pas à la morphologie du cheval ni ne se bonifie.",
      },
      {
        heading: "Ce que le cuir change concrètement",
        body: "Le cuir pleine fleur s'assouplit à l'usage et épouse progressivement la morphologie de la tête du cheval. Au fil des semaines, un licol en cuir bien entretenu devient de plus en plus confortable, de plus en plus ajusté. Le contact avec la peau est plus doux que le synthétique, ce qui compte sur les zones sensibles comme le museau ou le chanfrein. La durabilité est bien supérieure : un licol en cuir correctement entretenu peut accompagner un cheval pendant des années.",
      },
      {
        heading: "L'entretien : un investissement de 5 minutes",
        body: "Le cuir demande plus d'attention que le synthétique. Un essuyage après usage, un nettoyage hebdomadaire et un baume mensuel suffisent à le conserver en parfait état. Ce n'est pas une contrainte si on intègre ce geste dans la routine d'écurie. Le synthétique lui, s'entretient à l'eau — mais vieillit quand même, sans possibilité de régénération.",
      },
      {
        heading: "Pour quel cheval, quelle situation",
        body: "Un licol en cuir convient parfaitement aux chevaux gardés en paddock ou en pré clôturé avec surveillance. Pour un cheval en liberté permanente avec d'autres chevaux (risque de s'accrocher), le synthétique ou un licol rompant reste préférable pour la sécurité. Pour tout le reste — transport, pansage, attache surveillée, présentation — le cuir est le meilleur choix à moyen terme.",
      },
    ],
  },
  {
    slug: "debuter-bridon-filet-cheval",
    title: "Bridon pour débutants : tout ce qu'il faut savoir avant d'acheter",
    description: "Vous montez pour la première fois ou cherchez votre premier bridon ? Ce guide complet vous explique les bases, les erreurs à éviter et comment choisir sereinement.",
    date: "2026-05-09",
    readTime: "7 min",
    category: "Conseils",
    keywords: [
      "bridon débutant équitation",
      "premier filet cheval acheter",
      "guide bridon débutant",
      "comment choisir son premier bridon",
      "filet équitation premier achat",
      "bridon simple débutant",
      "équipement débutant cheval",
    ],
    ctaProduct: { href: "/boutique/essentiel", label: "Découvrir l'Essentiel" },
    content: [
      {
        body: "Acheter un bridon pour la première fois peut être intimidant. Têtière, muserolle, frontal, rênes, mors — les termes s'accumulent et les choix sont nombreux. Ce guide vous explique l'essentiel sans jargon inutile, pour que vous puissiez choisir en confiance.",
      },
      {
        heading: "Qu'est-ce qu'un bridon, exactement ?",
        body: "Un bridon (ou filet) est l'ensemble des pièces en cuir qui maintiennent le mors en place dans la bouche du cheval. Il se compose d'une têtière (qui passe derrière les oreilles), d'un frontal (qui longe le front), d'une muserolle (qui entoure le chanfrein), de montants (qui descendent sur les côtés du visage) et des rênes (qui permettent la communication). Le mors lui-même — la pièce métallique dans la bouche — est souvent vendu séparément.",
      },
      {
        heading: "Classique ou anatomique : quelle différence concrète ?",
        body: "Un bridon classique a une têtière droite et une muserolle simple. C'est la version la plus courante, celle qui convient à la très grande majorité des chevaux. Un bridon anatomique a une têtière incurvée (pour libérer la zone des oreilles) et souvent une muserolle rembourrée (pour mieux répartir la pression sur le chanfrein). Pour un débutant, un bridon classique de qualité comme l'Essentiel Elekka est souvent le meilleur point de départ : simple, fiable, sans complexité inutile.",
      },
      {
        heading: "La taille : Full ou Cob",
        body: "Il existe deux tailles principales. Le Full convient aux chevaux de selle adultes de taille standard (à partir d'environ 1,65 m au garrot). Le Cob convient aux poneys D, aux petits chevaux ou aux chevaux à tête fine. En cas de doute, le Full est souvent le plus sûr — les modèles sont réglables sur plusieurs crans.",
      },
      {
        heading: "Cuir ou synthétique pour commencer ?",
        body: "Le cuir demande un entretien régulier mais dure bien plus longtemps et est plus confortable pour le cheval. Le synthétique est facile à nettoyer mais vieillit moins bien. Pour un usage régulier, le cuir est un meilleur investissement — à condition d'être prêt à consacrer quelques minutes d'entretien par semaine.",
      },
      {
        heading: "Les erreurs à éviter",
        body: "Ne choisissez pas un bridon uniquement sur le prix ou l'esthétique. Un bridon mal ajusté ou de mauvaise qualité peut incommoder le cheval et nuire à votre apprentissage. Vérifiez la qualité du cuir (pleine fleur, souple au toucher), la solidité des boucles et la facilité d'ajustement. Prenez le temps de l'ajuster correctement sur le cheval avant la première séance — et consultez votre moniteur si vous avez le moindre doute.",
      },
    ],
  },
];

export const blog: Article[] = [
  {
    slug: "naissance-elekka",
    title: "Elekka : une marque née sur le terrain",
    description: "Elekka est née d'un constat simple : un bon filet ne devrait pas forcément coûter aussi cher. L'histoire d'une marque équestre construite par des cavaliers, pour des cavaliers.",
    date: "2026-03-15",
    readTime: "4 min",
    category: "La marque",
    keywords: [
      "marque équestre française",
      "bridon cuir qualité prix",
      "équipement équestre abordable",
      "Elekka sellerie",
      "alternative grandes marques équitation",
      "filet bridon pas cher qualité",
      "sellerie équestre direct fabricant",
      "marque bridon cuir abordable",
    ],
    content: [
      {
        body: "Elekka est née d'un constat partagé par beaucoup de cavaliers : pourquoi un bon filet devrait-il forcément coûter aussi cher ? Issue d'une famille de cavaliers, la marque s'inscrit dans une pratique réelle. Celle du terrain, des chevaux au travail, du matériel utilisé, observé, ajusté et parfois remis en question.",
      },
      {
        heading: "Une exigence née en écurie",
        body: "Dans le monde équestre, les grandes marques sont connues, respectées et utilisées. Elles ont construit leur réputation avec le temps. Mais une question demeure : qu'est-ce qui fait réellement la qualité d'un filet ? Pour Elekka, la réponse ne se trouve pas dans un logo. Elle se trouve dans le cuir, la coupe, l'ergonomie, les finitions et l'attention portée au confort du cheval. Un bon filet doit être précis, confortable et durable. Il doit respecter les zones sensibles, accompagner le contact et rester fiable dans le travail quotidien.",
      },
      {
        heading: "Une autre vision du prix",
        body: "Elekka fait le choix de concentrer chaque décision sur le produit. Moins d'intermédiaires. Moins de dépenses inutiles. Plus d'attention portée à la conception, aux matériaux et aux détails qui comptent vraiment. L'objectif n'est pas de proposer un produit « moins cher ». L'objectif est de proposer un prix cohérent avec ce que le cavalier achète réellement : un filet bien pensé, bien conçu, et fait pour durer.",
      },
      {
        heading: "Des modèles pensés par des cavaliers",
        body: "Les modèles Elekka sont développés à partir de besoins concrets : confort de la têtière, stabilité de la muserolle, précision des ajustements, qualité du cuir et simplicité d'utilisation. Chaque détail répond à une idée simple : créer un matériel qui fonctionne sur le terrain, pas seulement en photo.",
      },
      {
        heading: "Aujourd'hui",
        body: "Elekka grandit avec une ambition claire : proposer des filets élégants, fiables et accessibles, sans compromis sur le respect du cheval. Une marque construite autour d'une idée essentielle : le prix ne fait pas la qualité d'un bridon. Le produit, lui, doit la prouver.",
      },
    ],
  },
  {
    slug: "collection-2026",
    title: "Collection 2026 : trois modèles, trois approches",
    description: "Essentiel, Signature, Fusion — trois filets en cuir pleine fleur pour trois profils de cavaliers. Découvrez lequel correspond à votre cheval et à votre pratique.",
    date: "2026-03-20",
    readTime: "5 min",
    category: "Produits",
    keywords: [
      "filet Elekka collection 2026",
      "bridon cuir Signature Fusion Essentiel",
      "gamme filets équitation cuir",
      "filet anatomique Elekka",
      "bridon cuir pleine fleur prix",
      "quel filet choisir cavalier",
      "filet équitation qualité abordable",
    ],
    content: [
      {
        body: "La collection Elekka 2026 se compose de trois modèles, chacun pensé pour répondre à une attente différente : la simplicité, le confort anatomique ou l'adaptabilité maximale. Chaque filet conserve la même exigence : un cuir sélectionné avec soin, une conception précise, des finitions propres et un prix cohérent avec le produit.",
      },
      {
        heading: "Le Filet Essentiel — 99,99 €",
        body: "Le modèle le plus épuré de la collection. Simple, élégant et polyvalent, l'Essentiel répond aux besoins du quotidien sans superflu. Il s'adresse aux cavaliers qui recherchent un filet fiable et durable, avec une ligne sobre et classique. Cuir pleine fleur, muserolle simple, finitions soignées : l'Essentiel va droit au but. Disponible en Havana Brown et Noir, en tailles Full et Cob.",
      },
      {
        heading: "Le Filet Anatomique Signature — 175 €",
        body: "Le modèle pensé pour le confort et la précision. Le Signature a été développé pour les chevaux qui demandent plus d'attention au niveau de la nuque, du chanfrein et du contact. Sa têtière anatomique incurvée permet de mieux répartir les pressions, tandis que sa muserolle rembourrée apporte davantage de confort pendant le travail. La fermeture côté gauche limite les surépaisseurs sous la tête du cheval et participe à une meilleure stabilité de l'ensemble.",
      },
      {
        heading: "Le Filet Anatomique Fusion — 175 €",
        body: "Le modèle le plus complet de la collection. Le Fusion a été conçu pour les cavaliers qui veulent aller plus loin dans l'ajustement. Sa conception permet d'adapter le filet selon la morphologie du cheval et les préférences du cavalier. Plus modulable, plus travaillé, plus affirmé, il conserve l'essentiel : confort, stabilité et précision. C'est le modèle idéal pour ceux qui veulent un filet anatomique plus abouti, capable de s'adapter à différents chevaux et différentes utilisations.",
      },
      {
        heading: "Quel modèle choisir ?",
        body: "Si vous recherchez un filet simple, élégant et efficace pour le travail quotidien, l'Essentiel est le choix le plus naturel. Si votre cheval est sensible au niveau de la nuque ou du chanfrein, ou si vous souhaitez privilégier le confort anatomique, le Signature est le modèle le plus adapté. Si vous cherchez un filet plus complet, plus modulable et capable de s'adapter à différentes morphologies, le Fusion est le choix le plus polyvalent. En cas d'hésitation, contactez-nous : nous vous aiderons à choisir le modèle le plus adapté à votre cheval.",
      },
    ],
  },
  {
    slug: "parrainez-vos-amis",
    title: "Parrainez vos amis — et gagnez -30€ sur votre prochain filet",
    description: "Elekka lance son programme de parrainage. Partagez votre lien personnel, votre ami profite de -20% sur sa première commande, vous recevez -30€. Automatique, sans limite.",
    date: "2026-04-18",
    readTime: "2 min",
    category: "Nouveauté",
    keywords: [
      "parrainage Elekka",
      "programme parrainage équestre",
      "réduction filet cheval ami",
      "code parrainage bridon",
      "programme fidélité équitation",
      "réduction -20% première commande équestre",
    ],
    content: [
      {
        body: "Nous lançons aujourd'hui le programme de parrainage Elekka. Une façon simple de récompenser ceux qui parlent de nous autour d'eux.",
      },
      {
        heading: "Le principe en deux phrases",
        body: "Vous partagez votre lien personnel à un ami cavalier. Il commande via ce lien → il bénéficie de -20% sur sa première commande, vous recevez -30€ sur votre prochain filet.",
      },
      {
        heading: "Tout est automatique",
        body: "Votre ami n'a aucun code à saisir. La réduction s'applique seule dès qu'il arrive sur le site via votre lien. Vous recevez votre récompense par email dès sa commande confirmée.",
      },
      {
        heading: "Où trouver votre lien ?",
        body: "Dans votre espace compte Elekka, cliquez sur l'onglet 'Parrainage' dans le menu de votre tableau de bord. Un clic pour copier, un message pour partager. Aucune limite — chaque ami qui commande vous rapporte un nouveau code.",
      },
    ],
  },
  {
    slug: "cuir-pleine-fleur-difference",
    title: "Pourquoi le cuir pleine fleur fait la différence",
    description: "Cuir pleine fleur vs cuir corrigé : ce que ça change concrètement pour votre filet, pour votre cheval, et pour la durée de vie de votre équipement équestre.",
    date: "2026-04-02",
    readTime: "4 min",
    category: "Matières",
    keywords: [
      "cuir pleine fleur équitation",
      "différence cuir pleine fleur corrigé",
      "qualité cuir bridon sellerie",
      "cuir pleine fleur cheval filet",
      "bridon cuir pleine fleur avantages",
      "cuir équestre durable souple",
      "choisir cuir équipement cheval",
    ],
    content: [
      {
        body: "Tous les cuirs ne se valent pas. Dans l'équipement équestre, le cuir pleine fleur est la référence — mais encore faut-il comprendre pourquoi.",
      },
      {
        heading: "Qu'est-ce que le cuir pleine fleur ?",
        body: "Le cuir pleine fleur est un cuir dont on a conservé la couche supérieure d'origine, appelée \"fleur\". C'est la partie la plus dense, la plus résistante et la plus souple de la peau. Par opposition, les cuirs \"corrigés\" ou \"refendus\" utilisent les couches inférieures, moins nobles, que l'on ponce et enduit pour imiter l'aspect du cuir pleine fleur.",
      },
      {
        heading: "Les avantages concrets pour votre équipement",
        body: "Le cuir pleine fleur absorbe et restitue les graisses naturellement, ce qui lui permet de rester souple sur le long terme. Il développe avec le temps une patine unique — ce qu'on appelle le \"vieillissement beau\" du cuir. Il est également plus résistant aux déchirures et aux fissures que les autres types de cuir.",
      },
      {
        heading: "Ce que ça change pour votre cheval",
        body: "Un cuir pleine fleur correctement entretenu devient de plus en plus souple avec l'usage. Il épouse progressivement la morphologie de la tête de votre cheval, offrant un confort croissant. À l'inverse, un cuir de qualité inférieure peut durcir, se fissurer et créer des points de frottement.",
      },
      {
        heading: "Elekka et le cuir pleine fleur",
        body: "Tous les filets Elekka sont fabriqués en cuir pleine fleur. C'est un choix non négociable pour nous — c'est la base de la qualité que nous nous engageons à offrir à chaque cavalier.",
      },
    ],
  },
  {
    slug: "fusion-muserolle-triple-attache-expliquee",
    title: "Le Fusion expliqué : comment fonctionne la muserolle à triple attache",
    description: "Épaisse, ovale, rectangulaire — trois formes en un seul bridon. On vous explique la logique de la muserolle à triple attache du Fusion et comment l'utiliser.",
    date: "2026-04-25",
    readTime: "5 min",
    category: "Produits",
    keywords: [
      "filet Fusion Elekka explication",
      "muserolle triple attache bridon",
      "bridon modulable cheval",
      "muserolle interchangeable équitation",
      "Fusion bridon anatomique",
      "choisir muserolle cheval",
    ],
    ctaProduct: { href: "/boutique/fusion", label: "Découvrir le Fusion" },
    content: [
      {
        body: "La muserolle à triple attache est la pièce maîtresse du Fusion. Elle permet de changer la forme de contact sur le chanfrein du cheval sans devoir acheter un nouveau bridon. Voici comment elle fonctionne et dans quel cas choisir chaque configuration.",
      },
      {
        heading: "La logique de départ",
        body: "Tous les chevaux n'ont pas la même morphologie, ni la même sensibilité au niveau du chanfrein. Certains supportent très bien une muserolle épaisse et rembourrée. D'autres réagissent mieux à un contact plus fin et plus précis. Le Fusion part du principe qu'un bridon de qualité devrait pouvoir s'adapter — pas l'inverse.",
      },
      {
        heading: "La muserolle épaisse : contact doux et large",
        body: "La version épaisse est la plus proche de la Signature : une muserolle rembourrée qui répartit la pression sur une grande surface. Elle convient aux chevaux sensibles du chanfrein, aux jeunes chevaux ou à ceux qui ont tendance à résister au contact de la muserolle. Elle est aussi la plus polyvalente — celle qui convient à la majorité des situations.",
      },
      {
        heading: "La muserolle ovale : contact affiné",
        body: "Plus fine que la version épaisse, la muserolle ovale offre un contact plus précis sur le chanfrein. Elle convient aux chevaux qui acceptent bien la pression et pour lesquels une muserolle trop épaisse manquerait de précision. Elle est souvent utilisée en dressage ou pour un travail sur la légèreté.",
      },
      {
        heading: "La muserolle rectangulaire : maintien ferme",
        body: "La version rectangulaire est la plus ferme des trois. Elle offre un maintien ciblé et stable, sans compression excessive. Elle convient aux chevaux qui ont tendance à ouvrir la mâchoire ou à chercher à contourner le contact. C'est une option utile pour certains travaux de mise en main, sans pour autant bloquer la mâchoire.",
      },
      {
        heading: "Comment changer la muserolle",
        body: "Le système de triple attache est conçu pour être manipulé rapidement et sans outil. Les attaches se défont et se remettent en quelques secondes, sans qu'il soit nécessaire de démonter le bridon. Prenez le temps de le faire avec le filet hors du cheval la première fois pour vous familiariser avec le mécanisme.",
      },
    ],
  },
  {
    slug: "patine-cuir-filet-elekka",
    title: "La patine du cuir : comment votre filet Elekka va évoluer dans le temps",
    description: "Un filet en cuir pleine fleur ne vieillit pas — il se bonifie. Voici comment se forme la patine, ce qu'elle révèle et pourquoi elle est le signe d'un cuir de qualité.",
    date: "2026-04-28",
    readTime: "4 min",
    category: "Matières",
    keywords: [
      "patine cuir équitation",
      "cuir pleine fleur vieillit bridon",
      "entretien patine cuir cheval",
      "vieillissement cuir équestre",
      "bridon cuir qui se bonifie",
      "patine Havana Brown cuir",
    ],
    content: [
      {
        body: "La patine est ce qui arrive au cuir pleine fleur quand on l'utilise, qu'on l'entretient et qu'on lui laisse le temps de vivre. Ce n'est pas une usure — c'est une transformation. Un filet en cuir pleine fleur bien entretenu devient plus beau, plus souple et plus personnel avec les années.",
      },
      {
        heading: "Comment se forme la patine",
        body: "La patine est le résultat de plusieurs processus qui se produisent simultanément. Le cuir absorbe les corps gras naturels du cheval (sébum, transpiration), les produits d'entretien (baume, huile) et s'adapte aux zones de friction répétées. La surface, initialement lisse et uniforme, développe des nuances, des reflets et une profondeur que le cuir neuf n'a pas. C'est visible surtout sur les coloris Havana Brown et Dark Brown, qui développent des reflets caramel à noisette très caractéristiques.",
      },
      {
        heading: "Ce que la patine révèle sur la qualité du cuir",
        body: "Seul le cuir pleine fleur develop une vraie patine. Les cuirs corrigés (recollés, enduits d'une couche artificielle) ne se patinent pas — ils s'usent. La patine est donc un marqueur de qualité : elle prouve que le cuir est authentique, travaillé dans sa couche noble. Un bridon qui se bonifie avec le temps est un bridon fait pour durer.",
      },
      {
        heading: "Entretenir pour encourager la patine",
        body: "La patine se développe naturellement — mais l'entretien régulier l'oriente dans le bon sens. Un cuir nourri régulièrement avec un baume de qualité restera souple, développera une patine régulière et uniforme. Un cuir négligé se dessèche, se rigidifie et 'patine' de manière irrégulière — avec des zones craquelées peu esthétiques. L'entretien ne freine pas la patine. Il la guide.",
      },
      {
        heading: "Le noir : moins visible mais réel",
        body: "Sur les coloris noirs, la patine est moins spectaculaire visuellement — mais elle est tout aussi réelle. Le cuir noir entretenu développe des reflets profonds, presque bleutés, et une texture qui change sous la lumière. C'est moins tapageur que le Havana Brown, mais tout aussi caractéristique d'un cuir vivant.",
      },
    ],
  },
  {
    slug: "bien-etre-cheval-equipement-elekka",
    title: "Le bien-être du cheval guide toutes nos décisions",
    description: "Chez Elekka, chaque choix de conception — forme de la têtière, épaisseur du rembourrage, largeur du browband — part d'une même question : est-ce que ça respecte le cheval ?",
    date: "2026-04-30",
    readTime: "4 min",
    category: "La marque",
    keywords: [
      "bien-être cheval équipement",
      "bridon respect cheval",
      "équipement équestre confort cheval",
      "Elekka valeurs marque",
      "filet anatomique bien-être",
      "équitation éthique cheval",
    ],
    content: [
      {
        body: "Le bien-être du cheval n'est pas une promesse marketing chez Elekka. C'est le point de départ de chaque décision. Quand on choisit une matière, une forme ou une épaisseur de rembourrage, la première question n'est pas 'est-ce que c'est beau ?' — c'est 'est-ce que ça respecte le cheval ?'",
      },
      {
        heading: "Des zones de pression identifiées",
        body: "La tête du cheval concentre une densité remarquable de terminaisons nerveuses — nuque, oreilles, chanfrein, barres. Un équipement mal conçu crée des points de pression qui, répétés séance après séance, génèrent des tensions qui remontent dans tout le corps. Ce n'est pas toujours spectaculaire. Mais c'est permanent. C'est pour réduire ces tensions que le Signature a été conçu avec une têtière anatomique incurvée et une muserolle rembourrée — deux détails qui font une vraie différence dans la qualité du travail et le confort du cheval.",
      },
      {
        heading: "La qualité du cuir : une question de contact",
        body: "Le cuir pleine fleur est plus souple, plus régulier et plus doux au contact que les cuirs de moindre qualité. Sur une zone aussi sensible que le chanfrein ou la nuque, cette différence de matière se traduit directement en confort pour le cheval. Ce n'est pas de l'esthétisme — c'est du bon sens.",
      },
      {
        heading: "L'ajustement : la pièce que beaucoup oublient",
        body: "Un filet de qualité mal ajusté reste inconfortable. C'est pourquoi chaque modèle Elekka est réglable sur plusieurs crans, et que nous prenons le temps de répondre aux questions d'ajustement — par email, avec les mensurations du cheval si besoin. La qualité du produit ne vaut que si elle est accompagnée d'un bon réglage.",
      },
      {
        heading: "Une marque née en écurie",
        body: "Lucas, le fondateur d'Elekka, vit au sein d'une grande écurie de compétition. Il connaît les chevaux qui résistent, qui frottent leur tête ou qui changent d'attitude selon l'équipement qu'ils portent. C'est cette observation terrain — pas un bureau, pas un catalogue — qui a guidé les choix de conception. Le bien-être du cheval n'est pas une valeur ajoutée. C'est le point de départ.",
      },
    ],
  },
  {
    slug: "elekka-grandes-marques-difference",
    title: "Elekka face aux grandes marques : ce qui nous rapproche, ce qui nous distingue",
    description: "Antares, CWD, Pessoa — des marques reconnues, des prix élevés. Elekka offre la même qualité de cuir et la même conception rigoureuse. Ce qui diffère, c'est le reste.",
    date: "2026-05-02",
    readTime: "5 min",
    category: "La marque",
    keywords: [
      "Elekka vs grandes marques équitation",
      "alternative Antares CWD bridon",
      "bridon qualité prix équitation",
      "filet moins cher qualité équestre",
      "marque équestre française abordable",
      "Elekka positionnement prix",
    ],
    content: [
      {
        body: "Les grandes marques équestres ont construit leur réputation sur des décennies de présence dans les compétitions internationales, des investissements marketing importants et une distribution dans les meilleures selleries mondiales. Elekka n'a rien de tout cela — et c'est précisément ce qui rend nos prix différents.",
      },
      {
        heading: "Ce que nous partageons avec elles",
        body: "La matière première d'abord : le cuir pleine fleur. C'est la même couche de peau, la même densité, la même qualité de base que ce qu'utilisent les meilleures maisons. Les procédés de coupe, de couture et de finition suivent les mêmes exigences. La quincaillerie inox est sélectionnée pour la même durabilité. Quand vous posez un Elekka à côté d'un bridon haut de gamme, la différence n'est pas dans le cuir.",
      },
      {
        heading: "Ce qui justifie le prix des grandes marques",
        body: "Les grandes maisons investissent massivement dans leur image de marque : présence en compétitions, sponsoring de cavaliers de haut niveau, publicités dans les magazines spécialisés, boutiques dans les grandes villes. Ces investissements ont une valeur — ils construisent une réputation. Mais ils se retrouvent dans le prix de chaque produit vendu. Vous payez le cuir, le travail — et la marque.",
      },
      {
        heading: "Ce qu'Elekka fait différemment",
        body: "Elekka vend directement, sans intermédiaire, sans réseau de distribution international, sans budget publicité. Cette structure réduite permet de concentrer chaque euro dans le produit lui-même — le cuir, la conception, les finitions. Le prix que vous payez reflète ce que vous avez entre les mains, pas ce que vous voyez dans les magazines.",
      },
      {
        heading: "Un choix assumé, pas une concession",
        body: "Choisir Elekka, ce n'est pas se contenter d'une alternative moins chère. C'est choisir de payer la qualité — uniquement. Si vous êtes cavalier de compétition et que le logo sur votre bridon fait partie de votre image, les grandes marques ont peut-être quelque chose à vous offrir que nous n'avons pas. Si vous cherchez un bridon rigoureux, confortable pour votre cheval et honnête dans son prix — Elekka est fait pour vous.",
      },
    ],
  },
  {
    slug: "concevoir-filet-cheval-lucas-fondateur",
    title: "Concevoir un filet de A à Z : ce que j'ai appris en créant le Signature",
    description: "Lucas, fondateur d'Elekka, raconte le processus de création du Signature — les essais, les erreurs, ce que les chevaux ont appris à ses concepteurs.",
    date: "2026-05-04",
    readTime: "6 min",
    category: "La marque",
    keywords: [
      "conception bridon équitation",
      "créer filet cheval",
      "Elekka Signature création",
      "bridon anatomique développement",
      "fondateur marque équestre",
      "Lucas Elekka histoire",
    ],
    content: [
      {
        body: "Le Signature n'est pas né d'une feuille de dessin. Il est né d'une observation répétée : des chevaux qui frottent la tête après la séance, qui résistent à la mise en main, qui changent d'attitude dès qu'on change leur équipement. J'ai passé des mois à chercher ce qui causait ces comportements — et à comprendre ce qu'un filet bien conçu devrait faire, ou plutôt ne pas faire.",
      },
      {
        heading: "Le point de départ : un cheval qui dit non",
        body: "Tout a commencé avec un cheval de l'écurie qui refusait systématiquement la mise en contact dès qu'on resserrait la muserolle. Pas un problème de mors, pas un problème de monte — c'était la pression sur le chanfrein. En desserrant la muserolle d'un cran, il changeait d'attitude. Ça m'a intrigué. J'ai commencé à observer d'autres chevaux, à mesurer les pressions, à comparer les réactions selon les filets portés.",
      },
      {
        heading: "La têtière : la pièce qu'on oublie toujours",
        body: "La nuque est souvent négligée dans la conception des filets. La têtière standard repose directement sur les vertèbres cervicales et la base des oreilles — deux zones particulièrement sensibles. La courbure anatomique du Signature n'a pas été dessinée pour être belle. Elle a été calculée pour libérer ces zones tout en maintenant le filet stable. Les premiers prototypes ont été testés sur une dizaine de chevaux aux morphologies différentes avant que la forme finale soit arrêtée.",
      },
      {
        heading: "La muserolle rembourrée : trouver la bonne épaisseur",
        body: "Trop fine, le rembourrage ne change rien. Trop épais, il crée une forme bizarre sur le visage du cheval et modifie le comportement du filet. Nous avons testé des épaisseurs de 1,5 cm à 4 cm avant de nous arrêter sur 2,5 à 3 cm — celle qui répartit la pression sans déformer la ligne du filet. La fermeture côté gauche est venue après : c'est simplement plus logique mécaniquement, et ça évite la surépaisseur sous le montant.",
      },
      {
        heading: "Ce que j'aurais voulu savoir avant",
        body: "Concevoir un filet, c'est apprendre à écouter des chevaux qui ne parlent pas. Leurs signaux sont subtils — une oreille qui pointe, une mâchoire qui se serre, une résistance à la flexion latérale. Ce sont eux les vrais testeurs. Et leur verdict, au bout de quelques séances, est sans appel. Le Signature que vous achetez aujourd'hui est le résultat de tous ces essais. Pas d'une idée, mais d'une écoute.",
      },
    ],
  },
];
