import { Request, Response, NextFunction } from 'express';
import { supabase } from './superbaseClient';

export const userController: any = {};


//user sign in
userController.getUserProfile = async (req: Request, res: Response, next: NextFunction ) => {
    try {
        const username = req.body.username;
        console.log('username from req.body: ', req.body.username);


        const { data: user, error } = await supabase
            .from('userprofiles')
            .select('*')
            .eq('username', username);

        if (error) {
            console.error('Error finding user in db: ', error);
            return res.status(500).json({ error: 'Internal server error'});
    }
    //edge case if no users are found
    if (!user || user.length === 0) {
        return res.status(404).json({ message: 'User not found'});
    }
    //if user is found
    res.locals.user = user[0];
    return next();
} catch (error) {
    return next({
        log: `ERROR in userController.getUserProfile: ${error}`,
        status: 500,
        message: { error: 'Error occurred in userController.getUserProfile' }
    })
} 
};

//user sign up
userController.createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, userpassword } = req.body;
        console.log('username: ', username, 'password: ', userpassword);

        //check if username already exists in DB
        const { data: existingUser, error } = await supabase
            .from('userprofiles')
            .select('*')
            .eq('username', username);

        if (error) {
            console.error('Error checking username in database: ', error);
            return next;
         }

        // check if username already exists  
        if (existingUser && existingUser.length) {
               
               console.log('Username already exists in database');
               return next({
                   log: 'Username already exists in database',
                   status: 400,
                   message: { error: 'Unique username required' }
               });
           };

           //if it's a new user, we can insert into the database
           const { data, error: insertError } = await supabase
            .from('userprofiles')
            .insert([{ username, userpassword }]);

            if (insertError) {
                console.error('Error inserting new user into database:', insertError);
            return next({
                log: 'Error inserting new user into database',
                status: 500,
                message: { error: 'Internal Server Error' }
            });
            }
        // New user successfully added to the database
        console.log('New user added to database');
        return next();
    } catch (error) {
    return next({
        log: `ERROR in userController.createUser: ${error}`,
        status: 500,
        message: { error: 'Error occurred in userController.createUser' }
    })
}

};

//add user cookies
userController.issueCookie = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.cookie('ScriptifyToken', 'scriptify is the best idea since sliced bread', {
            maxAge: 24 * 60 * 60 * 1000, //should be the value of 1 day in ms
            httpOnly: true,
        })
        console.log('cookie issued successfully');
        return next();
    } catch (error) {
        return next({
            log: `ERROR in userController.issueCookie: ${error}`,
            status: 500,
            message: { error: 'Error occurred in userController.issueCookie' }
        })
    }
};

//stretch feature
// userController.editProfile = async (req: Request, res: Response, next: NextFunction) => {
    
// };

//verify user has cookies
userController.verifyCookie = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userToken = req.cookies['ScriptifyToken'];

        if (!userToken) {
            return res.status(200).json({ showCookiePopup: true });
        }
        return next();
    } catch (error) {
        return next({
            log: `ERROR in userController.verifyCookie: ${error}`,
            status: 500,
            message: { error: 'Error occurred in userController.verifyCookie' }
        })
    }
};

