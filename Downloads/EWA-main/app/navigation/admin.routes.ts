import {IRoute} from "./navigation.types";
import Admin from "../Componets/Screens/admin/home/Admin";

export const adminRoutes: IRoute[] = [
    {
        name: 'Admin',
        component: Admin,
        isAdmin: true

    }
]