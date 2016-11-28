import { Router } from 'express';
const router = Router();

import { createWelcomeMessage, createHelloMessage } from '../repository';


export const routes = router;


router.all('/', (req, res) => {
  try {
    const message = createWelcomeMessage();
    res.json({ message });
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
