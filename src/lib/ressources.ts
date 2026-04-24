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
    description: "Taille, matière, anatomique ou classique — tout ce qu'il faut savoir pour choisir le bon filet pour votre cheval.",
    date: "2026-04-01",
    readTime: "5 min",
    category: "Conseils",
    keywords: ["filet bridon", "choisir filet cheval", "bridon cuir", "filet anatomique", "Full Cob"],
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
        body: "La taille Full convient aux chevaux de grande taille (au-delà de 1,65 m au garrot). La taille Cob est adaptée aux poneys et chevaux plus petits. Pour mesurer la tête de votre cheval, utilisez un mètre souple autour du chanfrein. En cas de doute, le Full est le choix le plus courant pour un cheval standard.",
      },
      {
        heading: "Filet classique ou anatomique ?",
        body: "Un filet classique convient à la grande majorité des chevaux. Un filet anatomique, avec sa têtière incurvée et sa muserolle rembourrée, est particulièrement recommandé pour les chevaux sensibles au niveau de la nuque ou du chanfrein. Il favorise la décontraction, réduit les tensions et améliore la précision des aides. Si votre cheval résiste ou semble inconfortable avec un filet classique, le choix anatomique vaut largement la peine d'être envisagé.",
      },
      {
        heading: "Les points à vérifier avant d'acheter",
        body: "Vérifiez la qualité des coutures et de la quincaillerie (boucles, anneaux). Un filet de qualité ne doit pas avoir de bords tranchants ni de finitions approximatives. Le cuir doit être souple dès la première utilisation, sans être trop sec. Enfin, assurez-vous que le modèle est conforme aux règlements de compétition de votre discipline si vous pratiquez en concours.",
      },
    ],
  },
  {
    slug: "entretien-cuir-equestre",
    title: "Entretien du cuir équestre : les bons gestes pour durer",
    description: "Comment nettoyer, nourrir et conserver votre filet en cuir. Les conseils d'entretien pour prolonger la vie de votre équipement équestre.",
    date: "2026-04-05",
    readTime: "4 min",
    category: "Conseils",
    keywords: ["entretien cuir équestre", "graisser filet cheval", "cuir selle entretien", "nettoyer bridon cuir"],
    content: [
      {
        body: "Un filet en cuir de qualité peut durer des années, voire des décennies, avec un entretien régulier et adapté. Voici les bons gestes à adopter dès la première utilisation.",
      },
      {
        heading: "Avant la première utilisation",
        body: "Avant de passer votre filet pour la première fois, nourrissez le cuir avec une huile de pied de bœuf ou une glycérine neutre. Laissez pénétrer quelques heures. Ce geste assouplit le cuir, évite les frottements et prolonge sa durée de vie.",
      },
      {
        heading: "Après chaque utilisation",
        body: "Essuyez les résidus de bave et de sueur avec un chiffon légèrement humide. Ne laissez jamais le cuir sécher avec de l'humidité dessus — cela favorise le craquelage et le développement de moisissures.",
      },
      {
        heading: "Nettoyage hebdomadaire",
        body: "Une fois par semaine, démontez le filet et nettoyez chaque pièce avec un savon pour cuir (glycérine, savon de selle). Rincez légèrement et laissez sécher à l'air libre, à l'abri du soleil direct. Appliquez ensuite une fine couche de graisse nourrissante.",
      },
      {
        heading: "Quelle graisse utiliser ?",
        body: "Privilégiez l'huile de pied de bœuf pour nourrir en profondeur, ou une glycérine neutre pour l'entretien courant. Évitez les graisses trop épaisses ou colorées qui peuvent obstruer les pores du cuir ou tacher les mains et la robe de votre cheval.",
      },
      {
        heading: "Conservation",
        body: "Rangez votre filet dans un endroit sec, tempéré et aéré. Évitez les sacs fermés hermétiquement ou les box humides. Un porte-bridon ou un cintre adapté permet de conserver la forme du filet dans le temps.",
      },
    ],
  },
  {
    slug: "filet-anatomique-bienfaits",
    title: "Filet anatomique : pourquoi ça change tout pour votre cheval",
    description: "Nuque soulagée, chanfrein protégé, décontraction améliorée — les véritables bénéfices du filet anatomique pour le bien-être et les performances de votre cheval.",
    date: "2026-04-10",
    readTime: "6 min",
    category: "Conseils",
    keywords: ["filet anatomique cheval", "pression nuque cheval", "bien-être cheval équipement", "bridon anatomique bienfaits", "équipement équestre bien-être"],
    content: [
      {
        body: "De plus en plus plébiscité par les cavaliers professionnels et amateurs, le filet anatomique répond à une préoccupation centrale : le bien-être du cheval pendant le travail. Mais qu'est-ce qui le distingue vraiment d'un filet classique ?",
      },
      {
        heading: "Les zones de pression à surveiller",
        body: "La tête du cheval est une zone particulièrement sensible. La nuque, le chanfrein, les barres et les tempes concentrent de nombreux nerfs et tendons. Un équipement mal ajusté ou inadapté peut générer des tensions chroniques, des douleurs, voire des blocages qui affectent directement le comportement et les performances de l'animal.",
      },
      {
        heading: "La têtière incurvée : soulager la nuque",
        body: "Sur un filet classique, la têtière est plate et repose uniformément sur la nuque. Sur un filet anatomique, elle est incurvée et évidée au niveau de la nuque, ce qui libère la zone des oreilles et réduit la pression sur les processus articulaires. Résultat : le cheval accepte mieux le contact, relâche la nuque et travaille plus librement dans son dos.",
      },
      {
        heading: "La muserolle rembourrée : protéger le chanfrein",
        body: "La muserolle est la partie du filet qui repose sur le chanfrein du cheval. Sur les modèles Elekka, le rembourrage épais (2,5 à 3 cm) absorbe la pression et répartit le contact sur une surface plus large. La fermeture côté gauche évite les protubérances sous le cuir qui pourraient créer des points de pression supplémentaires.",
      },
      {
        heading: "Un cheval plus décontracté, des aides plus précises",
        body: "Quand le cheval ne souffre pas, il se concentre. Un équipement confortable favorise la décontraction de la mâchoire, du cou et du dos — ce qui se traduit directement par une meilleure réactivité aux aides et une posture plus juste. Nombreux sont les cavaliers qui constatent une amélioration notable dès les premières séances avec un filet anatomique.",
      },
    ],
  },
  {
    slug: "programme-parrainage",
    title: "Parrainez un ami et gagnez tous les deux",
    description: "Comment fonctionne le programme de parrainage Elekka — et comment obtenir votre lien personnel pour faire profiter vos amis cavaliers.",
    date: "2026-04-20",
    readTime: "2 min",
    category: "Bons plans",
    keywords: ["parrainage équestre", "réduction filet cheval", "code parrainage Elekka", "bons plans équitation"],
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
    description: "Guide pratique pour mesurer correctement la tête de son cheval et choisir la bonne taille de filet entre Full et Cob.",
    date: "2026-04-15",
    readTime: "3 min",
    category: "Conseils",
    keywords: ["taille filet cheval", "mesurer tête cheval", "Full Cob filet", "guide taille bridon"],
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
        body: "En règle générale : Full pour les chevaux de sport de grande taille (Selle Français, KWPN, Hanovrien…), Cob pour les races plus compactes, les poneys de grande taille et les Quarter Horses. Si votre cheval est à la limite, optez pour le Full — il est ajustable et généralement plus polyvalent.",
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
    title: "Elekka : la naissance d'une marque équestre",
    description: "Comment Elekka est née d'une conviction simple — offrir la qualité des grandes maisons équestres à un prix juste. L'histoire de Lucas et de sa vision.",
    date: "2026-03-15",
    readTime: "4 min",
    category: "La marque",
    keywords: ["marque équestre française", "bridon cuir qualité prix", "équipement équestre abordable", "Elekka sellerie"],
    content: [
      {
        body: "Elekka est née d'une frustration simple et partagée par beaucoup de cavaliers : pourquoi faut-il payer le prix du prestige pour avoir un filet de qualité ?",
      },
      {
        heading: "Une légitimité terrain",
        body: "Lucas, fondateur d'Elekka, est cavalier depuis toujours et fils de cavalier. Il vit et travaille au sein d'une grande écurie de compétition. C'est là, au quotidien, qu'il a observé la réalité du marché équestre : des produits de qualité identique vendus à des prix très différents selon le prestige de la marque.",
      },
      {
        heading: "La conviction fondatrice",
        body: "La qualité d'un filet ne vient pas de son logo. Elle vient du cuir, de la coupe, des finitions, de l'attention portée aux zones de pression. Ces éléments ne sont pas l'apanage des grandes maisons — ils sont accessibles à qui accepte de réduire les marges et de mettre le produit au centre.",
      },
      {
        heading: "Des modèles conçus par un cavalier",
        body: "Les filets Signature et Fusion ont été développés par Lucas lui-même, en s'appuyant sur son expérience terrain et sur les retours de cavaliers de tous niveaux. Chaque détail — la courbure de la têtière, l'épaisseur du rembourrage, la position de la fermeture — répond à un besoin réel.",
      },
      {
        heading: "Et maintenant",
        body: "Elekka propose aujourd'hui trois modèles, vendus en ligne et dans quelques selleries partenaires. La marque grandit lentement, à la juste mesure de ses engagements : qualité réelle, prix honnête, respect du cheval.",
      },
    ],
  },
  {
    slug: "collection-2026",
    title: "Collection 2026 : présentation de nos trois modèles",
    description: "Découvrez les trois filets de la gamme Elekka — Essentiel, Signature et Fusion — leurs caractéristiques, leurs différences et comment choisir celui qui convient à votre cheval.",
    date: "2026-03-20",
    readTime: "5 min",
    category: "Produits",
    keywords: ["filet Elekka", "bridon cuir 2026", "filet Signature Fusion Essentiel", "gamme filets équitation"],
    content: [
      {
        body: "La gamme Elekka se compose de trois modèles, chacun pensé pour répondre à un besoin précis. Voici une présentation détaillée pour vous aider à choisir.",
      },
      {
        heading: "Le Filet Essentiel — 90 €",
        body: "C'est notre modèle d'entrée de gamme — dans le bon sens du terme. Classique et épuré, il répond à toutes les situations. Cuir pleine fleur, muserolle simple, quincaillerie argentée. Disponible en Havana Brown et Noir, en Full et Cob. Pour le cavalier qui veut un filet fiable, sans fioritures, à un prix raisonnable.",
      },
      {
        heading: "Le Filet Anatomique Signature — 110 €",
        body: "Conçu par Lucas pour répondre aux besoins des chevaux sensibles. Têtière anatomique incurvée qui soulage la nuque, muserolle rembourrée épaisse (2,5 à 3 cm) avec fermeture côté gauche. Rênes caoutchouc incluses. Browband 17 pouces (Full) ou 16 pouces (Cob). Disponible en Havana Brown et Noir.",
      },
      {
        heading: "Le Filet Anatomique Fusion — 110 €",
        body: "Notre modèle le plus complet. Browband anatomique large 5,5 cm, muserolle à triple attache (épaisse, ovale, rectangulaire) pour s'adapter à toutes les morphologies. Fermeture côté gauche, rênes caoutchouc incluses. Disponible en Havana Brown et Dark Brown.",
      },
      {
        heading: "Lequel choisir ?",
        body: "Si votre cheval est sensible au niveau de la nuque ou du chanfrein, ou si vous cherchez à améliorer sa décontraction, le Signature ou le Fusion s'imposent. Si vous cherchez un filet classique, polyvalent et durable, l'Essentiel est le bon choix. En cas de doute, écrivez-nous — nous vous aidons à décider.",
      },
    ],
  },
  {
    slug: "parrainez-vos-amis",
    title: "Parrainez vos amis — et gagnez -30€ sur votre prochain filet",
    description: "Elekka lance son programme de parrainage. Partagez votre lien, votre ami profite de -20%, vous gagnez -30€. Simple, automatique, sans limite.",
    date: "2026-04-18",
    readTime: "2 min",
    category: "Nouveauté",
    keywords: ["parrainage Elekka", "code parrainage filet cheval", "réduction équitation", "programme fidélité équestre"],
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
    description: "Qu'est-ce que le cuir pleine fleur et pourquoi est-il supérieur aux autres types de cuir pour l'équipement équestre ? Explications claires.",
    date: "2026-04-02",
    readTime: "4 min",
    category: "Matières",
    keywords: ["cuir pleine fleur", "qualité cuir équestre", "cuir briderie sellerie", "cuir cheval équipement"],
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
