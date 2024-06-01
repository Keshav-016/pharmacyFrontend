import Swal from 'sweetalert2';

const handleConfirmAlert = (
    icon,
    contentHeading,
    contentSubheading,
    confirmText,
    handleFunction
) => {
    Swal.fire({
        title: `<h6 class="font-default-font-family text-[1.2rem] text-black font-bold">${contentHeading}</h6>`,
        html: `<span class="font-default-font-family text-[#737A83] text-[1rem]">${contentSubheading}</span>`,
        icon: `${icon}`,
        showCancelButton: true,
        confirmButtonColor: '#1444ef',
        cancelButtonColor: '#929292',
        confirmButtonText: `${confirmText}`
    })
        .then(function (confirm) {
            if (confirm.isConfirmed) {
                handleFunction();
            }
        })
        .catch(function (reason) {
            alert('The alert was dismissed by the user: ' + reason);
        });
};

export default handleConfirmAlert;
