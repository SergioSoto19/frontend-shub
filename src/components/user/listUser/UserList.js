import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserService from '../../../api/UserService';




function  UserList () {
    
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await UserService.getUsers();
                setUsers(response.data);
            } catch (error) {
                console.error('Error al obtener usuarios:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const customStyles = {
        tableWrapper: {
          style: {
            height: '590px',
          },
        },

        pagination: {
            style: {
                marginTop: 'auto', 
                padding: '10px',
            },
        },
    };

    const customPaginationOptions = {
        rowsPerPageText: 'Filas por página',  
        rangeSeparatorText: 'de',             
        noRowsPerPage: false,
    };

    const conditionalRowStyles = [
        {
            when: row => true, 
            style: {
                '&:hover': {
                    backgroundColor: '#f0f0f0',  
                    cursor: 'pointer',          
                },
            },
        },
    ];


    const columns = [
        { name: 'ID', selector: row => row.id, sortable: true },
        { name: 'Correo Electrónico', selector: row => row.email, sortable: true },
        { name: 'Rol', selector: row => row.role, sortable: true },
        { name: 'Contraseña', selector: row => row.password, sortable: true },
    ];

    return (
        <div className='row'>
            <div className='col-12 col-md-4 title1'>
                <h2 className="text-start title">Usuarios</h2>
            </div>

            <div className='col-12'>
                <div className="space-y-4">
                    <div className="table-container">
                        <DataTable
                            columns={columns}
                            data={users}
                            pagination
                            paginationPerPage={10}
                            fixedHeader
                            persistTableHead
                            fixedHeaderScrollHeight="77vh"
                            progressPending={loading}
                            noDataComponent="No hay datos disponibles"
                            
                            conditionalRowStyles={conditionalRowStyles}
                             paginationComponentOptions={customPaginationOptions}
                            customStyles={customStyles}
                            progressComponent={(
                                <div className="loading-overlay">
                                    <Spinner animation="border" size="lg" />
                                </div>
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserList;