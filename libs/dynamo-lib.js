import AWS from "aws-sdk";

// //The AWS JS SDK assumes the region based on the current region of the Lambda function.
// So if your DynamoDB table is in a different region, make sure to set it by calling
// AWS.config.update({ region: "my-region" }); before initializing the DynamoDB
// client.
AWS.config.update({ region: "eu-west-2" });

const dynamoDb = new  AWS.DynamoDB.DocumentClient();

export default {
    get: (params) => client.get(params).promise(),
    put: (params) => client.put(params).promise(),
    query: (params) => client.query(params).promise(),
    update: (params) => client.update(params).promise(),
    delete: (params) => client.delete(params).promise(),
};
