# TP4 – Mock LocalStorage et Mock API avec Playwright

## Description du Projet
Ce projet démontre la maîtrise des techniques de **mocking** dans Playwright pour créer des tests E2E stables et reproductibles. Il contient deux parties principales :

1. **Mock localStorage** : Injection de données dans le localStorage avant le chargement d'une application TodoMVC
2. **Mock API HTTP** : Interception et simulation de requêtes API vers ReqRes.in

## Objectifs Réalisés
✅ Manipulation du localStorage avec `page.addInitScript()` pour simuler des données persistées  
✅ Interception de requêtes HTTP avec `page.route()` pour mocker les réponses API  
✅ Tests sur différentes méthodes HTTP (GET, POST, PUT, DELETE)  
✅ Vérification de l'affichage UI après injection de données mockées  
✅ 10 tests Playwright fonctionnels couvrant les deux techniques de mocking

## Contenu des Tests Réalisés

### 1. Mock LocalStorage – TodoMVC (2 tests)

#### ✅ `tests/mock.todomvc.spec.ts`
**Technique démontrée** : Injection de données dans localStorage avant chargement de page
- Utilise `page.addInitScript()` pour injecter 3 tâches
- Vérifie que les tâches apparaissent correctement dans l'interface TodoMVC

#### ✅ `tests/mock.todomvc.exercise.spec.ts`
**Exercice complet démontrant la maîtrise** :
1. Injection de 4 tâches dans localStorage
2. Modification d'une tâche (marquer la 3e comme complétée)
3. Suppression d'une tâche (supprimer la 1re)
4. Vérification précise de l'affichage UI correspondant aux données mockées

**Concepts clés** : Manipulation d'objets JSON, gestion du state localStorage, assertions UI

---

### 2. Mock API HTTP – ReqRes (8 tests)

#### ✅ `tests/reqres.users.spec.ts`
**Technique démontrée** : Interception d'une requête GET
- Utilise `page.route()` pour intercepter `GET /api/users?page=2`
- Retourne des données mockées (utilisateurs fictifs)
- Vérifie l'affichage des données mockées dans la réponse Swagger

#### ✅ `tests/reqres.swagger.spec.ts`
**Exercice complet démontrant la maîtrise de 7 routes API différentes** :

| Route | Méthode | Ce qui est mocké |
|-------|---------|------------------|
| `/api/users/{id}` | GET | Utilisateur unique avec données personnalisées |
| `/api/users` | POST | Création d'utilisateur avec ID 999 |
| `/api/users/{id}` | PUT | Mise à jour utilisateur avec job modifié |
| `/api/users/{id}` | DELETE | Suppression avec status 204 (No Content) |
| `/api/register` | POST | Inscription réussie avec token mocké |
| `/api/login` | POST | Connexion réussie avec token mocké |
| `/api/unknown` | GET | Liste de ressources avec couleurs mockées |

**Concepts clés** : Filtrage par méthode HTTP, gestion des status codes, vérification de réponses JSON, gestion du cas DELETE 204

---

## Résultats
✅ **10/10 tests passent** avec succès  
⏱️ Temps d'exécution : ~1-2 minutes  
🎯 Couverture complète des techniques de mocking localStorage et API

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

## Ressources Utilisées

- [Documentation Playwright](https://playwright.dev) - Framework de test E2E
- [ReqRes API](https://reqres.in/api-docs/) - API de test utilisée pour les mocks HTTP
- [TodoMVC Demo](https://demo.playwright.dev/todomvc) - Application de démo pour les tests localStorage

## Technologies
- **Playwright** v1.42.0
- **TypeScript** 
- **Node.js**
- Techniques : `page.addInitScript()`, `page.route()`, `route.fulfill()`

## Conclusion

À la fin de ce TP, vous devez être capables de :
- ✅ Injecter et manipuler des données dans le localStorage
- ✅ Intercepter et simuler des requêtes API avec `page.route()`
- ✅ Tester une application sans dépendre d'un backend réel
- ✅ Concevoir des tests plus rapides et stables grâce au mocking

---

**Happy Testing! 🎭**
