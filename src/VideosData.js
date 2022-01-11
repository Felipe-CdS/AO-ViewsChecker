/******************************************************************************/
/*                                                                            */
/*        Please, increase this number everytime a new video is added.        */
/*                                50 MV's                                     */
/*                                                                            */
/******************************************************************************/
import axios from "axios";

// Move these functions to other file after
export var yt_requestAPI = async() => {
    var apiString = "https://youtube.googleapis.com/youtube/v3/videos?part=statistics";

    for(let i = 0; i < data_array.length; i++){
        var params = {
            key: process.env.REACT_APP_API_KEY,
            id: data_array[i].id
        };

        //Real request
        var response = await axios.get(apiString, {params}).then((resp) => resp.data);
        data_array[i].views = response.items[0].statistics.viewCount;

        //Testing
        //data_array[i].views = Math.floor(Math.random() * 10**9) + 10**3;
        
        data_array[i].next_goal = next_goal(data_array[i].views);
        data_array[i].percentage = next_goal_percentage(data_array[i].views, data_array[i].next_goal);
    }
}  

function next_goal(views){
    let multiplier, number_size = 0;    
    var goal = parseInt(views);    

    if(goal < 5 * 10**6){
      goal = 5 * 10**6;  
    }
    else if(goal < 10**7){
      goal = 10**7; 
    }
    else{
      while(parseInt(goal) > 0){
        number_size++;
        goal = goal / 10;
      }  
      multiplier = 10**(number_size - 1);
      goal = parseInt(views);
      goal = (Math.ceil(goal/multiplier)) * multiplier; 
    } 
    return (goal);
}

function next_goal_percentage(views, goal){
    let percentage_calc = (views * 100) / goal;
    return (percentage_calc);
}

