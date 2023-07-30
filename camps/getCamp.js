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

exports.getCamp = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    body = await dynamo.send(
      new GetCommand({
        TableName: tableName,
        Key: {
          id: parseInt(event.pathParameters.id),
        },
      })
    );
    body = body.Item;
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
    body.message = "main 버전의 메세지";
  }

  return {
    statusCode,
    body,
    headers,
  };
};