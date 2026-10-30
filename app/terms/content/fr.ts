import type { LegalContent } from '@/app/ContentPage';

const fr: LegalContent = {
  title: 'Conditions d’utilisation',
  updated: 'Dernière mise à jour : 30 octobre 2026',
  intro: 'Les présentes conditions s’appliquent à votre utilisation de Scrum Poker Online sur scrumpokerplay.com (« le Service »). Le Service est exploité par Mert Gündoğan, un particulier établi en Turquie (« nous »). Contact : contact@scrumpokerplay.com. En utilisant le Service, vous acceptez ces conditions. Si vous ne les acceptez pas, n’utilisez pas le Service. La manière dont nous traitons les données personnelles est expliquée dans la Politique de confidentialité : https://www.scrumpokerplay.com/fr/privacy.',
  sections: [
    {
      title: '1. Le Service',
      content: 'Scrum Poker Online est un outil de planning poker en ligne qui vous permet d’estimer le travail avec votre équipe. Il n’y a pas de compte. Le Service est actuellement gratuit : il n’existe aucune offre payante, aucun abonnement ni aucun paiement. Si nous ajoutons des fonctionnalités payantes, elles pourront être soumises à leurs propres conditions.',
    },
    {
      title: '2. Qui peut l’utiliser',
      content: 'Vous devez avoir au moins 16 ans pour utiliser le Service.',
    },
    {
      title: '3. Salles',
      items: [
        'Toute personne disposant du code ou du lien d’une salle peut la rejoindre, sauf si l’hôte l’a fermée aux nouveaux venus. Elle peut alors voir ses participants, ses stories, les votes révélés et le chat, et y participer. Un code de salle n’est pas un mot de passe : ne le partagez qu’avec les personnes que vous souhaitez voir dans la salle.',
        'Par défaut, chaque participant peut révéler les votes, lancer un nouveau tour, gérer la file de stories et utiliser le minuteur. L’hôte peut en outre changer le jeu de cartes et les paramètres de la salle (révélation automatique, vote anonyme, tour mené par l’hôte seul, fermeture de la salle aux nouveaux venus, réactions emoji, adresse des liens vers les tickets), retirer des participants et confier le rôle d’hôte à une autre personne. Une personne retirée ne peut plus rejoindre cette salle depuis le même navigateur tant que la salle existe, sauf le propriétaire d’une salle conservée, à qui son lien de propriétaire permet d’y revenir.',
        'La personne qui crée une salle en est le premier hôte. Si l’hôte quitte la salle, le rôle passe à un autre participant. Un propriétaire qui ouvre une salle conservée avec son lien de propriétaire reprend le rôle d’hôte à un hôte qui ne dispose pas de la clé de propriétaire.',
        'Les salles sont temporaires. Une salle et son contenu sont normalement supprimés environ une heure après qu’elle s’est vidée (environ dix minutes s’il ne s’y est jamais rien passé). Pour une salle conservée (section 4), seuls sa configuration, sa file de stories et ses derniers résultats sont gardés.',
      ],
    },
    {
      title: '4. Salles conservées et liens de propriétaire',
      items: [
        'L’hôte peut conserver une salle. Sa configuration (code, nom, jeu de cartes et paramètres), sa file de stories et les résultats de ses derniers tours (story et estimation retenue) sont alors gardés, et il suffit de rouvrir plus tard le lien de la salle pour la retrouver.',
        'Conserver une salle crée un lien de propriétaire secret. Gardez-le pour vous : toute personne qui le détient contrôle la salle. Elle prend le rôle d’hôte et peut cesser de conserver la salle.',
        'Le navigateur dans lequel la salle a été conservée mémorise le lien de propriétaire. Copiez-le si vous souhaitez l’utiliser sur un autre appareil. Comme il n’y a pas de compte, nous ne pouvons pas récupérer un lien de propriétaire perdu.',
        'Une salle conservée est normalement supprimée lorsque son propriétaire cesse de la conserver, ou automatiquement 180 jours après le dernier retour de son propriétaire avec le lien de propriétaire, ou 30 jours après sa conservation si le propriétaire n’y revient jamais avec ce lien. Elle peut aussi être supprimée plus tôt (section 8). Nous pouvons limiter le nombre de salles pouvant être conservées.',
      ],
    },
    {
      title: '5. Votre contenu et votre responsabilité',
      items: [
        'Ce que vous saisissez (noms, noms de salle, stories, liens, votes, estimations, messages de chat) vous appartient. Vous nous accordez uniquement l’autorisation nécessaire pour faire fonctionner le Service avec ce contenu : le stocker et le transmettre, comme décrit dans la Politique de confidentialité, et l’afficher aux autres personnes présentes dans la salle. Celles-ci peuvent aussi exporter l’historique des tours.',
        'Vous êtes responsable de ce que vous saisissez. Ne saisissez pas d’informations confidentielles, de données personnelles d’autres personnes, ni rien d’illicite ou que vous n’avez pas le droit de partager.',
        'Nous ne vérifions pas les contenus. Si nous estimons que les règles des présentes conditions ne sont pas respectées, nous pouvons supprimer des contenus ou des salles, et bloquer ou limiter l’accès, sans préavis.',
      ],
    },
    {
      title: '6. Utilisation acceptable',
      content: 'N’utilisez pas le Service pour enfreindre la loi ; pour harceler ou menacer autrui ou usurper son identité ; pour partager des contenus illicites, haineux ou sexuellement explicites ou des liens malveillants ; pour attaquer le Service ou tenter d’y accéder sans autorisation ; pour en extraire des données de manière automatisée (scraping) ou lui envoyer du trafic automatisé ; pour effectuer des tests de charge ou de résistance contre lui ; ou pour contourner ses limites ou ses protections. Nous pouvons bloquer tout accès qui enfreint ces règles.',
    },
    {
      title: '7. Liens vers d’autres sites',
      content: 'Les salles peuvent contenir des liens vers d’autres sites, par exemple des liens vers des tickets ajoutés par les participants. Nous ne contrôlons ni ne vérifions ces sites. La personne qui ajoute un lien en est responsable, et vous ouvrez ces liens à vos propres risques.',
    },
    {
      title: '8. Disponibilité, données et modifications du Service',
      items: [
        'Nous ne nous engageons pas à ce que le Service soit disponible à un moment donné ni pendant une durée donnée, ni à conserver des données ou à faire des sauvegardes sur lesquelles vous pourriez compter. Les salles et les salles conservées peuvent être supprimées ou perdues à tout moment, par exemple après une défaillance technique.',
        'Gardez votre propre copie de tout ce qui est important. L’historique des tours d’une salle peut être téléchargé au format CSV, ou copié au format CSV ou Markdown.',
        'Nous pouvons modifier, suspendre ou arrêter le Service, ou toute partie ou fonctionnalité de celui-ci, à tout moment, sans préavis et, dans la mesure permise par la loi, sans engager notre responsabilité.',
      ],
    },
    {
      title: '9. Absence de garantie',
      content: 'Dans la mesure permise par la loi, le Service est fourni « en l’état » et « selon disponibilité », sans garantie d’aucune sorte, expresse ou implicite. En particulier, nous ne nous engageons pas à ce qu’il soit exempt d’erreurs, sûr, ininterrompu ou adapté à un usage particulier.',
    },
    {
      title: '10. Limitation de responsabilité',
      items: [
        'Dans la mesure permise par la loi, nous ne sommes pas responsables des dommages indirects, accessoires, spéciaux ou consécutifs, ni des pertes de données, de bénéfices ou de temps, ni des interruptions d’activité.',
        'Le Service est gratuit. Dans la mesure permise par la loi, notre responsabilité totale pour toutes les réclamations liées au Service est donc limitée au montant que vous nous avez payé pour celui-ci, c’est-à-dire zéro.',
        'Ces limites ne s’appliquent pas lorsque la loi ne permet pas de limiter la responsabilité, notamment en cas de faute intentionnelle ou de faute lourde et d’atteinte à la vie, à l’intégrité physique ou à la santé. Aucune disposition des présentes conditions ne limite les droits dont vous bénéficiez en tant que consommateur en vertu des dispositions impératives de la loi de votre pays.',
      ],
    },
    {
      title: '11. Assistance et notifications',
      content: 'Nous n’avons aucune obligation de fournir une assistance, de répondre aux questions ou de corriger les erreurs. Vous pouvez envoyer vos notifications et questions à contact@scrumpokerplay.com. Nos notifications sont publiées sur ce site.',
    },
    {
      title: '12. Modifications des présentes conditions',
      content: 'Nous pouvons modifier ces conditions à tout moment. La version en vigueur figure toujours sur cette page, avec sa date. Comme il n’y a pas de compte, nous ne prévenons personne individuellement. Si vous continuez à utiliser le Service après une modification, vous acceptez les nouvelles conditions.',
    },
    {
      title: '13. Code source',
      content: 'Le code source du Service est disponible sous la licence GNU Affero General Public License, version 3, à l’adresse https://github.com/mertgundoganx/scrum-poker. Cette licence s’applique au code ; les présentes conditions s’appliquent à votre utilisation du Service exploité sur scrumpokerplay.com.',
    },
    {
      title: '14. Marques',
      content: 'Planning Poker® est une marque déposée de Mountain Goat Software, LLC. Scrum Poker Online n’est ni affilié à cette société ni approuvé par elle.',
    },
    {
      title: '15. Dispositions finales',
      content: 'Les présentes conditions constituent l’intégralité de l’accord entre vous et nous concernant le Service. Si une partie de celles-ci est nulle ou inapplicable, le reste continue de s’appliquer. Le fait de ne pas faire appliquer une disposition ne vaut pas renonciation à celle-ci.',
    },
    {
      title: '16. Contact',
      content: 'Questions relatives aux présentes conditions : contact@scrumpokerplay.com',
    },
  ],
};

export default fr;
