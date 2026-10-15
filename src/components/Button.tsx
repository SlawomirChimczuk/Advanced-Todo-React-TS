import type { ReactNode } from "react"

type ButtonProps = {
    children: ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({children, onClick}: ButtonProps) {
  return (
    <button onClick={onClick} className="p-2 rounded-lg shadow-md text-white bg-blue-500 hover:bg-blue-400 transition duration-200 cursor-pointer">{children}</button>
  )
}
