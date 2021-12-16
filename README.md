<h1>Projet 7 - Groupomania</h1> <br>
Formation Developpeur Web - OpenClassrooms
<br>
<br>
Se projet a été développé dans le cadre de la formation web d'openClassrooms,
il s'agit d'un reseau social interne pour les employés de Groupomania.

<h2>Pré-requis</h2>
<ul>
<li>MySql</li>
<li>Node.js</li>
<li>Angular</li>
</ul>

<h2>Instructions</h2>

Cloner ce repository avec la commande :
<pre>git clone https://github.com/PwrBan/ClementGerardin_7_01112021.git</pre>
Dans le dossier Frontend et backend exécuter la commande : <br>
<pre>npm install</pre>
Dans le dossier environment, vous trouverez deux fichier .key <br>
à l'interieur de private.key, tapez votre mot de passe MySql <br>
à l'interieur de private-token.key, tapez la clef de déchiffrement de jwt de votre choix<br>

Pour lancer le serveur, exécuter cette commande dans le dossier 'backend' : 
<pre> node server </pre>
Pour compiler et lancer le projet dans le navigateur, exécuter cette commande dans le dossier 'frontend' :
<pre> ng serve -o </pre>

<h3>MySql</h3>
Ouvrez le terminal MySql et connectez vous à l'aide de votre mot de passe <br>
Créer une base de données : 
<pre>CREATE DATABASE groupomania; </pre>
Ensuite importez les tables:
<pre>source groupomania.sql; </pre>
devant groupomania.sql specifier le chemin d'accés.

Le site est maintenant fonctionnel. 




