export const TextReveal = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black gap-4">
      {/* First Line */}
      <p className="m-0 text-transparent text-5xl sm:text-7xl md:text-8xl font-serif font-bold uppercase animate-text bg-clip-text opacity-80 bg-[url('https://plus.unsplash.com/premium_photo-1661882403999-46081e67c401?w=900&auto=format&fit=crop&q=60')]">
        Text
      </p>

      {/* Second Line */}
      <p className="m-0 text-transparent text-5xl sm:text-7xl md:text-8xl font-serif font-bold uppercase animate-text bg-clip-text opacity-80 bg-[url('https://plus.unsplash.com/premium_photo-1661963874418-df1110ee39c1?w=900&auto=format&fit=crop&q=60')]">
        Animation
      </p>
    </div>
  );
};
