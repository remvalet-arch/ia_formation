# 🎬 Clap de Famille — Brief projet

> **But de ce document** : servir de base de travail unique (notamment avec Claude Cowork) pour
> (1) rédiger le **business plan**, et (2) concevoir la **chaîne d'automatisation** qui permettra de scaler.
> Il récapitule le concept, l'offre, ce qui est déjà construit, la stratégie de validation, le modèle
> économique et les questions ouvertes.
>
> _Statut : phase de validation (pré-produit). Dernière mise à jour : voir l'historique git._

---

## 1. Résumé exécutif

**Clap de Famille** transforme les vidéos de famille en un **vrai court-métrage monté**, livré en moins de 3 jours.

Le principe : un **kit DIY guidé**. La famille tourne elle-même, avec son smartphone (iPhone ou Samsung),
en suivant des **fiches d'instructions** (choix d'une thématique, liste de plans à filmer, conseils de tournage,
guide technique, atelier scénario). Elle **dépose ses rushes**, et notre équipe se charge du **montage
semi-automatisé** (sélection, musique, titres, étalonnage) pour livrer le film fini rapidement.

- **Modèle** : à l'acte (un paiement par film), pas d'abonnement.
- **Différenciation** : on ne vend ni une app de montage (trop technique), ni une prestation vidéaste
  (trop chère). On vend **l'accompagnement + le montage pro**, en laissant la famille capturer ses
  propres moments authentiques.
- **Statut actuel** : aucun produit livré encore. On teste l'**appétence** et la **sensibilité au prix**
  via une landing « fake door » + capture d'emails.

---

## 2. Le problème & l'insight

- Les familles filment énormément (smartphones) mais **n'en font jamais rien** : les vidéos dorment
  dans la pellicule, jamais montées, jamais regardées.
- Monter soi-même est **trop long et trop technique** (logiciels, musique, droits, rythme).
- Faire appel à un vidéaste pro est **cher** et perd la **spontanéité** du moment familial.
- **Insight** : les gens ne manquent pas d'images, ils manquent de **structure pour bien filmer** et de
  **temps/compétence pour monter**. On industrialise ces deux manques.

---

## 3. Proposition de valeur

> « Vous filmez les moments, on en fait un film. »

| Pour la famille | Ce qu'on apporte |
|---|---|
| « Je ne sais pas quoi filmer » | Thématique + scénario + **shot-list** prête à l'emploi |
| « Je filme mal » | **Guide technique** (modes caméra, son, lumière) iPhone & Samsung |
| « Je n'ai pas le temps de monter » | **Montage pro semi-automatisé** livré en < 3 jours |
| « Je veux un beau souvenir » | Musique, titres, étalonnage → un **vrai court-métrage** |

---

## 4. Cible & personas

- **Cœur de cible** : parents 30–45 ans, équipés smartphone, sensibles aux souvenirs de famille,
  CSP moyenne/supérieure, à l'aise pour acheter en ligne. **Majoritairement sur mobile.**
- **Occasions déclencheuses** (saisonnalité forte) : anniversaire, Noël, vacances d'été, naissance,
  fête des grands-parents.
- **Personas pressentis** (à challenger dans le BP) :
  - *La maman mémoire* — veut figer les moments avant que les enfants grandissent.
  - *Le papa « projet »* — aime l'idée d'un défi créatif à faire en famille le week-end.
  - *Le cadeau* — offert aux (grands-)parents : un format « bon cadeau » est à explorer.

---

## 5. L'offre & le pricing (hypothèses à valider)

Prix **affichés** sur la landing pour mesurer la sensibilité (un paiement par film, sans abonnement) :

| Formule | Prix | Contenu |
|---|---|---|
| **Essentiel** | **39 €** | Kit guidé + shot-list + guide iPhone + **montage automatisé simple** + livraison 3 j |
| **Confort** ⭐ _(recommandée)_ | **69 €** | Tout l'Essentiel + montage soigné par un monteur + **musique & titres personnalisés** + étalonnage |
| **Premium** | **119 €** | Tout le Confort + **version longue** + **1 visio d'accompagnement** au tournage + priorité |

> ⚠️ Ces prix sont des **hypothèses de test**, pas des prix figés. L'objectif de la phase actuelle est
> justement de mesurer **quel prix génère le plus d'intention réelle** (cf. §8).

**Pistes de revenus additionnels** (à étudier dans le BP) : option « bon cadeau », tirage/clé USB physique,
musique premium sous licence, packs multi-films (abonnement annuel « 1 film par trimestre »), B2B
(crèches, écoles, mariages, EHPAD), affiliation matériel (trépieds, micros).

---

## 6. Le parcours client (expérience cible)

1. **Choix du thème** (6 univers : Aventure, Documentaire « une journée », Comédie, Anniversaire, Noël, Vacances).
2. **Réception du kit** : fiche scénario + guide technique + atelier scénario (PDF / espace en ligne).
3. **Tournage** en famille avec le smartphone, en suivant la shot-list (1–2 h).
4. **Dépôt des rushes** via un lien privé sécurisé (sans logiciel à installer).
5. **Montage** par notre chaîne semi-automatisée + contrôle humain.
6. **Livraison** du court-métrage en < 3 jours, prêt à partager.
7. (Boucle) **upsell** : version longue, autre thème, bon cadeau.

---

## 7. Ce qui est déjà construit ✅

Tout est dans le dossier `clap-de-famille/` du dépôt.

### a) Landing page « fake door » (`index.html`)
- Page **statique unique**, mobile-first, déployable sur Vercel en 2 min.
- Sections : hero, comment ça marche, thématiques, ce qui est inclus, **pricing 3 formules**, FAQ, CTA final.
- **Capture email** via Formspree (waitlist) + **fallback Supabase** prévu.
- **Analytics PostHog Cloud EU** (RGPD : opt-out par défaut, bandeau consentement, aucun email envoyé à PostHog).
- **Aucun paiement déclenché** — promesse honnête « le service ouvre bientôt ».

### b) Kit de fiches (dossier `fiches/`)
- **Fiche scénario** (pilote : `aventure.html/.pdf`) — pitch, shot-list de 7 plans avec astuces,
  **tag de mode caméra par plan**, indicateur dialogue, 3 réflexes de pro, rappel de l'offre. Format A4 + mobile.
- **Guide technique iPhone & Samsung** (`guide-technique.html/.pdf`, 2 pages) — réglages, **tous les modes
  caméra** (Vidéo, Cinématique, Action, Ralenti, Accéléré, objectifs) avec équivalences Samsung,
  maîtrise de l'image, **son & dialogues** (avec/sans), erreurs à éviter.
- **Atelier scénario** (`atelier-scenario.html/.pdf`) — feuille de **brainstorming** à remplir
  (idée, dialogue ou non, structure en 3 actes, tableau de plans, boîte à idées).
- **`render-pdf.js`** — script Chromium headless qui exporte n'importe quelle fiche HTML en **PDF A4**.

### c) À produire ensuite (même gabarit)
- Les **5 autres fiches scénario** : Documentaire, Comédie, Anniversaire, Noël, Vacances.
- Remplacer les placeholders **nom de marque** + **contact** par les vrais.

---

## 8. Stratégie de validation (phase actuelle)

**Méthode** : test « fake door » — on mesure l'intention **avant** de construire le produit.

### Événements trackés (PostHog, anonymes)
| Event | Propriété | Ce qu'il révèle |
|---|---|---|
| `page_view` | `path` | Volume de trafic (dénominateur) |
| `scroll_50` / `scroll_90` | — | Profondeur de lecture / intérêt |
| `cta_click` | `tier` | **Appétence par prix** (clic sur Essentiel / Confort / Premium) |
| `waitlist_submit` | `tier` | **Intention réelle** (email laissé) par formule |

### Critères de décision (à arbitrer dans le BP)
- **Taux de conversion** waitlist / visiteurs : `< 2 %` faible · `2–5 %` correct · `> 5 %` fort.
- **Répartition des clics par prix** : beaucoup d'Essentiel → marché price-sensitive ; penchant Confort/Premium → marge possible.
- **Funnel** `cta_click(tier) → waitlist_submit(tier)` : écart entre « ça m'intéresse » et « je m'engage ».
- Sources de trafic à tester : Meta/Instagram Ads (cible parents), groupes Facebook famille, Pinterest, bouche-à-oreille.

### Prochaines briques de validation
- Mettre en place les clés `FORMSPREE_ID` + `POSTHOG_KEY` et déployer en prod (Vercel).
- Lancer un **petit budget pub** (ex. 100–300 €) pour générer du trafic qualifié.
- Optionnel : test de prix A/B (variantes de la grille tarifaire).
- Optionnel : « smoke test » de paiement (bouton Stripe en pré-commande remboursable) pour mesurer une intention encore plus forte que l'email.

