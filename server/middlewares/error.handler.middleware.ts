const data = (err, req, res, next) => {
  console.log('Middle ware rgistered here')
  res.setHeader('Content-Type', 'application/json');
  const { statusCode, message } = err;
  res.status(statusCode || 501).send({
    status: "error",
    statusCode,
    message
  });
  res.end();
}

export default data;