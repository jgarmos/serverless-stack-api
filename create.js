import * as uuid from "uuid";
import AWS from "aws-sdk";


// //The AWS JS SDK assumes the region based on the current region of the Lambda function.
// So if your DynamoDB table is in a different region, make sure to set it by calling
// AWS.config.update({ region: "my-region" }); before initializing the DynamoDB
// client.
AWS.config.update({ region: "eu-west-2" });

const dynamoDb = new  AWS.DynamoDB.DocumentClient();

export async function main (event, context){
    // Request body is passed in as a JSON encoded string in 'event.body'
    const data = JSON.parse(event.body);

    const params = {
        TableName: process.env.tableName,
        Item: {
        // The attributes of the item to be created
        userId: "123", // The id of the author
        noteId: uuid.v1(), // A unique uuid
        content: data.content, // Parsed from request body
        attachment: data.attachment, // Parsed from request body
        createdAt: Date.now(), // Current Unix timestamp
        },
    };

    try {
        await dynamoDb.put(params).promise();

        return {
            statusCode: 200,
            body:JSON.stringify(params.Item),
        };
    } catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify({error: e.message}),
        };
    }
}