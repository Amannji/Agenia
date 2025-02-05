export default function ActionInfoBar() {
  return (
    <div className="col-span-3 bg-gray-50">
      <div className="w-full m-2 p-2 rounded-lg flex gap-10 bg-gray-100">
        <div className="flex flex-col items-center">
          <p>400</p>
          <h2>Credits Used</h2>
        </div>
        <div className="flex flex-col items-center">
          <p>8</p>
          <h2>Actions Done</h2>
        </div>
      </div>
      <div className="w-full m-2 p-2 h-[3rem] rounded-lg flex gap-10 bg-gray-100"></div>
      <div className="w-full m-2 p-2 h-[15rem] rounded-lg flex gap-10 bg-gray-100"></div>
    </div>
  );
}
