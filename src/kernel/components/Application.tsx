import { FC } from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";

export const Application: FC = () => {
    return <Provider store={store}>
        <h1>COMPONENT: APPLICATION = MOUNTED</h1>
    </Provider>
}