export const data_array = 
[
    //Korean M/V's
    { id: 'ePpPVE-GGJw', title: 'TWICE "TT" M/V' },
    { id: 'i0p1bmr0EmE', title: 'TWICE "What is Love?" M/V' },
    { id: 'V2hlQkVJZhE', title: 'TWICE "LIKEY" M/V' },
    { id: 'kOHB85vDuow', title: 'TWICE "FANCY" M/V' },
    { id: 'c7rCyll5AeY', title: 'TWICE "CHEER UP" M/V' },
    { id: '0rtV5esQT6I', title: 'TWICE "Like OOH-AHH(OOH-AHH하게)" M/V' },
    { id: 'rRzxEiBLQCA', title: 'TWICE "Heart Shaker" M/V' },
    { id: '3ymwOvzhwHs', title: 'TWICE "Feel Special" M/V' },
    { id: 'CM4CkVFmTds', title: 'TWICE "I CAN\'T STOP ME" M/V' },
    { id: 'mAKsZ26SabQ', title: 'TWICE "YES or YES" M/V' },
    { id: 'Fm5iP0S1z9w', title: 'TWICE "Dance The Night Away" M/V' },
    { id: '8A2t_tAjMz8', title: 'TWICE "KNOCK KNOCK" M/V' },
    { id: 'mH0_XpSHkZo', title: 'TWICE "MORE & MORE" M/V' },
    { id: 'VQtonf1fv_s', title: 'TWICE "SIGNAL" M/V' },
    { id: 'XA2YEHn-A8Q', title: 'TWICE "Alcohol-Free" M/V' },
    { id: 'vPwaXytZcgI', title: 'TWICE "SCIENTIST" M/V' },
    { id: 'CfUGjK6gGgs', title: 'TWICE "The Best Thing I Ever Did" M/V' },       
    { id: 'zi_6oaQyckM', title: 'TWICE "Merry & Happy" M/V' },        

    //Japanese M/V's
    { id: 'wQ_POfToaVY', title: 'TWICE "Candy Pop" M/V' },
    { id: 'ZdKYi5ekshM', title: 'TWICE "Breakthrough" M/V' },    
    { id: 'HuoOEry-Yc4', title: 'TWICE "One More Time" M/V' },
    { id: 'kRT174IdxuM', title: 'TWICE "Fanfare" M/V' },
    { id: 'DdLYSziSXII', title: 'TWICE "Wake Me Up" M/V' },
    { id: 'CMNahhgR_ss', title: 'TWICE "BDZ" M/V' },
    { id: 'zQELp93xxfo', title: 'TWICE "Fake & True" M/V' },
    { id: 'fmOEKOjyDxU', title: 'TWICE "Perfect World" M/V' },
    { id: '3n9rDwpa6QA', title: 'TWICE "HAPPY HAPPY" M/V' },
    { id: 'X3H-4crGD6k', title: 'TWICE "I WANT YOU BACK" M/V' },
    { id: 'BSS8Y-0hOlY', title: 'TWICE "Kura Kura" M/V' },    
    { id: 'sLmLwgxnPUE', title: 'TWICE "BETTER" M/V' },    
    { id: 'r1CMjQ0QJ1E', title: 'TWICE "BRAND NEW GIRL" M/V' },    
    { id: '96K5RxgTfW4', title: 'TWICE "STAY BY MY SIDE" M/V' },
    { id: 'VcOSUOpACq0', title: 'TWICE "Doughnut" M/V' }, 
    //{ id: 'N7MKlhS2ysU', title: 'TWICE "Likey-Japanese ver." M/V' },
    //{ id: 't35H2BVq490', title: 'TWICE "TT-Japanese ver." M/V' },  
    //{ id: '3zQXMPbK5jU', title: 'TWICE "What is Love? - Japanese ver." M/V' },
    //{ id: '6LbWN3FVfqI', title: 'TWICE "FANCY-Japanese ver." M/V' },
    //{ id: 'nrNWpxFflr4', title: 'TWICE "SIGNAL-Japanese ver." M/V' },

    //Melody Projects
    { id: 'uK16TLBzWYo', title: 'TWICE CHAEYOUNG MELODY PROJECT' },
    { id: 'IG-ykt57E-U', title: 'TWICE MINA MELODY PROJECT' },
    { id: 'IO1Nl9ErTsI', title: 'TWICE TZUYU MELODY PROJECT "ME! (Taylor Swift)"' },
    { id: 'cAvMGWLZCHA', title: 'TWICE MINA MELODY PROJECT "Snowman (Sia)"' },
    { id: '8vhhTUvRSZM', title: 'TWICE CHAEYOUNG MELODY PROJECT "Off My Face (Justin Bieber)"' },
    { id: '5UMgw3V-Q5I', title: 'TWICE DAHYUN & CHAEYOUNG MELODY PROJECT "Switch to me"' },
    { id: 'djjbl7J6ZmU', title: 'TWICE JIHYO MELODY PROJECT "A Late Night of 1994(Jang Hye Jin)"' }, 
    { id: 'nAW4uqc-7T4', title: 'TWICE JIHYO PERFORMANCE PROJECT "Crown (Camila Cabello & Grey)"' },
    { id: '7Xv09ZURWQE', title: 'TWICE MOMO PERFORMANCE PROJECT' },
    
    //MISC
    { id: 'f5_wn8mexmM', title: 'TWICE "The Feels" M/V' },
    { id: 'FF50-LY2Kro', title: 'TWICE "CRY FOR ME" (Official Audio)' },
    { id: 'XO9GiPOLd3I', title: '"Santa Tell Me (Ariana Grande)" Cover by NAYEON' },
    { id: 'bBgEs40MdFQ', title: 'TWICE DAHYUN PIANO "Reminiscent(YIRUMA)" COVER' },
    { id: '95HxqXOUytI', title: 'yukaDD 「Superhero (Special Version) [with MOMO]」Music Video' },
    { id: 'jn47nrQPexg', title: '「卒業」Special Clip with SANA (TWICE)' },
    { id: 'zKdT6KHT1jM', title: '"Falling (Harry Styles)" Cover by NAYEON - Vocals Only' },
    { id: 'J3KA6WDAYPM', title: 'TWICE DAHYUN “Feel Special” piano' }
];
