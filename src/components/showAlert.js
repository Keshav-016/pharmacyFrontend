import Swal from 'sweetalert2';
import { AiFillAlert } from 'react-icons/ai';
const showAlert = (icon, text, timer = 1500) => {
    Swal.fire({
        position: 'center',
        icon: icon,
        title: text,
        showConfirmButton: false,
        timer
    });
};

export default showAlert;
