import store from "@/store";
import { CheckForChanges } from "meos-api-helper";

export function checkForChanges(): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    CheckForChanges(store.state.nextDifference)
      .then(data => {
        console.log("beep");
        if (data.updates) {
          store.commit("updateNextDifference", data.key);
          console.log("boop");
          data.runners.forEach(runner => {
            if (runner.category === store.state.pickedClass.id) {
              resolve(true);
            }
          });
        }
        resolve(false);
      })
      .catch(err => reject(err));
  });
}
