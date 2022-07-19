import { Header } from '../components';
import React from 'react';
import SkeletonLoading from '../components/SkeletonLoading';
import Card from '../components/lib/Card';

const CreditCardPage = () => {

  return (
    <>
      <div className="page-container">
        <Header />
        <div className="flex flex-col gap-4">
          <SkeletonLoading width={330} height={60} />
        </div>
      </div>
      <div className="flex flex-col pb-12 gap-8 mt-[-20px]">
        <div>
          <div className="px-3 mb-4">
            <p className="text-xl"><SkeletonLoading width={70} /></p>
          </div>
          <div
            className="flicking-panel w-[320px] h-[120px]">
            <div
              className={`p-4 ml-3 h-full bg-white dark:bg-zinc-900 rounded-lg border-[0.5px] border-zinc-200 dark:border-zinc-700`}>
              <div className="flex flex-row items-center justify-between">
                <SkeletonLoading width={80} />
                <SkeletonLoading width={45} />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 px-3">
          <div className="flex flex-row items-center justify-between">
            <p className="text-lg font-bold"><SkeletonLoading /></p>
            <div className="flex flex-1 flex-row items-center justify-end gap-4">
              <SkeletonLoading width={30} />
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <p className="text-sm font-light"><SkeletonLoading width={150} /></p>
            <p className="font-bold text-orange-500"><SkeletonLoading width={70} /></p>
          </div>
          <div id="transitions" className="mt-5">
            <>
              <SkeletonLoading width={330} height={60} />
              <Card>
                <SkeletonLoading width={30} height={25} />
                <div className="w-full flex flex-col">
                  <div className="w-full flex flex-row items-start justify-between">
                    <SkeletonLoading width={45} />
                    <SkeletonLoading width={30} />
                  </div>
                  <SkeletonLoading width={150} />
                </div>
              </Card>
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreditCardPage;
