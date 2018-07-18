export default function(req, res, next) {
  res.apiSuccess = (data)=> {
    res.json({
      success: true,
      error: false,
      data: data
    });
  };

  res.apiFail = ({ code = 500, data = {}, message = "Server Error"} = {})=> {
    res.status(code);
    res.json({
      success: false,
      error: true,
      data: data,
      message: message
    });
  };

  next();
}