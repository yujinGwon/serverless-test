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

export const handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
  };
  console.log(event);
  try {
    switch (event.routeKey) {
      case "DELETE /camps/{id}":
        // id로 캠프 삭제 3번 버전
        await dynamo.send(
          new DeleteCommand({
            TableName: tableName,
            Key: {
              id: parseInt(event.pathParameters.id),
            },
          })
        );
        console.log(event.routeKey);
        body = `Deleted Camp ${event.pathParameters.id}`;
        break;
      case "GET /camps/{id}":
        // id로 캠프 조회
        body = await dynamo.send(
          new GetCommand({
            TableName: tableName,
            Key: {
              id: parseInt(event.pathParameters.id),
            },
          })
        );
        body = body.Item;
        console.log(body);
        break;
      case "GET /camps":
        // 캠프 리스트 전체 조회
        body = await dynamo.send(
          new ScanCommand({ TableName: tableName })
        );
        body = body.Items;
        break;
      case "POST /camps":
        // 캠프 등록
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
        console.log(event.routeKey);
        body = `Created Camp ${requestPostJSON.title}`;
        break;
        case "PUT /camps/{id}":
        // 캠프 수정
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
        break;
        case "PATCH /camps/{id}":
        // 좋아요만 수정 *****
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
        break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
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
