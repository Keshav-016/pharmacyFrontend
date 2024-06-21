import { z } from 'zod';

const checkName = z.object({
    name: z
        .string({ required_error: 'Name is required' })
        .trim()
        .min(3, { message: 'Name must be atleast 3 characters' })
        .max(20, { message: 'Name must be within 20 characters' })
});

const checkPhoneNumber = z.object({
    phone: z
        .string()
        .trim()
        .refine((value) => /^[0-9]{10,10}$/.test(value), {
            message: 'Invalid Phone, must be 10 digits'
        })
});

const checkPharmacyRegNumber = z.object({
    pharmacyRegNumber: z
        .string()
        .trim()
        .min(16, { message: 'Reg No. must be atleast 16 digits' })
        .max(16, { message: 'Reg No. must be 16 digits' })
});

const checkEmail = z.object({
    email: z.string().trim().email()
});

const MAX_FILE_SIZE = 2000000;
function checkFile(file) {
    if (file?.name) {
        const fileType = file.name.split('.').pop();
        if (['png', 'jpg'].includes(fileType)) return true;
    }
    return false;
}

const checkFileType = z.object({
    fileX: z
        .any()
        .refine((file) => !(file?.length < 2), 'File is required.')
        .refine((file) => file.size < MAX_FILE_SIZE, {
            message: 'Max size is 2MB.'
        })
        .refine((file) => checkFile(file), {
            message: 'Only .jpg and .png formats are supported.'
        })
});

function checkFileProfile(file) {
    if (file?.name) {
        const fileType = file.name.split('.').pop();
        if (['png', 'jpg', 'jpeg'].includes(fileType)) return true;
    }
    return false;
}

const checkProfilePictureType = z.object({
    profImg: z
        .any()
        .refine((file) => checkFileProfile(file), {
            message: 'Only .jpg, .jpeg and .png formats are supported.'
        })
});

const checkPassword = z.object({
    password: z
        .string()
        .min(6, { message: 'Password must be atleast 6 characters' })
        .max(16, { message: 'Password shold be less than 16 characters' })
        .refine((value) => /^[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(value))
});

const price = z.object({
    price: z
        .number()
        .positive({ message: 'Price must be a positive number' })
});


export {
    checkName,
    checkPhoneNumber,
    checkPharmacyRegNumber,
    checkEmail,
    checkPassword,
    checkFileType,
    price,
    checkProfilePictureType
};
