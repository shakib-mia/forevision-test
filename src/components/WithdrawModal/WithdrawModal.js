import React from 'react'
import Button from '../Button/Button'

const WithdrawModal = ({ setWithdrawModal }) => {
  return (
    <div className='w-screen h-screen fixed top-0 left-0 z-[9999] flex justify-center items-center backdrop-blur-[1px]'>
      <div className='md:w-3/5 w-11/12 h-[80vh] relative overflow-x-visible rounded-2xl overflow-y-auto p-3 px-5' style={{ backgroundColor: '#ffffffd9' }}>
        <button onClick={() => setWithdrawModal(false)} className='absolute text-interactive-light-destructive-focus text-heading-3 top-2 right-2 opacity-50'>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM8.29289 8.29289C8.68342 7.90237 9.31658 7.90237 9.70711 8.29289L12 10.5858L14.2929 8.29289C14.6834 7.90237 15.3166 7.90237 15.7071 8.29289C16.0976 8.68342 16.0976 9.31658 15.7071 9.70711L13.4142 12L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L12 13.4142L9.70711 15.7071C9.31658 16.0976 8.68342 16.0976 8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929L10.5858 12L8.29289 9.70711C7.90237 9.31658 7.90237 8.68342 8.29289 8.29289Z" fill="black" />
          </svg>
        </button>
        <div className='mt-4'>
          <p style={{ fontSize: "50.52px", lineheight: "24px" }} className='md:ml-3 mb-3 text-heading-6-bold text-grey-dark my-1'>Revenue Withdraw</p>
          <p style={{ fontSize: "21.33px", lineheight: "24px" }} className='md:ml-3 text-heading-6-bold text-grey-dark'>Please fill the form out to initiate the request</p>
        </div>
        <div className='mt-5'>
          <div className='md:grid grid-cols-2'>
            <div className='my-4'>
              <select id="countries" class="bg-gray-50 text-black text-sm shadow-md rounded-lg block md:w-5/6 w-full p-2">
                <option selected>Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <label for="countries" class="block text-sm text-black mt-1">Are you an Indian citizen?</label>
            </div>
            <div className='my-4'>
              <select id="countries" class="bg-gray-50 text-black text-sm shadow-md rounded-lg block md:w-5/6 w-full p-2">
                <option selected>Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <label for="countries" class="block text-sm text-black mt-1">Do you have a GST number?</label>
            </div>
            <div className='my-4'>
              <select id="countries" class="bg-gray-50 text-black text-sm shadow-md rounded-lg block md:w-5/6 w-full p-2">
                <option selected>&#8377;</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <label for="countries" class="block text-sm text-black mt-1">Enter amount</label>
            </div>
            <div className='my-4 block'>
              <button className='disabled:bg-interactive-light-disabled disabled:cursor-not-allowed text-white bg-interactive-light text-button hover:bg-interactive-light-hover focus:bg-interactive-light-focus active:bg-interactive-light-active font-bold rounded-full uppercase flex gap-1 px-3 py-2'>Save and Next</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default WithdrawModal