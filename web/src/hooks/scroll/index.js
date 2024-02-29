import React, { useRef } from 'react';

function useScrollHook() {
  const scrollRef = useRef(null);

  const scrollToBottom = () => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };

  const scrollToTop = () => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = 0;
  };

  const scrollToBottomIfAtBottom = () => {
    if (scrollRef.current) {
      const threshold = 100;
      const { scrollHeight, scrollTop, clientHeight } = scrollRef.current;
      const distanceToBottom = scrollHeight - scrollTop - clientHeight;
      if (distanceToBottom <= threshold){
        scrollRef.current.scrollTop = scrollHeight;
      }
    }
  };

  return {
    scrollRef,
    scrollToBottom,
    scrollToTop,
    scrollToBottomIfAtBottom,
  };
}

export default useScrollHook;
