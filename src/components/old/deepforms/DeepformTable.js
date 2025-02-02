import React, { useState } from 'react';
import EditDeepformModal from 'components/old/deepforms/EditDeepformModal';
import { useAuth } from 'util/auth';
import { useRouter } from 'next/router';
// import { updateItem, deleteItem, useItemsByOwner } from "util/db";
import { deleteDeepform, useDeepformsByOwner } from 'util/db';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

function DeepformTable({ host }) {
  const auth = useAuth();
  const router = useRouter();

  const {
    data: deepforms,
    status: deepformsStatus,
    error: deepformsError,
  } = useDeepformsByOwner(auth.user.uid);

  const [creatingDeepform, setCreatingDeepform] = useState(false);

  const [updatingDeepformId, setUpdatingDeepformId] = useState(null);

  const deepformsAreEmpty = !deepforms || deepforms.length === 0;

  const confirmDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteDeepform(id);
    }
  };
  const canCreateUnlimitedDeepforms =
    auth.user.planIsActive &&
    (auth.user.planId === 'pro' || auth.user.planId === 'business');

  // If the user is on the free plan, they can only create 2 Deepforms.
  const handleCreateDeepform = () => {
    if (canCreateUnlimitedDeepforms || deepforms.length < 2) {
      setCreatingDeepform(true);
    } else {
      toast((t) => (
        <span className='flex gap-2'>
          Upgrade to Pro or Business to create more Deepforms.{' '}
          <Link href='/pricing' legacyBehavior>
            <button
              onClick={() => toast.dismiss(t.id)}
              className=' inline-flex w-fit justify-center self-end rounded-md border border-gray-300 bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-500'
            >
              Upgrade
            </button>
          </Link>
        </span>
      ));
    }
  };

  return (
    <>
      {deepformsError && (
        <div className='mb-4 text-red-600'>{deepformsError.message}</div>
      )}

      <div>
        <div className='flex items-center justify-between border-b border-gray-200 p-4'>
          <span className='text-xl'>Your Deepforms</span>
          <button
            className='rounded border-0 bg-indigo-600 py-2 px-4 text-white hover:bg-indigo-500  focus:outline-none'
            onClick={() => handleCreateDeepform()}
          >
            Create Deepform
          </button>
        </div>

        {(deepformsStatus === 'loading' || deepformsAreEmpty) && (
          <div className='p-8'>
            {deepformsStatus === 'loading' && <>Loading...</>}

            {deepformsStatus !== 'loading' && deepformsAreEmpty && (
              <>Nothing yet. Click the button to add your first Deepform.</>
            )}
          </div>
        )}

        {deepformsStatus !== 'loading' && deepforms && deepforms.length > 0 && (
          <>
            {deepforms.map((deepform, index) => (
              <div
                className={
                  'flex border-b border-gray-200 p-4'
                  // "flex p-4 border-b border-gray-200" +
                  // (item.featured ? " bg-gray-100" : "")
                }
                key={index}
              >
                <p className='max-w-[60%] overflow-scroll whitespace-nowrap scrollbar-hide sm:max-w-[50%] xl:max-w-[70%]'>
                  {deepform.name}
                </p>

                <div className='ml-auto space-x-2'>
                  {/* <button
                    className="text-indigo-600"
                    onClick={() => handleStarItem(item)}
                  >
                    {item.featured ? "unstar" : "star"}
                  </button> */}
                  <button
                    className='text-indigo-600'
                    onClick={() => setUpdatingDeepformId(deepform.id)}
                  >
                    Open
                  </button>
                  <button
                    className='text-indigo-600'
                    onClick={() => confirmDelete(deepform.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {creatingDeepform && (
        <EditDeepformModal onDone={() => setCreatingDeepform(false)} />
      )}

      {updatingDeepformId && (
        <EditDeepformModal
          id={updatingDeepformId}
          onDone={() => setUpdatingDeepformId(null)}
          //TODO: Use global state to avoid prop drilling
          host={host}
        />
      )}
    </>
  );
}

export default DeepformTable;
