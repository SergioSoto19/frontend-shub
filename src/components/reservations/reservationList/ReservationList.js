import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Spinner, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReservationService from '../../../api/ReservationService';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import RegisterReservationModal from '../registerReservation/ReservationModal';
import { toast } from 'react-toastify';


function ReservationList() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const fetchReservations = async () => {
    try {
      const response = await ReservationService.getReservations();
      setReservations(response.data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      toast.error('Error al obtener las reservas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleEdit = (id) => {
    console.log(`actualizar Reserva: ${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await ReservationService.deleteReservation(id);
      toast.success(response.data.message || 'Reserva eliminada exitosamente');
      setReservations(reservations.filter(reservation => reservation.id !== id));
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Error al eliminar la reserva');
      }
    }
  };

  const handleShowRegisterModal = () => setShowRegisterModal(true);
  const handleCloseRegisterModal = () => setShowRegisterModal(false);

  const handleReservationAdded = () => {
    fetchReservations();
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
    { name: 'Usuario', selector: row => row.user_id, sortable: true },
    { name: 'Hotel', selector: row => row.hotel_id, sortable: true },
    { name: 'Fecha de Check-in', selector: row => row.check_in_date, sortable: true },
    { name: 'Fecha de Check-out', selector: row => row.check_out_date, sortable: true },
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
          <h2 className="text-start title">Reservas</h2>
        </div>
        <div className='col-12 col-md-4'>
          <Button className="button-Custom" onClick={handleShowRegisterModal}>Agregar Reserva</Button>
        </div>
      </div>

      <div className='col-12'>
        <div className="space-y-4">
          <div className="table-container">
            <DataTable
              columns={columns}
              data={reservations}
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
      <RegisterReservationModal show={showRegisterModal} handleClose={handleCloseRegisterModal} onReservationAdded={handleReservationAdded} />
    </div>
  );
}

export default ReservationList;