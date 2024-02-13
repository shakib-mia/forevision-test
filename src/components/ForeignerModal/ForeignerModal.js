import React from 'react'

const ForeignerModal = ({ setShowForeignerModal }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <div className='w-screen h-screen fixed top-0 left-0 z-[9999] flex justify-center items-center backdrop-blur-[1px]'>
      <div className='md:w-3/5 w-11/12 h-[80vh] relative overflow-x-visible rounded-2xl overflow-y-auto p-3 px-5' style={{ backgroundColor: '#ffffffd9' }}>
        <button onClick={() => setShowForeignerModal(false)} className='absolute text-interactive-light-destructive-focus text-heading-3 top-2 right-2 opacity-50'>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM8.29289 8.29289C8.68342 7.90237 9.31658 7.90237 9.70711 8.29289L12 10.5858L14.2929 8.29289C14.6834 7.90237 15.3166 7.90237 15.7071 8.29289C16.0976 8.68342 16.0976 9.31658 15.7071 9.70711L13.4142 12L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L12 13.4142L9.70711 15.7071C9.31658 16.0976 8.68342 16.0976 8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929L10.5858 12L8.29289 9.70711C7.90237 9.31658 7.90237 8.68342 8.29289 8.29289Z" fill="black" />
          </svg>
        </button>
        <div className='mt-4'>
          <p className='md:ml-3 mb-3 text-heading-6-bold title text-grey-dark my-1'>Revenue Withdraw foreigner</p>
          <p style={{ fontSize: "21.33px", lineheight: "24px" }} className='md:ml-3 text-heading-6-bold text-grey-dark'>Please fill the form out to initiate the request</p>
        </div>
        <p style={{ color: "#78B0FD" }} className='text-heading-6 md:ml-3 my-2 mt-5'>Submit the Documents needed</p>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='md:grid grid-cols-2'>
            <div className='my-4'>
              <div className='bg-gray-50 text-black text-sm shadow-md rounded-lg block md:w-5/6 w-full p-2'>
                <label for="files" className="btn flex justify-between items-center">
                  {/* <p className='overflow-hidden mr-2 h-3'>{!fileName ? "File name" : fileName.split("\\")[2]}</p> */}
                  <p>filename</p>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.52858 0.528514C6.78892 0.268165 7.21103 0.268165 7.47138 0.528514L10.8047 3.86185C11.0651 4.1222 11.0651 4.54431 10.8047 4.80466C10.5444 5.06501 10.1223 5.06501 9.86191 4.80466L7.66665 2.60939V8.99992C7.66665 9.36811 7.36817 9.66659 6.99998 9.66659C6.63179 9.66659 6.33331 9.36811 6.33331 8.99992V2.60939L4.13805 4.80466C3.8777 5.06501 3.45559 5.06501 3.19524 4.80466C2.93489 4.54431 2.93489 4.1222 3.19524 3.86185L6.52858 0.528514ZM0.99998 8.33325C1.36817 8.33325 1.66665 8.63173 1.66665 8.99992V11.6666C1.66665 11.8434 1.73688 12.013 1.86191 12.138C1.98693 12.263 2.1565 12.3333 2.33331 12.3333H11.6666C11.8435 12.3333 12.013 12.263 12.1381 12.138C12.2631 12.013 12.3333 11.8434 12.3333 11.6666V8.99992C12.3333 8.63173 12.6318 8.33325 13 8.33325C13.3682 8.33325 13.6666 8.63173 13.6666 8.99992V11.6666C13.6666 12.197 13.4559 12.7057 13.0809 13.0808C12.7058 13.4559 12.1971 13.6666 11.6666 13.6666H2.33331C1.80288 13.6666 1.29417 13.4559 0.919099 13.0808C0.544027 12.7057 0.333313 12.197 0.333313 11.6666V8.99992C0.333313 8.63173 0.63179 8.33325 0.99998 8.33325Z" fill="#202020" fill-opacity="0.8" />
                  </svg>
                </label>
                <input type="file" name="gstCertificate" id="files" style={{ display: "none" }} />
              </div>
              <label for="countries" class="block text-sm text-black mt-1">Upload your Government ID</label>
            </div>
            <div className='my-4'>
              <div className='bg-gray-50 text-black text-sm shadow-md rounded-lg block md:w-5/6 w-full p-2'>
                <label for="files" className="btn flex justify-between items-center">
                  {/* <p className='overflow-hidden mr-2 h-3'>{!fileName ? "File name" : fileName.split("\\")[2]}</p> */}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.52858 0.528514C6.78892 0.268165 7.21103 0.268165 7.47138 0.528514L10.8047 3.86185C11.0651 4.1222 11.0651 4.54431 10.8047 4.80466C10.5444 5.06501 10.1223 5.06501 9.86191 4.80466L7.66665 2.60939V8.99992C7.66665 9.36811 7.36817 9.66659 6.99998 9.66659C6.63179 9.66659 6.33331 9.36811 6.33331 8.99992V2.60939L4.13805 4.80466C3.8777 5.06501 3.45559 5.06501 3.19524 4.80466C2.93489 4.54431 2.93489 4.1222 3.19524 3.86185L6.52858 0.528514ZM0.99998 8.33325C1.36817 8.33325 1.66665 8.63173 1.66665 8.99992V11.6666C1.66665 11.8434 1.73688 12.013 1.86191 12.138C1.98693 12.263 2.1565 12.3333 2.33331 12.3333H11.6666C11.8435 12.3333 12.013 12.263 12.1381 12.138C12.2631 12.013 12.3333 11.8434 12.3333 11.6666V8.99992C12.3333 8.63173 12.6318 8.33325 13 8.33325C13.3682 8.33325 13.6666 8.63173 13.6666 8.99992V11.6666C13.6666 12.197 13.4559 12.7057 13.0809 13.0808C12.7058 13.4559 12.1971 13.6666 11.6666 13.6666H2.33331C1.80288 13.6666 1.29417 13.4559 0.919099 13.0808C0.544027 12.7057 0.333313 12.197 0.333313 11.6666V8.99992C0.333313 8.63173 0.63179 8.33325 0.99998 8.33325Z" fill="#202020" fill-opacity="0.8" />
                  </svg>
                </label>
                <input type="file" name="gstCertificate" id="files" style={{ display: "none" }} />
              </div>
              <label for="countries" class="block text-sm text-black mt-1">Upload your Secondary Unique ID</label>
            </div>
            <div className='my-4'>
              <div className='bg-gray-50 text-black text-sm shadow-md rounded-lg block md:w-5/6 w-full p-2'>
                <label for="files" className="btn flex justify-between items-center">
                  {/* <p className='overflow-hidden mr-2 h-3'>{!fileName ? "File name" : fileName.split("\\")[2]}</p> */}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.52858 0.528514C6.78892 0.268165 7.21103 0.268165 7.47138 0.528514L10.8047 3.86185C11.0651 4.1222 11.0651 4.54431 10.8047 4.80466C10.5444 5.06501 10.1223 5.06501 9.86191 4.80466L7.66665 2.60939V8.99992C7.66665 9.36811 7.36817 9.66659 6.99998 9.66659C6.63179 9.66659 6.33331 9.36811 6.33331 8.99992V2.60939L4.13805 4.80466C3.8777 5.06501 3.45559 5.06501 3.19524 4.80466C2.93489 4.54431 2.93489 4.1222 3.19524 3.86185L6.52858 0.528514ZM0.99998 8.33325C1.36817 8.33325 1.66665 8.63173 1.66665 8.99992V11.6666C1.66665 11.8434 1.73688 12.013 1.86191 12.138C1.98693 12.263 2.1565 12.3333 2.33331 12.3333H11.6666C11.8435 12.3333 12.013 12.263 12.1381 12.138C12.2631 12.013 12.3333 11.8434 12.3333 11.6666V8.99992C12.3333 8.63173 12.6318 8.33325 13 8.33325C13.3682 8.33325 13.6666 8.63173 13.6666 8.99992V11.6666C13.6666 12.197 13.4559 12.7057 13.0809 13.0808C12.7058 13.4559 12.1971 13.6666 11.6666 13.6666H2.33331C1.80288 13.6666 1.29417 13.4559 0.919099 13.0808C0.544027 12.7057 0.333313 12.197 0.333313 11.6666V8.99992C0.333313 8.63173 0.63179 8.33325 0.99998 8.33325Z" fill="#202020" fill-opacity="0.8" />
                  </svg>
                </label>
                <input type="file" name="gstCertificate" id="files" style={{ display: "none" }} />
              </div>
              <label for="countries" class="block text-sm text-black mt-1">Upload a photograph of your cancelled Cheque</label>
            </div>
          </div>
          <p style={{ color: "#78B0FD" }} className='text-heading-6 md:ml-3 my-2 mt-5'>Submit your Bank Details</p>
          <div className='grid grid-cols-2'>
            <div className='my-4'>
              <input type="text" className='bg-gray-50 text-black text-sm shadow-md rounded-lg block md:w-5/6 w-full p-2' placeholder='Account Number' name="accountNumber" id="" />
              <label for="countries" class="block text-sm text-black mt-1">Enter your Account number</label>
            </div>
            <div className='my-4'>
              <input type="text" className='bg-gray-50 text-black text-sm shadow-md rounded-lg block md:w-5/6 w-full p-2' placeholder='Re-enter Account Number' name="accountNumberCheck" id="" />
              <label for="countries" class="block text-sm text-black mt-1">Confirm your Account number</label>
            </div>
            <div className='my-4'>
              <input type="text" className='bg-gray-50 text-black text-sm shadow-md rounded-lg block md:w-5/6 w-full p-2' placeholder='Enter Your Name' name="name" id="" />
              <label for="countries" class="block text-sm text-black mt-1">Name as per your Bank Account </label>
            </div>
            <div className='my-4'>
              <input type="number" className='bg-gray-50 text-black text-sm shadow-md rounded-lg block md:w-5/6 w-full p-2' placeholder='IFSC Code' name="ifsc" id="" />
              <label for="countries" class="block text-sm text-black mt-1">Enter your IFSC Code</label>
            </div>
            <div className='my-4'>
              <input type="text" className='bg-gray-50 text-black text-sm shadow-md rounded-lg block md:w-5/6 w-full p-2' placeholder="Bank's name" name="bankName" id="" />
              <label for="countries" class="block text-sm text-black mt-1">Your Bank Name</label>
            </div>
            <div className='my-4'>
              <input type="text" className='bg-gray-50 text-black text-sm shadow-md rounded-lg block md:w-5/6 w-full p-2' placeholder='Branch Name' name="branchName" id="" />
              <label for="countries" class="block text-sm text-black mt-1">Bank's branch Name</label>
            </div>
          </div>
          <div className='my-4 flex justify-center'>
            <input type='submit' value={"SAVE AND SUBMIT"} className='disabled:bg-interactive-light-disabled disabled:cursor-not-allowed text-white bg-interactive-light text-button hover:bg-interactive-light-hover focus:bg-interactive-light-focus active:bg-interactive-light-active font-bold rounded-full uppercase flex gap-1 px-3 py-2' />
          </div>
        </form>
      </div>
    </div>
  )
}

export default ForeignerModal