import { ValidationInfo } from '@skbkontur/react-ui-validations';

export const validateCount = (value: number | null): ValidationInfo | null => {
  if (!value) {
    return {
      message: 'Введите количество',
      type: 'submit',
    };
  }
  return null;
};

export const validateName = (value: string): ValidationInfo => {
  if (!value) {
    return {
      message: 'Введите название',
      type: 'submit',
    };
  }
  return null;
};

export const validatePrice = (value: number): ValidationInfo => {
  if (!value) {
    return {
      message: 'Введите цену',
      type: 'submit',
    };
  }
  return null;
};

export const validateTotalPrice = (value: number): ValidationInfo => {
  if (!value) {
    return {
      message: 'Введите примерную цену',
      type: 'submit',
    };
  }

  return null;
};
