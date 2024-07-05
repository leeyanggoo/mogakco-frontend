import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

import { InputControl } from '@components/Input';
import Button from '@components/Button';

type SignUpFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  nickname: string;
  phoneNumber: string;
  birthday: string;
};

const defaultValues: SignUpFormValues = {
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
  nickname: '',
  phoneNumber: '',
  birthday: '',
};

const SignUp = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted, isDirty, isValid },
    watch,
    reset,
  } = useForm<SignUpFormValues>({
    defaultValues: defaultValues,
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<SignUpFormValues> = data => {
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
        maxWidth: '500px',
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
        회원가입
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

        <Controller
          name='confirmPassword'
          control={control}
          rules={{
            required: '비밀번호를 확인해 주세요.',
            pattern: {
              // /^(?=.[!@#$%^&()_+-=[]{};':"\|,.<>/?]).{8,}$/ 특수문자 인식으로 다음과 변경
              value: /^(?=.*[!@#$%^&()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
              message:
                '최소 8글자, 적어도 1개 이상의 특수문자가 포함되지 않았습니다.',
            },
            validate: value =>
              value === watch('password')
                ? true
                : '비밀번호와 일치하지 않습니다.',
          }}
          render={({ field }) => (
            <InputControl
              {...field}
              type='password'
              $fullWidth
              $label='비밀번호 확인'
              $error={!!errors.confirmPassword}
              $helperText={errors.confirmPassword?.message}
              autoComplete='current-password'
            />
          )}
        />

        <Controller
          name='name'
          control={control}
          rules={{
            required: '이름을 입력해 주세요.',
            minLength: { value: 2, message: '최소 2자 이상 가능합니다.' },
          }}
          render={({ field }) => (
            <InputControl
              {...field}
              type='text'
              $fullWidth
              $label='이름'
              $error={!!errors.name}
              $helperText={errors.name?.message}
              autoComplete='name'
            />
          )}
        />

        <Controller
          name='nickname'
          control={control}
          rules={{
            required: '닉네임을 입력해 주세요.',
            maxLength: { value: 8, message: '최대 8자까지 가능합니다.' },
          }}
          render={({ field }) => (
            <InputControl
              {...field}
              type='text'
              $fullWidth
              $label='닉네임'
              $error={!!errors.nickname}
              $helperText={errors.nickname?.message}
              autoComplete='username'
            />
          )}
        />

        <Controller
          name='phoneNumber'
          control={control}
          rules={{
            required: '핸도폰 번호를 입력해 주세요.',
            pattern: {
              value: /^(010|011)-\d{4}-\d{4}$/,
              message:
                "전화번호는 010 또는 011로 시작하고, '-'로 구분되며 가운데와 끝은 각각 4자리 숫자여야 합니다.",
            },
          }}
          render={({ field }) => (
            <InputControl
              {...field}
              type='tel'
              $fullWidth
              $label='핸드폰 번호'
              $error={!!errors.phoneNumber}
              $helperText={errors.phoneNumber?.message}
              autoComplete='tel'
            />
          )}
        />

        <Controller
          name='birthday'
          control={control}
          rules={{
            required: '생년월일을 입력해 주세요.',
            validate: value =>
              new Date(value) < new Date()
                ? true
                : '현재 날짜 이전으로 선택해 주세요.',
          }}
          render={({ field }) => (
            <InputControl
              {...field}
              type='date'
              // 날짜 선택 오늘 이후 막기
              max={new Date().toISOString().split('T')[0]}
              $fullWidth
              $label='생년월일'
              $error={!!errors.birthday}
              $helperText={errors.birthday?.message}
              autoComplete='bday'
            />
          )}
        />

        <Button
          type='submit'
          disabled={!isDirty || !isValid || isSubmitting}
          $size='large'
        >
          회원가입
        </Button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default SignUp;
