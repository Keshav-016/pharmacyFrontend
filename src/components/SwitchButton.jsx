import Switch, { switchClasses } from '@mui/joy/Switch';

export default function SwitchButton({ checkedStatus, handleChange }) {
    return (
        <Switch
            color={checkedStatus ? 'success' : 'danger'}
            checked={checkedStatus}
            onClick={handleChange}
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
