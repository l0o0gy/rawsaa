import React from 'react';

export const ResultList=({ results })=> {
  return (
    <div className='w-20 h-56 bg-slate-100 text-black ml-10'>
      {results.map((result , id) => {
        return <div key={id} className=' text-black '>
         {result.data}
          </div>;
      })}
    </div>
  );
}

export default ResultList;
