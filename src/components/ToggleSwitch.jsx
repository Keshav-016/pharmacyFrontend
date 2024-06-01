import * as React from 'react';
import Switch, { switchClasses } from '@mui/joy/Switch';
import { useState } from 'react';
import { easeInOut } from 'framer-motion';

export default function ToggleSwitch({ checked, setChecked }) {
    return (
        <Switch
            color={checked ? 'success' : 'danger'}
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            sx={{
                '--Switch-thumbSize': '1rem',
                '--Switch-trackWidth': '2.3rem',
                '--Switch-trackHeight': '1.2rem',
                '--Switch-trackBackground': '#B6B8BB',
                '&:hover': {
                    '--Switch-trackBackground': '#B6B8BB'
                },

                [`&.${switchClasses.checked}`]: {
                    '--Switch-trackBackground': '#2BDD88',
                    '&:hover': {
                        '--Switch-trackBackground': '#2BDD88'
                    }
                }
            }}
        />
    );
}
