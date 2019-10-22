const isProduction: boolean = process.env.NODE_ENV === 'production';
const prefix = 'Invariant error';

const invariant = (
  validate: (...args: any[]) => boolean,
  message: string = '',
) => {
  return (...args: any[]) => {
    if (validate(...args)) {
      return;
    }
    if (isProduction) {
      throw new Error(prefix);
    } else {
      throw new Error(`${prefix}: ${message}`);
    }
  };
};

const MaxWidth = ['xs', 'sm', 'md', 'lg', 'xl'];
const invariantMap = {
  dimmed: invariant(
    (dimmed: number | boolean) => dimmed >= 0 && dimmed <= 1,
    'Dimmed value should be between 0 and 1',
  ),
  maxWidth: invariant(
    (maxWidth: string | false) =>
      maxWidth === false ||
      Object.values(MaxWidth).some(validWidth => validWidth === maxWidth),
    `MaxWidth should be one of ${Object.values(MaxWidth).join(', ')} or false.`,
  ),
};

export default invariantMap;
