export type Article = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  content: { heading?: string; body: string }[];
  keywords: string[];
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
        body: "Elekka grandit avec une ambition claire : proposer des filets élégants, fiables et accessibles, sans compromis sur le respect du cheval. Une marque construite autour d'une idée essentielle : le prix ne fait pas la qualité d'une bride. Le produit, lui, doit la prouver.",
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
];
