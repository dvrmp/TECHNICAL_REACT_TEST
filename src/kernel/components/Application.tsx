import { FC } from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserPage } from '../../modules/users/delivery/pages/UserPage.component';
import { UserFormPage } from '../../modules/users/delivery/pages/UserFormPage.component';

export const Application: FC = () => {
    return <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<UserPage />} />
                <Route path='/edit-user/:id' element={<UserFormPage />} /> 

            </Routes>
        </BrowserRouter>
    </Provider>
}