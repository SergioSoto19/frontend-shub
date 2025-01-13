import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Spinner, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import HotelService from '../../api/HotelService';
import { toast } from 'react-toastify';
import './HotelList.css';


function HotelList() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await HotelService.getHotels();
        setHotels(response.data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const handleEdit = (id) => {
    console.log(`actualizar hotel: ${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await HotelService.deleteHotel(id);
      toast.success('Hotel eliminado exitosamente');
      setHotels(hotels.filter(hotel => hotel.id !== id));
    } catch (error) {
      toast.error('Error al eliminar el hotel');
    }
  };

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
    { name: 'Nombre', selector: row => row.name, sortable: true },
    { name: 'Ubicación', selector: row => row.location, sortable: true },
    {
      name: 'Editar',
      cell: row => (
        <FontAwesomeIcon
          icon={faPenToSquare}
          onClick={() => handleEdit(row.id)}
          style={{ cursor: 'pointer', color: 'blue' }}
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: 'Eliminar',
      cell: row => (
        <FontAwesomeIcon
          icon={faTrashCan}
          onClick={() => handleDelete(row.id)}
          style={{ cursor: 'pointer', color: 'red' }}
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div>
      <div className='row'>
        <div className='col-12 col-md-8'>
          <h2 className="text-start title">Hoteles</h2>
        </div>
        <div className='col-12 col-md-4' >
          <Button className="button-Custom">Agregar Hotel</Button>
        </div>
      </div>

      <div className='col-12'>
        <div className="space-y-4">
          <div className="table-container">
            <DataTable
              columns={columns}
              data={hotels}
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
}

export default HotelList;