---

## 9. La chaîne de production & d'automatisation 🏭 (cœur du scale)

> Objectif : tenir la promesse **« livré en 3 jours »** tout en gardant une **marge** correcte et une
> **qualité** constante, même avec beaucoup de commandes. C'est ici que se joue le « semi-automatisé ».

### 9.1 Vue d'ensemble du pipeline

```
[1] Commande & brief      → choix thème + formule (web)
[2] Kit envoyé            → fiches PDF / espace client
[3] Tournage (client)     → smartphone
[4] Dépôt des rushes      → upload sécurisé
[5] Ingestion & tri       → contrôle, dérushage
[6] Montage               → assemblage sur template + musique + titres + étalonnage
[7] Contrôle qualité      → relecture humaine
[8] Livraison             → lien de visionnage + téléchargement
[9] Après-vente / upsell  → feedback, version longue, nouveau thème
```

### 9.2 Où mettre l'automatisation (étape par étape)

| Étape | Aujourd'hui (manuel / MVP) | Cible automatisée | Pistes outils / tech |
|---|---|---|---|
| Commande & paiement | Formulaire | Checkout + génération de commande | Stripe, Tally/Typeform, Airtable/Notion comme back-office |
| Envoi du kit | Email manuel | Email auto déclenché à l'achat | Make/Zapier/n8n + email transactionnel (Resend, Postmark) |
| Dépôt des rushes | Lien partagé | Espace upload nommé par commande, notifs auto | Uppy + S3/Cloudflare R2, ou Google Drive/Dropbox API |
| Ingestion & tri | Visionnage complet | **Dérushage assisté** : détection de scènes, suppression des plans flous/noirs, transcription | ffmpeg, PySceneDetect, Whisper (transcription), modèles de qualité d'image |
| Montage | 100 % à la main | **Montage sur template** : on mappe shot-list → timeline, calage musical auto, titres dynamiques | Templates (Premiere/DaVinci/Final Cut), ou rendu programmatique (ffmpeg, Shotstack API, Remotion), auto-sync musique |
| Étalonnage | Manuel | LUT/preset par thème appliqué automatiquement | LUTs par univers, auto-color |
| Contrôle qualité | — | Relecture humaine **systématique** (garde-fou qualité) | Checklist QC, double validation |
| Livraison | Lien manuel | Page de visionnage générée + email auto | Page client, lien expirable, watermark levé après paiement |
| Suivi / SAV | Manuel | Relances, NPS, upsell automatisés | Séquences email, CRM léger |

### 9.3 Principe directeur : « semi-automatisé »
- **Automatiser le répétitif** (ingestion, dérushage, assemblage sur template, titres, étalonnage par preset, emails).
- **Garder l'humain** sur ce qui fait la **qualité perçue** : le choix des meilleurs plans, le rythme,
  le contrôle final. C'est le différenciateur vs un montage 100 % auto sans âme.
- **Le kit guidé sert l'automatisation** : si la famille filme la bonne shot-list dans le bon ordre avec
  les bons modes, les rushes arrivent **prêts à monter** → moins de travail manuel → marge + délai tenus.
  → _Plus les fiches sont bonnes, plus la chaîne scale._

### 9.4 Templates par thème (la clé de l'industrialisation)
Chaque thème = un **template de montage** réutilisable : structure narrative (intro / corps / fin),
banque musicale dédiée, jeu de titres, LUT couleur. Le montage devient « remplir un template avec les
bons rushes » plutôt que « partir d'une page blanche ».

### 9.5 Capacité & délais (à modéliser dans le BP)
- Temps de traitement par film (objectif) : ___ h main d'œuvre (à mesurer sur les 1ers films).
- Nb de films/jour par monteur : ___ → goulot d'étranglement = étape de montage/QC.
- Effet de l'automatisation : viser une **réduction X %** du temps de montage à qualité égale.

---

## 10. Modèle économique (cadre pour le BP)

> À remplir avec des chiffres réels une fois les premiers films produits. Cadre de calcul :

