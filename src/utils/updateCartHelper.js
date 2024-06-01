import axios from 'axios';
const baseUrl = `http://localhost:3003`;

export default async function (medicineId, quantity) {
    try {
        const token = localStorage.getItem('token');
        const rawData = await axios({
            method: 'put',
            url: `${baseUrl}/cart/update-cart`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            data: {
                medicineId,
                quantity
            }
        });
        return rawData.data.data.cartItems;
    } catch (e) {
        console.log(e);
    }
}
