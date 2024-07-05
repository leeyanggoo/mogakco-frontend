import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

import { InputControl } from '@components/Input';
import Button from '@components/Button';

type LoginFormValues = {
  email: string;
  password: string;
};

const defaultValues = {
  email: '',
  password: '',
};

const Login = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted, isDirty, isValid },
    reset,
  } = useForm<LoginFormValues>({
    defaultValues: defaultValues,
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<LoginFormValues> = data => {
    alert(JSON.stringify(data));
    // TODO
    // try => navigate('/')
    // catch => reset(data)
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '100px 0',
        maxWidth: '350px',
        margin: '0 auto',
      }}
    >
      <h1
        style={{
          fontSize: '30px',
          fontWeight: 'bold',
          marginBottom: '60px',
        }}
      >
        로그인
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
        autoComplete='off'
      >
        <Controller
          name='email'
          control={control}
          rules={{
            required: '이메일을 입력해 주세요.',
            pattern: {
              // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#validation
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
              message: '이메일 형식에 맞게 작성해 주세요.',
            },
          }}
          render={({ field }) => (
            <InputControl
              {...field}
              type='email'
              $fullWidth
              $label='이메일'
              $error={!!errors.email}
              $helperText={errors.email?.message}
              autoComplete='email'
            />
          )}
        />

        <Controller
          name='password'
          control={control}
          rules={{
            required: '비밀번호를 입력해 주세요.',
            pattern: {
              // /^(?=.[!@#$%^&()_+-=[]{};':"\|,.<>/?]).{8,}$/ 특수문자 인식으로 다음과 변경
              value: /^(?=.*[!@#$%^&()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
              message:
                '최소 8글자, 적어도 1개 이상의 특수문자가 포함되지 않았습니다.',
            },
          }}
          render={({ field }) => (
            <InputControl
              {...field}
              type='password'
              $fullWidth
              $label='비밀번호'
              $error={!!errors.password}
              $helperText={errors.password?.message}
              autoComplete='current-password'
            />
          )}
        />

        <Button
          type='submit'
          disabled={!isDirty || !isValid || isSubmitting}
          $size='large'
        >
          로그인
        </Button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default Login;
