import { Application } from "express";

export function initBlablaCtrl (server: Application) {
    server.get("/blabla", (req, res) => {
        console.log('Envoi de données en cours...');
        res.end('GET blabla');
      });
}