- **Revenu / film** : 39 € · 69 € · 119 € selon formule. **Panier moyen** = dépend du mix de formules (à observer via `waitlist_submit.tier`).
- **Coûts variables / film** : main d'œuvre montage + QC, stockage/bande passante, licences musique, frais de paiement (~1,5 %+0,25 € Stripe).
- **Marge brute / film** = prix − coûts variables. _L'automatisation vise à faire baisser le coût de main d'œuvre._
- **Coûts d'acquisition (CAC)** : budget pub / nb de clients. À comparer au **panier moyen** et à la **LTV** (réachats, upsells, saisonnalité).
- **Coûts fixes** : outils (hébergement, Make/n8n, email, logiciels montage), éventuels freelances monteurs.
- **Seuil de rentabilité** : nb de films/mois pour couvrir les coûts fixes.
- **Leviers de marge** : taux de Confort/Premium, automatisation du montage, réduction du dérushage grâce au kit, achats récurrents.

---

## 11. Risques & hypothèses à challenger

- **Demande** : les gens disent-ils oui *et* paient-ils ? (l'email ≠ l'achat → envisager smoke test paiement).
- **Qualité des rushes** : si les familles filment mal malgré le kit, le coût de montage explose. → qualité des fiches = critique.
- **Délai 3 jours** : tenable à la montée en charge ? Dépend de l'automatisation et de la capacité monteurs.
- **Saisonnalité** : pics (Noël, été, anniversaires) → gérer la charge variable.
- **Droits & RGPD** : vidéos de mineurs, consentement, conservation/suppression des rushes, hébergement EU.
- **Concurrence / substituts** : apps de montage auto (CapCut, etc.), vidéastes, « ne rien faire ».
- **Dépendance plateformes** : coût d'acquisition pub (Meta) qui dérive.

---

## 12. Roadmap (proposition)

- **Phase 0 — Validation (en cours)** : landing live + clés configurées + trafic payant + analyse des métriques.
- **Phase 1 — MVP manuel** : si signal positif, produire 5–10 films « à la main » pour mesurer temps réel, coûts, satisfaction.
- **Phase 2 — Semi-automatisation** : templates par thème, dérushage assisté, emails & dépôt automatisés.
- **Phase 3 — Scale** : montage programmatique partiel, recrutement monteurs freelance, upsells & saisonnalité, B2B/cadeau.

---

## 13. Questions ouvertes pour le business plan (à traiter avec Cowork)

1. **Positionnement prix** : confirme-t-on 39/69/119 € ? Le panier cible ? Une offre « cadeau » ?
2. **Marché** : taille estimée (France d'abord ?), saisonnalité, canaux d'acquisition prioritaires.
3. **Unit economics** : coût réel de production d'un film, marge par formule, CAC cible, LTV.
4. **Production** : internaliser les monteurs ou réseau de freelances ? Quel niveau d'automatisation Phase 2 ?
5. **Stack outillage** : choix back-office (Airtable/Notion), orchestration (Make/n8n), paiement (Stripe), stockage (R2/S3).
6. **Juridique** : CGV, mentions, RGPD/mineurs, conservation des rushes, licences musique.
7. **Objectifs chiffrés** : seuil de rentabilité, nb de films/mois à 6 et 12 mois, besoin de financement éventuel.
8. **Go / No-go** : quels seuils de validation déclenchent le passage en Phase 1 ?

---

## 14. Annexes

### Assets & liens
- **Landing** : `clap-de-famille/index.html` (+ `README.md`, `vercel.json`).
- **Fiches** : `clap-de-famille/fiches/` (aventure, guide-technique, atelier-scenario + PDF).
- **Aperçu mobile** (githack, branche de dev) :
  `https://raw.githack.com/remvalet-arch/ia_formation/<branche>/clap-de-famille/index.html`
- **Repo** : `remvalet-arch/ia_formation`.

### À fournir / décider
- Nom de marque définitif (provisoire : « Clap de Famille »).
- Email de contact + nom de domaine.
- `FORMSPREE_ID` et `POSTHOG_KEY` (région EU).
- Budget et canal du 1ᵉʳ test d'acquisition.

### Glossaire express
- **Fake door** : page qui présente une offre comme si elle existait, pour mesurer l'intérêt avant de construire.
- **Dérushage** : tri/sélection des rushes (vidéos brutes) avant montage.
- **Template de montage** : trame réutilisable (structure + musique + titres + couleurs) par thème.
- **Unit economics** : économie d'une unité vendue (revenu vs coûts d'un film).
