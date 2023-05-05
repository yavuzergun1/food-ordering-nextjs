 import { Oswald, Dancing_Script, Josefin_Sans } from 'next/font/google';
import localFont from 'next/font/local';
 
// define your variable fonts
const oswald = Oswald({subsets: ['latin']});
const dancing = Dancing_Script({subsets: ['latin']});
const josefin = Josefin_Sans({subsets: ['latin']});

// define a custom local font where GreatVibes-Regular.ttf is stored in the styles folder
// const greatVibes = localFont({ src: './GreatVibes-Regular.ttf' });
 
export { oswald, dancing, josefin };