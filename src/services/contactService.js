const contacts = [
  { name: 'John Doe', phoneNo: '123-456-7890' },
  { name: 'Jane Smith', phoneNo: '987-654-3210' },
  { name: 'Alice Johnson', phoneNo: '555-123-4567' },
  { name: 'Bob Brown', phoneNo: '777-888-9999' },
  { name: 'Elena Garcia', phoneNo: '444-333-2222' },
  { name: 'David Lee', phoneNo: '888-999-7777' },
  { name: 'Sophie Clark', phoneNo: '666-555-4444' },
  { name: 'Michael Wang', phoneNo: '222-111-3333' },
  { name: 'Olivia Taylor', phoneNo: '111-222-4444' },
  { name: 'William Martinez', phoneNo: '999-888-7777' },
];

export const getContacts = async () => {
  return contacts;
};
