import { AntDesign, Feather } from "@expo/vector-icons";

export const icons = {
    HomePage: (props)=> <AntDesign name="home" size={26} {...props} />,
    ProfilePage: (props)=> <Feather name="compass" size={26} {...props} />,
    PlacesPage: (props)=> <AntDesign name="pluscircleo" size={26} {...props} />,
    ChatPage: (props)=> <AntDesign name="user" size={26} {...props} />,
    NotificationsPage: (props)=> <AntDesign name="user" size={26} {...props} />,
}