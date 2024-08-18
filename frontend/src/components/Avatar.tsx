interface IAvatarProps {
  name: string;
  size?: string;
}

export const Avatar = ({ name, size}: IAvatarProps) => {

  function getColor() {
    const letter = name[0].toLowerCase()
    let color;

      if ("a" <= letter && letter <= "d") {
        color = "bg-blue-400"
      } else if ("e" <= letter && letter <= "h") {
        color = "bg-gray-500"
      }
       else if ("i" <= letter && letter <= "m") {
        color = "bg-green-400"
       }
       else if ("n" <= letter && letter <= "q") {
        color = "bg-red-400"
       }
       else if ("r" <= letter && letter <= "u") {
        color = "bg-yellow-400"
       }
       else if ("v" <= letter && letter <= "z"){
        color = "bg-purple-400"
       }
    return color
  }
  

  return (
    <div className={`relative inline-flex items-center justify-center ${size === "xs" ? "w-7 h-7" : "w-9 h-9"} overflow-hidden ${getColor()} rounded-full`}>
      <span className="font-semibold text-white">
        {name[0].toUpperCase()}
      </span>
    </div>
  );
};



     