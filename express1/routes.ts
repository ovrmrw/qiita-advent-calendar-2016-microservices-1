import { Router } from 'express';
const router = Router();

import { createWelcomeMessage, createHelloMessage } from '../lib/repository';


export const routes = router;


router.all('/', (req, res) => {
  try {
    const message = createWelcomeMessage();
    res.set('Content-Type', 'text/plain');
    res.send(message);
  } catch (error) {
    res.status(500).json({ error });
  }
});


router.all('/hello', (req, res) => {
  try {
    const name = req.body && req.body.name ? req.body.name : req.query.name;
    const message = createHelloMessage(name);
    res.json({ message });
  } catch (error) {
    res.status(500).json({ error });
  }
});
