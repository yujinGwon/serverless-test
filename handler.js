'use strict';

module.exports.getList = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: '겟 리스트에 오셨습니다.',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.getCamp = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: '겟 캠프에 오셨습니다.',
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports.patchLikes = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: '패치라이크즈에 오셨습니다.',
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports.createCamp = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: '크리에이트캠프에 오셨습니다.',
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports.deleteCamp = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: '딜리트캠프에 오셨습니다.',
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports.updateCamp = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: '업데이트 캠프에 오셨습니다.',
        input: event,
      },
      null,
      2
    ),
  };
};


