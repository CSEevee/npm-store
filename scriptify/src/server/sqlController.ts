import { Request, Response, NextFunction, RequestHandler } from 'express';
import { supabase }  from './superbaseClient';

export const SQLController: any = {};

//User Favorites
SQLController.getFavorites = async(req: Request, res: Response, next: NextFunction ) => {
  try {
    console.log('req.body', req.body);
    const currUser = req.body.currUser;
    const {data} = await supabase.from('userprofiles').select('favorites').eq('username', currUser);
    res.locals.favorites = data || [];
    return next();
  } catch (error) {
    console.log('Error retrieving Favorites');
    return next({
      log: `ERROR in SQLController.getFavorites: ${error}`,
      status: 500,
      message: { error: 'Error occurred in SQLController.getFavorites' }
  })
    }
};

SQLController.addFavorites = async(req: Request, res: Response, next: NextFunction ) => {
  try {
    //var to store new Favorites to add
    const newFavs = req.body.newFavs;
    const currUser = req.body.currUser;
    //if 
    
    //var to store current stored Favorites
    const {data} = await supabase.from('userprofiles').select('favorites').eq('username', currUser);
    
    const updatedFavorites = data ? [...(data[0]?.favorites || [])] : [];
    console.log('updated Favorites: ', updatedFavorites); //originally got: updated Favorites:  [ { favorites: null } ]

    //push data into stored Favorites variable array 
    if (newFavs) {
      updatedFavorites.push(...newFavs);
    }

    //update supbase
    const { error } = await supabase
     .from('userprofiles')
     .update({ favorites: updatedFavorites })
     .eq('username', currUser)
    //return next
    return next();
  } catch (error) {
    console.log('Error adding Favorites');
    return next({
      log: `ERROR in SQLController.addFavorites: ${error}`,
      status: 500,
      message: { error: 'Error occurred in SQLController.addFavorites' }
  })
    }
};

//middleware to delete a favorited package
SQLController.deleteFavorites = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Var to store Favorites to delete
    const deleteFav = req.body.deleteFav;
    const currUser = req.body.currUser;


    // Retrieve current stored Favorites
    const { data } = await supabase.from('userprofiles').select('favorites').eq('username', currUser);


    if (data && data.length > 0) {
      const updatedFavorites = data[0].favorites || [];


      // Find the index of the favorite to delete based on its _id
           const index = updatedFavorites.findIndex(fav => fav._id === deleteFav[0]._id);

      
      if (index !== -1) {
        // Remove the item from the favorites array
        updatedFavorites.splice(index, 1);

        // Update supabase
        const { error } = await supabase
          .from('userprofiles')
          .update({ favorites: updatedFavorites })
          .eq('username', currUser);

        if (error) {
          console.error('Error updating favorites:', error.message);
          throw new Error('Error updating favorites');
        }

        console.log('Favorite deleted successfully');
      } else {
        console.error('Cannot delete favorite because it does not exist');
        throw new Error('Favorite does not exist');
      }
    } else {
      console.error('User not found or has no favorites');
      throw new Error('User not found or has no favorites');
    }

    // Return next
    return next();
  } catch (error) {
    return next({
      log: `ERROR in SQLController.deleteFavorites: ${error}`,
      status: 500,
      message: { error: 'Error occurred in SQLController.deleteFavorites' }
  })
  }
};



// User's Previous Checkouts
SQLController.getPreviousCheckout = async(req: Request, res: Response, next: NextFunction ) => {
  try {
    const currUser = req.body.currUser;
    const {data} = await supabase.from('userprofiles').select('prev_checkouts').eq('username', currUser);
    res.locals.prevCheckouts = data;
    return next();
  } catch (error) {
    console.log('Error retrieving Previous Checkouts');
    return next({
      log: `ERROR in SQLController.getPreviousCheckouts: ${error}`,
      status: 500,
      message: { error: 'Error occurred in SQLController.getPreviousCheckouts' }
  })
    }
};

SQLController.addPreviousCheckout = async(req: Request, res: Response, next: NextFunction ) => {
  try {
    // Var to store new Checkout to add
    const newCheckout = req.body.newCheckout;
    const currUser = req.body.currUser;

    // Var to store current stored Previous Checkouts
    const {data} = await supabase.from('userprofiles').select('prev_checkouts').eq('username', currUser);

    // If data is null, initialize updatedCheckouts as an empty array
    const updatedCheckouts = data ? [...(data[0]?.prev_checkouts || [])] : [];

    // If newCheckout is provided, push its contents into updatedCheckouts
    if (newCheckout) {
      updatedCheckouts.push(newCheckout);
    }

    // Update Supabase with updatedCheckouts
    const { error } = await supabase
     .from('userprofiles')
     .update({ prev_checkouts: updatedCheckouts })
     .eq('username', currUser);

    if (error) {
      throw new Error(error.message);
    }

    // Return next
    return next();
  } catch (error) {
    console.log('Error adding to Previous Checkouts');
    return next({
      log: `ERROR in SQLController.addPreviousCheckout: ${error}`,
      status: 500,
      message: { error: 'Error occurred in SQLController.addPreviousCheckout' }
    });
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

