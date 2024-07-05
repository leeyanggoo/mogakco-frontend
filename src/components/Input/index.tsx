import React, { useId } from 'react';
import {
  InputWrapperStyle,
  InputStyle,
  InputWrapperStyleProps,
  InputStyleProps,
  InputControlStyle,
} from './styled';
import HelperText from '@components/HelperText';

// styled-components 외의 props는 input element의 props를 받기 위해 변경
interface InputBaseProps
  extends InputWrapperStyleProps,
    InputStyleProps,
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    > {}

interface InputControlProps extends InputBaseProps {
  $label: string;
  $helperText?: string;
}

/**
 * label이 없는 input 컴포넌트.
 * @param $ - styled-components prop
 * @param ...rest - HTMLInputElement의 나머지 props.
 */
export const InputBase = React.forwardRef<HTMLInputElement, InputBaseProps>(
  (props, ref) => {
    const { $color, $error, $fullWidth, $size, ...rest } = props;
    return (
      <InputWrapperStyle
        $color={$color}
        $error={$error}
        $fullWidth={$fullWidth}
      >
        <InputStyle
          $size={$size}
          ref={ref}
          {...rest}
        />
      </InputWrapperStyle>
    );
  }
);

/**
 * label이 없는 input 컴포넌트.
 * @param $ - styled-components prop
 * @param $label - input 상단 label (필수)
 * @param $helperText - input의 상태를 나타내는 하단의 도움말 (옵션)
 * @param ...rest - HTMLInputElement의 나머지 props.
 */
export const InputControl = React.forwardRef<
  HTMLInputElement,
  InputControlProps
>((props, ref) => {
  const { $color, $error, $fullWidth, $size, $helperText, $label, ...rest } =
    props;

  // 지정한 id가 없는 경우 label과 연동을 위해 생성
  const generatedId = useId();
  const id = rest?.id || generatedId;

  return (
    <InputControlStyle $fullWidth={$fullWidth}>
      <label htmlFor={id}>{$label}</label>
      <InputBase
        $error={$error}
        $fullWidth={$fullWidth}
        $color={$color}
        $size={$size}
        ref={ref}
        id={id}
        {...rest}
      />
      {$helperText && (
        <HelperText
          $helperText={$helperText}
          $error={$error}
        />
      )}
    </InputControlStyle>
  );
});
