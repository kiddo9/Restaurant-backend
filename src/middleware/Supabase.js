require('dotenv').config()
const {createClient} = require('@supabase/supabase-js')

const supabaseUrl = process.env.SUPABASEURL;
const supabaseKey = process.env.SUPABASEKEY;

const supaBase = createClient(supabaseUrl, supabaseKey)

if(supaBase){
    console.log("sharp");
    
}else{
    console.log('no naaa');
    
}

module.exports = supaBase