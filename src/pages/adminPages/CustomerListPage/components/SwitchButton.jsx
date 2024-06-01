import * as React from 'react';
import Switch, { switchClasses } from '@mui/joy/Switch';
import { useState } from 'react';
import axios from 'axios';

export default function SwitchButton({ userId, checkedStatus }) {
    const [checked, setChecked] = useState(!checkedStatus);
    const handleSwitch = async (e) => {
        try {
            const token = localStorage.getItem('token');
            setChecked(e.target.checked);
            const rawData = await axios({
                method: 'put',
                url: `http://localhost:3003/customers/update?id=${userId}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: { isBlocked: checked }
            });
            console.log(rawData);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Switch
            color={checked ? 'success' : 'danger'}
            checked={checked}
            onChange={handleSwitch}
            sx={{
                '--Switch-thumbSize': '1.2rem',
                '--Switch-trackWidth': '2.7rem',
                '--Switch-trackHeight': '1.5rem',
                '--Switch-trackBackground': '#DE2268',
                '&:hover': {
                    '--Switch-trackBackground': '#DE2268'
                },
                [`&.${switchClasses.checked}`]: {
                    '--Switch-trackBackground': '#5CB176',
                    '&:hover': {
                        '--Switch-trackBackground': '#5CB176'
                    }
                }
            }}
        />
    );
}
