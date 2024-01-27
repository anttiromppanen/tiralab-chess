import { act } from "react-dom/test-utils";
import { vi } from "vitest";

const actualCreate: (createState: unknown) => unknown =
  await vi.importActual("zustand");

// a variable to hold reset functions for all stores declared in the app
const storeResetFns: Set<() => void> = new Set();

type StateSetter<T> = (state: T) => void;
type GetState<T> = () => T;

type CreateState<T> = (set: (state: T) => void, get: () => T) => void;

interface ZustandStore<T> {
  getState: GetState<T>;
  setState: StateSetter<T>;
}

// when creating a store, we get its initial state, create a reset function and add it in the set
const create = <T>(createState: CreateState<T>): ZustandStore<T> => {
  const store = actualCreate(createState) as ZustandStore<T>;
  const initialState = store.getState();
  storeResetFns.add(() => store.setState(initialState));
  return store;
};

// Reset all stores after each test run
beforeEach(() => {
  act(() => storeResetFns.forEach((resetFn) => resetFn()));
});

export default create;
