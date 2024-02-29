import React, {useEffect, useRef, useState} from "react";
import ChatInput from "../chatInput";
import useScrollHook from '../../hooks/scroll';
import useChatStore from '../../stores/chat';
import { Markdown }  from '../markdown';
import Spin from '../spin';
import customSvg  from '../../assets/custom.svg';
import assistantSvg from '../../assets/assistant.svg';


function ChartUI() {
    const chatInputRef = useRef(null);
    // 当前loading状态
    const [loading, setloading] = useState(false);
    const { scrollRef, scrollToBottomIfAtBottom } = useScrollHook();
    const { chat, stop, messages } = useChatStore();
    const [newMessages, setNewMessage] = useState(messages);

    useEffect(() => {
        setNewMessage(messages);
    }, [messages]);

    async function handleChat() {
        // 如果输入框有内容则向后端发起请求
        const curMessage = chatInputRef.current.value;
        if (curMessage) {
            setloading(true);
            chatInputRef.current.value = '';
            await chat(curMessage, () => {
                scrollToBottomIfAtBottom()
            }).finally(() => {
                setloading(false);
            })
            scrollToBottomIfAtBottom()
            chatInputRef.value?.focus()
        }
    }
    
   return(
      <div  className="h-[100vh] w-[100vw] flex flex-col bg-white">
          <div  ref={scrollRef} className="h-[calc(100%-4rem)] overflow-x-hidden">
              <ul>
                  {newMessages.map((m, index) => {
                      return (<li key={index}>
                          <div className="flex gap-4 items-start p-4 border-b">
                            <div className="w-8 h-8 py-1 flex justify-center text-slate-300">
                              <img src={customSvg}/>
                            </div>
                            <div className="flex-1 font-markdown self-center">
                              <div className="text-base">
                                {m.user}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-4 items-start p-4 border-b">
                            <div className="w-8 h-8 py-1 flex justify-center text-slate-300">
                            <img src={assistantSvg}/>
                            </div>
                            <div className="flex-1 self-center">
                              {m.assistant ? <Markdown value={m.assistant} /> : <div className="self-center">
                                <Spin class="text-sky-500" />
                              </div>}
                            </div>
                          </div>
                    </li>)
                  })}
              </ul>
          </div>
          <div className="h-16 flex gap-2 p-3 border-t bg-slate-50">
              <ChatInput
                ref={chatInputRef}
                disabled={loading}
                enterPressed={() => {
                  handleChat();
                }}
                className="flex-1 px-3 py-2 bg-white border border-black rounded-md text-sm shadow-sm placeholder-slate-400 focus-visible:outline-black active: outline-black disabled:bg-slate-100 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"/>
              {
                loading ? 
                  <button
                    className="inline-flex items-center px-4 leading-6 text-sm rounded-md shadow text-white bg-amber-400 transition ease-in-out duration-150"
                    onClick={() => {
                      stop();
                    }}>
                      {/* <Spin class="text-white width" /> */}
                      停止
                  </button> :  
                  <button
                    onClick={() => {
                        handleChat();
                    }}
                    className="inline-flex items-center px-4 leading-6 text-sm rounded-md shadow text-white bg-black active: outline-white focus: outline-white transition-transform transform hover:scale-105 transition ease-in-out duration-150 disabled:bg-gray-400 disabled:opacity-20 disabled: text-white-300"
                  >
                      发送
                  </button>
              }
              <button
                  onClick={() => {
                    chatInputRef.current.value = '';
                  }}
                  className="inline-flex items-center px-4 leading-6 text-sm border border-slate-300 shadow-sm rounded-md text-slate-600 hover:border-slate-300 active: outline-black focus: border-black transition-transform transform hover:scale-105"
              >
                  重置
              </button>
          </div>
      </div>
   )
}

export default ChartUI;