//our-domain.com/new=meetup
import { useRouter } from 'next/router';
import Head from 'next/head';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetup = () => {

   const router = useRouter();

   const newMeetupHandler = async (enteredData) => {
      const response = await fetch('/api/new-meetup', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(enteredData),
      });

      const data = await response.json();

      console.log(data); 

      router.push('/');
   }

   return (
      <>
         <Head>
            <title>Add a new meetup</title>
            <meta
               name="desciption"
               content="Add your own react meetup and meet cool people and teammates"
            />
         </Head>
         <NewMeetupForm onAddMeetup={newMeetupHandler} />
      </>

   )
}

export default NewMeetup;