// import express from 'express';
// import { createClient } from '@supabase/supabase-js'
// import dotenv from 'dotenv';


// //supabase connection
// const supabaseUrl = 'https://wixzydeumdmhubkemfgy.supabase.co'
// dotenv.config();
// const supabaseKey = process.env.SUPABASE_KEY
// const supabase = createClient(supabaseUrl, supabaseKey)

// supabase
//   .from('userprofiles')
//   .select('*')
//   .then(({ data, error }) => {
//     if (error) {
//       console.error('Error connecting to Supabase:', error)
//     } else {
//       console.log('Successfully connected to Supabase!')
//       // You can now perform additional operations with Supabase
//     }
//   })


// const app = express();
// const port = process.env.PORT || 3001; // Ensure this port does not conflict with Vite's

// app.get('/', (req, res) => {
//   res.send('Hello, world!');
// });




// app.listen(port, () => {
//   console.log(`Server listening at http://localhost:${port}`);
// });