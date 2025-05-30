import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-black min-h-screen flex justify-center items-center">
      <h1 className="absolute top-5 left-0 w-full text-center text-white text-3xl font-mono z-10 drop-shadow-lg pointer-events-none">
          Redis test
      </h1>
      <div className="relative w-[400px] h-[400px]">
        <Image
          src="/gargar-flip-2.gif"
          alt="Gargar"
          width={400}
          height={400}
          className="object-contain"
          unoptimized
        />
      </div>
    </div>
  );
}