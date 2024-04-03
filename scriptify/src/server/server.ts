import express, { Request, Response, NextFunction} from 'express';
import cors from 'cors';
import { supabase } from './superbaseClient';
import { SQLController } from './sqlController';
import { userController } from './userController';

  const retrievedData = async() => {
    const { data, error } = await supabase.from('userprofiles').select('*');
    if(!error) console.log('data accessed',data);
  }
retrievedData();

const app = express();
const port = process.env.PORT || 3001; // Ensure this port does not conflict with Vite's

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


//delcaring a type for ServerError object
type ServerError = {
  log: string;
  status: number;
  message: {err: string};
}

  app.get('/', (req: Request, res: Response) => {
    res.send('Hello, world!');
  });
  
  
  //route - get requests to Supabase (WORKING)
  app.get('/database', (req: Request,res: Response) => {
    res.status(200).send('database retrieved');
  });

  //route - get favorites for a user (WORKING)
  app.get('/database/favorites', SQLController.getFavorites, userController.verifyCookie, (req: Request,res: Response) => {
    res.status(200).json(res.locals.favorites);
  });
  
  // route - get previous checkouts (WORKING)
  app.get('/database/previouscheckout', SQLController.getPreviousCheckout, userController.verifyCookie, (req: Request,res: Response) => {
    res.status(200).json(res.locals.prevCheckouts);
  });

  //route- add favorite to Supabase (WORKING)
  app.put('/database/favorites', SQLController.addFavorites, userController.verifyCookie, (req: Request,res: Response) => {
    res.status(200).send('favorites added');
  });

  //route - save a user's past checkouts in Supabase (WORKING)
  app.put('/database/previouscheckout', SQLController.addPreviousCheckout, userController.verifyCookie, (req: Request,res: Response) => {
    res.status(200).send('Checkout added');
  });

  //stretch feature:
  app.delete('/database/favorites', SQLController.deleteFavorites, (req: Request,res: Response) => {
    res.status(200).send('entry/entries deleted');
  });

  // app.delete('/database/previouscheckout', SQLController.deletePreviousCheckout, (req: Request,res: Response) => {
  //   res.status(200).send('entry/entries deleted');
  // });

  //route - user signup (WORKING)
  app.post('/signup', userController.createUser, userController.issueCookie, (req: Request, res: Response) => {
    res.status(200).send('new user is added');
  });
  // userController.verifyCookie

  //route- user login (WORKING)
  app.post('/loginuser', userController.getUserProfile, userController.issueCookie, (req, res) => {
    res.status(200).send('user signed in');
  });
  // userController.verifyCookie
  
  //catchall for non-defined pages
  app.use('*', (req: Request, res: Response) => {
    return res.status(404).send('Page not found.')
  });
  
  //global error handler
  app.use((err: ServerError, req: Request, res: Response, next: NextFunction) => {
    const defaultErr: ServerError = {
      log: `Express error handler caught unknown middleware error ${err}`,
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj: ServerError = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  })
  
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
