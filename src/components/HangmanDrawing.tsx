const head = (
  <div className="absolute right-[-32px] top-[3rem] w-[75px] h-[75px] rounded-full border-black border-[10px]" />
);
const body = (
  <div className="absolute right-[0px] top-[120px] w-[10px] h-[100px] bg-black " />
);
const leftArm = (
  <div className="absolute origin-bottom right-0 top-[70px] w-[10px] h-[100px] bg-black rotate-[315deg]" />
);
const rightArm = (
  <div className="absolute origin-bottom right-0 top-[70px] w-[10px] h-[100px] bg-black rotate-[45deg]" />
);
const leftLeg = (
  <div className="absolute right-[34px] top-[200px] w-[10px] h-[100px] bg-black rotate-[45deg] " />
);
const rightLeg = (
  <div className="absolute right-[-34px] top-[200px] w-[10px] h-[100px] bg-black rotate-[135deg] " />
);

export default function HangmanDrawing() {
  return (
    <>
      <div className="relative">
        {head}
        {body}
        {leftArm}
        {rightArm}
        {leftLeg}
        {rightLeg}
        <div className="absolute right-0 h-[50px] w-[10px] bg-black" />
        <div className="ms-[120px] h-[10px] w-[200px] bg-black" />
        <div className="ms-[120px] h-[400px] w-[10px] bg-black" />
        <div className="h-[10px] w-[250px] bg-black" />
      </div>
    </>
  );
}
