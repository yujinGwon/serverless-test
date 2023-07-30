const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
  UpdateCommand,
} = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "boot-camp";

exports.updateCamp = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    let requestPutJSON = JSON.parse(event.body);
    await dynamo.send(
      new PutCommand({
        TableName: tableName,
        Item: {
          id: parseInt(event.pathParameters.id),
          title: requestPutJSON.title,
          description: requestPutJSON.description,
          event: requestPutJSON.event,
          company: requestPutJSON.company,
          stack: requestPutJSON.stack,
          deadline: requestPutJSON.deadline,
          start: requestPutJSON.start,
          end: requestPutJSON.end,
          likes: requestPutJSON.likes,
        },
      })
    );
    console.log(event.routeKey);
    body = `Updated Camp ${requestPutJSON.title}`;
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