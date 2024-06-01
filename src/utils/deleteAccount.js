import Swal from 'sweetalert2';
import axios from 'axios';

const deleteUser = async () => {
    try {
        const token = localStorage.getItem('token');
        const rawData = await axios({
            method: 'delete',
            url: `http://localhost:3003/customers/delete`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        localStorage.removeItem('token');
        return rawData.data.message;
    } catch (e) {
        console.log(e);
    }
};

export default function () {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
        if (result.isConfirmed) {
            const res = await deleteUser();
            res === 'success'
                ? Swal.fire({
                      title: 'Deleted!',
                      text: 'Your account has been deleted.',
                      icon: 'success'
                  }).then((result) => {
                      if (result.isConfirmed) location.reload();
                  })
                : '';
        }
    });
}
