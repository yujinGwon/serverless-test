import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "boot-camp";

export const createCamp = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    let requestPatchJSON = JSON.parse(event.body);
    const liked = requestPatchJSON.likes;
    
    await dynamo.send(
      new UpdateCommand({
        TableName: tableName,
        Key: {
          id: parseInt(event.pathParameters.id), 
        },
        UpdateExpression: "set likes = :likes",
        ExpressionAttributeValues: {
          ":likes": !liked,
        },
        ReturnValues: "UPDATED_NEW",
      })
    );
    console.log(event.routeKey);
    body = `바꾸기 전 likes는 ${liked}, 바꾸고 난 후 likes는 ${!liked}`;
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
};