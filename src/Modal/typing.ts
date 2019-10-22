type MaxWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ModalConfig = {
  id: string;
  node: React.ReactNode;
  maxWidth: MaxWidth | false;
  useBodyScroll: boolean;
  dimmed: number;
};
