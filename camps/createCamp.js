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
    let requestPostJSON = JSON.parse(event.body);
    await dynamo.send(
      new PutCommand({
        TableName: tableName,
        Item: {
          id: Date.now(),
          title: requestPostJSON.title,
          description: requestPostJSON.description,
          event: requestPostJSON.event,
          company: requestPostJSON.company,
          stack: requestPostJSON.stack,
          deadline: requestPostJSON.deadline,
          start: requestPostJSON.start,
          end: requestPostJSON.end,
          likes: requestPostJSON.likes,
        },
      })
    );
    body = `Created Camp ${requestPostJSON.title}`;
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