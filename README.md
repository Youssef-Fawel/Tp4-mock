# TP4 – Mock LocalStorage et Mock API avec Playwright

## Objectifs
- Manipuler le localStorage pour simuler des données persistées dans le navigateur
- Intercepter et mock des requêtes API HTTP avec Playwright
- Comprendre l'intérêt du mocking pour des tests E2E stables et reproductibles

## Structure du projet

```
tp-mock/
├── tests/
│   ├── mock.todomvc.spec.ts          # Exemple: Mock localStorage TodoMVC
│   ├── mock.todomvc.exercise.spec.ts # Exercice: localStorage avancé
│   ├── reqres.users.spec.ts          # Exemple: Mock API ReqRes
│   └── reqres.swagger.spec.ts        # Exercice: Mock routes Swagger
├── e2e/
│   └── example.spec.ts               # Test d'exemple Playwright
├── playwright.config.ts              # Configuration Playwright
└── package.json
```

## Installation

Le projet a déjà été initialisé avec `npm init playwright@latest`.

Si vous devez installer les dépendances manuellement :

```powershell
cd c:\Users\faoue\tp-mock
npm install
npx playwright install
```

## Exécution des tests

### Exécuter tous les tests
```powershell
npx playwright test
```

### Exécuter tous les tests avec interface graphique
```powershell
npx playwright test --headed
```

### Exécuter tous les tests avec Chromium uniquement
```powershell
npx playwright test --project=chromium
```

### Exécuter un test spécifique
```powershell
# Test localStorage exemple
npx playwright test tests/mock.todomvc.spec.ts --headed --project=chromium

# Test localStorage exercice
npx playwright test tests/mock.todomvc.exercise.spec.ts --headed --project=chromium

# Test API ReqRes exemple
npx playwright test tests/reqres.users.spec.ts --headed --project=chromium

# Test API ReqRes exercice (Swagger routes)
npx playwright test tests/reqres.swagger.spec.ts --headed --project=chromium
```

### Mode debug
```powershell
npx playwright test --debug
```

### Mode UI interactif
```powershell
npx playwright test --ui
```

## Contenu des tests

### 1. Mock LocalStorage – TodoMVC

#### `tests/mock.todomvc.spec.ts`
Test d'exemple qui injecte 3 tâches dans le localStorage avant le chargement de la page TodoMVC.

#### `tests/mock.todomvc.exercise.spec.ts`
Exercice complet qui :
1. Injecte 4 tâches avant chargement
2. Marque la 3e tâche comme complétée
3. Supprime la 1re tâche
4. Vérifie que l'affichage correspond au contenu simulé

### 2. Mock API HTTP – ReqRes

#### `tests/reqres.users.spec.ts`
Test d'exemple qui intercepte `GET /api/users?page=2` et retourne des utilisateurs mockés.

#### `tests/reqres.swagger.spec.ts`
Exercice complet qui intercepte plusieurs routes Swagger :
- `GET /api/users/{id}` - Single user
- `POST /api/users` - Create user
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user
- `POST /api/register` - Register
- `POST /api/login` - Login
- `GET /api/unknown` - List resources

## Bonnes pratiques

✅ **À faire :**
- Toujours isoler les mocks par test (`page.unroute()` après usage)
- Nommer les fichiers et fonctions de test de manière explicite
- Vérifier la cohérence des données simulées (clé localStorage, format JSON, etc.)
- Utiliser `addInitScript()` pour injecter dans le localStorage avant le chargement
- Utiliser `page.route()` pour intercepter les requêtes API

❌ **À éviter :**
- Réutiliser les mocks entre différents tests
- Oublier de nettoyer les routes avec `unroute()`
- Mock des données incohérentes avec la structure attendue

## Ressources

- [Documentation Playwright](https://playwright.dev)
- [ReqRes API Documentation](https://reqres.in/api-docs/)
- [TodoMVC Demo](https://demo.playwright.dev/todomvc)

## Conclusion

À la fin de ce TP, vous devez être capables de :
- ✅ Injecter et manipuler des données dans le localStorage
- ✅ Intercepter et simuler des requêtes API avec `page.route()`
- ✅ Tester une application sans dépendre d'un backend réel
- ✅ Concevoir des tests plus rapides et stables grâce au mocking

---

**Happy Testing! 🎭**
