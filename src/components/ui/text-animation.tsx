import React from "react";

export const TextAnimation = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-black">
      <p className="m-0 text-transparent text-6xl sm:text-8xl md:text-9xl font-serif font-bold uppercase animate-text bg-[url('https://plus.unsplash.com/premium_photo-1661882403999-46081e67c401?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y29kZXxlbnwwfHwwfHx8MA%3D%3D')] bg-contain bg-clip-text opacity-80 bg-center bg-repeat-x">
        Text
      </p>
      <p className="m-0 text-transparent text-6xl sm:text-8xl md:text-9xl font-serif font-bold uppercase animate-text-reverse bg-[url('https://plus.unsplash.com/premium_photo-1661963874418-df1110ee39c1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29kZXxlbnwwfHwwfHx8MA%3D%3D')] bg-contain bg-clip-text opacity-80 bg-center bg-repeat-x">
        Animation
      </p>
    </div>
  );
};
