# GROUPOMANIA #

### Préambule ###
Il s'agit ici du projet n°7 de la formation Développeur Web d'OpenClassRooms.

Le Front-end et le Back-end ont été entièrement créés de zéro.

Pour le Back-end, j'ai utilisé le SGB MySQL couplé à l'ORM Prisma (prismajs). Ce dernier permet de bénéficier d'un modèle de données (comme le fait Mongoose) et simplifie les opérations avec la base de données.

Concernant le Front-end, j'ai utilisé React couplé à Redux.

Dans ce projet j'ai utilisé pour la toute première fois React, Redux, Axios et Prisma. C'est pourquoi j'ai bien conscience que mon code pourrait être amélioré dans le futur.

### Fonctionnalités ###
L'utilisateur arrive dans un premier temps sur une page où il a le choix entre s'incrire ou simplement se connecter s'il possède déjà un compte.
Une fois connecté il arrive sur le fil d'actualités. Dans ce fil il a la possibilité de :
- voir le nombre de likes laissés sur un post,
- de "liker" à son tour un post qui lui plaît,
- de voir le nombre de commentaires qui ont été laissés sur un post,
- de visionner les commentaires d'un post,
- de laisser son propre commentaire sur un post,
- de créer un nouveau post qui pourra contenir soit uniquement du texte, soit une image ou une vidéo Youtube, soit les deux,
- d'accéder à la page profil d'un utilisateur en cliquant sur son nom ou son avatar.

Par la suite il pourra :
- modifier un de ses posts,
- supprimer un de ses posts,
- modifier un commentaire qu'il a déposé,
- supprimer un de ses commantaires,
- retirer un de ses likes

De plus, chaque utilisateur possède une page profil. Sur cette page il pourra :
- changer son adresse e-mail,
- décider si son adresse e-mail est visible ou non par les autres utilisateurs,
- modifier son mot de passe,
- modifier son avatar,
- modifier sa biographie
- supprimer son compte (et ainsi tous ses posts, commentaires et likes).

###Pour lancer le projet ###
Placez-vous dans le dossier Back et exécutez la commande `npm install` puis, une fois l'installation terminée `nodemon server`.
Pour la base de données, exécutez la commande `npx prisma migrate dev`.
Et enfin pour le Front-end, placez-vous dans le dossier Front, exécutez `npm install` puis `npm start`.