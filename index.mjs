import { MongoClient } from "mongodb";
import { ObjectId } from "bson";
import superagent from 'superagent';


const client = new MongoClient(
  "mongodb://root:mongo%40123@3.107.29.142:27017/"
);

export const handler = async (event, context) => {
  const batchItemFailures = [];

  console.log(JSON.stringify(event));

  const db = await client.db("gen");
  const collection = await db.collection("emails");

  for (const record of event.Records) {
    try {
      await processMessageAsync(record, collection);
    } catch (error) {
      console.log(error);
      batchItemFailures.push({ itemIdentifier: record.messageId });
    }
  }

  return { batchItemFailures };
};

async function processMessageAsync(record, collection) {
  if (record.body && record.body.includes("error")) {
    throw new Error("There is an error in the SQS Message.");
  }

  const id = JSON.parse(record.body).id;
  // get mongo record by id

  const doc = await collection.findOne({
    _id: new ObjectId(id)
  });

  // send email using Brid
  await SendEmail(doc);

  await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { status: "done" } }
  );

  console.log(`Processed message: ${id}`);
}

// const t = await handler({
//   Records: [
//     {
//       messageId: "",
//       body: '{"id":"665d99e23bd0d4e51985a868"}',
//     },
//   ],
// });

async function SendEmail(doc) {
  const TOKEN = 'Acutu1pt3rrNWfeQQ2MiZCMAnSdiXl56oRpT';

  // Data to be sent
  const data = {
    receiver: {
      contacts: [{
        identifierKey: 'emailaddress',
        identifierValue: "sha.edurp@gmail.com" // doc.to
      }]
    },
    body: {
      type: 'html',
      html: {
        html: doc.body,
        metadata: {
          subject: doc.subject
        }
      }
    }
  };

  try {
    // Make request
    const { body } = await superagent.post(
      'https://api.bird.com/workspaces/ddeaf164-c858-4697-b44b-875f451351de/channels/58e91767-ad97-4e64-a2cd-08b96322beff/messages')
      .send(data)
      .set('Authorization', `Bearer ${TOKEN}`)
      .accept('application/json')
    // Show response data
    console.log(JSON.stringify(body));
  } catch (err) {
    console.log(err);
  }

}

