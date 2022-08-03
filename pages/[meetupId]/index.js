import { MongoClient, ObjectId } from "mongodb";
import Head from 'next/head';
import MeetupDetails from "../../components/meetups/MeetupDetails";

const MeetupDetailPage = (props) => {

   return (
      <>
         <Head>
            <title>{props.meetupData.title}</title>
            <meta
               name="desciption"
               content={props.meetupData.description}
            />
         </Head>
         <MeetupDetails
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
         />
      </>
   )
}

export async function getStaticPaths() {

   const client = await MongoClient.connect('mongodb+srv://admin-fernando:03eszv07@cluster0.23yhe.mongodb.net/meetups');
   const db = client.db();

   const meetupsCollection = db.collection('meetups');

   const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

   client.close();

   return {
      paths: meetups.map(meetup => ({
         params: {
            meetupId: meetup._id.toString()
         }
      })),
      fallback: 'blocking'
   }

   // return {
   //    paths: [
   //       {
   //          params:{
   //             meetupId: 'm1'
   //          }
   //       },
   //       {
   //          params:{
   //             meetupId: 'm2'
   //          }
   //       },
   //    ],
   //    fallback: false
   // }
}


export async function getStaticProps(context) {
   //fetch data from api

   const meetupId = context.params.meetupId;

   const client = await MongoClient.connect('mongodb+srv://admin-fernando:03eszv07@cluster0.23yhe.mongodb.net/meetups');
   const db = client.db();

   const meetupsCollection = db.collection('meetups');

   const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });

   console.log(selectedMeetup);

   client.close();

   return {
      props: {
         meetupData: {
            id: selectedMeetup._id.toString(),
            title: selectedMeetup.title,
            address: selectedMeetup.address,
            image: selectedMeetup.image,
            description: selectedMeetup.description
         }
      },
      revalidate: 5
   }
};

export default MeetupDetailPage;