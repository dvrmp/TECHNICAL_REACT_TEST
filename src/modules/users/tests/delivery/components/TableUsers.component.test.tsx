import 'reflect-metadata';
import { render } from '@testing-library/react';
import { TableUsers } from '../../../delivery/components/TableUsers.component';

describe('Component: TableUsers', () => {
    test('Should rendered', async () => {
        const wrapper = render(<TableUsers />);
        const rows = await wrapper.findAllByTestId('table-users-row')
        expect(rows.length).toEqual(5+1);
    })
});