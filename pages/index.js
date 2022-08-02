import { MongoClient } from "mongodb";
import Head from 'next/head';
import MeetupList from '../components/meetups/MeetupList';

const Homepage = (props) => {
   return (
      <>
         <Head>
            <title>React Meetups</title>
            <meta
               name="desciption"
               content="Browse a huge list of highly active React meetups!"
            />
         </Head>
         <MeetupList meetups={props.meetups} />
      </>
   )
}

export async function getStaticProps() {
   //fetch data from api

   const client = await MongoClient.connect('mongodb+srv://admin-fernando:03eszv07@cluster0.23yhe.mongodb.net/meetups');
   const db = client.db();

   const meetupsCollection = db.collection('meetups');

   const meetups = await meetupsCollection.find().toArray();

   client.close();

   return {
      props: {
         meetups: meetups.map(meetup => ({
            title: meetup.title,
            address: meetup.address,
            image: meetup.image,
            id: meetup._id.toString()
         }))
      },
      revalidate: 10
   }
};

export default Homepage;