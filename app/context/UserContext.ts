import { User } from "@/const";
import { createContext } from "react";


const UserContext = createContext<User | null>(null);

export default UserContext;
