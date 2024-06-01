import { FaRegTrashAlt } from 'react-icons/fa';
import SwitchButton from '../../../../components/SwitchButton';
import handleConfirmAlert from '../../../../utils/ConfirmTemplate';
import { deleteFromCustomerList } from '../../../../features/adminAllCustomersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { blockUser } from '../../../../features/adminAllCustomersSlice';

const CustomerData = ({ page }) => {
    const dispatch = useDispatch();
    const allCustomers = useSelector((state) => state.adminAllCustomer.data);
    const handleBlock = (checked, userId) => {
        dispatch(blockUser({ userId: userId, checked: checked }));
    };
    const handleCustomerDelete = async (id) => {
        handleConfirmAlert(
            'question',
            'warning',
            'Are you sure you want to delete this user',
            'Yes',
            () => dispatch(deleteFromCustomerList(id))
        );
    };

    return (
        <div className="flex flex-col">
            {allCustomers
                ? allCustomers.map((item) => {
                      return (
                          <div
                              className="grid grid-cols-6 text-[0.95rem] ps-5 border-t"
                              key={item?._id}
                          >
                              <div className="pt-4 truncate">{item?.name}</div>
                              <div className="pt-4">
                                  {' '}
                                  {item?.phone === undefined
                                      ? '---'
                                      : item?.phone}
                              </div>
                              <div className="py-4 col-span-3 me-10">
                                  {item?.addressId?.address?.area === ''
                                      ? '---'
                                      : item?.addressId?.address?.building +
                                        ', ' +
                                        item?.addressId?.address?.area +
                                        ', ' +
                                        item?.addressId?.address?.city +
                                        ', ' +
                                        item?.addressId?.address?.state +
                                        ', ' +
                                        item?.addressId?.address?.postcode}
                              </div>
                              <div className=" flex gap-5 md:gap-10 mx-auto">
                                  <SwitchButton
                                      checkedStatus={!item?.isBlocked}
                                      handleChange={(e) =>
                                          handleBlock(
                                              e.target.checked,
                                              item?._id
                                          )
                                      }
                                  />
                                  <button
                                      onClick={() =>
                                          handleCustomerDelete(item?._id)
                                      }
                                  >
                                      <FaRegTrashAlt className="text-[1.3rem]" />
                                  </button>
                              </div>
                          </div>
                      );
                  })
                : ''}
        </div>
    );
};

export default CustomerData;
