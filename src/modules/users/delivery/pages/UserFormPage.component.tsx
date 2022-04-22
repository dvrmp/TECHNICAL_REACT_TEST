import { FC, Fragment } from "react"
import { createForm } from "@use-form/use-form";
import { ioc_container } from "../../../../kernel/ioc/ioc-container";
import UserService from "../../application/services/userService.class";
import { IOC_TYPES } from "../../../../kernel/ioc/ioc-types";
import User from "../../domain/entities/user.class";
import { Link } from "react-router-dom";


export const UserFormPage: FC = () => {

    const userService = ioc_container.get<UserService>(IOC_TYPES.UserService);
    const selectedUser = userService.getSelectedUser();

    const useForm = createForm({
        initialValues: {
            id: selectedUser.id || '',
            job: selectedUser.job || '',
            email: selectedUser.email || '',
            first_name: selectedUser.first_name || '',
            last_name: selectedUser.last_name || '',
            avatar: selectedUser.avatar || '',
            created_at: selectedUser.created_at || ''
        }
    });

    const { register, handleSubmit } = useForm({ mode: 'onSubmit' });
    const onSubmit = (data: User) => {
        userService.editUser(data);
    }

    return <Fragment>
        <form onSubmit={handleSubmit(value => onSubmit({ ...value, id: +value.id }))}>
            <div className="row">
                <div className="col-lg-6">
                    <div className="form-group">
                        <label>Id</label>
                        <input
                            disabled
                            className="form-control"
                            autoComplete="off"
                            ref={register("id")}
                        />
                    </div>
                    <div className="form-group">
                        <label>First name</label>
                        <input
                            className="form-control"
                            autoComplete="off"
                            ref={register("first_name")}
                        />
                    </div>
                    <div className="form-group">
                        <label>Last name</label>
                        <input
                            className="form-control"
                            autoComplete="off"
                            ref={register("last_name")}
                        />
                    </div>
                    <div className="form-group">
                        <label>E-mail</label>
                        <input
                            className="form-control"
                            autoComplete="off"
                            ref={register("email")}
                        />
                    </div>
                    <div className="form-group">
                        <label>Job</label>
                        <input
                            className="form-control"
                            autoComplete="off"
                            ref={register("job")}
                        />
                    </div>

                </div>
            </div>
            <button type="submit">{selectedUser ? 'Edit user' : 'Create user'}</button>
            <Link to={'/'}> Back </Link>
        </form>
    </Fragment>
}