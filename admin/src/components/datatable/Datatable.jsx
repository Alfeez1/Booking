import './datatable.scss';
import { DataGrid } from '@mui/x-data-grid';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split('/')[1];
  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch(`/${path}`);
  useEffect(() => {
    if (!loading && !error) {
      setList(data);
    }
  }, [data, loading, error]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) {}
  };

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: 'none' }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      {!loading && !error && (
        <DataGrid
          className="datagrid"
          getRowId={(row) => row._id}
          rows={list}
          columns={columns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      )}
    </div>
  );
};

export default Datatable;
