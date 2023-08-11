// import express, { Express, Request, Response } from "express";
import { urlencoded, json } from "body-parser";
import { create, router } from 'json-server';
import {initBlablaCtrl} from './src/main/controllers/blabla.controller'
import { analyseNotAuthRequests } from "./src/main/controllers/request-handler";
import { intitAuthCtrl } from "./src/main/controllers/auth.controller";
import { initRoomCtrl } from "./src/main/controllers/room.controller";
import { appConfig } from "./src/main/resources/config/app.config";


const server = create();

server.use(urlencoded({ extended: true }));
server.use(json());

// Gestion de l'authent
intitAuthCtrl(server);

//Initialisation des routes
initBlablaCtrl(server);
initRoomCtrl(server);

//Analyse des requêtes qui ne concernent pas l'authentification
analyseNotAuthRequests(server);

server.use(router('./db.json'));

server.listen(appConfig.port, () => {
  console.log("Run Auth API Server");
});
