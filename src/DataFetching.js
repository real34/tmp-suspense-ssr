import React, { Suspense, SuspenseList, useState } from "react";
import { Loading } from "./helpers";

let resources = new Map();
const getResource = value => {
  if (!resources.has(value)) {
    const delayInMs = Math.round(Math.random() * value * 1000);
    const suspender = new Promise(resolve =>
      setTimeout(() => {
        resolve();
      }, delayInMs)
    )
      .then(() =>
        resources.set(value, {
          read: () => ({
            value,
            delayInMs
          })
        })
      )
      .catch(e =>
        resources.set(value, {
          read: () => {
            throw e;
          }
        })
      );

    resources.set(value, {
      read: () => {
        throw suspender;
      }
    });
  }

  return resources.get(value);
};

const FakeData = ({ value, startedAt }) => {
  const data = getResource(value).read();
  return (
    <div className="DataFetching-item">
      <h2>{data.value}</h2>
      <p>Delay: {data.delayInMs}ms</p>
      <p>Duration: {performance.now() - startedAt}ms</p>
    </div>
  );
};

const DataFetching = () => {
  const PAGE_SIZE = 4;
  const [dataSize, setDataSize] = useState(PAGE_SIZE);
  const [startedAt] = useState(performance.now());

  const loadMore = e => {
    setDataSize(currentSize => currentSize + PAGE_SIZE);
  };

  return (
    <section>
      <h1>Data fetching</h1>

      <div className="DataFetching-items">
        <SuspenseList
          revealOrder="forwards"
          // revealOrder="together"
          tail="collapsed"
          // tail="hidden"
        >
          {Array(dataSize)
            .fill(FakeData, 0, dataSize)
            .map((Component, index) => {
              // start all async « fetch »
              getResource(index);
              return Component;
            })
            .map((Component, index) => (
              <Suspense key={index} fallback={<Loading />}>
                <Component value={index} startedAt={startedAt} />
              </Suspense>
            ))}
        </SuspenseList>

        <button onClick={loadMore}>Load more</button>
      </div>
    </section>
  );
};

export default DataFetching;
