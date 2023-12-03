import { DateTime } from "luxon";
import { Observable, first } from "rxjs";
import { Month } from "src/model/types";

function getPayload(): string|undefined {
  const token = localStorage.getItem('token');
  if(!token) return undefined;
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

function getUserId(): string|undefined {
  const payload = getPayload();
  return (<any>payload)?.sub;
}

const monthMap: {[key:number]: Month} =  {
    1 : Month.January,
    2 : Month.February,
    3 : Month.March,
    4 : Month.April,
    5 : Month.May,
    6 : Month.June,
    7 : Month.July,
    8 : Month.August,
    9 : Month.September,
    10 : Month.October,
    11 : Month.November,
    12 : Month.December,
}

function monthIndexToMonthEnum(monthIndex: number ) : Month {
  return monthMap[monthIndex];
}

/** 
 * @param dataPath path to actual data in result 
 * @param observable result of apollo query or mutation request 
*/
function apolloRequestToPromise<T>(observable: Observable<any>, dataPath: string): Promise<any> {
  return new Promise((resolve, reject) => {
    observable.pipe(first()).subscribe({
      next: ({data, loading}: any) => {
        if(data) resolve(data[dataPath]);
        else reject("error in retrieving data");
      },
      error: (err) => {
        reject(err);
      }
    });
  });
}

export { getPayload, getUserId, monthIndexToMonthEnum, apolloRequestToPromise };