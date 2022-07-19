import React from 'react';
import { Header } from '../components';
import SkeletonLoading from '../components/SkeletonLoading';
import Card from '../components/lib/Card';

const HomeSkeletonPage = () => {

  return (
    <div className="page-container">
      <Header />
      <div className="flex flex-row items-center gap-1">
        <span className="font-light text-md"><SkeletonLoading width={60} /></span>
        <SkeletonLoading width={100} />
      </div>
      <div
        id="content"
        className="mt-4 w-full h-auto bg-white dark:bg-zinc-900 rounded-lg border-[0.5px] border-zinc-200 dark:border-zinc-700 drop-shadow">
        <div id="balance-container" className="p-4 w-full">
          <div className="w-full flex flex-row items-center justify-between">
            <>
              <SkeletonLoading width={100} />
              <SkeletonLoading width={24} />
            </>
          </div>
          <h1 className="text-3xl text-emerald-500 font-bold">
            <SkeletonLoading width={100} />
          </h1>
        </div>
        <div id="charts">
          <div className="flex items-center w-full p-4">
            <SkeletonLoading width={280} height={70}/>
          </div>
        </div>
        <div className="p-4 w-full text-right border-t-[0.5px] border-zinc-200 dark:border-zinc-800">
          <p className="text-md"><SkeletonLoading width={120} /></p>
          <p className="text-xl text-orange-300 font-bold"><SkeletonLoading width={100} /></p>
        </div>
      </div>
      <div id="transitions" className="mt-10 pb-4">
        <h1 className="text-2xl font-bold my-5"><SkeletonLoading width={120} /></h1>
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
  );
};

export default HomeSkeletonPage;
