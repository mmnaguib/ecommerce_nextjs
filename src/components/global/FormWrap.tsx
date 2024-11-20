import React, { Children } from "react";

const FormWrap = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-fit h-full items-center justify-center pb-12 pt-24">
      <div className="max-w-[650px] flex flex-col gap-6 items-center shadow-xl shadow-slate-200 rounded-md p-4 md:p-5 m-auto">
        {children}
      </div>
    </div>
  );
};

export default FormWrap;
