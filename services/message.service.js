const { NoContent } = require("../libs/errors");
const Users = require("../models/user");
const { messageRepository } = require("../repositories");

exports.createMessage = async (payload) => {
  const { message } = payload.body;
  const { id } = payload.user;
  const { chatId } = payload.params;

  const newMessage = await messageRepository.create(
    {
      sender_id: id,
      room_id: chatId,
      message: message,
    }
  );

  const messageWithUser = await messageRepository.model.findOne({
    where: { id: newMessage.id },
    include: [
      {
        model: Users,
        as: "sender",
       
      },
    ],
  });
  if (!newMessage) {
    throw new NoContent("messages not create");
  }

  console.log('✌️newMessage --->', messageWithUser);
  return messageWithUser;
};

exports.listMessage = async (payload) => {
  const { chatId } = payload.params;
  const messages = await messageRepository.findAll({
    criteria: { room_id: chatId },
    include: ["sender"],
  });
  if (!messages) {
    throw new NoContent("messages not found");
  }
  return messages;
};
