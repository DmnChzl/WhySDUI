import type { ScreenData, UIScreen } from '../types/schema';

const SUPPORTED_VERSION = 1;

export const canRender = (screen: UIScreen): boolean => {
  return screen.version === SUPPORTED_VERSION;
};

export const readBoolean = (data: ScreenData, valuePath: string): boolean => {
  const value = data[valuePath];
  return typeof value === 'boolean' ? value : false;
};

export const valueToRecord = <T>(value: T, valuePath: string): Record<string, T> => ({
  [valuePath]: value,
});
