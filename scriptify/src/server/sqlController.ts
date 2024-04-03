import { Request, Response, NextFunction, RequestHandler } from 'express';
import { supabase }  from './superbaseClient';

export const SQLController: any = {};

//User Favorites
SQLController.getFavorites = async(req: Request, res: Response, next: NextFunction ) => {
  try {
    console.log('req.body', req.body);
    const currUser = req.body.currUser;
    const {data} = await supabase.from('userprofiles').select('favorites').eq('username', currUser);
    res.locals.favorites = data;
    return next();
  } catch (err) {
    console.log('Error retrieving Favorites');
    return next({
      log: 'SQLController.getFavorites' + err.message, 
      message: {err: 'SQLController.getFavorites: Error retrieving Favorites'}
      })
    }
};

SQLController.addFavorites = async(req: Request, res: Response, next: NextFunction ) => {
  try {
    //var to store new Favorites to add
    const newFavs = req.body.newFavs;
    const currUser = req.body.currUser;
    //if 
    const updatedFavorites = newFavs || [];
    //var to store current stored Favorites
    const {data} = await supabase.from('userprofiles').select('favorites').eq('username', currUser);
    // const updatedFavorites = data;
    console.log('updated Favorites: ', updatedFavorites); //originally got: updated Favorites:  [ { favorites: null } ]

    //push data into stored Favorites variable array 
    updatedFavorites.push(...(data[0]?.favorites || []));

    //update supbase
    const { error } = await supabase
     .from('userprofiles')
     .update({ favorites: updatedFavorites })
     .eq('username', currUser)
    //return next
    return next();
  } catch (err) {
    console.log('Error adding Favorites');
    return next({
      log: 'SQLController.addFavorites' + err.message, 
      message: {err: 'SQLController.addFavorites: Error adding Favorites'}
      })
    }
};

// SQLController.deleteFavorites = async(req: Request, res: Response, next: NextFunction ) => {
//   try {
//     //var to store  Favorites to delete
//     const deleteFav = req.body.deleteFav;
//     console.log('deleteFav: ', deleteFav);
//     const currUser = req.body.currUser;
//     //var to store current stored Favorites
//     const {data} = await supabase.from('userprofiles').select('favorites').eq('username', currUser);
//     const updatedFavorites = data;
//     console.log('updatedFavorites: ', updatedFavorites);

//     //push new favorites into stored Favorites variable array
//     const index = updatedFavorites?.indexOf(deleteFav);
//     console.log('index: ', index);
//     if(updatedFavorites?.includes(deleteFav)) {
//       updatedFavorites?.splice(index, 1);
//       //update supbase
//       const { error } = await supabase
//        .from('userprofiles')
//        .update({ favorites: updatedFavorites })
//        .eq('username', currUser)
//     }
//     else {
//       console.error('cannot be deleted because does not exist');
//     }

//     //return next
//     return next();
//   } catch (err) {
//     console.log('Error deleting Favorites');
//     return next({
//       log: 'SQLController.deleteFavorites' + err.message, 
//       message: {err: 'SQLController.deleteFavorites: Error deleting Favorites'}
//       })
//     }
// };

// User's Previous Checkouts
SQLController.getPreviousCheckout = async(req: Request, res: Response, next: NextFunction ) => {
  try {
    const currUser = req.body.currUser;
    const {data} = await supabase.from('userprofiles').select('prev_checkouts').eq('username', currUser);
    res.locals.prevCheckouts = data;
    return next();
  } catch (err) {
    console.log('Error retrieving Previous Checkouts');
    return next({
      log: 'SQLController.getPreviousCheckout' + err.message, 
      message: {err: 'SQLController.getPreviousCheckout: Error retrieving Previous Checkouts'}
      })
    }
};

SQLController.addPreviousCheckout = async(req: Request, res: Response, next: NextFunction ) => {
  try {
    //var to store new Checkout to add
    const newCheckout = req.body.newCheckout;
    const currUser = req.body.currUser;
    const updatedCheckouts = newCheckout || [];
    //var to store current stored Favorites
    const {data} = await supabase.from('userprofiles').select('prev_checkouts').eq('username', currUser);

    //push new Checkout into stored previous Checkouts variable array
    updatedCheckouts?.push(...(data[0]?.prev_checkouts || []));

    //update supbase
    const { error } = await supabase
     .from('userprofiles')
     .update({ prev_checkouts: updatedCheckouts })
     .eq('username', currUser)
    //return next
    return next();
  } catch (err) {
    console.log('Error adding to Previous Checkouts');
    return next({
      log: 'SQLController.addPreviousCheckout' + err.message, 
      message: {err: 'SQLController.addPreviousCheckout: Error adding to Previous Checkouts'}
      })
    }
};

//stretch feature
// SQLController.deletePreviousCheckout = async(req: Request, res: Response, next: NextFunction ) => {
  // try {
  //   //var to store  Favorites to delete
  //   const deleteCheckout = req.body.deleteCheckout; //we want it by id
  //   console.log('deleteCheckout: ', deleteCheckout);
  //   const currUser = req.body.currUser;
  //   //var to store current stored Favorites
  //   const {data} = await supabase.from('userprofiles').select('prev_checkouts').eq('username', currUser);
  //   const updatedCheckouts = data[0];
  //   console.log('updatedCheckouts', updatedCheckouts);
  //   console.log('updatedCheckouts', typeof updatedCheckouts );

  //   //push new prev_checkout into stored Favorites variable array
  //   const index = updatedCheckouts?.indexOf(deleteCheckout);
  //   console.log('index: ', index);
  //   if(updatedCheckouts?.includes(deleteCheckout)) {
  //     updatedCheckouts?.splice(index, 1);
  //     //update supbase
  //     const { error } = await supabase
  //      .from('userprofiles')
  //      .update({ prev_checkouts: updatedCheckouts })
  //      .eq('username', currUser)
  //   }
  //   else {
  //     console.error('cannot be deleted because does not exist');
  //   }

  //   //return next
  //   return next();
  // } catch (err) {
  //   console.log('Error deleting Checkout');
  //   return next({
  //     log: 'SQLController.deletePreviousCheckout' + err.message, 
  //     message: {err: 'SQLController.deletePreviousCheckout: Error deleting Checkout'}
  //     })
  //   }
// };

