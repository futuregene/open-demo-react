import React, { useState } from 'react';
import * as API from '../API/api';

const useChatStore = () => {
  const [controller, setController] = useState(null);
  const [messages, setMessages] = useState([]);

  const chat = async (text, callback) => {
    const abortController = new AbortController();
    setController(abortController);

    const newMessages = [
      ...messages,
      { symbol: Symbol('message'), user: text, assistant: '' },
    ];
    setMessages(newMessages);

    const currentMessage = newMessages[newMessages.length - 1];
    callback();


    try {
      const result = await API.chat(newMessages, abortController, (data) => {
        currentMessage.assistant = data;
        callback();
      });
      currentMessage.assistant = result || '<Empty Message>';

      callback();
    } catch (e) {
      console.error(e);
      currentMessage.assistant = `<${e.message}>`;
    }
  };

  const stop = () => {
    controller?.abort();
    setController(null);
  };

  const clear = () => {
    setMessages([]);
  };

  return {
    messages,
    chat,
    stop,
    clear,
  };
};

export default useChatStore;
