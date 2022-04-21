import { FC } from "react";
import { Provider } from "react-redux";
import { UserPage } from "../../modules/users/delivery/pages/UserPage.component";
import { store } from "../redux/store";

export const Application: FC = () => {
    return <Provider store={store}>
        <UserPage />
    </Provider>
}