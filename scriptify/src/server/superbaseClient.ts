import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';


//supabase connection
const supabaseUrl = 'https://wixzydeumdmhubkemfgy.supabase.co'
dotenv.config();
const supabaseKey = process.env.SUPABASE_KEY || '';
export const supabase = createClient(supabaseUrl, supabaseKey)


export const confirmConnection =  async() => {
    try {
        const {data} = await supabase.from('userprofiles').select('*');
        return data; 
    }
    catch (err) {
        console.log('Error connecting to Supabase:', err);
        return null;
    }
};