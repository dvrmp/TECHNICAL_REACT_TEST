import { FC, Fragment, useState, useEffect } from "react";
import { Table, TableBody, TableContainer, TableCell, TableRow, TableHead, Paper, TableFooter, TablePagination } from '@mui/material'
import User from "../../domain/entities/user.class";
import { columnsTableUsers } from "../../infrastucture/data/columns-table";
import UserService from "../../application/services/userService.class";
import { ioc_container } from "../../../../kernel/ioc/ioc-container";
import { IOC_TYPES } from "../../../../kernel/ioc/ioc-types";

export const TableUsers: FC = () => {

    const userService: UserService = ioc_container.get<UserService>(IOC_TYPES.UserService);

    const [usersDataSource, setUsersDataSource] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const fillTableByPage = async (pageNumer: number) => {
        await userService.fetchUsersByPage(pageNumer);
        if (userService.getUsers().length !== 0) {
            setUsersDataSource(userService.getUsers());
        } 
    }

    useEffect(() => {
        (async () => fillTableByPage(currentPage === 0 ? 1 : currentPage))();
    }, [currentPage])

    return <Fragment>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {
                            columnsTableUsers.map((col, index) => (
                                <TableCell key={index} align="right">{col.title}</TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {usersDataSource.map((row, index) => (
                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="right">{row.first_name}</TableCell>
                            <TableCell align="right">{row.email}</TableCell>
                            <TableCell align="right">{row.job}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            colSpan={3}
                            count={usersDataSource.length}
                            rowsPerPage={5}
                            page={usersDataSource.length <= 0 ? 0 : currentPage - 1}
                            onPageChange={() => {
                                if(userService.getTableOptions().total_pages === currentPage) {
                                    setCurrentPage(currentPage - 1);
                                } else {
                                    setCurrentPage(currentPage + 1);
                                }
                            }}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    </Fragment>
}