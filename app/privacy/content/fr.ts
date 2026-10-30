import type { LegalContent } from '@/app/ContentPage';

const fr: LegalContent = {
  title: 'Politique de confidentialité',
  updated: 'Dernière mise à jour : 30 octobre 2026',
  intro: 'La présente politique explique quelles données Scrum Poker Online (scrumpokerplay.com, « le Service ») traite, pour quelles raisons, pendant combien de temps et avec qui. Le Service est exploité par Mert Gündoğan, un particulier établi en Turquie (« nous »), qui est le responsable des traitements décrits ici. Contact : contact@scrumpokerplay.com. Le Service étant aussi proposé à des personnes situées dans l’UE/EEE, le règlement général sur la protection des données (RGPD) s’y applique (art. 3, paragraphe 2), de même que le droit turc de la protection des données (KVKK, section 8). Le Service ne comporte aucun compte utilisateur. Nos conditions d’utilisation se trouvent à l’adresse https://www.scrumpokerplay.com/fr/terms.',
  sections: [
    {
      title: '1. Données que nous traitons',
      items: [
        'Il n’y a pas de compte : nous ne demandons ni adresse e-mail ni mot de passe, et il n’existe aucune forme de connexion.',
        'Dans une salle : le nom d’affichage que vous choisissez (il n’est pas nécessaire que ce soit votre vrai nom), un avatar emoji facultatif, un identifiant aléatoire créé par votre navigateur et le contenu de la salle — nom de la salle, stories, votes et historique des tours, estimations finales, messages de chat (les 30 derniers de chaque salle) et minuteur partagé.',
        'Ce que voient les autres personnes de la salle : toutes les personnes présentes dans la salle voient votre nom, votre avatar, si vous avez voté, si vous êtes spectateur ou absent, vos messages de chat et vos votes une fois révélés. L’historique des tours (la story de chaque tour et, sauf si la salle est anonyme, qui a voté quoi) et les 30 derniers messages de chat sont également affichés aux personnes qui arrivent plus tard, tant que la salle existe, et toute personne présente dans la salle peut télécharger ou copier l’historique des tours, y compris les noms et les votes, au format CSV ou Markdown — nous n’avons aucun contrôle sur de telles copies. Dans une salle anonyme, les cartes révélées sont affichées et conservées sans les noms. Les réactions emoji et les relances (une relance montre votre nom à la personne relancée) sont affichés en direct et ne sont jamais enregistrés. La salle enregistre également les identifiants aléatoires de l’hôte, des personnes que l’hôte a retirées et des propriétaires d’une salle conservée.',
        'Salles conservées : si l’hôte conserve une salle, nous enregistrons son code, son nom, son jeu de cartes (y compris les cartes personnalisées) et ses paramètres (révélation automatique, vote anonyme, tour mené par l’hôte seul, réactions activées ou non, et le modèle d’adresse des liens vers les tickets saisi par l’hôte), sa file de stories, les résultats de ses derniers tours, 50 au maximum (pour chacun, uniquement le texte de la story, l’estimation retenue et l’heure de fin du tour — aucun nom, aucun vote individuel), un hachage SHA-256 de sa clé de propriétaire (jamais la clé elle-même) et la date à laquelle elle a été conservée. Ces informations ne contiennent normalement aucune donnée personnelle, sauf si quelqu’un en saisit dans le nom de la salle ou dans les stories, et nous ne rattachons une salle conservée à aucune personne.',
        'Adresse IP : nous utilisons votre adresse IP pour limiter les abus (limitation du nombre de requêtes, et du nombre de salles et de connexions qu’une même adresse peut avoir ouvertes). Ces enregistrements sont conservés uniquement dans la mémoire du serveur et ne sont jamais écrits dans la base de données ni dans ses sauvegardes. Votre adresse IP figure également dans le journal d’accès du proxy inverse (voir Journaux).',
        'Journaux : les journaux de l’application enregistrent des événements (création d’une salle, arrivée ou retrait d’une personne) avec le code de la salle et l’identifiant aléatoire, mais ni les adresses IP ni le contenu des salles. Le proxy inverse placé devant l’application (Caddy, exécuté par notre outil de déploiement sur le même serveur) journalise chaque requête : l’heure, l’hôte, la méthode, le chemin sans la chaîne de requête, le code d’état, la durée, la taille et votre adresse IP.',
        'Statistiques de visite : le script de Cloudflare Web Analytics (static.cloudflareinsights.com) envoie à Cloudflare l’adresse de la page, la page de provenance, le type de votre navigateur et les temps de chargement de la page ; Cloudflare reçoit votre adresse IP avec cette requête. Il ne dépose aucun cookie et n’enregistre rien sur votre appareil ; nous ne voyons que des chiffres agrégés (pages, pays, navigateurs), et aucun profil vous concernant n’est établi.',
        'E-mail : si vous écrivez à contact@scrumpokerplay.com, Cloudflare Email Routing transfère votre message vers notre boîte aux lettres Microsoft Outlook (Microsoft Corporation, États-Unis), que Microsoft fournit selon ses propres conditions en tant que responsable du traitement à part entière, et non pour notre compte. Nous traitons votre adresse e-mail et votre message uniquement pour vous répondre.',
      ],
    },
    {
      title: '2. Sur votre appareil',
      items: [
        'Cookies : nous déposons nous-mêmes un seul type de cookie, à savoir un cookie de salle signé pour chaque salle que vous rejoignez. Il n’est envoyé qu’à l’API de cette salle et contient votre identifiant aléatoire, le code de la salle et une date d’expiration ; il est valable 2 heures et renouvelé tant que vous utilisez la salle. En outre, la protection contre les bots de Cloudflare peut effectuer une brève vérification automatique dans votre navigateur et déposer, pour scrumpokerplay.com, des cookies de sécurité, comme cf_clearance (valable jusqu’à un an), utilisés uniquement pour distinguer les navigateurs du trafic automatisé. Cloudflare peut également demander à votre navigateur de lui signaler les erreurs réseau (Network Error Logging) ; votre navigateur conserve cette instruction pendant 7 jours au maximum. Nous ne déposons aucun autre cookie.',
        'Ces cookies et le stockage dans le navigateur décrit ci-dessous sont strictement nécessaires pour fournir le Service que vous demandez, en assurer la sécurité ou mémoriser les paramètres que vous avez choisis ; ils ne requièrent donc pas de consentement (art. 5, paragraphe 3, de la directive « vie privée et communications électroniques » ; en Allemagne, § 25, al. 2, n° 2, TDDDG). C’est pourquoi il n’y a pas de bandeau de cookies.',
        'Stockage local de votre navigateur : votre langue, si vous en avez choisi une ; vos paramètres de thème et de son ; votre nom d’affichage, votre avatar et votre identifiant aléatoire ; jusqu’à 5 salles ouvertes récemment (code, nom et moment de l’ouverture) ; les clés de propriétaire, codes et noms de 50 salles au maximum conservées dans ce navigateur ; le fait que vous ayez masqué ou non l’astuce de la salle ; et, pour chaque salle, une courte liste de vos onglets ouverts, afin que la fermeture d’un onglet ne vous fasse pas quitter la salle.',
        'Stockage de session : la langue de la dernière page que vous avez lue, afin qu’une salle ouverte depuis cette page démarre dans cette langue ; une note indiquant que cet onglet a déjà été redirigé une fois vers la langue de votre navigateur ; et, uniquement pendant un bref instant lors de l’ouverture d’un lien de propriétaire, sa clé de propriétaire.',
        'Utilisation hors ligne : le service worker enregistre des pages (jamais les pages des salles) et des fichiers statiques dans votre navigateur afin que le site fonctionne aussi hors ligne.',
        'Le stockage local et les fichiers du service worker restent sur votre appareil jusqu’à ce que vous effaciez les données du site dans votre navigateur ; le stockage de session est effacé à la fermeture de l’onglet, et la liste des onglets d’une salle à la fermeture de son dernier onglet. Votre nom, votre avatar et votre identifiant ne nous sont transmis que lorsque vous créez ou rejoignez une salle (l’identifiant également dans le cookie de salle, à chaque action dans cette salle), et une clé de propriétaire uniquement pour prouver qu’une salle conservée vous appartient.',
      ],
    },
    {
      title: '3. Pourquoi nous traitons des données (bases juridiques)',
      items: [
        'Fournir le Service que vous demandez — salles et salles conservées : exécution d’un contrat (art. 6, paragraphe 1, point b) du RGPD).',
        'Données nécessaires : pour participer à une salle, vous avez besoin d’un nom d’affichage (n’importe quel nom ; il n’est pas nécessaire que ce soit votre vrai nom), et votre navigateur a besoin de l’identifiant aléatoire et du cookie de salle. Sans eux, la salle ne peut pas fonctionner. Rien d’autre n’est nécessaire.',
        'Assurer la sécurité et la disponibilité du Service — limitation du nombre de requêtes, protection contre les abus et les bots, journaux et sauvegardes : notre intérêt légitime à disposer d’un service qui fonctionne et n’est pas détourné (art. 6, paragraphe 1, point f) du RGPD).',
        'Statistiques de visite, afin de comprendre quelles pages sont utilisées : notre intérêt légitime (art. 6, paragraphe 1, point f) du RGPD) ; aucun profil vous concernant n’est établi.',
        'Répondre à vos e-mails : notre intérêt légitime (art. 6, paragraphe 1, point f) du RGPD).',
        'Nous ne prenons aucune décision fondée exclusivement sur un traitement automatisé produisant des effets juridiques vous concernant ou vous affectant de manière significative de façon similaire (art. 22 du RGPD) ; les limitations automatiques du nombre de requêtes ne font que retarder ou refuser les requêtes excessives.',
      ],
    },
    {
      title: '4. Durée de conservation',
      items: [
        'Contenu des salles (noms, avatars, identifiants, stories, votes et historique des tours, estimations finales, chat, minuteur, ainsi que les identifiants des personnes retirées et des propriétaires) : supprimé environ une heure après que la salle s’est vidée, ou au bout d’environ dix minutes s’il ne s’y est jamais rien passé. Le journal des modifications de la base de données sur disque peut encore le contenir jusqu’à son prochain compactage, au plus tard avant la sauvegarde quotidienne suivante. À tout moment, seuls les 30 derniers messages de chat d’une salle sont conservés.',
        'Salles conservées : jusqu’à ce que leur propriétaire cesse de les conserver, ou automatiquement 180 jours après le dernier retour de leur propriétaire au moyen du lien de propriétaire — ou 30 jours après la conservation de la salle, si le propriétaire n’y revient jamais avec ce lien ; l’ouverture de la salle par d’autres personnes ne prolonge pas ce délai. Une salle conservée peut aussi être supprimée plus tôt, par exemple si le serveur manque de mémoire.',
        'Adresses IP utilisées pour la limitation du nombre de requêtes : uniquement dans la mémoire du serveur ; elles sont effacées une fois leur fenêtre de temps écoulée (normalement dans l’heure environ qui suit la dernière requête) et à chaque redémarrage de l’application. L’adresse qui a ouvert une salle encore active : en mémoire jusqu’à la suppression de cette salle. Le nombre de connexions ouvertes par adresse : uniquement tant que les connexions sont ouvertes.',
        'Journaux : les journaux de l’application font l’objet d’une rotation en fonction de leur taille — cinq fichiers de 10 Mo au maximum sont conservés, le plus ancien étant écrasé ; lors d’un redéploiement de l’application, une copie des dernières lignes de l’instance remplacée (2 000 lignes au maximum) est conservée 14 jours. Le journal d’accès du proxy inverse est conservé dans des fichiers limités à 3 × 10 Mo, le plus ancien étant écrasé ; des décomptes agrégés par minute, sans adresses IP, sont conservés 7 jours.',
        'E-mails : conservés aussi longtemps que nécessaire pour vous répondre et assurer le suivi, normalement pas plus de 12 mois après la fin de nos échanges, sauf s’ils sont nécessaires à la constatation, à l’exercice ou à la défense de droits en justice.',
        'Sauvegardes : la base de données est sauvegardée une fois par jour, et chaque sauvegarde est conservée 7 jours sur le même serveur. Avant chaque sauvegarde, le journal des modifications de la base de données est compacté, de sorte qu’une sauvegarde contient ce qui se trouvait dans la base à ce moment-là. Le contenu des salles, le chat et les salles conservées présents au moment de la sauvegarde peuvent donc subsister dans une sauvegarde pendant 7 jours supplémentaires au plus. Les sauvegardes servent uniquement à rétablir le Service après une panne.',
      ],
    },
    {
      title: '5. Lieu de stockage et prestataires concernés',
      items: [
        'Tout ce que le Service stocke — une base de données Redis unique, ses sauvegardes et les journaux — se trouve sur notre serveur chez Hetzner, dans son centre de données d’Helsinki (Finlande). Les e-mails qui nous sont adressés sont conservés dans notre boîte aux lettres Microsoft Outlook.',
        'Hetzner Online GmbH (Allemagne) : notre serveur, avec la base de données, ses sauvegardes et les journaux, dans son centre de données d’Helsinki (Finlande).',
        'Cloudflare, Inc. (États-Unis) : l’ensemble du trafic transite par le réseau de Cloudflare — normalement par le centre de données le plus proche de vous, qui peut se trouver hors de l’UE — pour le DNS, le chiffrement (TLS), la protection contre les bots et les attaques, le transfert des e-mails et Web Analytics. Cloudflare assurant la terminaison de la connexion chiffrée, il traite pour notre compte l’ensemble du trafic, y compris les adresses IP et le contenu des salles en transit ; il ne stocke pas le contenu des salles.',
        'Microsoft Corporation (États-Unis) : fournit, selon ses propres conditions, notre boîte aux lettres Microsoft Outlook, qui reçoit les messages envoyés à contact@scrumpokerplay.com ; pour cette boîte aux lettres, Microsoft est responsable du traitement à part entière et non un sous-traitant agissant pour notre compte.',
        'Transferts hors de l’UE : Cloudflare et Microsoft sont certifiés au titre du cadre de protection des données UE–États-Unis (EU-U.S. Data Privacy Framework) (https://www.dataprivacyframework.gov) ; l’avenant relatif au traitement des données de Cloudflare (Data Processing Addendum), qui comprend les clauses contractuelles types de l’UE, est disponible à l’adresse https://www.cloudflare.com/cloudflare-customer-dpa/. Nous exploitons le Service depuis la Turquie, qui ne fait l’objet d’aucune décision d’adéquation de l’UE ; lorsque nous administrons le serveur, nous accédons aux données depuis ce pays. Hetzner et Cloudflare ne traitent les données que pour notre compte, afin de nous fournir leur service.',
      ],
    },
    {
      title: '6. Vos droits',
      items: [
        'Vous pouvez demander à accéder à vos données personnelles, à les faire rectifier, à les exporter ou à les faire effacer, à limiter leur traitement, et à savoir à qui elles ont été communiquées (art. 15 à 20 du RGPD). Écrivez à contact@scrumpokerplay.com et nous vous répondrons dans un délai d’un mois (art. 12, paragraphe 3, du RGPD ; pour les demandes complexes, ce délai peut être prolongé de deux mois, et nous vous en informerons). Comme il n’y a pas de compte et que les données d’une salle disparaissent environ une heure après qu’elle s’est vidée, nous ne détenons généralement rien que nous puissions rattacher à vous ; veuillez nous indiquer le code de la salle, le moment approximatif où vous l’avez utilisée et votre nom d’affichage.',
        'Vous avez également le droit d’introduire une réclamation auprès d’une autorité de contrôle, en particulier dans le pays de l’UE/EEE où vous résidez ou travaillez.',
      ],
    },
    {
      title: '7. Votre droit d’opposition',
      content: 'Vous pouvez à tout moment, pour des raisons tenant à votre situation particulière, vous opposer aux traitements fondés sur nos intérêts légitimes (sécurité, limitation du nombre de requêtes et protection contre les bots, journaux et sauvegardes, statistiques de visite, réponse aux e-mails) (art. 21 du RGPD). Écrivez à contact@scrumpokerplay.com ; nous cesserons alors ces traitements, sauf si nous avons des motifs légitimes et impérieux qui prévalent sur vos intérêts, droits et libertés, ou si ces traitements sont nécessaires à la constatation, à l’exercice ou à la défense de droits en justice.',
    },
    {
      title: '8. Droit turc (KVKK)',
      items: [
        'Étant établis en Turquie, nous sommes également soumis à la loi n° 6698 sur la protection des données à caractère personnel (KVKK). En tant que responsable du traitement, nous vous informons au moyen de la présente politique, comme l’exige l’article 10 de la KVKK.',
        'Nous collectons les données décrites ici par voie électronique, au moyen du site web, aux fins indiquées à la section 3 (article 5, paragraphe 2, point c) de la KVKK : nécessité pour un contrat, et point f) : nos intérêts légitimes). Elles sont transférées à l’étranger, à Hetzner (Allemagne ; serveur en Finlande), Cloudflare et Microsoft (États-Unis), comme décrit à la section 5.',
        'Vous disposez des droits prévus à l’article 11 de la KVKK : savoir si vos données sont traitées, demander des informations à ce sujet, connaître la finalité du traitement et savoir si les données sont utilisées conformément à celle-ci, connaître les destinataires en Turquie ou à l’étranger, demander la rectification ou l’effacement et que les destinataires en soient informés, vous opposer à un résultat défavorable découlant exclusivement d’une analyse automatisée, et demander réparation du préjudice causé par un traitement illicite. Écrivez à contact@scrumpokerplay.com ; nous vous répondrons dans un délai de 30 jours au plus (article 13 de la KVKK).',
        'Si nous rejetons votre demande, si nous ne répondons pas dans les délais ou si vous jugez notre réponse insuffisante, vous pouvez également saisir d’une plainte le Conseil de protection des données personnelles (Kişisel Verileri Koruma Kurulu) (article 14 de la KVKK).',
      ],
    },
    {
      title: '9. Sécurité',
      content: 'Nous prenons des mesures techniques raisonnables pour protéger les données. Par exemple, les connexions sont chiffrées (TLS), les clés de propriétaire des salles conservées ne sont stockées que sous forme de hachages, les cookies de salle sont signés et HttpOnly (ils ne peuvent pas être lus par des scripts), et la base de données n’est pas accessible depuis Internet. Aucun système n’est totalement sûr, et nous ne pouvons pas garantir la sécurité. En cas de violation de données, nous agirons comme la loi l’exige.',
    },
    {
      title: '10. Enfants',
      content: 'Le Service ne s’adresse pas aux enfants de moins de 16 ans, et nous ne collectons pas sciemment leurs données. Si vous pensez que nous détenons des données concernant un enfant, contactez-nous afin que nous puissions les supprimer.',
    },
    {
      title: '11. Modifications',
      content: 'Nous pouvons modifier la présente politique. La version en vigueur, avec sa date, figure toujours sur cette page. Comme il n’y a pas de compte, nous ne prévenons personne individuellement. Questions : contact@scrumpokerplay.com.',
    },
  ],
};

export default fr;
