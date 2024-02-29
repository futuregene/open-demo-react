import React, { forwardRef } from 'react';

function ChatInput(props, ref) {
  return (
    <input
      className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-100 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
      ref={ref}
      id="chatInput"
      onKeyDown={(ev) => {
        if(ev?.key === 'Enter') {
          const handleEnterPressed = props?.enterPressed;
          handleEnterPressed();
        }
      }}
      type="text"
      disabled={props.loading}
      autoComplete="off"
      placeholder="请输入"
    />
  );
}

export default forwardRef(ChatInput);
