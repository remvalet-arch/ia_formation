# 🎬 Clap de Famille — Landing page « fake door »

Page de validation (test d'appétence) pour un kit DIY de tournage de court-métrage
en famille à l'iPhone, avec montage livré en 3 jours.

> ⚠️ Ce n'est **pas** le produit. Aucun service n'existe encore derrière.
> La page capture uniquement des emails (waitlist) et mesure l'intérêt par prix.
> Aucun paiement n'est jamais déclenché.

C'est **une seule page statique** (`index.html`, tout est inline : HTML + CSS + JS).
Aucun build nécessaire — déployable sur Vercel en 2 minutes.

---

## 1. Configuration (2 valeurs à renseigner)

Ouvrez `index.html` et repérez le bloc `const CONFIG = { ... }` (au début du `<script>`,
vers la fin du fichier). Remplacez les deux placeholders :

```js
const CONFIG = {
  FORMSPREE_ID: "FORMSPREE_ID",          // <-- votre ID Formspree
  POSTHOG_KEY:  "POSTHOG_KEY",           // <-- votre clé PostHog EU
  POSTHOG_HOST: "https://eu.i.posthog.com"
};
```

### a) `FORMSPREE_ID` — capture des emails
1. Créez un compte sur [formspree.io](https://formspree.io) → nouveau formulaire.
2. Formspree vous donne une URL du type `https://formspree.io/f/myabwxyz`.
3. Copiez **uniquement l'identifiant final** (`myabwxyz`) dans `FORMSPREE_ID`.

> Tant que ce champ vaut `"FORMSPREE_ID"` (placeholder), la page tourne en **mode démo** :
> l'email n'est **pas** envoyé, mais tout le reste (écran de remerciement, events) fonctionne.

### b) `POSTHOG_KEY` — analytics (Cloud EU, RGPD)
1. Créez un projet sur [eu.posthog.com](https://eu.posthog.com) (région **EU** pour le RGPD).
2. Project Settings → copiez la **Project API Key** (`phc_...`) dans `POSTHOG_KEY`.
3. Laissez `POSTHOG_HOST` sur `https://eu.i.posthog.com`.

> Tant que ce champ vaut `"POSTHOG_KEY"` (placeholder), les events sont seulement
> écrits dans la console du navigateur (pratique pour tester).

> **Variante variables d'environnement** : ce projet étant 100 % statique (pas de build),
> les clés sont des constantes éditées dans le fichier. Si vous passez plus tard sur Vite,
> remplacez les valeurs par `import.meta.env.VITE_FORMSPREE_ID` / `VITE_POSTHOG_KEY`
> et créez un `.env`.

---

## 2. Déploiement sur Vercel (2 minutes)

### Option A — depuis le dépôt Git (recommandée)
1. Poussez ce dossier sur GitHub.
2. Sur [vercel.com](https://vercel.com) → **Add New… → Project** → importez le repo.
3. **Root Directory** : sélectionnez `clap-de-famille`.
4. Framework Preset : **Other** · Build Command : *(vide)* · Output Directory : `.`
5. **Deploy**. C'est en ligne.

### Option B — Vercel CLI
```bash
npm i -g vercel
cd clap-de-famille
vercel        # suivez les questions, puis `vercel --prod`
```

Le fichier `vercel.json` fourni définit déjà des en-têtes de sécurité raisonnables.

---

## 3. Capture email — fallback Supabase (optionnel)

Formspree suffit pour le test. Si vous préférez stocker les emails dans votre propre base :

1. Dans Supabase, créez la table :
   ```sql
   create table waitlist (
     id bigint generated always as identity primary key,
     email text not null,
     tier text,
     created_at timestamptz default now()
   );
   ```
2. Activez une **RLS policy** autorisant l'`INSERT` anonyme.
3. Dans `CONFIG`, ajoutez `SUPABASE_URL` et `SUPABASE_ANON_KEY`.
4. **Décommentez** le bloc « FALLBACK SUPABASE » dans `index.html` (fin du handler de submit).

---

## 4. Events PostHog trackés & ce qu'ils vous disent

Tous les events sont **anonymes**. L'email ne part **jamais** dans PostHog
(garde-fou `sanitize_properties` + on n'envoie que la propriété `tier`) — il ne
part que dans Formspree.

| Event | Propriété | Ce que ça mesure / vous apprend |
|-------|-----------|--------------------------------|
| `page_view` | `path` | **Trafic.** Volume de visiteurs = dénominateur de tous vos taux de conversion. |
| `scroll_50` | — | **Intérêt.** % de visiteurs qui lisent jusqu'à la moitié (jusqu'au pricing ≈). Indique si le hero accroche. |
| `scroll_90` | — | **Engagement profond.** % qui vont jusqu'à la FAQ/CTA final. Une chute brutale entre 50 et 90 = la page perd les gens en milieu de page. |
| `cta_click` | `tier` = `nav` \| `hero` \| `essentiel` \| `confort` \| `premium` \| `final` | **⭐ Appétence par prix.** Le signal le plus important : sur quelle formule les gens cliquent. Comparez le volume de clics `essentiel` vs `confort` vs `premium` pour mesurer la sensibilité au prix. |
| `waitlist_submit` | `tier` (+ `source`) | **Intention réelle.** Visiteur qui laisse son email. Le `tier` indique d'où il vient (formule de prix **ou** thème de fiche) ; `source: "fiche_gate"` distingue les inscriptions venant d'une fiche verrouillée. |
| `fiche_open` | `tier` (thème), `locked` | **Intérêt par thème.** Clic sur une carte thématique → quelle histoire attire le plus. `locked:true` = thème verrouillé, `false` = exemple gratuit. |
| `example_view` | `tier: aventure` | **Curiosité produit.** Clic sur « Voir un exemple de fiche ». Mesure l'envie de voir le contenu réel. |
| `fiche_locked_view` | `tier` (thème) | **Mur de contenu atteint.** La fiche verrouillée s'est affichée (porte « liste d'attente »). À comparer à `waitlist_submit(source:fiche_gate)` pour le taux de déblocage. |

### Indicateurs clés à construire dans PostHog
- **Taux de conversion global** : `waitlist_submit` / `page_view`.
  - < 2 % → peu d'appétence. 2–5 % → signal correct. > 5 % → fort intérêt.
- **Conversion par tier** : `cta_click(tier)` → `waitlist_submit(tier)` (funnel).
  Révèle l'écart entre « ça m'intéresse » (clic) et « je m'engage » (email) selon le prix.
- **Répartition des clics par prix** : graphe de `cta_click` ventilé par `tier`.
  - Beaucoup de clics sur `essentiel` (39 €) + peu sur `premium` → marché sensible au prix.
  - Clics répartis ou penchant `confort`/`premium` → vous pouvez monter les prix.
- **Profondeur de lecture** : entonnoir `page_view → scroll_50 → scroll_90 → cta_click`
  pour voir où vous perdez les visiteurs.
- **Attrait par thème** : `fiche_open` ventilé par `tier` → quel univers donne le plus envie.
- **Taux de déblocage** : `waitlist_submit(source:fiche_gate)` / `fiche_locked_view`
  → quel % de curieux acceptent de laisser leur email pour accéder au contenu.

---

## 4 bis. Le kit de fiches & le « gate » liste d'attente (dossier `fiches/`)

Le dossier `fiches/` contient les **6 fiches scénario** + le **guide technique** + l'**atelier scénario**.

### Comment c'est fait
- Les 6 fiches scénario sont **générées** par `fiches/build-fiches.js` (une seule source de vérité).
  Pour modifier un contenu (plans, textes, couleurs) : éditez `build-fiches.js`, puis :
  ```bash
  cd fiches
  node build-fiches.js                       # régénère les 6 .html
  node render-pdf.js aventure.html aventure.pdf   # (idem pour chaque fiche) régénère les PDF
  ```
- `guide-technique.html` et `atelier-scenario.html` sont autonomes (édition directe).

### Le mécanisme « contenu réservé » (fake door sur les fiches)
- Depuis la landing (section Thématiques), **« Film d'aventure » est en accès libre** ; les
  **5 autres** s'ouvrent avec `?locked=1` → la fiche s'affiche **floutée derrière** une carte
  « Rejoindre la liste d'attente » (capture email).
- La soumission part dans **Formspree** + envoie l'event `waitlist_submit {tier, source:"fiche_gate"}`.
- En **impression / PDF**, la porte est masquée et le flou retiré → les PDF restent propres.

### ⚠️ Clés à renseigner aussi pour les fiches
Le gate a sa **propre config**. Pour que les fiches verrouillées capturent vraiment les emails :
1. Dans `fiches/build-fiches.js`, repérez `var CONFIG={FORMSPREE_ID:"FORMSPREE_ID",POSTHOG_KEY:"POSTHOG_KEY",...}`
   (dans `GATE_JS`) et remplacez les deux placeholders.
2. Relancez `node build-fiches.js` pour régénérer les fiches avec vos clés.
> Tant que ce n'est pas fait, les fiches verrouillées fonctionnent en **mode démo** (email non envoyé).

---

## 5. Conformité RGPD

- **Bandeau de consentement** minimal (Accepter / Refuser) au premier chargement.
- PostHog démarre en **opt-out par défaut** (`opt_out_capturing_by_default: true`) :
  **rien n'est envoyé** tant que l'utilisateur n'a pas accepté.
- Aucun cookie déposé avant consentement (`persistence: "memory"`).
- `respect_dnt: true` (respect de « Do Not Track »).
- **Aucun email dans PostHog** : seule la propriété `tier` est envoyée ; un garde-fou
  supprime tout champ `email` éventuel. L'email ne transite que vers Formspree.
- Mention légale courte dans le footer + l'honnêteté de la promesse (aucun paiement,
  service à venir) figure dans le pricing, la modale et l'écran de remerciement.

---

## 6. Personnalisation rapide
- **Prix / formules** : section `#pricing` dans `index.html`.
- **Thématiques** : section `#themes`.
- **Couleurs / typo** : variables CSS dans `:root` (haut du `<style>`).
- **Nom de marque** : remplacez « Clap de Famille » (cherchez/remplacez dans le fichier).
- **Email de contact** : remplacez `contact@clapdefamille.fr`.
