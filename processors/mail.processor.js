const { mailService } = require("../services");

exports.sendMail = async (payload) => {
  const response = await mailService.sendMail({body:payload});
  return response;
};