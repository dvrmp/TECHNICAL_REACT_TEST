import { ArticleOutlined, DeleteOutline } from '@mui/icons-material';
import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';
import { FC, Fragment, useEffect, useState } from "react";
import { ioc_container } from "../../../../kernel/ioc/ioc-container";
import { IOC_TYPES } from "../../../../kernel/ioc/ioc-types";
import UserService from "../../application/services/userService.class";
import User from "../../domain/entities/user.class";
import { columnsTableUsers } from "../../infrastucture/data/columns-table";

export const TableUsers: FC = () => {

    const userService: UserService = ioc_container.get<UserService>(IOC_TYPES.UserService);

    const [usersDataSource, setUsersDataSource] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageDirecction, setPageDirecction] = useState<'preview' | 'next'>('next');

    const fillTableByPage = async (pageNumer: number) => {
        if ((userService.getUsers().length !== userService.getTableOptions()?.total) || usersDataSource.length === 0) {
            await userService.fetchUsersByPage(pageNumer);
        }
        const users = userService.getUsers();

        if (users.length !== 0) {
            pageDirecction === 'next' && setUsersDataSource(users.slice(currentPage === 1 ? 0 : usersDataSource.length, users.length));
            pageDirecction === 'preview' && setUsersDataSource(users.slice(usersDataSource.length - 6, users.length - 6));
        }
    }

    useEffect(() => {
        (async () => fillTableByPage(currentPage))();
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
                        <TableRow data-testid='table-users-row' key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="right">{row.first_name}</TableCell>
                            <TableCell align="right">{row.email}</TableCell>
                            <TableCell align="right">{row.job}</TableCell>
                            <TableCell align="right">{row.job}</TableCell>
                            <TableCell align="right">
                                <ArticleOutlined />
                            </TableCell>
                            <TableCell align="right">
                                <DeleteOutline />
                            </TableCell>

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
                                if (userService.getTableOptions().total_pages === currentPage) {
                                    setCurrentPage(currentPage - 1);
                                    setPageDirecction('preview');
                                    console.log('her')
                                } else {
                                    setCurrentPage(currentPage + 1);
                                    setPageDirecction('next');
                                }
                            }}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    </Fragment>
}