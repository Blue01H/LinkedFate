import { cancelable } from "cancelable-promise";
import { useEffect, useState } from "react";

/**
 *
 * @returns {[{isLoading: boolean, error: Error, result: unknown, status:"stop"|"process"|"error"|"end"|"unitialized"}, (newProcess: Promise<unknown>) => void]}
 */
function useAsync() {
  const [current, setCurrent] = useState(null);
  const [status, setStatus] = useState({
    status: "unitialized",
    error: null,
    result: null,
    isLoading: false,
  });

  async function track(process) {
    setStatus({
      ...status,
      isLoading: true,
      error: null,
      result: null,
      status: "process",
    });
    try {
      const result = await process();
      setStatus({
        ...status,
        isLoading: false,
        result: result,
        status: "end",
      });
    } catch (e) {
      setStatus({
        ...status,
        isLoading: false,
        error: e,
        status: "error",
      });
    }
  }

  useEffect(() => {
    if (current !== null && status.status == "stop") {
      const promise = cancelable(track(current));
      return () => {
        promise.cancel();
      };
    }
  }, [current]);

  return [
    status,
    (newProcess) => {
      if (
        status.status == "end" ||
        status.status == "error" ||
        status.status == "unitialized"
      ) {
        setStatus({
          ...status,
          status: "stop",
          isLoading: true,
        });
        setCurrent(() => newProcess);
      }
    },
  ];
}

export { useAsync };
export default useAsync;
