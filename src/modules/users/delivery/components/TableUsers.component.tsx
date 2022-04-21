import { FC, Fragment, useState, useEffect } from "react";
import { Table, TableBody, TableContainer, TableCell, TableRow, TableHead, Paper } from '@mui/material'
import User from "../../domain/entities/user.class";
import { columnsTableUsers } from "../../infrastucture/data/columns-table";
import UserService from "../../application/services/userService.class";
import { ioc_container } from "../../../../kernel/ioc/ioc-container";
import { IOC_TYPES } from "../../../../kernel/ioc/ioc-types";

export const TableUsers: FC = () => {
    
    const userService: UserService = ioc_container.get<UserService>(IOC_TYPES.UserService);

    const [usersDataSource, setUsersDataSource] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const fillTableByPage = () => {
        userService.fetchUsersByPage(currentPage).then(() => setUsersDataSource(userService.getUsers()));
    }

    useEffect(() => {
        fillTableByPage();
    },[currentPage])

    return <Fragment>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {
                            columnsTableUsers.map(col => (
                                <TableCell align="right">{col.title}</TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {usersDataSource.map((row) => (
                        <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="right">{row.first_name}</TableCell>
                            <TableCell align="right">{row.email}</TableCell>
                            <TableCell align="right">{row.job}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Fragment>
}